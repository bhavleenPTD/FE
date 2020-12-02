
import React from 'react';
import { SketchPicker } from 'react-color';
import Colors from './colors';

export default(props)=>{

 const [colors,setColors]=React.useState([
     "#FFFFFF","#000000","#FF0000","#0000FF"
 ]);
    return (
       <React.Fragment>
           <div className="d-flex">
         {colors.map((color,key)=>(
 <Colors key={key} color={color} />
         ))}
           

         </div>

              
       </React.Fragment>
    )
}