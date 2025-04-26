"use client"
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const { data: { user }, error } = await supabase.auth.getUser()

        if (error) throw error
        setUser(user)
      } catch (error) {
        console.error('Error fetching user:', error)
        toast.error('Failed to fetch user data')
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT') {
          // Clear user state first
          setUser(null)
          // Don't redirect here - let the logout function handle it
        } else if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user)
          toast.success('Logged in successfully')
        } else if (event === 'USER_UPDATED' && session?.user) {
          setUser(session.user)
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const logout = async () => {
    try {
      setLoading(true)
      // Clear user state first before signing out
      setUser(null)
      
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      // Use a timeout to ensure state is cleared before navigation
      setTimeout(() => {
        router.push('/login')
      }, 100)
      
    } catch (error) {
      console.error('Error logging out:', error)
      toast.error('Failed to log out')
    } finally {
      setLoading(false)
    }
  }

  return { user, loading, logout }
}
