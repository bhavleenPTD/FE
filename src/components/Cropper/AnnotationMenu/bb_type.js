import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { Button } from 'reactstrap';
import styled from 'styled-components';
import useStore from '../../../zustandcrop';
const Btnoverlay=styled.div`
    margin:2px;
    opacity:0.4;
    &:hover{
        opacity:1;
    }


`

export default (props)=>{
    const {icon}=props;
    
    const {cur_ann_type,setAnnType}=useStore();
    
     
  const changeAnnType=()=>{
      if(cur_ann_type==icon.type){
       
          setAnnType(null);
      }else{

        setAnnType(icon.type)
      }

   }
    return (
      <React.Fragment>
           <Btnoverlay style={cur_ann_type==icon.type?{opacity:"1"}:null}>
        <Button onClick={changeAnnType} color="light"><FontAwesomeIcon icon={icon.label}/></Button>
        </Btnoverlay>
      </React.Fragment>
    )

}