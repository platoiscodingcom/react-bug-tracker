import { NAME_REGEX } from './RegExConstants'

export const validateNewCategory = category => {
  let errors = {}
  if (!category.name) {
    errors.name = 'Name is required'
  } else if (!NAME_REGEX.test(category.name)) {
    errors.name = 'Name must have at least 4 characters'
  }
  return errors
}
