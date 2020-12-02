import React from 'react';
import AnnType from './bb_type';
import {faCircle}from '@fortawesome/free-regular-svg-icons'
import {faVectorSquare,faDrawPolygon}from '@fortawesome/free-solid-svg-icons';

class AnnotationMenu extends React.Component{
    constructor(props)
    {
          super(props);
          this.state={
              ann_types:[
            //      {type:"C",label:faCircle}
               {type:"R",label:faVectorSquare},
                //   {type:"P",label:faDrawPolygon}
              ]
          }
    }


     render(){
         return (
             <div style={{
                position: "fixed",
                top: "13.5%",
                right: "0px"
             }}>
                 <div>
                     {this.state.ann_types && this.state.ann_types.map((ann_type,key)=>(
                          <AnnType key={key+ann_type.type}  icon={ann_type}/>
                        
                     ))}
              </div>
             </div>
         )
     }
}

export default AnnotationMenu