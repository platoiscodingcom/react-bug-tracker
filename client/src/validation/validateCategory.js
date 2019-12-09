import { validateString } from './validationFunctions'

export const validateCategory = category => {
  let errors = {}
  errors.name = validateString(category.name)
  return errors
}
