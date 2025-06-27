import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.')
  console.error('Required variables: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY')
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          email: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          email?: string
          created_at?: string
          updated_at?: string
        }
      }
      chats: {
        Row: {
          id: string
          title: string
          messages: any
          user_id: string
          chat_url: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          title: string
          messages?: any
          user_id: string
          chat_url: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          messages?: any
          user_id?: string
          chat_url?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}