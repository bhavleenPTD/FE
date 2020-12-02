import React, {
	// useEffect,
	forwardRef,
	// useRef,
	useImperativeHandle,
} from "react";
import { Stage } from "react-konva";
import { generate } from "shortid";
import BaseImage from "./imageSection";
import Annotations from "./annotation";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faPlane } from "@fortawesome/free-solid-svg-icons";
//import { ArrowRight, ArrowDown, ArrowUp, ArrowLeft } from 'react-bootstrap-icons';
import { useStore } from "../../zustandstore";
// import { DATA_JSON } from '../../modal/datajson';
// import { Crop } from 'react-bootstrap-icons';
// import useFilterStore from '../../zustandfilter';
import { toast } from "react-toastify";
// import { CONSTANTS } from './modal';
// import { EmpHTTP } from '../Interceptors/empInterceptor';

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

function limitAttributes(stage, newAttrs) {
	const imgsec = stage.findOne("Image");
	if (imgsec != null) {
		const box = imgsec.getClientRect();
		const minX = -box.width + stage.width();
		const maxX = 0;

		const x = Math.max(minX, Math.min(newAttrs.x, maxX));

		const minY = -box.height + stage.height();
		const maxY = 0;

		const y = Math.max(minY, Math.min(newAttrs.y, maxY));

		const scale = Math.max(initialImageScale, newAttrs.scale);

		return { x, y, scale };
	} else {
		toast.error("Image Not Loaded Yet");
	}
}

export default forwardRef((props, ref) => {
	const stageRef = React.useRef();
	const { width, height } = useStore((s) => ({
		width: s.width,
		height: s.height,
	}));
	// const [hidden, sethidden] = React.useState(false);

	let interval;
	const [autohoverinterval, setAutoHoverIntervalvalue] = React.useState(null);
	const [keystate, setkeystate] = React.useState(false);
	const {
		annotationId,
		setAnnotationId,
		hoverLatLng,
		setLatLng,
		sethoverLatLngTrue,
		hoverLatLngTrue,
	} = useStore();
	const rotation = useStore((s) => s.rotation);
	// const backImage = useStore(s => s.image);
	const setRotation = useStore((s) => s.setRotation);
	initialImageScale = useStore((s) => s.initialImageScale);
	const setSize = useStore((s) => s.setSize);
	const scale = useStore((state) => state.scale);
	const isDrawing = useStore((state) => state.isDrawing);
	const toggleDrawing = useStore((state) => state.toggleIsDrawing);
	const autohover = useStore((s) => s.autohover);
	const setAutoHover = useStore((s) => s.setAutoHover);
	const history = useStore((s) => s.history);
	const setHistory = useStore((s) => s.setHistory);
	const [contidraw, setContiDraw] = React.useState(false);
	// const canvasWidth = useStore(s => s.canvasWidth)
	// const canvasHeight = useStore(s => s.canvasHeight)
	// const setCanvasWidth = useStore(s => s.setCanvasWidth);
	// const setCanvasHeight = useStore(s => s.setCanvasHeight);
	const {
		cur_ann_type,
		setAnnType,
		fontSize,
		color,
		symbol,
		strokeWidth,
		setZoomf,
	} = useStore();
	// const canvasRotation=useFilterStore(s=>s.canvasRotation);
	const { annotations, setAnnotations } = useStore();
	const hoverState = useStore((state) => state.hoverState);
	const setHoverState = useStore((state) => state.setHoverState);
	const splitCanvas = useStore((state) => state.splitCanvas);

	useImperativeHandle(ref, () => ({
		getCanvas() {
			return stageRef.current;
		},
	}));

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
		setZoomf(newScale);
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
		setZoomf(newAttrs.scale);
		stage.batchDraw(); // not simple draw as simple draw may hinder performance so according to the performance of system
	}

	const handleContiShift = (obj) => (
		e, // handle continouse mouse shift hover
	) => {
		if (interval) {
			clearInterval(interval);
		}
		if (obj != null && hoverState == true) {
			let xval = -obj.valx;
			let yval = -obj.valy;

			interval = setInterval(() => {
				const stage = stageRef.current;
				const dx = xval;
				const dy = yval;
				const pos = limitAttributes(stage, {
					x: stage.x() + dx,
					y: stage.y() + dy,
					scale: stage.scaleX(),
				});
				stageRef.current.position(pos);
				stageRef.current.batchDraw();
			}, 10);
		}
	};
	const handleToStop = () => {
		// stop interval and hovering
		//  console.log(interval);

		if (hoverState == true) {
			//  console.log('hover handle')
			setHoverState();
		}
		if (interval) {
			//  console.log('stop handle')
			clearInterval(interval);
		}
	};

	// const crop=(url=backImage.src, width,height,x,y)=> {
	//   // console.log(stageRef.current.width())
	//   // console.log(stageRef.current.getCanvas());
	//   // console.log(stageRef.current.height())
	//   //      let src=stageRef.current.toDataURL();
	//   //      console.log(src);
	//   // we return a Promise that gets resolved with our canvas element

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
	//   console.log(data.toDataURL())

	//   })
	// }

	//  useEffect(() => {

	//   if (canvasWidth == null || canvasHeight == null) {
	//     setCanvasWidth(stageRef.current.bufferCanvas.width)
	//     setCanvasHeight(stageRef.current.bufferCanvas.height);
	//   }
	//  }, []);

	const handleAutohover = () => () => {
		setAutoHoverInterval();
		if (autohover == true) {
			setAutoHover(false);
		} else {
			setAutoHover(true);
			autohoverStart();
		}
	};

	const autohoverStart = (e) => {
		let hmove = true;
		let vmove = false;
		let xval = 1;
		let yval = 0;
		let vmovetimer = 30;
		let ath = setInterval(() => {
			const stage = stageRef.current;
			const pos = limitAttributes(stage, {
				x: stage.x() - xval,
				y: stage.y() - yval,
				scale: stage.scaleX(),
			});

			if (pos.x == stage.x() && hmove == true) {
				hmove = false;
				vmove = true;
				yval = 1;
				vmovetimer = 30;
			}

			if (vmove == true && vmovetimer == 0) {
				yval = 0;
				xval = xval * -1;
				hmove = true;
				vmove = false;
				vmovetimer = 30;
			}

			if (vmove == true && vmovetimer != 0) {
				const checkpos = limitAttributes(stage, {
					x: stage.x() - xval,
					y: stage.y() - yval,
					scale: stage.scaleX(),
				});
				if (checkpos.x == stage.x() && checkpos.y == stage.y()) {
					clearInterval(ath);
					handlAutoHoverStop();
					return;
				}
				vmovetimer--;
			}
			stageRef.current.position(pos);
			stageRef.current.batchDraw();
		}, 11);

		setAutoHoverIntervalvalue(ath);
	};

	const handleKeyHoverOnKey = (obj) => (e) => {
		// hover on key map
		handleToStop();
		handlAutoHoverStop();

		let xval = 0;
		let yval = 0;
		if (e.keyCode === 37) {
			setkeystate(true);
			xval = 2;
			yval = 0;
			setRotation(-180);
		} else if (e.keyCode === 38) {
			setkeystate(true);
			xval = 0;
			yval = 2;
			setRotation(-90);
		} else if (e.keyCode === 39) {
			setkeystate(true);
			xval = -2;
			yval = 0;
			setRotation(0);
		} else if (e.keyCode === 40) {
			setkeystate(true);
			xval = 0;
			yval = -2;
			setRotation(90);
		} else {
			let charCode = String.fromCharCode(e.which).toLowerCase();
			if (e.ctrlKey && charCode == "z") {
				if (history.length > 1) {
					history.pop();
					setHistory(history);
					setAnnotations(history[history.length - 1]);
				}
			}
			return;
		}
		e.preventDefault();
		const stage = stageRef.current;

		const pos = limitAttributes(stage, {
			x: stage.x() + xval,
			y: stage.y() + yval,
			scale: stage.scaleX(),
		});
		stageRef.current.position(pos);
		stageRef.current.batchDraw();
	};

	// create bbounding box

	const makeBBAccType = (point) => {
		if (cur_ann_type == "R") {
			return {
				id: generate(),
				type: cur_ann_type,
				x: point.x,
				y: point.y,
				annX: point.x,
				annY: point.y + 10,
				// annWidth: 100,
				fontSize: fontSize,
				strokeWidth: strokeWidth,
				annRotations: 0,
				// ann_text: 'Text',
				width: 1,
				height: 1,
				color: color == null ? "blue" : color,
				rotation: 0,
			};
		} else if (cur_ann_type == "M") {
			return {
				id: generate(),
				type: cur_ann_type,
				x: point.x,
				y: point.y,
				ann_text: "Text",
				width: 1,
				strokeWidth: strokeWidth,
				height: 1,
				color: "red",
				rotation: 0,
			};
		} else if (cur_ann_type == "S") {
			return {
				id: generate(),
				type: cur_ann_type,
				x: point.x,
				y: point.y,
				annX: point.x,
				annY: point.y + 10,
				annWidth: 100,
				symbol: symbol,
				fontSize: fontSize,
				annRotations: 0,
				ann_text: "Text",
				width: 1,
				height: 1,
				color: color == null ? "blue" : color,
				rotation: 0,
			};
		} else if (cur_ann_type == "G") {
			//change
			return {
				id: generate(),
				type: cur_ann_type,
				x: point.x,
				y: point.y,
				ann_text: "Text",
				width: 1,
				strokeWidth: strokeWidth,
				height: 1,
				color: "red",
				rotation: 0,
			};
		} else if (cur_ann_type == "E") {
			return {
				id: generate(),
				type: cur_ann_type,
				x: point.x,
				y: point.y,
				// ann_text: 'Text',
				annX: point.x,
				annY: point.y + 10,
				// annWidth: 100,
				fontSize: fontSize,
				annRotations: 0,
				strokeWidth: strokeWidth,
				width: 0,
				height: 0,
				radiusX: 1,
				radiusY: 1,
				points: [],
				color: color == null ? "blue" : color,
				rotation: 0,
			};
		} else if (cur_ann_type == "P") {
			return {
				id: generate(),
				type: "PCL",
				color: color == null ? "blue" : color,
				strokeWidth: strokeWidth,
				points: [
					{
						x: point.x,
						y: point.y,
					},
					{
						x: point.x,
						y: point.y,
					},
				],
			};
		} else if (cur_ann_type == "A") {
			return {
				id: generate(),
				type: cur_ann_type,
				points: [
					{ x: point.x, y: point.y },
					{ x: point.x, y: point.y },
				],
				color: color == null ? "blue" : color,
				ann_text: "Text",
				strokeWidth: strokeWidth,
				pointerAtBeginning: false,
			};
		} else if (cur_ann_type == "T") {
			return {
				id: generate(),
				type: cur_ann_type,
				// color: color === null ? 'blue' : color,
				width: "5",
				height: "5",
				x: point.x,
				y: point.y,
				fontSize: fontSize,
				rotation: 0,
				align: "center",
			};
		} else if (cur_ann_type == "PL") {
			return {
				// id: generate(),
				// type: cur_ann_type,
				// color: color==null?'blue':color,
				// points:[
				// 	{ x: 200, y: 200 },
				// 	{ x: 400, y: 200 },
				// 	{ x: 500, y: 200 },
				// 	{ x: 600, y: 200 }
				// ]
				id: generate(),
				type: "CL",
				strokeWidth: strokeWidth,
				color: color == null ? "blue" : color,
				points: [
					{
						x: point.x,
						y: point.y,
					},
					{
						x: point.x,
						y: point.y,
					},
				],
			};
		} else if (cur_ann_type == "DL") {
			return {
				id: generate(),
				type: cur_ann_type,
				color: color == null ? "blue" : color,
				strokeWidth: strokeWidth,
				points: [
					{
						x: point.x,
						y: point.y,
					},
					{
						x: point.x,
						y: point.y,
					},
				],
			};
		} else if (cur_ann_type == "FD") {
			return {
				id: generate(),
				type: cur_ann_type,
				color: color == null ? "blue" : color,
				strokeWidth: strokeWidth,
				points: [
					{
						x: point.x,
						y: point.y,
					},
					{
						x: point.x,
						y: point.y,
					},
				],
			};
		}
	};

	const handleContiDrawMeasure = () => {
		const lastbb = { ...annotations[annotations.length - 1] };
		if (lastbb != null && lastbb.points != null && lastbb.type == "DL") {
			toggleDrawing(false);
			setContiDraw(false);
			let arr = lastbb.points.slice(0, lastbb.points.length - 1);
			lastbb.points = arr;
			annotations.splice(annotations.length - 1, 1);
			let near = annotations.concat([lastbb]);
			history.push(near);
			setHistory(history);
			setAnnotations(near);
			setAnnType(null);
		} else {
			setContiDraw(false);
			setAnnType(null);
		}
	};

	const updatePolyMarkPoints = (point) => {
		const lastbb = { ...annotations[annotations.length - 1] };
		lastbb.points.push({ x: point.x, y: point.y });
		annotations.splice(annotations.length - 1, 1);
		setAnnotations(annotations.concat([lastbb]));
	};

	const updateMarkPoints = (point) => {
		const lastbb = { ...annotations[annotations.length - 1] };
		lastbb.points.push({ x: point.x, y: point.y });
		annotations.splice(annotations.length - 1, 1);
		setAnnotations(annotations.concat([lastbb]));
	};

	//update bbouding box
	const updateSize = (lastbb, point) => {
		if (lastbb.type == "R") {
			lastbb.width = point.x - lastbb.x;
			lastbb.height = point.y - lastbb.y;
			lastbb.annY = point.y;
			lastbb.annWidth = lastbb.width;
			lastbb.fontSize = Math.max(lastbb.height / 4, lastbb.width / 4);
			lastbb.annHeight = lastbb.fontSize;
		} else if (lastbb.type == "M") {
			lastbb.width = point.x - lastbb.x;
			lastbb.height = point.y - lastbb.y;
			lastbb.annY = point.y;
			lastbb.annWidth = lastbb.width;
			lastbb.fontSize = Math.max(lastbb.height / 4, lastbb.width / 4);
			lastbb.annHeight = lastbb.fontSize;
		} else if (lastbb.type == "S") {
			lastbb.width = point.x - lastbb.x;
			lastbb.height = point.y - lastbb.y;
			lastbb.annY = point.y;
			lastbb.annWidth = lastbb.width;
			lastbb.fontSize = Math.max(lastbb.height / 4, lastbb.width / 4);
			lastbb.annHeight = lastbb.fontSize;
		} else if (lastbb.type == "G") {
			lastbb.width = point.x - lastbb.x;
			lastbb.height = point.y - lastbb.y;
		} else if (lastbb.type == "E") {
			if (point.x - lastbb.x >= 0) {
				lastbb.radiusX = (point.x - lastbb.x) / 2;
			} else {
				lastbb.radiusX = (point.x - lastbb.x) / -2;
			}

			if (point.y - lastbb.y >= 0) {
				lastbb.radiusY = (point.y - lastbb.y) / 2;
			} else {
				lastbb.radiusY = (point.y - lastbb.y) / -2;
			}
			lastbb.annY = point.y + 20;
			lastbb.annWidth = lastbb.radiusX * 2;
			lastbb.fontSize = Math.max(lastbb.radiusX / 2, lastbb.radiusY / 2);
		} else if (lastbb.type == "A") {
			lastbb.points[1] = { x: point.x, y: point.y };
		} else if (lastbb.type == "FD") {
			lastbb.points.push({ x: point.x, y: point.y });
		} else {
			lastbb.width = point.x - lastbb.x;
			lastbb.height = point.y - lastbb.y;
		}
	};

	const markPoint = (point) => {
		const lastbb = { ...annotations[annotations.length - 1] };
		lastbb.points[lastbb.points.length - 1] = { x: point.x, y: point.y };
		annotations.splice(annotations.length - 1, 1);
		setAnnotations(annotations.concat([lastbb]));
	};

	const checkBBParameteres = (obj) => {
		if (obj.type == "R") {
			if (obj.width < 0) {
				obj.x = obj.x + obj.width;
				obj.width = obj.width * -1;
			}

			if (obj.height < 0) {
				obj.y = obj.y + obj.height;
				obj.height = obj.height * -1;
			}

			obj.annX = obj.x;
			obj.annY = obj.y + obj.height + 20;
			obj.annWidth = obj.width;
			obj.fontSize = Math.max(obj.height / 4, obj.width / 4);

			return { ...obj };
		} else if (obj.type == "M") {
			if (obj.width < 0) {
				obj.x = obj.x + obj.width;
				obj.width = obj.width * -1;
			}

			if (obj.height < 0) {
				obj.y = obj.y + obj.height;
				obj.height = obj.height * -1;
			}

			obj.annX = obj.x;
			obj.annY = obj.y + obj.height + 20;
			obj.annWidth = obj.width;
			obj.fontSize = Math.max(obj.height / 4, obj.width / 4);

			return { ...obj };
		} else if (obj.type == "S") {
			if (obj.width < 0) {
				obj.x = obj.x + obj.width;
				obj.width = obj.width * -1;
			}

			if (obj.height < 0) {
				obj.y = obj.y + obj.height;
				obj.height = obj.height * -1;
			}
			obj.annY = obj.y + obj.height + 20;
			return { ...obj };
		} else if (obj.type == "G") {
			if (obj.width < 0) {
				obj.x = obj.x + obj.width;
				obj.width = obj.width * -1;
			}

			if (obj.height < 0) {
				obj.y = obj.y + obj.height;
				obj.height = obj.height * -1;
			}

			return { ...obj };
		} else if (obj.type == "E") {
			obj.annY = obj.y + obj.radiusY * 2 + 20;
			return obj;
		} else if (obj.type == "P") {
			return obj;
		} else {
			return obj;
		}
	};

	const areIntersecting = (p2, p1, obj) => {
		let curd = Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
		if (curd > Math.pow(obj.strokeWidth, 2)) {
			return false;
		}
		return true;
	};

	const setAutoHoverInterval = () => {
		// handle auto hover interval
		if (autohoverinterval) {
			clearInterval(autohoverinterval);
		}
	};

	const handleInterval = () => {
		// handle only interval
		if (interval) {
			clearInterval(interval);
		}
	};

	const handlAutoHoverStop = () => {
		// handle both auto interval and hover auto hover state
		setAutoHoverInterval();
		setAutoHover(false);
	};

	const sendInsetDetails = async () => {
		console.log("ANN", annotations);
		// insetCropArea.forEach((ele) => {
		// 	if (ele.type == 'E') {
		// 		const cropArea = {
		// 			x: ele.x,
		// 			y: ele.y,
		// 			height: ele.height,
		// 			width: ele.width
		// 		};
		// 	}
		// });
		// const res = await EmpHTTP.post(URL.SEND_INSET_DETAILS, data);
		// try {
		// 	console.log(res);
		// } catch (error) {
		// 	console.log(error);
		// }
	};

	React.useEffect(() => {
		function checkSize() {
			const container = document.querySelector(".right-panel"); // resize the stage and image according to this
			setSize({
				width: container.clientWidth,
				height: container.clientHeight,
			});
		}
		checkSize();
		window.addEventListener("resize", checkSize);

		return () => window.removeEventListener("resize", checkSize);
	}, []);

	return (
		<React.Fragment>
			<div
				tabIndex={1}
				onKeyDown={handleKeyHoverOnKey()}
				onKeyUp={() => {
					setkeystate(false);
				}}
			>
				{/* {console.log("------------------> ", cur_ann_type)} */}
				<Stage
					ref={stageRef}
					width={splitCanvas == true ? width / 2 : width}
					height={splitCanvas == true ? height / 2 : height}
					scaleX={scale}
					scaleY={scale}
					draggable={!cur_ann_type}
					className="canvas canvasrel"
					onClick={(e) => {
						const clickedNotOnRegion = e.target.name() !== "shape";
						handleToStop();
						handlAutoHoverStop();
						if (clickedNotOnRegion) {
							setAnnotationId(null);
						}
					}}
					onDblClick={(e) => {
						if (interval) {
							clearInterval(interval);
						}
						if (e.target.name() != "text" && e.target.name() != "shape") {
							zoomStage(stageRef.current, 0.9);
							let v = setTimeout(() => {
								zoom(stageRef.current, 2, 0.6);
							}, 500);
						}
					}}
					onMouseEnter={(e) => {
						if (e.target.name() == "cross_remove") {
							const stage = stageRef.current;
							stage.container().style.cursor = "pointer";
						}
					}}
					onMouseLeave={(e) => {
						const stage = stageRef.current;
						stage.container().style.cursor = "default";
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
						if (
							(cur_ann_type == "PL" ||
								cur_ann_type == "P" ||
								cur_ann_type == "DL") &&
							contidraw == false
						) {
							toggleDrawing(true);
							setContiDraw(true);
							const point = getRelativePointerPosition(e.target.getStage());
							let bbox = makeBBAccType(point);
							setAnnotations(annotations.concat(bbox));
						} else if (
							(cur_ann_type == "PL" || cur_ann_type == "DL") &&
							contidraw == true
						) {
							const point = getRelativePointerPosition(e.target.getStage());
							updateMarkPoints(point);
						} else if (cur_ann_type == "P" && contidraw == true) {
							const point = getRelativePointerPosition(e.target.getStage());
							updatePolyMarkPoints(point);
						} else if (
							cur_ann_type != null &&
							e.target.name() != "shape" &&
							e.target.name() != "cross_remove"
						) {
							toggleDrawing(true);

							const point = getRelativePointerPosition(e.target.getStage());
							let bbox = makeBBAccType(point, cur_ann_type);
							setAnnotations(annotations.concat(bbox));
						}
					}}
					onMouseMove={(e) => {
						if (e.target.name() == "cross_remove") {
							stageRef.current.container().style.cursor = "pointer";
						} else if (cur_ann_type == "FD") {
							stageRef.current.container().style.cursor = "crosshair";
						} else {
							stageRef.current.container().style.cursor = "default";
						}

						if (hoverLatLngTrue) {
							const point = getRelativePointerPosition(e.target.getStage());
							props.getLatLng({ ...point });
						}

						if (!isDrawing || e.target.name() == "cross_remove") {
							return;
						} else if (
							contidraw == true &&
							(cur_ann_type == "PL" ||
								cur_ann_type == "P" ||
								cur_ann_type == "DL")
						) {
							const point = getRelativePointerPosition(e.target.getStage());
							markPoint(point);
							return;
						} else {
							const lastbb = { ...annotations[annotations.length - 1] };

							const point = getRelativePointerPosition(e.target.getStage());
							// lastbb.change=generate();
							updateSize(lastbb, point);
							// console.log(lastbb);
							annotations.splice(annotations.length - 1, 1);
							setAnnotations(annotations.concat([lastbb]));
						}
					}}
					onMouseUp={(e) => {
						if (!isDrawing) {
							return;
						}
						if (contidraw == true && cur_ann_type == "PL") {
							const lastbb = { ...annotations[annotations.length - 1] };
							if (lastbb.points.length >= 5) {
								toggleDrawing(false);
								setContiDraw(false);
								lastbb.type = "PL";
								let arr = lastbb.points.slice(0, lastbb.points.length - 1);
								lastbb.points = arr;
								annotations.splice(annotations.length - 1, 1);

								let na = annotations
									.concat([lastbb])
									.filter((a) => a.type != "CL");
								setAnnotations(na);
								history.push(na);
								setHistory(history);
							}

							return;
						} else if (contidraw == true && cur_ann_type == "P") {
							const lastbb = { ...annotations[annotations.length - 1] };
							let lastpoint = lastbb.points[lastbb.points.length - 1];
							let firstpoint = lastbb.points[0];
							if (
								areIntersecting(lastpoint, firstpoint, lastbb) &&
								lastbb.points.length > 2
							) {
								toggleDrawing(false);
								setContiDraw(false);
								lastbb.type = "P";
								lastbb.annX = lastbb.points[0].x;
								lastbb.annY = lastbb.points[0].y;
								lastbb.annWidth = fontSize * 2;
								lastbb.fontSize = fontSize;
								lastbb.annHeight = lastbb.fontSize;
								lastbb.ann_text = "TEXT";
								let arr = lastbb.points.slice(0, lastbb.points.length - 2);
								lastbb.points = arr;
								annotations.splice(annotations.length - 1, 1);
								let na = annotations
									.concat([lastbb])
									.filter((a) => a.type != "PCL");
								setAnnotations(na);
								history.push(na);
								setHistory(history);
							}

							return;
						} else if (contidraw == true && cur_ann_type == "DL") {
							const lastbb = { ...annotations[annotations.length - 1] };
							let lastpoint = lastbb.points[lastbb.points.length - 1];
							let firstpoint = lastbb.points[0];
							if (
								areIntersecting(lastpoint, firstpoint, lastbb) &&
								lastbb.points.length > 2
							) {
								toggleDrawing(false);
								setContiDraw(false);
								let arr = lastbb.points.slice(0, lastbb.points.length - 1);
								arr[arr.length - 1] = arr[0];
								lastbb.points = arr;
								annotations.splice(annotations.length - 1, 1);
								let near = annotations.concat([lastbb]);
								history.push(near);
								setHistory(history);
								setAnnotations(near);
							}

							return;
						}

						let obj = annotations[annotations.length - 1];
						// crop(backImage.src,obj.width,obj.height,obj.x,obj.y);
						let newobj = checkBBParameteres(obj);

						annotations.splice(annotations.length - 1, 1);

						history.push(annotations.concat([newobj]));

						setHistory(history);

						setAnnotations(annotations.concat([{ ...newobj, end: true }]));

						toggleDrawing();
					}}
					// onMouseOver={(e) => {
					// 	if (!isDrawing) {
					// 		return;
					// 	}
					// 	if (contidraw == true && cur_ann_type == "") {
					// 		const stage = stageRef.current;
					// 		stage.container().style.cursor = "grabbing";
					// 	}
					// }}
				>
					<BaseImage
						imagetype={props.imagetype}
						imgUrlpath={props.mapData != null ? props.mapData.img_path : null}
					/>
					<Annotations mapData={props.mapData} />
				</Stage>

				{keystate == true ? (
					<div
						id="plane_icon_map2"
						style={{
							transform: `rotate(${rotation}deg)`,
							visibility: "visible",
						}}
					>
						<FontAwesomeIcon icon={faPlane} size="2x" />
					</div>
				) : null}

				{hoverState == true ? (
					<div className="directions">
						<div
							id="uparrowdir"
							className="direc"
							onMouseEnter={handleContiShift({
								type: "top",
								valx: 0,
								valy: -1,
								rotation: -90,
							})}
							onMouseLeave={() => {
								handleInterval();
							}}
							onClick={() => {
								handleToStop();
							}}
						>
							{/* <ArrowUp size={10} style={{margin:"auto"}}  /> */}
						</div>
						<div
							id="downarrowdir"
							className="direc"
							onMouseLeave={() => {
								handleInterval();
							}}
							onMouseEnter={handleContiShift({
								type: "down",
								valx: 0,
								valy: 1,
								rotation: 90,
							})}
							onClick={() => {
								handleToStop();
							}}
						>
							{/* <ArrowDown size={10}    style={{margin:"auto"}}
       
      /> */}
						</div>
						<div
							id="leftarrowdir"
							className="direc"
							onMouseLeave={() => {
								handleInterval();
							}}
							onMouseEnter={handleContiShift({
								type: "left",
								valx: -1,
								valy: 0,
								rotation: -180,
							})}
							onClick={() => {
								handleToStop();
							}}
						>
							{/* <ArrowLeft size={20}  style={{margin:"auto"}}
      
      /> */}
						</div>
						<div
							id="rightarrowdir"
							className="direc"
							onMouseLeave={() => {
								handleInterval();
							}}
							onMouseEnter={handleContiShift({
								type: "right",
								valx: 1,
								valy: 0,
								rotation: 0,
							})}
							onClick={() => {
								handleToStop();
							}}
						>
							{/* <ArrowRight size={20}   style={{margin:"auto"}} 
       /> */}
						</div>

						<div
							id="upleftdir"
							className="direc"
							onMouseLeave={() => {
								handleInterval();
							}}
							onMouseEnter={handleContiShift({
								type: "upleft",
								valx: -1,
								valy: -1,
								rotation: -135,
							})}
							onClick={() => {
								handleToStop();
							}}
						>
							{/* <ArrowRight size={20}   style={{margin:"auto"}} 
       /> */}
						</div>
						<div
							id="downrightdir"
							className="direc"
							onMouseLeave={() => {
								handleInterval();
							}}
							onMouseEnter={handleContiShift({
								type: "downright",
								valx: 1,
								valy: 1,
								rotation: 45,
							})}
							onClick={() => {
								handleToStop();
							}}
						>
							{/* <ArrowRight size={20}   style={{margin:"auto"}} 
       /> */}
						</div>
						<div
							id="uprightdir"
							className="direc"
							onMouseLeave={() => {
								handleInterval();
							}}
							onMouseEnter={handleContiShift({
								type: "upright",
								valx: 1,
								valy: -1,
								rotation: -45,
							})}
							onClick={() => {
								handleToStop();
							}}
						>
							{/* <ArrowRight size={20}   style={{margin:"auto"}} 
       /> */}
						</div>
						<div
							id="downleftdir"
							className="direc"
							onMouseLeave={() => {
								handleInterval();
							}}
							onMouseEnter={handleContiShift({
								type: "downleft",
								valx: -1,
								valy: 1,
								rotation: 135,
							})}
							onClick={() => {
								handleToStop();
							}}
						>
							{/* <ArrowRight size={20}   style={{margin:"auto"}} 
       /> */}
						</div>
						<div
							id="plane_icon_map"
							style={{ transform: `rotate(${rotation}deg)` }}
						>
							<FontAwesomeIcon size="2x" icon={faPlane} />
						</div>
					</div>
				) : null}

				<div
					className="zoom-container"
					style={
						splitCanvas == true
							? { top: "9rem", left: "50%" }
							: { top: "9rem", left: "0%" }
					}
				>
					<Button
						variant="light"
						className="mapbtn"
						// size="sm"
						onClick={() => {
							zoomStage(stageRef.current, 1.2);
						}}
					>
						+
					</Button>
					<Button
						variant="light"
						className="mapbtn"
						// size="sm"
						onClick={() => {
							zoomStage(stageRef.current, 0.8);
						}}
					>
						-
					</Button>
					<Button
						variant="primary"
						className="mapbtn"
						size="sm"
						onClick={() => {
							handlAutoHoverStop();
							if (hoverState == true) {
								handleToStop();
							} else {
								setHoverState();
							}
						}}
					>
						{hoverState == true ? "OFF" : "ON"} Hover
					</Button>
					<Button variant="primary" size="sm" onClick={handleAutohover()}>
						{autohover == true ? "OFF" : "ON"} Auto Hover
					</Button>
					&nbsp;
					<Button
						variant="light"
						size="sm"
						onClick={() => {
							if (hoverLatLngTrue == true) {
								setLatLng(null);
							}
							sethoverLatLngTrue(!hoverLatLngTrue);
						}}
					>
						{hoverLatLngTrue == true ? "OFF" : "ON"} Hover Lat Long
					</Button>
					&nbsp;
					{cur_ann_type == "DL" && isDrawing == true ? (
						<Button variant="danger" size="sm" onClick={handleContiDrawMeasure}>
							{" "}
							Stop
						</Button>
					) : null}
					{/* <Button
						variant="info"
						className="mapbtn"
						size="sm"
						onClick={() => {
							sendInsetDetails();
						}}
					>
						Import Insets
					</Button> */}
				</div>
			</div>
		</React.Fragment>
	);
});
