import React from 'react';
import { Image} from 'react-konva';


import useImage from 'use-image';

export const SubReportImage = React.memo(({ data}) => {
  const shapeRef = React.useRef();
 
  const [image]=useImage(data.thumbnail_path, "Anonymous")
console.log(data)
// const getNearestCorner=()=>{
//   let firstpoint={x:shapeProps.x+shapeProps.width/2,y:shapeProps.y};
//   let secondpoint={x:shapeProps.x+shapeProps.width,y:shapeProps.y+shapeProps.height/2};
//   let thirdpoint={x:shapeProps.x,y:shapeProps.y+shapeProps.height/2}
//   let fourthpoint={x:shapeProps.x+shapeProps.width/2,y:shapeProps.y+shapeProps.height}

//   let arr=[firstpoint,secondpoint,thirdpoint,fourthpoint];
//  let minDist=-Infinity
//  let minPoints=arr[0];
//   for(let obj of arr ){
//     let x=  shapeProps.annX+shapeProps.annWidth/2;
//     let y=shapeProps.annY;
//        let dist= Math.pow(x-obj.x,2)+Math.pow(y-obj.y,2);
//        if(Math.pow(minDist,2)>Math.pow(dist,2)){
//          minDist=dist;
//          minPoints=obj;
//        }
//   }
//   return minPoints

// }

//   const setdata= ()=>{
//     console.log(data);
//     let arr=[];
//    annotations.forEach(element => {
//      if(element.id!=data.id){
//      arr.push(element)
//    }else{
//      arr.push(data);
//    }}
//    )
//     setAnnotations(arr);
//   }

//  const deletepop= ()=>{
//    let newmpap=  annotations.filter((ann,key)=>{
//          if(ann.id!=data.id){
//              return ann
//          }
//      })
//      history.push(newmpap);
//      setHistory(history);

//      setAnnotations(newmpap);
      
//  }


//   React.useEffect(() => {
     
    
//     if (isSelected && textSelected==false &&  cur_ann_type==null) {
  
//       trRef.current.nodes([shapeRef.current]);
//       trRef.current.getLayer().batchDraw();
//     }else
    
   
//     if(isSelected==false){
//       setTextSelected(false)
//     }
  
//   }, [isSelected]);

//   React.useEffect(()=>{
//     if(textSelected && cur_ann_type==null){
//       ttRef.current.nodes([textShapeRef.current]);
//       ttRef.current.getLayer().batchDraw();
//     }
//   },[textSelected])

//  const handleClick= (e)=>{
  
// setTextSelected(true);
// onSelect()

//  }



  return (
    <React.Fragment>
          {/* <BB_text onChange={onChange}  textShapeRef={textShapeRef} ttRef={ttRef} 
    textSelected={textSelected} handleClick={handleClick}  mapData={mapData} bb={data} show={show} toggle={toggle}
     deletepop={deletepop} setdata={setdata}
    
    /> */}
       <Image 
      image={image}
      name="shape"
      x={data.x}
      y={data.y}
      width={data.width}
      height={data.height}
    //   onClick={ onSelect}
    //   onTap={onSelect}
    //   onDblClick={()=>{
    //     toggle(!show)
    //   }}
      ref={shapeRef}
    //   draggable
    //   lineCap= {'round'}
       
        // dash={ shapeProps.stroketype=='plain'?[]:
        // shapeProps.stroketype=='dotted'?[0.001,10]:
        // shapeProps.stroketype=='dashed'?[20, 12]:[]}
    //   onDragEnd={(e) => {
    //     onChange({
    //       ...shapeProps,
    //       x: e.target.x(),
    //       y: e.target.y(),
    //     });
    //   }}
    //   onTransformEnd={(e) => {
    //     // transformer is changing scale of the node
    //     // and NOT its width or height
    //     // but in the store we have only width and height
    //     // to match the data better we will reset scale on transform end
    //     const node = shapeRef.current;
    //    // console.log(node);
    //     const scaleX = node.scaleX();
    //     const scaleY = node.scaleY();

    //     // we will reset it back
    //     node.scaleX(1);
    //     node.scaleY(1);
    //     onChange({
    //       ...shapeProps,
    //       x: node.x(),
    //       y: node.y(),
    //       rotation:node.rotation(),
    //       // set minimal value
    //       width: Math.max(5, node.width() * scaleX),
    //       height: Math.max(node.height() * scaleY),
    //     });
    //   }}
      />
{/*    
{isSelected==false && hideOptions==false?
<Circle
  
    name="cross_remove"
    x={shapeProps.x}
    y={shapeProps.y}
   radius={25}
    fill="black"
    width={25}
    align="right"
    zIndex={2}
    onClick={deletepop}
    rotation={data.rotation}
   offset={
     {
       x:-shapeProps.width,
       y:0
     }
   }
    
     
     opacity={0.4}
     />:null} */}
{/* 

     {isSelected==false && hideOptions==false?
       <Text
       
       name="cross_remove"
       x={shapeProps.x}
       y={shapeProps.y}
       fontSize={20}
       fill="white"
       width={20}
       align="right"
       zIndex={2}
       onClick={deletepop}
       rotation={data.rotation}
      offset={
        {
          x:-shapeProps.width+15,
          y:10
        }
      }
      text={"x"}
      />:null
     }
   */}
   
   
    


    </React.Fragment>
  );
});
