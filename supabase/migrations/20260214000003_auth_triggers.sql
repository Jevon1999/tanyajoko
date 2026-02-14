-- =============================================
-- AUTO-CREATE PROFILE ON USER SIGNUP
-- =============================================

-- Function to create profile when new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
EXCEPTION
  WHEN unique_violation THEN
    -- Profile already exists, do nothing
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile when user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- HELPER FUNCTIONS
-- =============================================

-- Function to get nearby destinations using Haversine formula
CREATE OR REPLACE FUNCTION get_nearby_destinations(
  user_lat DECIMAL,
  user_lng DECIMAL,
  radius_km DECIMAL DEFAULT 5,
  category_filter TEXT DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  location TEXT,
  lat DECIMAL,
  lng DECIMAL,
  category TEXT,
  description TEXT,
  price_range TEXT,
  rating DECIMAL,
  image_url TEXT,
  distance_km DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    d.id,
    d.name,
    d.location,
    d.lat,
    d.lng,
    d.category,
    d.description,
    d.price_range,
    d.rating,
    d.image_url,
    -- Haversine formula to calculate distance
    ROUND(
      CAST(
        6371 * acos(
          cos(radians(user_lat)) * 
          cos(radians(d.lat)) * 
          cos(radians(d.lng) - radians(user_lng)) + 
          sin(radians(user_lat)) * 
          sin(radians(d.lat))
        ) AS NUMERIC
      ), 
      2
    ) AS distance_km
  FROM destinations d
  WHERE 
    d.lat IS NOT NULL 
    AND d.lng IS NOT NULL
    AND (category_filter IS NULL OR d.category = category_filter)
    -- Pre-filter using bounding box for performance
    AND d.lat BETWEEN (user_lat - (radius_km / 111.0)) AND (user_lat + (radius_km / 111.0))
    AND d.lng BETWEEN (user_lng - (radius_km / (111.0 * cos(radians(user_lat))))) 
                  AND (user_lng + (radius_km / (111.0 * cos(radians(user_lat)))))
  HAVING 
    -- Final distance filter
    ROUND(
      CAST(
        6371 * acos(
          cos(radians(user_lat)) * 
          cos(radians(d.lat)) * 
          cos(radians(d.lng) - radians(user_lng)) + 
          sin(radians(user_lat)) * 
          sin(radians(d.lat))
        ) AS NUMERIC
      ), 
      2
    ) <= radius_km
  ORDER BY distance_km ASC;
END;
$$ LANGUAGE plpgsql STABLE;
