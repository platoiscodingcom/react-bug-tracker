import React, {Fragment} from 'react'
import { REOPENED, CLOSED, BACKLOG, INPROGRESS } from '../Constants'
import ButtonEvent from './ButtonEvent'
import { CLOSE, OPEN, START, STOP, REOPEN} from '../Constants'

const StateButton = ({ status, id, setDocument, documentType }) => {
  return (
    <div>
      {(status === OPEN || status === REOPENED) && (
        <Fragment>
          <ButtonEvent
            id={id}
            setDocument={setDocument}
            documentType={documentType}
            event = {CLOSE}
          />
          <ButtonEvent
            setDocument={setDocument}
            id={id}
            documentType={documentType}
            event = {START}
          />
        </Fragment>
      )}

      {status === CLOSED && (
        <ButtonEvent
          setDocument={setDocument}
          id={id}
          documentType={documentType}
          event = {REOPEN}
        />
      )}

      {status === INPROGRESS && (
        <Fragment>
          <ButtonEvent
            id={id}
            setDocument={setDocument}
            documentType={documentType}
            event = {CLOSE}
          />

          <ButtonEvent
            setDocument={setDocument}
            id={id}
            documentType={documentType}
            event = {STOP}
          />
        </Fragment>
      )}

      {status === BACKLOG && (
        <Fragment>
          <ButtonEvent
            setDocument={setDocument}
            id={id}
            documentType={documentType}
            event = {OPEN}
          />

          <ButtonEvent
            setDocument={setDocument}
            id={id}
            documentType={documentType}
            event = {START}
          />
        </Fragment>
      )}
    </div>
  )
}

export default StateButton
