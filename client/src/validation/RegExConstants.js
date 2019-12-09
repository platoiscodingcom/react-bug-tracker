export const NAME_REGEX = new RegExp(/^([a-z0-9 ]*[a-z]){4}[a-z0-9]*$/i)

export const EMAIL_REGEX = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
)
export const PASSWORD_REGEX = RegExp(
  /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/
)
export const IS_NUMBER_REGEX = RegExp(/^\d+$/)

// only English and German letters, and spaces
export const HAS_ONLY_LETTERS_REGEX = RegExp(/^[a-zA-ZäÄöÖüÜß\s]+$/)
