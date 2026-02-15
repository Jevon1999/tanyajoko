// Shared types for Supabase cookie handling
import type { SerializeOptions } from 'cookie'

export interface CookieOptions {
  name: string
  value: string
  options?: SerializeOptions
}
