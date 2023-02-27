import {useState, useCallback, useEffect} from 'react'
import useHttp from './http.hook'
const StorageName = 'UserData'

const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [role, setRole] = useState(null)
    const {request,ClearError} = useHttp()

    const roleDefinition = useCallback(async(userId)=>{
        const user = await request('/auth/'+userId, 'GET')
        ClearError()
        if(user.role){setRole(user.role)}
        else{setRole(null)}
    },[request,ClearError])

    const login = useCallback((jwtToken, id)=>{
        setToken(jwtToken)
        setUserId(id)
        roleDefinition(id)
        localStorage.setItem(StorageName,JSON.stringify({token:jwtToken, userId:id}))
    }, [roleDefinition])

    const logout = useCallback(()=>{
        setToken(null)
        setUserId(null)
        setRole(null)
        localStorage.removeItem(StorageName)
    }, [])

   useEffect(()=>{
       
        const data  = JSON.parse(localStorage.getItem(StorageName))
        if(data && data.token){
            roleDefinition(data.userId)
            login(data.token, data.userId)
        }
        
    },[])

    return {login,logout,token,userId,role}
}
export default useAuth