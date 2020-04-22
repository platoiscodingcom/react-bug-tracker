export const UNDEFINED = 'undefined'

// STATUS
export const BACKLOG = 'backlog'
export const OPEN = 'open'
export const CLOSED = 'closed'
export const REOPENED = 'reopened'
export const INPROGRESS = 'in progress'

// STATUS ROUTES
export const CLOSE = 'close'
export const REOPEN = 'reopen'
export const STARTPROGRESS = 'start progress'
export const START = 'start'
export const STOPPROGRESS = 'stop progress'
export const STOP = 'stop'

// PRIORITY
export const LOW = 'low'
export const MEDIUM = 'medium'
export const HIGH = 'high'
export const CRITICAL = 'critical'

// TASK TYPES
export const BUG = 'bug'
export const FEATURE = 'feature'

// DOCUMENT TYPES
export const TASK = 'task'
export const PROJECT = 'project'
export const CATEGORY = 'category'

// ROUTER PATHS
export const TASKS_PATH = '/api/tasks'
export const PROJECTS_PATH = '/api/projects'
export const CATEGORIES_PATH = '/api/categories'
export const FILES_PATH = '/api/files'
export const USERS_PATH = '/api/users'
export const GET_CONTACTS_INFO_PATH = '/api/users/getContactsInfo/'

export const TASKS_HOME = '/tasks'
export const PROJECTS_HOME = '/projects'
export const CATEGORIES_HOME = '/categories'

export const TASKS_DETAILS = '/tasks/details'
export const PROJECTS_DETAILS = '/projects/details'
export const CATEGORIES_DETAILS = '/categories/details'

export const TASKS_CREATE = '/tasks/create'
export const PROJECTS_CREATE = '/projects/create'
export const CATEGORIES_CREATE = '/categories/create'

export const PROJECTS_KANBAN = '/projects/kanban'

export const PRIVATE_PROFILE = '/user/profile'

//FILE UPLOAD
export const FILE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/gif',
  'application/pdf',
  'text/*',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
]

export const STATUS_OPTIONS = [
  { key: BACKLOG, value: BACKLOG, text: BACKLOG },
  { key: OPEN, value: OPEN, text: OPEN },
  { key: INPROGRESS, value: INPROGRESS, text: INPROGRESS },
  { key: CLOSED, value: CLOSED, text: CLOSED },
  { key: REOPENED, value: REOPENED, text: REOPENED }
]

export const PRIORITY_OPTIONS = [
  { key: LOW, value: LOW, text: LOW },
  { key: MEDIUM, value: MEDIUM, text: MEDIUM },
  { key: HIGH, value: HIGH, text: HIGH },
  { key: CRITICAL, value: CRITICAL, text: CRITICAL }
]

export const TYPE_OPTIONS = [
  { key: BUG, value: BUG, text: BUG },
  { key: FEATURE, value: FEATURE, text: FEATURE }
]

