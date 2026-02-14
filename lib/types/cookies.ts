// Shared types for Supabase cookie handling
import type { CookieSerializeOptions } from 'cookie'

export interface CookieOptions {
  name: string
  value: string
  options?: CookieSerializeOptions
}
