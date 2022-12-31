
const ErrorsForm = ({error}) => {
  return (
    <>
    {error && <p>{error.message}</p>}
    </>
  )
}

export default ErrorsForm