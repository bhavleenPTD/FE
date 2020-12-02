import React from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Transformer, Circle } from 'react-konva';
import useStore from '../../../zustandcrop';
// import { BB_text } from '../bb_text';
// import Portal from '../portal';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCross} from '@fortawesome/free-solid-svg-icons';
import './shapeCust.css';
import { Text } from 'react-konva';
import { useState } from 'react';

export const CustRectangle = React.memo(({ shapeProps, isSelected, onSelect, onChange,data }) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();
  const {cur_ann_type}=useStore();
  const {annotations,setAnnotations}=useStore();

 const deletepop= ()=>{
   let newmpap=  annotations.filter((ann,key)=>{
         if(ann.id!=data.id){
             return ann
         }
     })

     setAnnotations(newmpap);
      
 }


  React.useEffect(() => {
    
    if (isSelected && cur_ann_type==null) {
      // we need to attach transformer manually
     
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
    
   
      <Rect
       name="shape"
       dash={ [33, 10]}
       perfectDrawEnabled={false}
        onClick={ onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable={cur_ann_type==null?true:false}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}

        strokeWidth={10}
        
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
         // console.log(node);
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            rotation:node.rotation(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
{/* 
<Circle
     
     x={data.x}
     y={data.y}
    //  width={data.width}
     radius={5}


     offset={
      {
          x:data.width/2-10,
          y:0
          
      
      }
        
     }
    
     fill="black"
     opacity={0.4}
     /> */}


     {/* {isSelected==false?
      <Text
      name="cross_remove"
      x={data.x}
      y={data.y}
     fontSize={6}

     fill="white"
   width={data.width+2}
   align="right"
   offset={
       {
           y:5
       }
   }
      
      onClick={deletepop}
      rotation={data.rotation}
     
     text={"x"}
     />:null
    } */}
   
      {isSelected && (
        <Transformer
        rotateEnabled={false}
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
           
            return newBox;
          }}
        />
      )}
    {/* <BB_text bb={data}
     deletepop={deletepop}
    
    /> */}


    </React.Fragment>
  );
});
