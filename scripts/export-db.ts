import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
import dotenv from 'dotenv'

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function exportDatabase() {
  console.log('🚀 Starting database export...\n')

  try {
    // Export destinations table
    const { data: destinations, error } = await supabase
      .from('destinations')
      .select('*')
      .order('id', { ascending: true })

    if (error) {
      console.error('❌ Error fetching destinations:', error)
      process.exit(1)
    }

    console.log(`✅ Fetched ${destinations?.length || 0} destinations`)

    // Create exports directory if not exists
    const exportsDir = path.join(process.cwd(), 'exports')
    if (!fs.existsSync(exportsDir)) {
      fs.mkdirSync(exportsDir)
    }

    // Save to JSON file with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const filename = `destinations_${timestamp}.json`
    const filepath = path.join(exportsDir, filename)

    fs.writeFileSync(filepath, JSON.stringify(destinations, null, 2))
    console.log(`\n💾 Database exported to: ${filepath}`)
    console.log(`📊 Total records: ${destinations?.length || 0}`)

    // Also create a CSV export
    if (destinations && destinations.length > 0) {
      const csvFilename = `destinations_${timestamp}.csv`
      const csvFilepath = path.join(exportsDir, csvFilename)
      
      // Get headers
      const headers = Object.keys(destinations[0])
      let csv = headers.join(',') + '\n'
      
      // Add rows
      destinations.forEach(dest => {
        const row = headers.map(header => {
          const value = dest[header as keyof typeof dest]
          // Escape commas and quotes in CSV
          if (value === null || value === undefined) return ''
          const stringValue = String(value).replace(/"/g, '""')
          return `"${stringValue}"`
        }).join(',')
        csv += row + '\n'
      })
      
      fs.writeFileSync(csvFilepath, csv)
      console.log(`📄 CSV exported to: ${csvFilepath}`)
    }

    console.log('\n✨ Export completed successfully!')

  } catch (error) {
    console.error('❌ Export failed:', error)
    process.exit(1)
  }
}

exportDatabase()
