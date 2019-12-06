import React from 'react';
import {Popup,  Table} from 'semantic-ui-react';
import { UNDEFINED} from '../Constants';
import { HIGH, CRITICAL} from '../Constants';
import { BUG, FEATURE} from '../Constants';

export const TypeIcon = ({type}) =>{
  
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

export const PriorityCellColor = ({priority}) =>{

  if(!priority) return <Table.Cell>{UNDEFINED}</Table.Cell>
  if(priority === HIGH || priority === CRITICAL ){
    return <Table.Cell style={{fontWeight:'600'}} negative>{`${priority}`}</Table.Cell>
  }
  else{
    return <Table.Cell>{`${priority}`}</Table.Cell>
  }
}