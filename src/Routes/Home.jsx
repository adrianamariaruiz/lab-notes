import { useEffect, useState } from "react"
import Title from "../components/Title"
import useFirestore from "../hooks/useFirestore"
import Button from "../components/Button"
import LoadingSvg from "../components/LoadingSvg"
import { nanoid } from "nanoid"


const Home = () => {

  const {data, error, loading, getData, addData, deleteData, updateData} = useFirestore()
  const [textState, setTextState] = useState('')

  useEffect(()=>{
    console.log('useEffect de getData')
    getData()
}, [])

  if(loading.getDataLoading) return <p>Loading data...</p>
  if(error) return <p>{error}</p>

  const handleSubmit = async(e) => {
    console.log(textState)
    e.preventDefault()
    await addData(textState)
    setTextState('')
  }

  const handleClickDelete = async(nanoid) => {
    console.log('click delete')
    await deleteData(nanoid)
  }
  
  const handleClickEdit = (item) => {
    console.log('click edit')
    setTextState(item.origin)

  }

  return (
    <>
      <Title text='Home'/>
      <form onSubmit={handleSubmit}>
        <input 
          placeholder="ingrese la url"
          type='text'
          value={textState}
          onChange={e => setTextState(e.target.value)}
        />
        {
          loading.addDataLoading ? <LoadingSvg/> : <Button text='Agregar' type='submit' />
        }
        
      </form>

        {data.map((item) => (
          <div key={item.nanoid} className='container border-solid border-2 border-black rounded-xl'>
            <p>nanoid: {item.nanoid}</p>
            <p>origin: {item.origin}</p>
            <p>uid: {item.uid}</p>
            {
              loading[item.nanoid] 
                ? (<LoadingSvg/> )
                : (<Button 
                    text='Eliminar' 
                    type='button' 
                    color='red' 
                    onClick={() => handleClickDelete(item.nanoid)}
                  />)
            }
            <Button 
              text='Editar' 
              type='button' 
              color='blue' 
              onClick={() => handleClickEdit(item)}
            />
          
            
          </div>
        ))}
    </>
  )
}

export default Home