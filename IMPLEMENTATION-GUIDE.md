# Panduan Setup Lengkap Tanya Joko

Dokumen ini berisi langkah-langkah detail untuk setup project Tanya Joko dari awal.

## 📦 Yang Sudah Diimplementasikan

### 1. Infrastructure (100%)
- ✅ Supabase database schema dengan 7 tables
- ✅ Row Level Security policies
- ✅ Storage buckets untuk photos
- ✅ Auth triggers & functions
- ✅ Seed scripts dengan 25+ destinasi Jogja asli

### 2. Backend Services (100%)
- ✅ Supabase client (browser & server)
- ✅ Authentication (signUp, signIn, signOut)
- ✅ Gemini AI integration
- ✅ Voice services (STT & TTS)
- ✅ Translation service (ID/EN/JV)

### 3. API Routes (100%)
- ✅ /api/chat - Chat dengan RAG
- ✅ /api/nearby - GPS-based recommendations
- ✅ /api/translate - Multi-language translation
- ✅ /api/analyze-review - Sentiment analysis
- ✅ /api/itinerary - AI itinerary generator

### 4. Hooks & Utilities (100%
- ✅ useAuth - Authentication state
- ✅ useSpeechRecognition - Voice input
- ✅ useTextToSpeech - Voice output
- ✅ Static translations (ID/EN/JV)

### 5. Yang Belum (Perlu Dibangun)
- ⏳ UI Pages (landing, chat, destinations, dll)
- ⏳ UI Components (navbar, footer, cards, dll)
- ⏳ Styling & theme customization
- ⏳ Additional API routes (reviews, upload, dll)

---

## 🚀 Setup Step-by-Step

### Step 1: Install Dependencies ✅

Dependencies sudah terinstall. Jika perlu install ulang:

```bash
cd d:\jagoan-hosting\tanyajoko
npm install
```

### Step 2: Verify Environment Variables ✅

File `.env.local` sudah ada dengan credentials Anda. Pastikan tidak ada yang berubah:

```bash
# Check environment file
cat .env. local
```

Expected output:
```
NEXT_PUBLIC_SUPABASE_URL=https://mimvgestlzmkizdhxhdo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
GEMINI_API_KEY=AIzaSyC0ut...
```

### Step 3: Setup Supabase Database

#### Option A: Automatic Migration (Recommended)

```powershell
# 1. Install Supabase CLI globally
npm install -g supabase

# 2. Login ke Supabase
npx supabase login

# 3. Link ke your project
npx supabase link --project-ref mimvgestlzmkizdhxhdo

# 4. Push migrations
npx supabase db push

# Output yang diharapkan:
# Applying migration 20260214000001_initial_schema.sql...
# Applying migration 20260214000002_rls_policies.sql...
# Applying migration 20260214000003_auth_triggers.sql...
# Applying migration 20260214000004_storage_buckets.sql...
# ✅ Completed!
```

#### Option B: Manual via Dashboard (Jika Automatic Error)

1. **Buka Supabase Dashboard:**
   ```
   https://supabase.com/dashboard/project/mimvgestlzmkizdhxhdo/editor
   ```

2. **Klik "SQL Editor" di sidebar**

3. **Execute migrations satu per satu:**

   **Migration 1: Initial Schema**
   - Copikan isi `supabase/migrations/20260214000001_initial_schema.sql`
   - Paste di SQL Editor
   - Klik "Run"
   - Tunggu sampai selesai (akan ada ✅)

   **Migration 2: RLS Policies**
   - Copy isi `supabase/migrations/20260214000002_rls_policies.sql`
   - Run di SQL Editor

   **Migration 3: Auth Triggers**
   - Copy isi `supabase/migrations/20260214000003_auth_triggers.sql`
   - Run di SQL Editor

   **Migration 4: Storage Buckets**
   - Copy isi `supabase/migrations/20260214000004_storage_buckets.sql`
   - Run di SQL Editor

4. **Verify di Dashboard:**
   - Go to Table Editor
   - Harus ada 7 tables: profiles, destinations, reviews, photos, chat_sessions, itineraries, translations
   - Go to Storage
   - Harus ada 3 buckets: destination-photos, review-photos, avatars

### Step 4: Seed Data

```powershell
# Run seed script
npm run db:seed
```

Expected output:
```
🚀 Starting database seeding...
✅ Connected to Supabase

🌍 Seeding destinations...
✅ Seeded 25 destinations

👥 Seeding users...
✅ Seeded 10 users

⭐ Seeding reviews...
✅ Seeded 120 reviews

🎉 Database seeded successfully!

Test accounts:
  demo@tanyajoko.com / demo123 (with discount)
  guest@tanyajoko.com / guest123 (no discount)
```

Jika ada error "Database already has destinations", pilih:
- `yes` untuk tetap seed (akan tambah data)
- `no` untuk cancel

Atau jalankan reset dulu:
```powershell
npm run db:reset
# Ketik 'yes' untuk confirm
# Lalu jalankan npm run db:seed lagi
```

### Step 5: Verify Setup

```powershell
npm run db:check
```

Expected output:
```
🔍 Checking database connection and data...

✅ Connected to Supabase successfully

📋 Environment Variables:
  NEXT_PUBLIC_SUPABASE_URL: https://mimvgestlzmkizdhxhdo.supabase.co
  SUPABASE_SERVICE_ROLE_KEY: eyJhbGci...
  GEMINI_API_KEY: ✅ Set

📊 Database Statistics:

  ✅ profiles: 10 records
  ✅ destinations: 25 records
  ✅ reviews: 120 records
  ✅ photos: 0 records
  ✅ chat_sessions: 0 records
  ✅ itineraries: 0 records
  ✅ translations: 0 records

🗂️ Storage Buckets:

  ✅ destination-photos (public)
  ✅ review-photos (public)
  ✅ avatars (public)

✅ Database check complete!
```

### Step 6: Start Development Server

```powershell
npm run dev
```

Expected output:
```
  ▲ Next.js 16.1.6
  - Local:        http://localhost:3000
  - Environments: .env.local

 ✓ Starting...
 ✓ Ready in 2.5s
```

Buka browser: http://localhost:3000

---

## 🧪 Testing API Endpoints

### Test Chat API

```powershell
# Using curl
curl -X POST http://localhost:3000/api/chat `
  -H "Content-Type: application/json" `
  -d '{\"message\":\"Tempat wisata alam di Jogja\",\"language\":\"id\"}'
```

Expected response:
```json
{
  "message": "Berdasarkan data yang ada, saya rekomendasikan...",
  "destinations": [...]
}
```

### Test Nearby API

```powershell
# Coordinate example: Malioboro area
curl "http://localhost:3000/api/nearby?lat=-7.792926&lng=110.365349&radius=2"
```

Expected response:
```json
{
  "destinations": [...],
  "count": 5,
  "radius": 2,
  "userLocation": {"lat": -7.792926, "lng": 110.365349}
}
```

### Test Translation API

```powershell
curl -X POST http://localhost:3000/api/translate `
  -H "Content-Type: application/json" `
  -d '{\"text\":\"Selamat pagi\",\"sourceLang\":\"id\",\"targetLang\":\"jv\"}'
```

Expected response:
```json
{
  "translatedText": "Sugeng enjang",
  "cached": false
}
```

---

## 🏗️ Next: Build UI Pages

Sekarang backend sudah jalan, saatnya build UI. Berikut urutan yang disarankan:

### 1. Update Root Layout (CRITICAL FIRST)

File: `app/layout.tsx`

```typescript
import { GeistSans } from 'geist/font/sans'
import { Toaster } from 'react-hot-toast'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className="dark">
      <head>
        {/* Material Icons */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Icons+Round"
          rel="stylesheet"
        />
        {/* Plus Jakarta Sans */}
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={GeistSans.className}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
```

### 2. Create Simple Landing Page

File: `app/page.tsx`

```typescript
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-dark to-dark-lighter">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            Tanya Joko
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Asisten AI Wisata Yogyakarta
          </p>
          
          <div className="flex gap-4 justify-center">
            <a
              href="/chat"
              className="px-8 py-4 bg-primary text-dark font-semibold rounded-lg hover:bg-primary/90 transition"
            >
              Mulai Bertanya
            </a>
            <a
              href="/destinasi"
              className="px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition backdrop-blur"
            >
              Jelajahi Destinasi
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto">
            <div>
              <div className="text-4xl font-bold text-primary">25+</div>
              <div className="text-gray-400">Destinasi</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary">100+</div>
              <div className="text-gray-400">Review</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary">3</div>
              <div className="text-gray-400">Bahasa</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
```

### 3. Update Tailwind Config

File: `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#13ec5b',
        dark: '#102216',
        'dark-lighter': '#1a2f20',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
} satisfies Config;
```

### 4. Update Globals CSS

File: `app/globals.css`

```css
@import "tailwindcss";

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #1a2f20;
}

::-webkit-scrollbar-thumb {
  background: #13ec5b;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #10d14f;
}

/* Glass card effect */
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Loading pulse animation */
@keyframes pulse-ring {
  0% {
    transform: scale(0.95);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.7;
  }
  100% {
    transform: scale(0.95);
    opacity: 1;
  }
}

.pulse-ring {
  animation: pulse-ring 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

### 5. Test Basic UI

```powershell
npm run dev
```

Buka http://localhost:3000

Anda harus melihat:
- ✅ Landing page dengan title "Tanya Joko"
- ✅ 2 tombol: "Mulai Bertanya" dan "Jelajahi Destinasi"
- ✅ Stats: 25+ Destinasi, 100+ Review, 3 Bahasa
- ✅ Green theme (#13ec5b)
- ✅ Dark background

### 6. Build Chat Page (Next Priority)

File: `app/chat/page.tsx`

Ini adalah page paling penting. Copy struktur dari:
- `sample-assets/pages/ChatPage.tsx`

Modifikasi:
1. Ganti fetch ke `/api/chat`
2. Add `<VoiceInputButton />` component
3. Add `<SpeakButton />` untuk setiap response
4. Integrate `useAuth` hook

---

## 🎨 Component Building Guide

### Priority Components

1. **VoiceInputButton** - Critical untuk fitur voice
2. **Navbar** - Navigation
3. **ChatMessage** - Display chat bubbles
4. **RecommendationCard** - Show AI recommendations

### Sample: VoiceInputButton

```typescript
// components/voice/VoiceInputButton.tsx
'use client'

import { useSpeechRecognition } from '@/hooks/useSpeechRecognition'

export function VoiceInputButton({ 
  onTranscript,
  language = 'id-ID' 
}: {
  onTranscript: (text: string) => void
  language?: 'id-ID' | 'en-US' | 'jv-ID'
}) {
  const { isListening, transcript, startListening, stopListening, isSupported } = useSpeechRecognition()

  useEffect(() => {
    if (transcript) {
      onTranscript(transcript)
    }
  }, [transcript, onTranscript])

  if (!isSupported) {
    return (
      <button disabled className="p-2 text-gray-500">
        <span className="material-icons-round">mic_off</span>
      </button>
    )
  }

  return (
    <button
      onClick={() => isListening ? stopListening() : startListening(language)}
      className={`p-2 rounded-full transition ${
        isListening 
          ? 'bg-primary text-dark pulse-ring' 
          : 'bg-white/10 text-white hover:bg-white/20'
      }`}
    >
      <span className="material-icons-round">
        {isListening ? 'mic' : 'mic_none'}
      </span>
    </button>
  )
}
```

---

## 📋 Deployment Checklist

Sebelum deploy ke production:

- [ ] Semua API routes tested
- [ ] Voice features tested di Chrome/Edge
- [ ] Translation working untuk 3 bahasa
- [ ] Auth flow (register, login, logout) working
- [ ] Nearby recommendations tested dengan real GPS
- [ ] Photos upload working
- [ ] Review submission working
- [ ] Itinerary generator working
- [ ] Mobile responsive
- [ ] Environment variables set di Vercel/hosting
- [ ] Database seeded dengan production data

---

## 🎯 Competition Demo Script

1. **Open Landing** - Show hero, stats
2. **Click "Mulai Bertanya"** - Go to chat
3. **Voice Demo** - Click mic, say "Tempat wisata alam di Jogja"
4. **Show AI Response** - Structured recommendation cards
5. **Click Speak Button** - TTS demo
6. **Switch Language** - Change to English, AI responds in English
7. **Switch to Javanese** - AI responds in Javanese
8. **Nearby Demo** - Click "Cari Tempat Terdekat", show map
9. **Destination Detail** - Click card, show reviews
10. **Upload Review** - Add review with photo
11. **Sentiment Analysis** - Show positive/negative/neutral badge
12. **Itinerary Generator** - Input 3 days, Rp 1jt, generate plan
13. **Show Discount Badge** - Login as demo user, show 20% badge

---

## ❤️ Credits

- **Backend Infrastructure:** Supabase
- **AI:** Google Gemini Pro (via akun belajar.id)
- **Voice:** Web Speech API
- **Framework:** Next.js 16
- **Styling:** Tailwind CSS v4
- **Data:** 25+ destinasi wisata Jogja asli

---

**Setup sudah 60% selesai! Backend & infrastructure solid. Tinggal build UI untuk menang kompetisi! 🏆**
