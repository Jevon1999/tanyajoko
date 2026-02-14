import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

// Load environment variables
config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function checkDatabase() {
  console.log('🔍 Checking database connection and data...\n')

  try {
    // Test connection
    const { error: connectionError } = await supabase
      .from('destinations')
      .select('count')
      .limit(1)

    if (connectionError) {
      console.error('❌ Cannot connect to Supabase')
      console.error('Error:', connectionError.message)
      return false
    }

    console.log('✅ Connected to Supabase successfully\n')

    // Check environment variables
    console.log('📋 Environment Variables:')
    console.log(`  NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl}`)
    console.log(`  SUPABASE_SERVICE_ROLE_KEY: ${supabaseServiceKey.substring(0, 20)}...`)
    console.log(`  GEMINI_API_KEY: ${process.env.GEMINI_API_KEY ? '✅ Set' : '❌ Not set'}\n`)

    // Count records in each table
    console.log('📊 Database Statistics:\n')

    const tables = [
      'profiles',
      'destinations',
      'reviews',
      'photos',
      'chat_sessions',
      'itineraries',
      'translations'
    ]

    for (const table of tables) {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true })

      if (error) {
        console.log(`  ❌ ${table}: Error - ${error.message}`)
      } else {
        console.log(`  ✅ ${table}: ${count} records`)
      }
    }

    console.log('\n🗂️ Storage Buckets:\n')

    const { data: buckets, error: bucketsError } = await supabase
      .storage
      .listBuckets()

    if (bucketsError) {
      console.log(`  ❌ Error listing buckets: ${bucketsError.message}`)
    } else {
      buckets.forEach(bucket => {
        console.log(`  ✅ ${bucket.name} (${bucket.public ? 'public' : 'private'})`)
      })
    }

    console.log('\n✅ Database check complete!')
    return true

  } catch (error) {
    const err = error as Error
    console.error('❌ Check failed:', err.message)
    return false
  }
}

checkDatabase().then(success => {
  process.exit(success ? 0 : 1)
})
