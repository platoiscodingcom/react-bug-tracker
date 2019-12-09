import {
  validateString,
  validateSelect,
  validateText
} from './validationFunctions'

export const validateProject = project => {
  let errors = {}
  errors.name = validateString(project.name)
  errors.description = validateText(project.description)
  errors.status = validateSelect(project.status)
  errors.categories = validateSelect(project.categories)

  return errors
}
