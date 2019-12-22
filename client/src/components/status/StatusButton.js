import React, {Fragment} from 'react'
import { REOPENED, CLOSED, BACKLOG, INPROGRESS } from '../Constants'
import ButtonEvent from './ButtonEvent'
import { CLOSE, OPEN, START, STOP, REOPEN} from '../Constants'

const StateButton = ({ status, documentType }) => {
  return (
    <div>
      {(status === OPEN || status === REOPENED) && (
        <Fragment>
          <ButtonEvent
            documentType={documentType}
            event = {CLOSE}
          />
          <ButtonEvent
            documentType={documentType}
            event = {START}
          />
        </Fragment>
      )}

      {status === CLOSED && (
        <ButtonEvent
          documentType={documentType}
          event = {REOPEN}
        />
      )}

      {status === INPROGRESS && (
        <Fragment>
          <ButtonEvent
            documentType={documentType}
            event = {CLOSE}
          />

          <ButtonEvent
            documentType={documentType}
            event = {STOP}
          />
        </Fragment>
      )}

      {status === BACKLOG && (
        <Fragment>
          <ButtonEvent
            documentType={documentType}
            event = {OPEN}
          />

          <ButtonEvent
            documentType={documentType}
            event = {START}
          />
        </Fragment>
      )}
    </div>
  )
}

export default StateButton
