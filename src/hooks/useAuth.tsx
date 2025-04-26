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
          setUser(null)
          // Don't redirect here, let the component handle it
          toast.success('Logged out successfully')
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
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      // Clear user state first
      setUser(null)
      
      // Then redirect
      router.push('/login')
    } catch (error) {
      console.error('Error logging out:', error)
      toast.error('Failed to log out')
    } finally {
      setLoading(false)
    }
  }

  return { user, loading, logout }
}
