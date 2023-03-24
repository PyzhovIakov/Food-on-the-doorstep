import { useState, useCallback } from 'react'

const useUploadImage = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = 'POST', body = null, headers = {}) => {
        try {
            setLoading(true)
            const response = await fetch(url, { method, body, headers })

            const data = await response.json()

            if (!response.ok) {
                setError(data.error || 'Что-то пошло не так.')
            }
            if (data.error) { setError(data.error) }

            setLoading(false)
            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const ClearError = () => setError(null)

    return { loading, request, error, ClearError }
}
export default useUploadImage