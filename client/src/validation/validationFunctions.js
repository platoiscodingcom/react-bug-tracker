import { STRING_REGEX } from './RegExConstants'

export const validateString = value => {
  if (!value) return 'Field is required'
  else if (!STRING_REGEX.test(value)) return 'Must have at least 4 characters'
  else return null
}

export const validateSelect = value => {
  if (!value || value.length === 0) return 'Field is required'
  else return null
}

export const validateText = value => {
  console.log(value.length)
  if(!value ) return 'Must have at least 4 characters'
  else if (value.length < 4) return 'Field is required'
  else return null
  
}

export const errorsEmpty = (data) =>{
  for(var key in data) {
    if(data[key] !== null) {
       return false;
    }
  }
  return true
}
