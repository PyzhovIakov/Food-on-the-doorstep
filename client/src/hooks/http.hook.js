import  {useState, useCallback} from 'react'

const useHttp = ()=>{
    const [loading,setLoading] = useState(false)
    const [error,setError]=useState(null)

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
                throw new Error(data.errors || 'Что-то пошло не так.')
            }
            
            setLoading(false)
            return data
        }catch(e){
            setLoading(false)
            setError(e.message)
            throw e
        }
    },[])

    const ClearError = ()=>setError(null)
    

    return {loading,request,error,ClearError}
}
export default useHttp