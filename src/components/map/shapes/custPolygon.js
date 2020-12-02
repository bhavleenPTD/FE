import React, { useState, useEffect } from 'react';
import Konva from 'konva';
import { Stage, Layer, Line, Circle, Transformer } from 'react-konva';
import { BB_text } from '../bb_text';
import { useStore } from '../../../zustandstore';
import { X } from 'react-bootstrap-icons';
import _ from 'lodash';

export const CustPolygon = ({
	shapeProps,
	isSelected,
	onSelect,
	onChange,
	data,
	mapData,
}) => {
	const trRef = React.useRef();
	const polyRef = React.useRef();
	const circleRef = React.useRef();
	const textShapeRef = React.useRef();
	const ttRef = React.useRef();
	const [textSelected, setTextSelected] = useState(false);
	const [show, toggle] = useState(false);
	const [points, setPoints] = useState(shapeProps.points);
	const [selected, setSelected] = useState(false);

	const { cur_ann_type } = useStore();
	const { annotations, setAnnotations, history, setHistory } = useStore();
	const setdata = () => {
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

	useEffect(() => {
		// if (selected && isSelected) {
		//   trRef.current.nodes([polyRef.current]);
		//   trRef.current.getLayer().batchDraw();
		// }

		if (polyRef.current) {
			polyRef.current.zIndex(0);
		}

		if (circleRef.current) {
			circleRef.current.zIndex(1);
		}

		if (textSelected && cur_ann_type == null) {
			ttRef.current.nodes([textShapeRef.current]);
			ttRef.current.getLayer().batchDraw();
		}
		if (isSelected == false) {
			setTextSelected(false);
		}
	}, [selected, isSelected, textSelected]);

	function handleMouseDown(e) {
		console.log(e.target);
		const clickedOnPoly = e.target instanceof Konva.Line;
		if (clickedOnPoly) {
			setSelected(true);
		}

		if (e.target.name != 'shape') {
			setSelected(false);
		}
	}

	function handleCircleDrag(e, key) {
		let obj = points[key];
		obj.x = e.target.x();
		obj.y = e.target.y();
		points[key] = obj;

		setPoints(points);
	}
	const handleClick = (e) => {
		setTextSelected(true);
		onSelect();
	};

	const updateDottedLines = (e) => {
		let dotted = e.target.getLayer().findOne(`#polyPath${data.id}`);
		dotted.points(points.flatMap((p) => [p.x, p.y]));
		e.target.getLayer().batchDraw();
	};

	return (
		<React.Fragment>
			{/* <BB_text onChange={onChange}  textShapeRef={textShapeRef} ttRef={ttRef} 
    textSelected={textSelected} handleClick={handleClick}  mapData={mapData} bb={data}  show={show} toggle={toggle}
     deletepop={deletepop} setdata={setdata}
    
    /> */}

			<Line
				closed
				draggable
				id={`polyPath${data.id}`}
				ref={polyRef}
				name="shape"
				onClick={onSelect}
				onDblClick={() => {
					toggle(!show);
				}}
				onTap={onSelect}
				dash={
					shapeProps.stroketype == 'plain'
						? []
						: shapeProps.stroketype == 'dotted'
						? [0.001, 10]
						: shapeProps.stroketype == 'dashed'
						? [20, 12]
						: []
				}
				stroke={shapeProps.stroke}
				strokeWidth={shapeProps.strokeWidth}
				points={points.flatMap((p) => [p.x, p.y])}
				onMouseDown={handleMouseDown}
				onDragEnd={(e) => {
					let arr = points.map((an) => ({
						x: an.x + e.target.x(),
						y: an.y + e.target.y(),
					}));
					e.target.position({ x: 0, y: 0 });
					setPoints(arr);
					onChange({
						...shapeProps,
						points: arr,
					});
				}}
			/>
			{isSelected == true &&
				points.map((coord, i) => (
					<Circle
						ref={circleRef}
						x={coord.x}
						name="shape"
						y={coord.y}
						key={i}
						onMouseDown={handleMouseDown}
						radius={shapeProps.strokeWidth + 10}
						fill="blue"
						rotateEnabled={false}
						draggable
						onDragMove={(e) => {
							handleCircleDrag(e, i);
							updateDottedLines(e);
						}}
						onDragEnd={(e) => {
							onChange({
								...shapeProps,
								points: points,
							});
						}}
					/>
				))}
		</React.Fragment>
	);
};
