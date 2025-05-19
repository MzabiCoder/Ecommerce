import axios from "axios"
import { useState, useEffect } from "react"


export const useFetch = (url: any) => {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios(url)
                const jsonData = await res.data.products
                //console.log(jsonData)
                setData(jsonData)
                setLoading(true)
            } catch (error) {
                // setError(error)
            }
        }
        fetchData()
    }, [url])
    return { data, loading, error }
}