
const ErrorsForm = ({error}) => {
  return (
    <>
      {error && <p className="mb-4 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> {error.message} </p>}
    
    </>
  )
}

export default ErrorsForm