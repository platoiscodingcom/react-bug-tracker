import React from 'react';
import {Popup} from 'semantic-ui-react';
import { OPEN, CLOSED, REOPENED, INPROGRESS, UNDEFINED} from '../helper/Select';
import { BUG, FEATURE} from '../helper/Select';

export const StatusColor = (props) =>{
  const status = props.status;
  if(!status) return UNDEFINED;
  if(status === INPROGRESS) {
    return <span className="ui orange horizontal label">{`${status}`}</span>;
  }
  if(status === REOPENED || status === OPEN) {
    return <span className="ui green horizontal label">{`${status}`}</span>;
  }
  if(status === CLOSED) {
    return <span className="ui horizontal label">{`${status}`}</span>;
  }else{
    //backlog
    return <span className="ui black horizontal label">{`${status}`}</span>;
  }
}

export const TypeIcon = (props) =>{
  const type = props.type;
  
  if(!type)  return <Popup content={UNDEFINED} trigger={<i className="fas fa-question"></i>} />
  if(type === BUG) {
    return <Popup content={BUG} trigger={<i className="fas fa-bug"></i>} />
  }
  if(type === FEATURE){
    return <Popup content={FEATURE} trigger={<i className="fas fa-star"></i>} />
  }
  else{
    return <span>{`${type}`}</span>;
  }
}