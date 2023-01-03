import { useEffect, useState } from "react"
import { db } from "../firebase"
import { collection, getDocs, query, where } from "firebase/firestore"

const useFirestore = () => {

    const [data, setData] = useState([])
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        console.log('useEffect de getData')
        getData()
    }, [])

    const getData = async() => {
        try {
            setLoading(true)
            const dataRef = collection(db, 'urls')
            const q = query(
                dataRef,
                where("uid", "==", "6OLBBB65vmhhdi1VfdSKROhhWjR2")
            )
            const querySnapshot = await getDocs(q) 
            const dataDb = querySnapshot.docs.map(doc => doc.data())
            setData(dataDb)
        } catch (error) {
            console.log(error.message)
            setError(error.message)
            
        }finally{
            setLoading(false)
        }
    }

  return {
    data, error, loading
  }
}

export default useFirestore