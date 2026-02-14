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

async function resetDatabase() {
  console.log('🗑️ Resetting database...\n')
  console.log('⚠️ WARNING: This will delete ALL data!\n')

  try {
    // Delete data in order (respecting foreign keys)
    const tables = [
      'translations',
      'itineraries',
      'chat_sessions',
      'photos',
      'reviews',
      'destinations',
      'profiles'
    ]

    for (const table of tables) {
      console.log(`🗑️ Clearing ${table}...`)
      
      const { error } = await supabase
        .from(table)
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all

      if (error) {
        console.error(`❌ Error clearing ${table}:`, error.message)
      } else {
        console.log(`✅ Cleared ${table}`)
      }
    }

    console.log('\n🧹 Database cleared successfully!')
    console.log('\n📦 Now run: npm run db:seed')
    console.log('   to populate with fresh data\n')

  } catch (error: any) {
    console.error('\n❌ Reset failed:', error.message)
    process.exit(1)
  }
}

// Confirmation prompt
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readline.question('Are you sure you want to reset the database? (yes/no): ', (answer: string) => {
  readline.close()
  
  if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
    resetDatabase()
  } else {
    console.log('Reset cancelled')
    process.exit(0)
  }
})
