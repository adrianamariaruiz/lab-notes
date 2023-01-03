import Title from "../components/Title"
import useFirestore from "../hooks/useFirestore"

const Home = () => {

  const {data, error, loading} = useFirestore()

  if(loading) return <p>Loading data...</p>
  if(error) return <p>{error}</p>

  return (
    <>
      <Title text='Home'/>
        {data.map((item) => (
          <div key={item.nanoid}>
            <p>nanoid: {item.nanoid}</p>
            <p>origin: {item.origin}</p>
            <p>uid: {item.uid}</p>
          </div>
        ))}
    </>
  )
}

export default Home