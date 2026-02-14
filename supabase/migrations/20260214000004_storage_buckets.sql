-- =============================================
-- STORAGE BUCKETS SETUP
-- =============================================

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  (
    'destination-photos', 
    'destination-photos', 
    true, 
    5242880, -- 5MB
    ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']::text[]
  ),
  (
    'review-photos', 
    'review-photos', 
    true, 
    10485760, -- 10MB
    ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']::text[]
  ),
  (
    'avatars', 
    'avatars', 
    true, 
    2097152, -- 2MB
    ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']::text[]
  )
ON CONFLICT (id) DO NOTHING;

-- =============================================
-- STORAGE POLICIES - REVIEW PHOTOS
-- =============================================

-- Allow authenticated users to upload review photos
CREATE POLICY "Authenticated users can upload review photos"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'review-photos' AND
    auth.role() = 'authenticated'
  );

-- Anyone can view review photos
CREATE POLICY "Anyone can view review photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'review-photos');

-- Users can delete their own review photos (matching folder structure: user_id/filename)
CREATE POLICY "Users can delete own review photos"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'review-photos' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Users can update their own review photos
CREATE POLICY "Users can update own review photos"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'review-photos' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- =============================================
-- STORAGE POLICIES - AVATARS
-- =============================================

-- Allow authenticated users to upload avatars
CREATE POLICY "Authenticated users can upload avatars"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' AND
    auth.role() = 'authenticated' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Anyone can view avatars
CREATE POLICY "Anyone can view avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

-- Users can update their own avatar
CREATE POLICY "Users can update own avatar"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Users can delete their own avatar
CREATE POLICY "Users can delete own avatar"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- =============================================
-- STORAGE POLICIES - DESTINATION PHOTOS
-- =============================================

-- Service role can manage destination photos (for admin/seeding)
CREATE POLICY "Service can upload destination photos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'destination-photos');

-- Anyone can view destination photos
CREATE POLICY "Anyone can view destination photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'destination-photos');

-- Service can update destination photos
CREATE POLICY "Service can update destination photos"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'destination-photos');

-- Service can delete destination photos
CREATE POLICY "Service can delete destination photos"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'destination-photos');
