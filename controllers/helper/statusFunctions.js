// STATUS
const OPEN = 'open'
const CLOSED = 'closed'
const REOPENED = 'reopened'
const INPROGRESS = 'in progress'

// STATUS EVENTS
//const OPEN
const CLOSE = 'close'
const REOPEN = 'reopen'
const START = 'start'
const STOP = 'stop'

exports.setStatus = (event) =>{
  if(event === CLOSE) {return CLOSED;}
  else if(event === REOPEN) {return REOPENED;}
  else if(event === START){ return INPROGRESS;}
  else if(event === STOP || event === OPEN) {return OPEN;}
  else {
    return null;
  }
}