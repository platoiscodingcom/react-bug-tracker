import {
  validateString,
  validateSelect,
  validateText
} from './validationFunctions'

export const validateTask = task => {
  let errors = {}
  errors.title = validateString(task.title)
  errors.description = validateText(task.description)
  errors.status = validateSelect(task.status)
  errors.project = validateSelect(task.project)
  errors.type = validateSelect(task.type)
  errors.priority = validateSelect(task.priority)

  return errors
}
