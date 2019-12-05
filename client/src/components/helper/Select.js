export const UNDEFINED = 'undefined';

export const BACKLOG = 'backlog';
export const OPEN = 'open';
export const CLOSED = 'closed';
export const REOPENED = 'reopened';
export const INPROGRESS = 'in progress';

export const CLOSE = 'close';
export const REOPEN = 'reopen';


export const statusOptions = [
  {key: 's1', value: BACKLOG, text: BACKLOG},
  {key: 's2', value: OPEN, text: OPEN},
  {key: 's3', value: INPROGRESS, text: INPROGRESS},
  {key: 's4', value: CLOSED, text: CLOSED}
];


export const LOW = 'low';
export const MEDIUM = 'medium';
export const HIGH = 'high';
export const CRITICAL = 'critical';

export const priorityOptions = [
  {key: 'p1', value: LOW, text: LOW},
  {key: 'p2', value: MEDIUM, text: MEDIUM},
  {key: 'p3', value: HIGH, text: HIGH},
  {key: 'p4', value: CRITICAL, text: CRITICAL}
];


export const BUG = 'bug';
export const FEATURE = 'feature';

export const typeOptions = [
  {key: 't1', value: BUG, text: BUG},
  {key: 't2', value: FEATURE, text: FEATURE}
];