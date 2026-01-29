'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAuthUser, Role } from '@/lib/auth'

export function useAuth(allowedRoles?: Role[]) {
    const router = useRouter()
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const authUser = getAuthUser()

        if (!authUser) {
            router.replace('/login')
            return
        }

        if (allowedRoles && !allowedRoles.includes(authUser.role)) {
            router.replace('/unauthorized')
            return
        }

        setUser(authUser)
        setLoading(false)
    }, [])

    return { user, loading }
}
