import React from 'react';
import {OPEN, REOPENED, CLOSED, BACKLOG, INPROGRESS} from '../../Constants';
import OpenButton from './OpenButton';
import CloseButton from './CloseButton';
import ReopenButton from './ReopenButton';
import StartButton from './StartButton';
import StopButton from './StopButton';

const StateButton = ({status, projectId, setProject}) => {
  return (
    <div>
      {(status === OPEN || status === REOPENED) && 
      <>
      <CloseButton 
        projectId={projectId} 
        setProject={setProject}/>
      <StartButton 
        setProject={setProject} 
        projectId={projectId}/>
      </> 
      }

      {(status === CLOSED) && 
      <ReopenButton 
        setProject={setProject} 
        projectId={projectId}/> 
      }

      {(status === INPROGRESS) && 
        <>
        <CloseButton 
        projectId={projectId} 
        setProject={setProject}/> 
      
        <StopButton 
          setProject={setProject} 
          projectId={projectId}/> 
        </>
      }
      

      {(status === BACKLOG) && 
        <>
        <OpenButton 
          setProject={setProject} 
          projectId={projectId}/>

        <StartButton 
          setProject={setProject} 
          projectId={projectId}/>
        </>
      }                                
    </div>
  )
}

export default StateButton;
