import React from 'react';
import Konva from 'konva';
import { Stage } from 'react-konva';
import { generate } from 'shortid';
import BaseImage from './map.load';

import { Button } from 'react-bootstrap';
import { Button as RButton } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faPlane } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useMosaicStore } from '../../zustandMosaic';
import { toast } from 'react-toastify';
import MosaicView from './MosaicView';

const Btnoverlay = styled.div`
	margin: 2px;
	opacity: 0.4;
	&:hover {
		opacity: 1;
	}
`;

let id = 1;
let initialImageScale = 1;

function getRelativePointerPosition(node) {
	// the function will return pointer position relative to the passed node
	const transform = node.getAbsoluteTransform().copy();
	// to detect relative position we need to invert transform
	transform.invert();

	// get pointer (say mouse or touch) position
	const pos = node.getStage().getPointerPosition();

	// now we find relative point
	return transform.point(pos);
}

function zoom(stage, scaleBy, duration) {
	var oldScale = stage.scaleX();

	var pointer = stage.getPointerPosition();
	console.log(pointer);
	var mousePointTo = {
		x: (pointer.x - stage.x()) / oldScale,
		y: (pointer.y - stage.y()) / oldScale,
	};
	const newScale = Math.max(initialImageScale, oldScale * scaleBy); // new scale of image

	// stage.scale({ x: newScale, y: newScale });

	var newPos = {
		x: pointer.x - mousePointTo.x * newScale,
		y: pointer.y - mousePointTo.y * newScale,
	};

	// const newAttrs = limitAttributes(stage, { ...newPos, scale: newScale });

	stage.to({
		x: newPos.x,
		y: newPos.y,
		scaleX: newScale,
		scaleY: newScale,
		duration: duration,
	});
	stage.batchDraw();
}

function zoomStage(stage, scaleBy) {
	const oldScale = stage.scaleX();

	const pos = {
		x: stage.width() / 2,
		y: stage.height() / 2,
	};
	const mousePointTo = {
		x: pos.x / oldScale - stage.x() / oldScale, // zoom on the center of the current image
		y: pos.y / oldScale - stage.y() / oldScale,
	};

	const newScale = Math.max(initialImageScale, oldScale * scaleBy); // new scale of image

	const newPos = {
		x: -(mousePointTo.x - pos.x / newScale) * newScale, // new position of image
		y: -(mousePointTo.y - pos.y / newScale) * newScale,
	};

	const newAttrs = limitAttributes(stage, { ...newPos, scale: newScale });

	stage.to({
		x: newAttrs.x,
		y: newAttrs.y,
		scaleX: newAttrs.scale,
		scaleY: newAttrs.scale,
		duration: 0.3,
	});
	stage.batchDraw(); // not simple draw as simple draw may hinder performance so according to the performance of system
}

function limitAttributes(stage, newAttrs) {
	const box = stage.findOne('Image').getClientRect();
	const minX = -box.width + stage.width();
	const maxX = 0;

	const x = Math.max(minX, Math.min(newAttrs.x, maxX));

	const minY = -box.height + stage.height();
	const maxY = 0;

	const y = Math.max(minY, Math.min(newAttrs.y, maxY));

	const scale = Math.max(initialImageScale, newAttrs.scale);

	return { x, y, scale };
}

export default (props) => {
	const stageRef = React.useRef();
	const { width, height } = useMosaicStore((s) => ({
		width: s.width,
		height: s.height,
	}));
	const [hidden, sethidden] = React.useState(false);

	let interval;
	const [autohoverinterval, setAutoHoverIntervalvalue] = React.useState(null);
	const [keystate, setkeystate] = React.useState(false);

	const backImage = useMosaicStore((s) => s.image);
	initialImageScale = useMosaicStore((s) => s.initialImageScale);
	const setSize = useMosaicStore((s) => s.setSize);
	const scale = useMosaicStore((state) => state.scale);
	//   const autohover=useMosaicStore(s=>s.autohover);
	//   const setAutoHover=useMosaicStore(s=>s.setAutoHover);
	//   const hoverState = useMosaicStore(state => state.hoverState);
	//   const setHoverState = useMosaicStore(state => state.setHoverState);

	//   const handleContiShift = (obj) => (e  // handle continouse mouse shift hover
	//   ) => {

	//     if (interval) {
	//       clearInterval(interval)
	//     }
	//     if (obj != null && hoverState == true) {

	//       let xval = -obj.valx;
	//       let yval = -obj.valy;

	//       interval = setInterval(() => {
	//         const stage = stageRef.current;
	//         const dx = xval;
	//         const dy = yval;
	//         const pos = limitAttributes(stage, {
	//           x: stage.x() + dx,
	//           y: stage.y() + dy,
	//           scale: stage.scaleX()
	//         });
	//         stageRef.current.position(pos);
	//         stageRef.current.batchDraw();

	//       }, 10)

	//     }
	//   }
	//   const handleToStop = () => { // stop interval and hovering
	//   //  console.log(interval);

	//     if (hoverState == true) {
	//       //  console.log('hover handle')
	//       setHoverState();
	//     }
	//     if (interval) {
	//       //  console.log('stop handle')
	//       clearInterval(interval);
	//     }

	//   }

	// const crop=()=> {
	//   // console.log(stageRef.current.width())
	//   // console.log(stageRef.current.getCanvas());
	//   // console.log(stageRef.current.height())
	//   //      let src=stageRef.current.toDataURL();
	//   //      console.log(src);
	//   // we return a Promise that gets resolved with our canvas element
	//            let arr= annotations.filter((ann,key)=>{
	//                    return ann.id==annotationId
	//               })
	//               if(arr.length!=0){
	//  let url=backImage.src;
	//  let width=arr[0].width;
	//  let height=arr[0].height;
	//  let x=arr[0].x;
	//  let y=arr[0].y
	//  console.log(arr[0]);

	//  if(width<0){
	//      x=x+width;
	//      width=width*-1;
	//  }

	//  if(height<0){
	//      y=y+height;
	//      height=height*-1;
	//  }

	//   let canvasWidth=stageRef.current.bufferCanvas.width
	//   let canvasHeight=stageRef.current.bufferCanvas.height;

	//      let pr=new Promise(resolve => {
	//      //  console.log(stageRef);

	//       // this image will hold our source image data
	//       const inputImage = new Image();

	//       // we want to wait for our image to load
	//       inputImage.onload = () => {
	//             //   console.log(inputImage.src)
	//           // let's store the width and height of our image
	//           const inputWidth = inputImage.naturalWidth;
	//           const inputHeight = inputImage.naturalHeight;

	//           // get the aspect ratio of the input image
	//           // const inputImageAspectRatio = inputWidth / inputHeight;

	//           // if it's bigger than our target aspect ratio

	//           let outputWidth = width;
	//           let outputHeight = height;

	//           //  let aspectRatio =width/height;
	//           // if (inputImageAspectRatio > aspectRatio) {
	//           //     outputWidth = inputHeight * aspectRatio;
	//           // } else if (inputImageAspectRatio < aspectRatio) {
	//           //     outputHeight = inputWidth / aspectRatio;
	//           // }

	//           // calculate the position to draw the image at

	//           // create a canvas that will present the output image
	//           const outputImage = document.createElement('canvas');

	//           // set it to the same size as the image
	//           outputImage.width = outputWidth;
	//           outputImage.height =outputHeight

	//           // draw our image at position 0, 0 on the canvas
	//         // console.log('coordinates',x,y,outputWidth,outputHeight);
	//           const ctx = outputImage.getContext('2d');
	//           ctx.drawImage(inputImage, -x, -y);
	//           resolve(outputImage);
	//       };

	//       // start loading our image
	//       inputImage.src = url;
	//   })

	//   pr.then(data=>{

	//   var image = new Image();
	//   image.src =  data.toDataURL();

	//   var w = window.open("");
	//   w.document.write(image.outerHTML);

	//   })}else{
	//       toast.error('Please Select A Bounding box first')
	//   }

	// }

	//   const handleAutohover=()=>()=>{
	//       setAutoHoverInterval()
	//         if(autohover==true){
	//           setAutoHover(false);
	//         }else{
	//           setAutoHover(true);
	//           autohoverStart()

	//         }

	//   }

	// const autohoverStart=e=>{
	//   let hmove=true;
	//   let vmove=false;
	//   let xval=1;
	//   let yval=0;
	//  let vmovetimer=30;
	//   let ath=setInterval(()=>{
	//    const stage=stageRef.current;
	//    const pos=limitAttributes(stage,{
	//      x:stage.x()-xval,
	//      y:stage.y()-yval,
	//      scale:stage.scaleX()
	//    })

	//    if(pos.x==stage.x() && hmove==true){
	//      hmove=false;
	//      vmove=true;
	//      yval=1;
	//      vmovetimer=30;
	//    }

	//      if(vmove==true && vmovetimer==0){
	//            yval=0;
	//            xval=xval*-1;
	//            hmove=true;
	//            vmove=false;
	//            vmovetimer=30;
	//      }

	//      if(vmove==true && vmovetimer!=0){
	//       const checkpos=limitAttributes(stage,{
	//         x:stage.x()-xval,
	//         y:stage.y()-yval,
	//         scale:stage.scaleX()
	//       })
	//       if(checkpos.x==stage.x() && checkpos.y==stage.y()){
	//         clearInterval(ath);
	//         handlAutoHoverStop();
	//         return;
	//       }
	//       vmovetimer--;

	//      }
	//      stageRef.current.position(pos);
	//      stageRef.current.batchDraw();
	//   },11)

	//   setAutoHoverIntervalvalue(ath);

	// }

	//   const handleKeyHoverOnKey = (obj) => (e) => {  // hover on key map
	//     handleToStop();
	//     handlAutoHoverStop()

	//     let xval = 0;
	//     let yval = 0;
	//     if (e.keyCode === 37) {
	//       setkeystate(true);
	//       xval = 2;
	//       yval = 0;
	//       setRotation(-180)
	//     } else if (e.keyCode === 38) {

	//       setkeystate(true);
	//       xval = 0;
	//       yval = 2;
	//       setRotation(-90)
	//     } else if (e.keyCode === 39) {
	//       setkeystate(true);
	//       xval = -2;
	//       yval = 0;
	//       setRotation(0)
	//     } else if (e.keyCode === 40) {
	//       setkeystate(true);
	//       xval = 0;
	//       yval = -2;
	//       setRotation(90)
	//     } else {
	//       return;
	//     }
	//     e.preventDefault();
	//     const stage = stageRef.current;

	//     const pos = limitAttributes(stage, {
	//       x: stage.x() + xval,
	//       y: stage.y() + yval,
	//       scale: stage.scaleX()
	//     });
	//     stageRef.current.position(pos);
	//     stageRef.current.batchDraw();

	//   }

	//   const setAutoHoverInterval= ()=>{   // handle auto hover interval
	//     if(autohoverinterval){
	//       clearInterval(autohoverinterval);
	//     }
	//   }

	//   const handleInterval = () => { // handle only interval

	//     if (interval) {

	//       clearInterval(interval);
	//     }

	//   }

	//  const handlAutoHoverStop=()=>{  // handle both auto interval and hover auto hover state
	//     setAutoHoverInterval();
	//     setAutoHover(false);
	//  }

	React.useEffect(() => {
		function checkSize() {
			const container = document.querySelector('.right-panel'); // resize the stage and image according to this
			console.log(container);
			setSize({
				width: container.clientWidth,
				height: container.clientHeight,
			});
		}
		checkSize();
		window.addEventListener('resize', checkSize);

		return () => window.removeEventListener('resize', checkSize);
	}, []);
	return (
		<React.Fragment>
			<div
				tabIndex={1}
				onKeyUp={() => {
					setkeystate(false);
				}}
			>
				<Stage
					ref={stageRef}
					width={width}
					height={height}
					scaleX={scale}
					scaleY={scale}
					className="canvas"
					onClick={(e) => {
						// const clickedNotOnRegion = e.target.name() !== 'shape';
						// // handleToStop();
						// // handlAutoHoverStop()
						// if (clickedNotOnRegion) {
						//    setAnnotationId(null);
						// }
					}}
					onDblClick={(e) => {
						// if (interval) {
						//   clearInterval(interval);

						// }

						if (e.target.name() != 'text') {
							zoomStage(stageRef.current, 0.9);
							let v = setTimeout(() => {
								zoom(stageRef.current, 2, 0.6);
							}, 500);
						}
					}}
					onMouseEnter={(e) => {
						//  if(e.target.name()=='cross_remove'){
						//   const stage= stageRef.current;
						//  stage.container().style.cursor="pointer"
						//  }
						//  e.evt.preventDefault();
						// if(hoverState==true){
						//   const stage = stageRef.current;
						//   const position=stage.getPointerPosition();
						//   const dx = -e.evt.movementX;
						//   const dy = -e.evt.movementY;
						//   const pos = limitAttributes(stage, {
						//     x: stage.x()+dx,
						//     y: stage.y()+dy,
						//     scale: stage.scaleX()
						//   });
						//   stageRef.current.position(pos);
						//   stageRef.current.batchDraw();
						// }
					}}
					onMouseLeave={(e) => {
						//  const stage=stageRef.current;
						//  stage.container().style.cursor="default";
					}}
					onWheel={(e) => {
						//scroll the image
						e.evt.preventDefault();
						const stage = stageRef.current;

						const dx = -e.evt.deltaX;
						const dy = -e.evt.deltaY;
						const pos = limitAttributes(stage, {
							x: stage.x() + dx,
							y: stage.y() + dy,
							scale: stage.scaleX(),
						});
						stageRef.current.position(pos);
						stageRef.current.batchDraw();
					}}
					onMouseDown={(e) => {
						//     if(cur_ann_type!=null){
						//     toggleDrawing(true);
						//     const point = getRelativePointerPosition(e.target.getStage());
						//       const bbox=  {
						//       id:generate(),
						//      type:'R',
						//      x:point.x,
						//      y:point.y,
						//      ann_text:"Information",
						//      width:1,
						//      height:1,
						//       points:[],
						//      color:Konva.Util.getRandomColor(),
						//      rotation:0
						//   }
						//      setAnnotations(annotations.concat(bbox));
						// }
					}}
					onMouseMove={(e) => {
						//  if(e.target.name()=='cross_remove'){
						//  stageRef.current.container().style.cursor="pointer"
						//  }else{
						//    stageRef.current.container().style.cursor="default";
						//  }
						//       if (!isDrawing) {
						//         // if(hoverState==true){
						//         //    // console.log(e);
						//         //     const stage = stageRef.current;
						//         //   const point =stage.getPointerPosition()
						//         //   const dx = -e.evt.movementX;
						//         //   const dy = -e.evt.movementY;
						//         //   const pos = limitAttributes(stage, {
						//         //     x: stage.x()+dx,
						//         //     y:stage.y()+dy,
						//         //     scale: stage.scaleX()
						//         //   });
						//         //   stageRef.current.position(pos);
						//         //   stageRef.current.batchDraw();
						//         // }else{
						//         return;
						//       } else {
						//         const lastbb = { ...annotations[annotations.length - 1] };
						//         const point = getRelativePointerPosition(e.target.getStage());
						//         // lastbb.change=generate();
						//         lastbb.width= point.x-lastbb.x;
						//          lastbb.height=point.y-lastbb.y;
						//         // console.log(lastbb);
						//           annotations.splice(annotations.length - 1, 1);
						//        setAnnotations(annotations.concat([lastbb]));
						//       }
					}}
					onMouseUp={(e) => {
						//       if (!isDrawing) {
						//         return;
						//       }
						//     let obj=  annotations[annotations.length-1];
						//     if(obj.width<0){
						//       obj.x=obj.x+obj.width;
						//       obj.width=obj.width*-1;
						//     }
						//     if(obj.height<0){
						//         obj.y=obj.y+obj.height;
						//         obj.height=obj.height*-1;
						//     }
						// let newobj={...obj};
						//     annotations.splice(annotations.length - 1, 1);
						//     setAnnotations(annotations.concat([newobj]));
						//       // crop(backImage.src,obj.width,obj.height,obj.x,obj.y);
						//       // const lastRegion = regions[regions.length - 1];
						//       // if (lastRegion.points.length < 3) {
						//       //   regions.splice(regions.length - 1, 1);
						//       //   setRegions(regions.concat());
						//       // }
						//       setAnnType(null);
						//       toggleDrawing();
					}}
				>
					<BaseImage imagepath={props.mapData.main_image} />

					<MosaicView data={props.mapData.subreports} />
				</Stage>

				<div
					className="zoom-container"
					style={
						props.imagetype == 'ref'
							? { position: 'fixed', top: '6rem', left: '0rem' }
							: { position: 'fixed', top: '6rem', left: '0rem' }
					}
				>
					<Button
						variant="light"
						className="mapbtn"
						onClick={() => {
							zoomStage(stageRef.current, 1.2);
						}}
					>
						+
					</Button>
					<Button
						variant="light"
						className="mapbtn"
						onClick={() => {
							zoomStage(stageRef.current, 0.8);
						}}
					>
						-
					</Button>
					{/* <AnnotationMenu/>

        <div style={{paddingLeft:'5px'}}>
       
        <RButton color="danger" onClick={()=>{crop()}} >Crop</RButton>
    
        </div> */}
				</div>
			</div>
		</React.Fragment>
	);
};
