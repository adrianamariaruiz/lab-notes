import { useState } from "react"
import { db, auth } from "../firebase"
import { collection, getDocs, query, where, setDoc, doc, deleteDoc, updateDoc } from "firebase/firestore"
import { nanoid } from "nanoid"

const useFirestore = () => {

    const [data, setData] = useState([])
    const [error, setError] = useState()
    const [loading, setLoading] = useState({})

    const getData = async() => {
        console.log(auth.currentUser)
        try {
            setLoading(prev => ({...prev, getDataLoading: true}))
            const dataRef = collection(db, 'urls')
            const q = query(
                dataRef,
                where("uid", "==", auth.currentUser.uid)
            )
            const querySnapshot = await getDocs(q) 
            const dataDb = querySnapshot.docs.map(doc => doc.data())
            setData(dataDb)
        } catch (error) {
            console.log(error.message)
            setError(error.message)
            
        }finally{
            setLoading(prev => ({...prev, getDataLoading: false}))
        }
    }

    const addData = async(url) => {
        try {
            setLoading(prev => ({...prev, addDataLoading: true}))
            
            const newDoc = {
                nanoid: nanoid(6),
                origin: url,
                uid: auth.currentUser.uid
            }
            const docRef = doc(db, 'urls', newDoc.nanoid)
            await setDoc(docRef, newDoc)
            setData([...data, newDoc])
        } catch (error) {
            console.log(error)
            setError(error.message)
        }finally{
            setLoading(prev => ({...prev, addDataLoading: false}))
        }
    }

    const deleteData = async(nanoid) => {
        try {
            setLoading(prev => ({...prev, [nanoid]: true}))
            const docRef = doc(db, 'urls', nanoid)
            await deleteDoc(docRef)
            setData(data.filter(item => item.nanoid !== nanoid))
        } catch (error) {
            console.log(error)
            setError(error.message)
        }finally{
            setLoading(prev => ({...prev, [nanoid]: false}))
        }
    }
    
    const updateData = async(nanoid, newUrl) => {
        try {
            setLoading(prev => ({...prev, updateDataLoading: true}))
            
            const docRef = doc(db, 'urls', nanoid)
            await updateDoc(docRef, {origin: newUrl})
            setData(data.map(item => item.nanoid === nanoid ? ({...item, origin: newUrl}) : item ))

        } catch (error) {
            console.log(error)
            setError(error.message)
        }finally{
            setLoading(prev => ({...prev, updateDataLoading: false}))
        }
    }

  return {
    data, error, loading, getData, addData, deleteData, updateData
  }
}

export default useFirestore