import React from 'react';
import { useStore } from '../../zustandstore';

export default(props)=>{

 const color= useStore(s=>s.color);
 const setColorAnn=useStore(s=>s.setColorAnn);
     
    return (
        <div onClick={()=>{setColorAnn(props.color)}}>
            <div style={ color==props.color?{backgroundColor:props.color,borderRadius:"50%",
            boxShadow:"0px 0px 5px 5px black",width:"20px",height:"20px",marginRight:"10px"}:
            {backgroundColor:props.color,borderRadius:"50%",cursor:"pointer",width:"20px",height:"20px",marginRight:"10px"
           }}>
 
            </div>

        </div>
    )
}