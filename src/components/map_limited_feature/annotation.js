// import React from 'react';
// import { Layer, Line, Circle, Rect, Ellipse } from "react-konva";

// import useStore from "../../zustandcrop";
// import {CustRectangle} from './shapes/custRectangle';

// export default function Annotation() {
//     const annotations = useStore(s => s.annotations);
//     const setAnnotations = useStore(s => s.setAnnotations);
//     const layerRef = React.useRef(null);
//     const {cur_ann_type}=useStore();
//     const curAnnotationId = useStore(s => s.annotationId);
//     const setAnnotationId = useStore(s => s.setAnnotationId);
    
//     return (
//         <Layer ref={layerRef} >
//             {annotations!=null && annotations.map((ann,i) => {
//                // console.log(ann)
              
//                 return (
//                     <React.Fragment key={ann.id+i}>
//                         {/* first we need to erase previous drawings */}
//                         {/* we can do it with  destination-out blend mode */
//                             //console.log(ann.id)
//                         }
//                         {/* {

//                             ann.type == 'E' ?
//                                 // <Circle
//                                 //    name="shape"

//                                 //     x={ann.x}
//                                 //     y={ann.y}
//                                 //     radius={ann.radius}
//                                 //     stroke="black"
//                                 // />
//                                 <CustEllipse
                                
//                                 shapeProps={{
//                                     x:ann.x,
//                                     y:ann.y,
//                                     radiusX:ann.radiusX,
//                                     radiusY:ann.radiusY,
//                                     rotation:ann.rotation,
//                                     stroke:ann.color
//                                 }}
                                
//                                 isSelected={ann.id === curAnnotationId}
//                                 onSelect={() => {
//                                   setAnnotationId(ann.id);
//                                 }}
//                                 onChange={(newAttrs) => {
//                                   const arr = annotations.slice();
//                                   arr[i] = {
//                                      ...arr[i],  
//                                     ...newAttrs
//                                 };
//                                   console.log(arr)
//                                   setAnnotations(arr);
//                                 }}
//                                 />
 


//                                  : null

//                         } */}
//                         {

//                             ann.type == 'R' ?
//                                 // <Rect
//                                 //     x={ann.x}
//                                 //     y={ann.y}
//                                 //   width={ann.width}
//                                 //   height={ann.height}
//                                 //     stroke="red"
//                                 // /> : null

//                                 <CustRectangle
                                
//                                 shapeProps={{
//                                     x:ann.x,
//                                     y:ann.y,
//                                     width:ann.width,
//                                     height:ann.height,
//                                     rotation:ann.rotation,
//                                     stroke:ann.color
//                                 }}

//                                  data={ann}
                                
//                                 isSelected={ann.id === curAnnotationId}
//                                 onSelect={() => {
                                    
//                                   setAnnotationId(ann.id);
                                    
//                                 }}
//                                 onChange={(newAttrs) => {
//                                   const rects = annotations.slice();
//                                   rects[i] = {
//                                      ...rects[i],  
//                                     ...newAttrs
//                                 };
//                                  // console.log(rects)
//                                   setAnnotations(rects);
//                                 }}
//                                 />:null

//                         }
//                      {/* {ann.type=="P"?

//                 //       <Line
//                 //       globalCompositeOperation="destination-out"
//                 //       points={ann.poin ts.flatMap(p => [p.x, p.y])}
//                 //       stroke='white'
//                 //       strokeWidth="2"
//                 //       listening={false}
//                 //       closed
//                 //   />
                
//                   <CustPolygon

//                   shapeProps={{
//                     x:ann.x,
//                     y:ann.y,
//                     points:ann.points.flatMap(p => [p.x, p.y]),
//                     rotation:ann.rotation,
//                     stroke:ann.color,
                 
//                     strokeWidth:"2",
//                     opacity:isSelected ? 1 : 0.8
//                 }}
                     
//                 isSelected={ann.id === curAnnotationId}
//                 onSelect={() => {
//                   setAnnotationId(ann.id);
//                 }}
//                 onChange={(newAttrs) => {
//                   const bb = annotations.slice();
//                   bb[i] = {
//                      ...bb[i],  
//                     ...newAttrs
//                 };
//                  // console.log(rects)
//                   setAnnotations(bb);
//                 }}
            
                  
//                   />:null
                    
//                     } */}
                       
//                     </React.Fragment>
//                 );
//             })}
//         </Layer>
//     );
// };
