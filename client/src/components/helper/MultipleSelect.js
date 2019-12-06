import {
  BACKLOG,
  OPEN,
  INPROGRESS,
  CLOSED,
  REOPENED,
  LOW,
  MEDIUM,
  HIGH,
  CRITICAL,
  BUG,
  FEATURE
} from '../Constants'

export const statusOptions = [
  { key: 's1', value: BACKLOG, text: BACKLOG },
  { key: 's2', value: OPEN, text: OPEN },
  { key: 's3', value: INPROGRESS, text: INPROGRESS },
  { key: 's4', value: CLOSED, text: CLOSED },
  { key: 's5', value: REOPENED, text: REOPENED }
]

export const priorityOptions = [
  { key: 'p1', value: LOW, text: LOW },
  { key: 'p2', value: MEDIUM, text: MEDIUM },
  { key: 'p3', value: HIGH, text: HIGH },
  { key: 'p4', value: CRITICAL, text: CRITICAL }
]

export const typeOptions = [
  { key: 't1', value: BUG, text: BUG },
  { key: 't2', value: FEATURE, text: FEATURE }
]
