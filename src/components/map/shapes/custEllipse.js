import React, { useState } from 'react';
import { render } from 'react-dom';
import {
	Stage,
	Layer,
	Rect,
	Transformer,
	Circle,
	Ellipse,
	Text,
} from 'react-konva';
import { BB_text } from '../bb_text';
import { useStore } from '../../../zustandstore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCross } from '@fortawesome/free-solid-svg-icons';
import { X } from 'react-bootstrap-icons';
import './shapeCust.css';
export const CustEllipse = ({
	shapeProps,
	isSelected,
	onSelect,
	onChange,
	data,
	mapData,
}) => {
	const shapeRef = React.useRef();
	const trRef = React.useRef();
	const textShapeRef = React.useRef();
	const ttRef = React.useRef();
	const [show, toggle] = useState(false);
	const { hideOptions } = useStore();
	const { cur_ann_type } = useStore();
	const [textSelected, setTextSelected] = useState(false);
	const { annotations, setAnnotations, history, setHistory } = useStore();

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

	React.useEffect(() => {
		if (isSelected && textSelected == false && cur_ann_type == null) {
			trRef.current.nodes([shapeRef.current]);
			trRef.current.getLayer().batchDraw();
		}

		if (isSelected == false) {
			setTextSelected(false);
		}
	}, [isSelected, textSelected]);

	React.useEffect(() => {
		if (textSelected && cur_ann_type == null) {
			ttRef.current.nodes([textShapeRef.current]);
			ttRef.current.getLayer().batchDraw();
		}
	}, [textSelected]);

	const handleClick = (e) => {
		setTextSelected(true);
		onSelect();
	};

	return (
		<React.Fragment>
			<BB_text
				onChange={onChange}
				textShapeRef={textShapeRef}
				ttRef={ttRef}
				textSelected={textSelected}
				handleClick={handleClick}
				mapData={mapData}
				bb={data}
				show={show}
				toggle={toggle}
				deletepop={deletepop}
				setdata={setdata}
			/>
			<Ellipse
				name="shape"
				onClick={onSelect}
				onTap={onSelect}
				ref={shapeRef}
				onDblClick={() => {
					toggle(!show);
				}}
				lineCap={'round'}
				dash={
					shapeProps.stroketype == 'plain'
						? []
						: shapeProps.stroketype == 'dotted'
						? [0.001, 10]
						: shapeProps.stroketype == 'dashed'
						? [20, 12]
						: []
				}
				{...shapeProps}
				draggable
				onDragEnd={(e) => {
					onChange({
						...shapeProps,
						x: e.target.x(),
						y: e.target.y(),
					});
				}}
				offset={{
					x: -shapeProps.radiusX,
					y: -shapeProps.radiusY,
				}}
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
						rotation: node.rotation(),
						// set minimal value
						radiusX: Math.max(5, node.radiusX() * scaleX),
						radiusY: Math.max(node.radiusY() * scaleY),
					});
				}}
			/>

			{isSelected == false && hideOptions == false ? (
				<Circle
					//  x={data.x}
					//  y={data.y}
					// //  width={data.width}
					//  radius={5}

					//  offset={
					//   {
					//       x:data.width/2-10,
					//       y:0

					//   }

					//  }
					x={shapeProps.x}
					y={shapeProps.y}
					radius={shapeProps.strokeWidth == null ? 20 : shapeProps.strokeWidth}
					fill="black"
					align="right"
					zIndex={2}
					onClick={deletepop}
					rotation={data.rotation}
					offset={{
						x: -shapeProps.radiusX * 2,
						y: 0,
					}}
					opacity={0.4}
				/>
			) : null}

			{isSelected == false && hideOptions == false ? (
				<Text
					name="cross_remove"
					x={shapeProps.x}
					y={shapeProps.y}
					fontSize={
						shapeProps.strokeWidth == null ? 20 : shapeProps.strokeWidth
					}
					fill="white"
					strokeWidth={
						shapeProps.strokeWidth == null ? 10 : shapeProps.strokeWidth
					}
					align="right"
					zIndex={2}
					onClick={deletepop}
					rotation={data.rotation}
					offset={{
						x: -shapeProps.radiusX * 2 + shapeProps.strokeWidth / 3,
						y: shapeProps.strokeWidth / 2,
					}}
					text={'X'}
			
				/>
			) : null}

			{isSelected && (
				<Transformer
					ref={trRef}
					boundBoxFunc={(oldBox, newBox) => {
						// limit resize

						return newBox;
					}}
				/>
			)}
		</React.Fragment>
	);
};
