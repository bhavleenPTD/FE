import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { Button } from 'reactstrap';
import styled from 'styled-components';
import {useStore} from '../../zustandstore';
const Btnoverlay=styled.div`
    margin:2px;
    opacity:0.6;
    &:hover{
        opacity:1;
    }


`

export default (props)=>{
    const {icon}=props;
    
    const {cur_ann_type,setAnnType,symbol,setSymbol,setAnnotationId,isDrawing}=useStore();
    
     
  const changeAnnType=()=>{
    
    if(isDrawing==true){
      return
    }
    setAnnotationId(null)
      if(cur_ann_type==icon.type){
        setSymbol(null)
          setAnnType(null);
      }else{

        setAnnType(icon.type)
      }

   }
    return (
      <React.Fragment>
         {symbol==null && icon.type=='S'?null:
           <Btnoverlay style={cur_ann_type==icon.type?{opacity:"1"}:null}>
        <div  style={{backgroundColor:"white",padding:"6px",fontSize:"12px",borderRadius:"3px",cursor:"pointer"}} 
        onClick={changeAnnType}><FontAwesomeIcon icon={icon.label}/></div>
        </Btnoverlay>
}
      </React.Fragment>
    )

}