import  {useState, useCallback} from 'react'

const useHttp = ()=>{
    const [loading,setLoading] = useState(false)
    const [error,setError]=useState(null)
    const [message,setMessage]=useState(null)

    const request = useCallback(async (url,method='GET',body=null,headers={})=>{
        try{
            if(body){
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            setLoading(true)
            const response = await fetch(url,{method, body, headers})
            const data = await response.json()

            if(!response.ok){
                setError(data.error || 'Что-то пошло не так.')
            }
            if(data.error){setError(data.error)}
            if(data.message){setMessage(data.message)}

            setLoading(false)
            return data
        }catch(e){
            setLoading(false)
            setError(e.message)
            throw e
        }
    },[])

    const ClearError = ()=>setError(null)
    const ClearMessage = ()=>setMessage(null)

    return {loading,request,error,message,ClearError,ClearMessage}
}
export default useHttp