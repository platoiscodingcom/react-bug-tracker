import React from 'react'
import { OPEN, REOPENED, CLOSED, BACKLOG, INPROGRESS } from '../../Constants'
import OpenButton from './OpenButton'
import CloseButton from './CloseButton'
import ReopenButton from './ReopenButton'
import StartButton from './StartButton'
import StopButton from './StopButton'

const StateButton = ({ status, id, setDocument, documentType }) => {
  return (
    <div>
      {(status === OPEN || status === REOPENED) && (
        <>
          <CloseButton
            id={id}
            setDocument={setDocument}
            documentType={documentType}
          />
          <StartButton
            setDocument={setDocument}
            id={id}
            documentType={documentType}
          />
        </>
      )}

      {status === CLOSED && (
        <ReopenButton
          setDocument={setDocument}
          id={id}
          documentType={documentType}
        />
      )}

      {status === INPROGRESS && (
        <>
          <CloseButton
            id={id}
            setDocument={setDocument}
            documentType={documentType}
          />

          <StopButton
            setDocument={setDocument}
            id={id}
            documentType={documentType}
          />
        </>
      )}

      {status === BACKLOG && (
        <>
          <OpenButton
            setDocument={setDocument}
            id={id}
            documentType={documentType}
          />

          <StartButton
            setDocument={setDocument}
            id={id}
            documentType={documentType}
          />
        </>
      )}
    </div>
  )
}

export default StateButton
