import { useState, useCallback, useEffect } from 'react'
import useHttp from './http.hook'
const StorageName = 'UserData'

const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [role, setRole] = useState(null)
    const { request } = useHttp()

    const roleDefinition = useCallback(async (userId) => {
        try {
            const user = await request('/auth/' + userId, 'GET')
            if (user.role) { setRole(user.role) }
            else { setRole(null) }
        } catch (e) { console.log('useAuth roleDefinition', e) }
    }, [request])

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)
        roleDefinition(id)
        localStorage.setItem(StorageName, JSON.stringify({ token: jwtToken, userId: id }))
    }, [roleDefinition])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setRole(null)
        localStorage.removeItem(StorageName)
    }, [])

    const CheckingAuthorizedUser = useCallback(() => {
        const data = JSON.parse(localStorage.getItem(StorageName))
        if (data && data.token) {
            login(data.token, data.userId)
            roleDefinition(data.userId)
        }
    }, [login, roleDefinition])

    useEffect(() => {
        CheckingAuthorizedUser()
    }, [])

    return { login, logout, CheckingAuthorizedUser, token, userId, role }
}
export default useAuth