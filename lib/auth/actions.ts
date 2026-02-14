'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const signUpSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  fullName: z.string().min(2, 'Nama lengkap minimal 2 karakter'),
})

const signInSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(1, 'Password harus diisi'),
})

export async function signUp(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string

  const validation = signUpSchema.safeParse({ email, password, fullName })

  if (!validation.success) {
    return {
      error: validation.error.errors[0].message
    }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  })

  if (error) {
    return {
      error: error.message === 'User already registered'
        ? 'Email sudah terdaftar'
        : 'Terjadi kesalahan saat mendaftar'
    }
  }

  redirect('/chat')
}

export async function signIn(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const validation = signInSchema.safeParse({ email, password })

  if (!validation.success) {
    return {
      error: validation.error.errors[0].message
    }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return {
      error: error.message === 'Invalid login credentials'
        ? 'Email atau password salah'
        : 'Terjadi kesalahan saat login'
    }
  }

  redirect('/chat')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}

export async function getUser() {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return null
  }

  // Get profile data
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return {
    ...user,
    profile
  }
}

export async function updateProfile(formData: FormData) {
  const fullName = formData.get('fullName') as string
  const preferredLanguage = formData.get('preferredLanguage') as string

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Tidak terautentikasi' }
  }

  // @ts-ignore - Supabase SSR v0.5.2 type inference bug
  const { error } = await supabase
    .from('profiles')
    .update({
      full_name: fullName,
      preferred_language: preferredLanguage,
    })
    .eq('id', user.id)

  if (error) {
    return { error: 'Gagal memperbarui profil' }
  }

  return { success: true }
}
