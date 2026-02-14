-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE itineraries ENABLE ROW LEVEL SECURITY;
ALTER TABLE translations ENABLE ROW LEVEL SECURITY;

-- =============================================
-- PROFILES POLICIES
-- =============================================

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Allow insert on profile creation (handled by trigger)
CREATE POLICY "Allow profile creation"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- =============================================
-- DESTINATIONS POLICIES
-- =============================================

-- Anyone can view destinations (public)
CREATE POLICY "Anyone can view destinations"
  ON destinations FOR SELECT
  USING (true);

-- Service role can manage destinations (for seeding and admin)
CREATE POLICY "Service role can manage destinations"
  ON destinations FOR ALL
  USING (
    auth.jwt() IS NOT NULL AND 
    auth.jwt()->>'role' = 'service_role'
  );

-- =============================================
-- REVIEWS POLICIES
-- =============================================

-- Anyone can view reviews
CREATE POLICY "Anyone can view reviews"
  ON reviews FOR SELECT
  USING (true);

-- Authenticated users can create reviews
CREATE POLICY "Authenticated users can create reviews"
  ON reviews FOR INSERT
  WITH CHECK (
    auth.uid() = user_id AND
    auth.uid() IS NOT NULL
  );

-- Users can update their own reviews
CREATE POLICY "Users can update own reviews"
  ON reviews FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own reviews
CREATE POLICY "Users can delete own reviews"
  ON reviews FOR DELETE
  USING (auth.uid() = user_id);

-- =============================================
-- PHOTOS POLICIES
-- =============================================

-- Anyone can view photos
CREATE POLICY "Anyone can view photos"
  ON photos FOR SELECT
  USING (true);

-- Authenticated users can upload photos
CREATE POLICY "Authenticated users can upload photos"
  ON photos FOR INSERT
  WITH CHECK (
    auth.uid() = user_id AND
    auth.uid() IS NOT NULL
  );

-- Users can delete their own photos
CREATE POLICY "Users can delete own photos"
  ON photos FOR DELETE
  USING (auth.uid() = user_id);

-- =============================================
-- CHAT SESSIONS POLICIES
-- =============================================

-- Users can view their own chat sessions
CREATE POLICY "Users can view own chats"
  ON chat_sessions FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create their own chat sessions (or guest sessions)
CREATE POLICY "Users can create own chats"
  ON chat_sessions FOR INSERT
  WITH CHECK (
    auth.uid() = user_id OR 
    user_id IS NULL
  );

-- Users can update their own chat sessions
CREATE POLICY "Users can update own chats"
  ON chat_sessions FOR UPDATE
  USING (auth.uid() = user_id OR user_id IS NULL);

-- Users can delete their own chat sessions
CREATE POLICY "Users can delete own chats"
  ON chat_sessions FOR DELETE
  USING (auth.uid() = user_id);

-- =============================================
-- ITINERARIES POLICIES
-- =============================================

-- Users can view their own itineraries
CREATE POLICY "Users can view own itineraries"
  ON itineraries FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create their own itineraries
CREATE POLICY "Users can create own itineraries"
  ON itineraries FOR INSERT
  WITH CHECK (
    auth.uid() = user_id AND
    auth.uid() IS NOT NULL
  );

-- Users can update their own itineraries
CREATE POLICY "Users can update own itineraries"
  ON itineraries FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own itineraries
CREATE POLICY "Users can delete own itineraries"
  ON itineraries FOR DELETE
  USING (auth.uid() = user_id);

-- =============================================
-- TRANSLATIONS POLICIES
-- =============================================

-- Anyone can view cached translations
CREATE POLICY "Anyone can view translations"
  ON translations FOR SELECT
  USING (true);

-- Service role can insert translations
CREATE POLICY "Service role can insert translations"
  ON translations FOR INSERT
  WITH CHECK (
    auth.jwt() IS NOT NULL AND 
    auth.jwt()->>'role' = 'service_role'
  );

-- Allow API to insert translations (for caching)
CREATE POLICY "Allow translation caching"
  ON translations FOR INSERT
  WITH CHECK (true);
