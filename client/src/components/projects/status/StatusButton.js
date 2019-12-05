import React from 'react';
import {OPEN, REOPENED, CLOSED, BACKLOG} from '../../helper/Select';
import { Button} from 'semantic-ui-react';
import OpenButton from './OpenButton';
import CloseButton from './CloseButton';
//import ReopenButton from './ReopenButton';
//import StartButton from './StartButton';

/*
export const OpenButton = ({openProject, projectId}) =>{
  return (
  <Button  
    color='grey'
    onClick={() => openProject(projectId)}>
    <i className="fas fa-folder-open"></i>{OPEN}
  </Button>
  )
}*/

export const StartButton = ({startProject, projectId}) =>{
  return (
  <Button  
    color='grey'
    onClick={() => startProject(projectId)}>
    <i className="far fa-play-circle"></i>Start Progress
  </Button>
  )
}

/*
export const CloseButton = ({closeProject, projectId}) =>{
  return (
  <Button  
    color='grey'
    onClick={() => closeProject(projectId)}>
    <i className="fas fa-check"></i>Close
  </Button>
  )
}*/

export const ReopenButton = ({reopenProject, projectId}) =>{
  return (
  <Button  
    color='grey'
    onClick={() => reopenProject(projectId)}>
    <i className="fas fa-folder-open"></i>Reopen
  </Button>
  )
}

const StateButton = ({status, reopenProject, projectId, openProject, startProject, setProject}) => {
  return (
    <div>
      {(status === OPEN || status === REOPENED) && 
      <CloseButton 
        projectId={projectId} 
        setProject={setProject}/> 
      }

      {(status === CLOSED) && 
      <ReopenButton 
        reopenProject={reopenProject} 
        projectId={projectId}/> 
      }

      {(status === BACKLOG) && 
        <>
        <OpenButton 
          setProject={setProject} 
          projectId={projectId}/>

        <StartButton 
          openProject={startProject} 
          projectId={projectId}/>
        </>
      }                                
    </div>
  )
}

export default StateButton;
