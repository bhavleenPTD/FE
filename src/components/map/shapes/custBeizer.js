import React from 'react';
import { render } from 'react-dom';
import {
	Stage,
	Layer,
	Rect,
	Transformer,
	Circle,
	Arrow,
	Shape,
	Line,
} from 'react-konva';
import { useStore } from '../../../zustandstore';
import { BB_text } from '../bb_text';
import Portal from '../portal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCross } from '@fortawesome/free-solid-svg-icons';
import './shapeCust.css';
import { Text } from 'react-konva';
import { useState } from 'react';

import shape from '@material-ui/core/styles/shape';
import { Ann_Options } from '../arr_options';

export const CustBeizerLine = React.memo(
	({ shapeProps, isSelected, onSelect, onChange, data, mapData }) => {
		const shapeRef = React.useRef();
		const { cur_ann_type } = useStore();
		const [show, toggle] = useState(false);
		const { annotations, setAnnotations, history, setHistory } = useStore();
		const [anchors, setAnchors] = useState(shapeProps.points);
		const setdata = () => {
			console.log(data);
			let arr = [];
			annotations.forEach((element) => {
				if (element.id != data.id) {
					arr.push(element);
				} else {
					arr.push(data);
				}
			});
			setAnnotations(arr);
		};

		const deletepop = () => {
			let newmpap = annotations.filter((ann, key) => {
				if (ann.id != data.id) {
					return ann;
				}
			});

			history.push(newmpap);
			setHistory(history);
			setAnnotations(newmpap);
		};
		const updateDottedLines = (e) => {
			let dotted = e.target.getLayer().findOne(`#dottedPath${data.id}`);
			dotted.points(anchors.flatMap((p) => [p.x, p.y]));
			e.target.getLayer().batchDraw();
		};

		React.useEffect(() => {}, [isSelected]);

		return (
			<React.Fragment>
				{/* <Arrow
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
       
      /> */}

				{isSelected == true ? (
					<Line
						dash={[10, 10, 0, 10]}
						strokeWidth={
							shapeProps.strokeWidth == null ? 10 : shapeProps.strokeWidth
						}
						stroke="black"
						lineCap="round"
						id={`dottedPath${data.id}`}
						opacity={0.3}
						points={anchors.flatMap((p) => [p.x, p.y])}
					/>
				) : null}

				<Shape
					name="shape"
					ref={shapeRef}
					lineCap="round"
					x={0}
					y={0}
					draggable
					onDragEnd={(e) => {
						let arr = anchors.map((an) => ({
							x: an.x + e.target.x(),
							y: an.y + e.target.y(),
						}));
						e.target.position({ x: 0, y: 0 });
						setAnchors(arr);
					}}
					stroke={shapeProps.stroke}
					strokeWidth={
						shapeProps.strokeWidth == null ? 10 : shapeProps.strokeWidth
					}
					onClick={onSelect}
					onTap={onSelect}
					sceneFunc={(ctx, shape) => {
						ctx.beginPath();
						ctx.moveTo(anchors[0].x, anchors[0].y);
						ctx.bezierCurveTo(
							anchors[1].x,
							anchors[1].y,
							anchors[2].x,
							anchors[2].y,
							anchors[3].x,
							anchors[3].y,
						);
						ctx.fillStrokeShape(shape);
					}}
				/>

				{isSelected == true &&
					anchors.map((anchor, key) => (
						<Circle
							key={key}
							x={anchor.x}
							y={anchor.y}
							//  width={data.width}
							radius={
								shapeProps.strokeWidth == null ? 5 : shapeProps.strokeWidth
							}
							draggable={true}
							opacity={0.4}
							stroke={'black'}
							fill={'blue'}
							onMouseOver={(e) => {
								e.target.setStrokeWidth(shapeProps.strokeWidth);
								e.target.getLayer().batchDraw();
							}}
							onMouseOut={(e) => {
								e.target.setStrokeWidth(2);
								e.target.getLayer().batchDraw();
							}}
							onDragMove={(e) => {
								let obj = anchors[key];
								obj.x = e.target.x();
								obj.y = e.target.y();
								anchors[key] = obj;
								setAnchors(anchors);
								updateDottedLines(e);
							}}
							onDragEnd={(e) => {
								onChange({
									...shapeProps,
									points: anchors,
								});
							}}
						/>
					))}

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
				{/* <Ann_Options deletepop={deletepop} bb={data} show={show} toggle={toggle}
     setdata={setdata} />
 */}
			</React.Fragment>
		);
	},
);
