# Tanya Joko - AI Travel Assistant Yogyakarta

Aplikasi AI-powered travel assistant untuk membantu wisatawan menjelajahi Yogyakarta dengan fitur chat AI, voice input/output, translate 3 bahasa (Indonesia/English/Javanese), dan rekomendasi berbasis lokasi.

## 🚀 Status Implementasi

### ✅ Sudah Diimplementasikan

1. **Environment & Dependencies**
   - ✅ Konfigurasi environment variables (.env.local)
   - ✅ Package.json dengan semua dependencies
   - ✅ TypeScript configuration
   - ✅ Tailwind CSS setup

2. **Supabase Infrastructure**
   - ✅ Database schema (7 tables)
   - ✅ Row Level Security policies
   - ✅ Auth triggers & functions
   - ✅ Storage buckets configuration
   - ✅ Seed scripts dengan data Jogja asli

3. **Authentication & Database**
   - ✅ Supabase client (browser & server)
   - ✅ Auth actions (signUp, signIn, signOut)
   - ✅ useAuth hook
   - ✅ Database types (TypeScript)

4. **AI Services**
   - ✅ Gemini integration untuk chat
   - ✅ Sentiment analysis
   - ✅ Translation service (ID/EN/JV)
   - ✅ Itinerary generator

5. **Voice Features**
   - ✅ Speech-to-text (Web Speech API)
   - ✅ Text-to-speech (speechSynthesis)
   - ✅ useSpeechRecognition hook
   - ✅ useTextToSpeech hook

6. **API Routes**
   - ✅ /api/chat - Chat dengan RAG
   - ✅ /api/nearby - Rekomendasi berbasis lokasi
   - ✅ /api/translate - Translation service
   - ✅ /api/analyze-review - Sentiment analysis
   - ✅ /api/itinerary - Itinerary generator

7. **Translation System**
   - ✅ Static translations (ID/EN/JV)
   - ✅ Translation keys & types

### 📝 Belum Diimplementasikan (Next Steps)

8. **Pages (UI)**
   - ⏳ Landing page
   - ⏳ Chat page dengan voice
   - ⏳ Destination list & detail
   - ⏳ Itinerary planner
   - ⏳ Profile/dashboard
   - ⏳ Auth pages (login/register)

9. **Components**
   - ⏳ Navbar & Footer
   - ⏳ RecommendationCard
   - ⏳ ChatMessage
   - ⏳ VoiceInputButton
   - ⏳ SpeakButton
   - ⏳ ReviewForm
   - ⏳ NearbyButton

10. **Styling & Polish**
    - ⏳ Update globals.css dengan custom styles
    - ⏳ Update tailwind.config
    - ⏳ Update app/layout.tsx dengan fonts
    - ⏳ Loading states & animations

---

## 📋 Setup Instructions

### Prerequisites

- Node.js 18+ dan npm
- Akun Supabase (sudah ada: mimvgestlzmkizdhxhdo)
- Git

### 1. Install Dependencies

```bash
npm install
```

### 2. Verify Environment Variables

File `.env.local` sudah dibuat dengan konfigurasi Anda. Pastikan semua values sudah benar:

```env
NEXT_PUBLIC_SUPABASE_URL=https://mimvgestlzmkizdhxhdo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_RE-rXWXMY6nYigb1AtyqzA_oRhMbVoS
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
GEMINI_API_KEY=AIzaSyC0utZMhlJq-O0bwm21AZrao3lYGZbCgPQ
```

### 3. Setup Supabase Database

#### Option A: Automatic (Recommended)

```bash
# Install Supabase CLI (jika belum)
npm install supabase --save-dev

# Login ke Supabase
npm run supabase:login

# Link ke project
npm run supabase:link

# Push migrations ke database
npm run db:push

# Seed dummy data
npm run db:seed
```

#### Option B: Manual (jika automatic error)

1. Buka Supabase Dashboard: https://supabase.com/dashboard/project/mimvgestlzmkizdhxhdo
2. Go to SQL Editor
3. Copy-paste isi file berikut secara berurutan:
   - `supabase/migrations/20260214000001_initial_schema.sql`
   - `supabase/migrations/20260214000002_rls_policies.sql`
   - `supabase/migrations/20260214000003_auth_triggers.sql`
   - `supabase/migrations/20260214000004_storage_buckets.sql`
4. Run each SQL script
5. Jalankan seed: `npm run db:seed`

### 4. Verify Database Setup

```bash
npm run db:check
```

Output yang diharapkan:
```
✅ Connected to Supabase successfully
✅ destinations: 25 records
✅ profiles: 10 records
✅ reviews: 100+ records
✅ Storage buckets: 3 buckets
```

### 5. Start Development Server

```bash
npm run dev
```

Buka http://localhost:3000

---

## 🗄️ Database Schema

### Tables

1. **profiles** - User profiles (extends auth.users)
   - id, email, full_name, avatar_url, has_discount, preferred_language

2. **destinations** - Tempat wisata Jogja
   - name, location, lat, lng, category, description, price_range, rating, pros, cons

3. **reviews** - User reviews
   - destination_id, user_id, rating, review_text, sentiment, keywords, photos

4. **photos** - User uploaded photos
   - destination_id, user_id, photo_url, analysis_result

5. **chat_sessions** - Chat history
   - user_id, messages (JSONB), language

6. **itineraries** - Saved itineraries
   - user_id, duration_days, budget, preferences, generated_plan (JSONB)

7. **translations** - Translation cache
   - source_text, source_lang, target_lang, translated_text

### Storage Buckets

- `destination-photos` - Foto destinasi (5MB max)
- `review-photos` - Foto review user (10MB max)
- `avatars` - Avatar user (2MB max)

---

## 🧪 Test Accounts

```
Demo (dengan diskon):
Email: demo@tanyajoko.com
Password: demo123

Guest (tanpa diskon):
Email: guest@tanyajoko.com
Password: guest123
```

---

## 📡 API Endpoints

### POST /api/chat
Chat dengan AI assistant (RAG-enabled)

**Request:**
```json
{
  "message": "Tempat wisata alam di Jogja",
  "userId": "uuid",
  "sessionId": "uuid",
  "language": "id"
}
```

**Response:**
```json
{
  "message": "AI response...",
  "destinations": [{ ... }]
}
```

### GET /api/nearby
Cari tempat terdekat berdasarkan GPS

**Query Params:**
- lat: latitude (required)
- lng: longitude (required)
- radius: radius dalam km (default 5)
- category: filter kategori (optional)

**Response:**
```json
{
  "destinations": [{ ..., "distance_km": 2.5 }],
  "count": 10
}
```

### POST /api/translate
Translate text antar bahasa

**Request:**
```json
{
  "text": "Halo",
  "sourceLang": "id",
  "targetLang": "en"
}
```

**Response:**
```json
{
  "translatedText": "Hello",
  "cached": false
}
```

### POST /api/analyze-review
Analisis sentiment review

**Request:**
```json
{
  "reviewText": "Tempat nya bagus banget!"
}
```

**Response:**
```json
{
  "sentiment": "positive",
  "keywords": ["bagus", "recommended"],
  "confidence": 0.92
}
```

### POST /api/itinerary
Generate travel itinerary

**Request:**
```json
{
  "duration": 3,
  "budget": 1000000,
  "preferences": ["alam", "budaya"],
  "userId": "uuid"
}
```

**Response:**
```json
{
  "itinerary": {
    "day1": [{ "time": "08:00", "destination": "...", ... }],
    "day2": [...],
    "totalEstimatedCost": "Rp 950.000"
  }
}
```

---

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run linter

# Database
npm run db:push          # Push migrations to Supabase
npm run db:seed          # Seed dummy data
npm run db:reset         # Reset & re-seed database
npm run db:check         # Check database connection
npm run db:types         # Generate TypeScript types

# Supabase
npm run supabase:login   # Login to Supabase CLI
npm run supabase:link    # Link to project
npm run supabase:status  # Check Supabase status

# One-command setup
npm run setup            # Install + link + push + seed
```

---

## 🏗️ Project Structure

```
tanyajoko/
├── app/
│   ├── api/              # API routes ✅
│   │   ├── chat/
│   │   ├── nearby/
│   │   ├── translate/
│   │   ├── analyze-review/
│   │   └── itinerary/
│   ├── (pages)           # Next.js pages ⏳
│   ├── globals.css       # Global styles ⏳
│   └── layout.tsx        # Root layout ⏳
├── lib/
│   ├── ai/               # AI services ✅
│   │   └── gemini.ts
│   ├── voice/            # Voice services ✅
│   │   ├── speech-to-text.ts
│   │   └── text-to-speech.ts
│   ├── supabase/         # Supabase clients ✅
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   ├── auth/             # Auth actions ✅
│   │   └── actions.ts
│   ├── i18n/             # Translations ✅
│   │   └── translations.ts
│   └── database.types.ts # DB types ✅
├── hooks/                # React hooks ✅
│   ├── useAuth.ts
│   ├── useSpeechRecognition.ts
│   └── useTextToSpeech.ts
├── components/           # UI components ⏳
├── supabase/
│   ├── config.toml       # Supabase config ✅
│   └── migrations/       # SQL migrations ✅
├── scripts/              # Utility scripts ✅
│   ├── seed.ts
│   ├── reset-db.ts
│   └── check-db.ts
├── .env.local            # Environment variables ✅
└── package.json          # Dependencies ✅
```

---

## 🎯 Next Steps untuk Melanjutkan Development

### Priority 1: Core UI Pages

1. **Update app/layout.tsx**
   - Tambah Material Icons font
   - Tambah Plus Jakarta Sans font
   - Wrap dengan Providers (Translation, Toaster)

2. **Buat app/page.tsx (Landing)**
   - Port dari sample-assets/pages/LandingPage.tsx
   - Ganti text ke Bahasa Indonesia
   - Connect ke Supabase untuk fetch destinations

3. **Buat app/chat/page.tsx**
   - Port dari sample-assets/pages/ChatPage.tsx
   - Integrate dengan /api/chat
   - Tambah VoiceInputButton
   - Tambah SpeakButton untuk responses

### Priority 2: Components

4. **Buat components/layout/Navbar.tsx**
   - Port dari sample-assets/App.tsx
   - Menu Bahasa Indonesia
   - Integrate useAuth hook

5. **Buat components/voice/VoiceInputButton.tsx**
   - Use useSpeechRecognition hook
   - Animasi pulse saat recording

6. **Buat components/voice/SpeakButton.tsx**
   - Use useTextToSpeech hook
   - Toggle play/pause

### Priority 3: Styling

7. **Update globals.css**
   - Copy custom scrollbar dari sample-assets
   - Tambah glass-card utilities
   - Animation keyframes

8. **Update tailwind.config.ts**
   - Primary color: #13ec5b
   - Dark theme colors

### Quick Win Implementation

File yang paling mudah untuk mulai:

```typescript
// app/layout.tsx - Update dengan fonts dan providers
// app/page.tsx - Simple landing page
// components/layout/Navbar.tsx - Navigation
```

---

## 🐛 Troubleshooting

### Database Connection Issues

```bash
# Check connection
npm run db:check

# Verify env variables
cat .env.local

# Re-link project
npm run supabase:link
```

### Migration Errors

```bash
# Reset database
npm run db:reset

# Manual migration via Dashboard
# Copy-paste SQL files dari supabase/migrations/
```

### Voice Features Not Working

- Pastikan browser support (Chrome/Edge recommended)
- Check HTTPS (voice requires secure context)
- Allow microphone permissions

### Gemini API Errors

- Verify API key di .env.local
- Check quota (60 req/min untuk free tier)
- Pastikan model name benar (`gemini-1.5-pro`)

---

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Gemini API Docs](https://ai.google.dev/tutorials)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

---

## 🎉 Fitur Unggulan untuk Kompetisi

1. ✅ **Voice Input/Output 3 Bahasa** (Indonesia, English, Javanese)
2. ✅ **Smart Nearby Recommendations** (GPS-based dengan Haversine formula)
3. ✅ **AI Sentiment Analysis** untuk review
4. ✅ **Image Analysis** dengan Gemini Vision
5. ✅ **AI Itinerary Generator** dengan budget constraints
6. ✅ **Translation caching** untuk performa
7. ✅ **Guest & authenticated modes** (discount badge)
8. ✅ **RAG-enhanced chat** dengan data real Jogja

---

## 📞 Support

Jika ada error atau butuh bantuan lanjutan, cek:
1. Error logs di terminal
2. Browser console (F12)
3. Supabase Dashboard logs

---

**Good luck dengan kompetisi! 🚀**

Struktur backend dan core infrastructure sudah siap. Tinggal build UI dan polish UX untuk demo yang menawan!
