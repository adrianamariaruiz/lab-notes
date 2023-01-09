import LoadingSvg from "./LoadingSvg"

const Button = ({text, type, color = 'purple', onClick, loading}) => {

  if(loading) return <LoadingSvg/>

  return (
    <button 
      type={type}
      className={`shadow-lg focus:outline-none text-white bg-${color}-700 hover:bg-${color}-800 focus:ring-4 focus:ring-${color}-300 font-medium rounded-lg text-sm px-5 py-2.5 my-2 dark:bg-${color}-600 dark:hover:bg-${color}-700 dark:focus:ring-${color}-900`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button