import {useState, useCallback, useEffect} from 'react'

const StorageName = 'UserData'

const useAuth = ()=>{
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [role, setRole] = useState(null)

    const login = useCallback((jwtToken, id, userRole)=>{
        setToken(jwtToken)
        setUserId(id)
        setRole(userRole)
        localStorage.setItem(StorageName,JSON.stringify({userId:id, token:jwtToken,role:userRole}))
    }, [])

    const logout = useCallback(()=>{
        setToken(null)
        setUserId(null)
        setRole(null)
        localStorage.removeItem(StorageName)
    }, [])

    useEffect(()=>{
        const data  = JSON.parse(localStorage.getItem(StorageName))

        if(data && data.token){
            login(data.token, data.userId, data.role)
        }

    },[login])

    return {login,logout,token,userId,role}
}
export default useAuth