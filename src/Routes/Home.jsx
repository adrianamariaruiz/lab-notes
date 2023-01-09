import { useEffect, useState } from "react"
import Title from "../components/Title"
import useFirestore from "../hooks/useFirestore"
import Button from "../components/Button"
import LoadingSvg from "../components/LoadingSvg"
import { ValidateForm } from "../utils/ValidateForm"
import { useForm } from "react-hook-form"
import InputForm from "../components/InputForm"
import ErrorsForm from "../components/ErrorsForm"

const Home = () => {

  const {data, error, loading, getData, addData, deleteData, updateData} = useFirestore()
  const [newOrigin, setNewOrigin] = useState()
  const [copy, setCopy] = useState({})

  const {required, patternUrl} = ValidateForm()
  const {register, handleSubmit, formState: {errors}, getValues, setValue, setError, resetField} = useForm()

  useEffect(()=>{
    console.log('useEffect de getData')
    getData()
}, [])

  if(loading.getDataLoading) return <p>Loading data...</p>
  if(error) return <p>{error}</p>

  const onSubmitForm = async({url}) => {
    console.log(url)

    try {
      if(newOrigin){
        await updateData(newOrigin, url)
        setNewOrigin('')
      } else {
        await addData(url)
      }
    } catch (error) {
      console.log(error.code)
      const {code, message} = ErroresFirebase(error.code)
      setError(code, {message})
    }

    resetField('url')
  }

  const handleClickDelete = async(nanoid) => {
    console.log('click delete')
    await deleteData(nanoid)
  }
  
  const handleClickEdit = (item) => {
    console.log('click edit')
    setValue('url', item.origin)
    setNewOrigin(item.nanoid)
  }

  const handleClickCopy = async(item) => {
    await navigator.clipboard.writeText(item.origin)
    console.log('copiado')
    setCopy({[item.nanoid]: true})
  }

  return (
    <>
      <Title text='Home'/>
      <form onSubmit={handleSubmit(onSubmitForm)}>

        <InputForm
            label="Ingreser la URL"
            type='text' 
            placeholder="ingrese la url"
            {...register('url', {
                required,
                pattern: patternUrl
            })}
            error={errors.url}
        >
        <ErrorsForm error={errors.url}/>
        </InputForm>

        {
          newOrigin ? (
            loading.updateDataLoading ? <LoadingSvg/> : <Button text='Editar Url' type='submit' color="blue"/>
          ) : (
            loading.addDataLoading ? <LoadingSvg/> : <Button text='Agregar' type='submit' />
          )
        }
        
        
      </form>

        {data.map((item) => (
          <div key={item.nanoid} className='mb-3 p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700'>
            <p className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">nanoid: {item.nanoid}</p>
            <p className= 'mb-3 font-normal text-gray-700 dark:text-gray-400'>origin: {item.origin}</p>
            {/* <p>uid: {item.uid}</p> */}
            <div className="flex space-x-2">
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
              <Button 
                text={ copy[item.nanoid] ? 'Copiado' : 'Copiar' } 
                type='button' 
                color='green' 
                onClick={() => handleClickCopy(item)}
              />
            </div>
          
          </div>
        ))}
    </>
  )
}

export default Home