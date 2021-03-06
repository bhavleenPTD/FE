import React from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Transformer, Circle, Arrow } from 'react-konva';
import {useStore} from '../../../zustandstore';
import { BB_text } from '../bb_text';
import Portal from '../portal';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCross} from '@fortawesome/free-solid-svg-icons';
import './shapeCust.css';
import { Text } from 'react-konva';
import { useState } from 'react';
import shape from '@material-ui/core/styles/shape';
import { Ann_Options } from '../arr_options';

export const CustArrow = React.memo(({ shapeProps, isSelected, onSelect, onChange,data ,mapData}) => {
  const shapeRef = React.useRef();

  const {cur_ann_type}=useStore();
  const [show,toggle]=useState(false);
  const {annotations,setAnnotations,history,setHistory}=useStore();

  const setdata= ()=>{
    let arr=[];
   annotations.forEach(element => {
     if(element.id!=data.id){
     arr.push(element)
   }else{
     arr.push(data);
   }}
   )
    setAnnotations(arr);
  }

 const deletepop= ()=>{
   let newmpap=  annotations.filter((ann,key)=>{
         if(ann.id!=data.id){
             return ann
         }
     })
     history.push(newmpap);
     setHistory(history);

     setAnnotations(newmpap);
      
 }


//   React.useEffect(() => {
    
//     if (isSelected && cur_ann_type==null) {
//       // we need to attach transformer manually
     
//       trRef.current.nodes([shapeRef.current]);
//       trRef.current.getLayer().batchDraw();
//     }
//   }, [isSelected]);

  return (
    <React.Fragment>
    
   
      <Arrow
       name="shape"
       fill={shapeProps.stroke}
      
       perfectDrawEnabled={false}
        onClick={ onSelect}
        onTap={onSelect}
        lineCap= {'round'}
       
        dash={ shapeProps.stroketype=='plain'?[]:
        shapeProps.stroketype=='dotted'?[0.001,10]:
        shapeProps.stroketype=='dashed'?[20, 12]:[]}
        onDblClick={()=>{
          toggle(!show)
        }}
        ref={shapeRef}
        {...shapeProps}
        strokeWidth={shapeProps.strokeWidth==null?1:shapeProps.strokeWidth}
        pointerWidth={shapeProps.pointerWidth==null?10:shapeProps.pointerWidth}
        pointerLength={shapeProps.pointerLength==null?10:shapeProps.pointerLength}
        draggable={cur_ann_type==null?true:false}
        onDragEnd={(e) => {
           
          onChange({
            ...shapeProps,
           points:[{x:e.target.points()[0],y:e.target.points()[1]},{x:e.target.points()[2],y:e.target.points()[3]}]
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
   
      {/* {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
           
            return newBox;
          }}
        />
      )} */}
    {/* <BB_text    mapData={mapData} bb={data} show={show} toggle={toggle}
     deletepop={deletepop} setdata={setdata}
    
    /> */}
    <Ann_Options deletepop={deletepop} bb={data} show={show} toggle={toggle}
     setdata={setdata} />


    </React.Fragment>
  );
});
