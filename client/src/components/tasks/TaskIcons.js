import React from 'react';
import {Popup} from 'semantic-ui-react';

export const StatusColor = (props) =>{
  const status = props.status;
  if(!status) return "undefined";
  if(status === "in progress") {
    return <span className="ui orange horizontal label">{`${status}`}</span>;
  }
  if(status === "open") {
    return <span className="ui green horizontal label">{`${status}`}</span>;
  }
  if(status === "closed") {
    return <span className="ui horizontal label">{`${status}`}</span>;
  }else{
    return <span className="ui black horizontal label">{`${status}`}</span>;
  }
}

export const TypeIcon = (props) =>{
  const type = props.type;
  
  if(!type)  return <Popup content='Undefined' trigger={<i className="fas fa-question"></i>} />
  if(type === "bug") {
    return <Popup content='Bug' trigger={<i className="fas fa-bug"></i>} />
  }
  if(type === "feature"){
    return <Popup content='Feature' trigger={<i className="fas fa-star"></i>} />
  }
  else{
    return <span>{`${type}`}</span>;
  }
}