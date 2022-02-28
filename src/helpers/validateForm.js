export const validateInput = (input, setError) => {

  const hasError = () => {
    setError(state => ({...state, [input.name]: true}))
    return true
  }

  const hasNotError = () => {
    setError(state => ({...state, [input.name]: false}))
    return false
  }

  switch (input.name) {
    case "name":
      if (input.value.length < 6) {
        return hasError()
      } else {
        return hasNotError()
      }
    case "email":
      if (!input.value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
        return hasError()
      } else {
        return hasNotError()
      }
    case "password":
      if (input.value.length < 8) {
        return hasError()
      } else {
        return hasNotError()
      }
  
    default:
      return false;
  }
}

export const validateForm = (inputs, setError) => {
  let isValidated = true
  inputs.forEach((input) => {
    const isNotValid = validateInput(input, setError)
    if (isNotValid) {
      isValidated = false
    }
  })

  return isValidated
}