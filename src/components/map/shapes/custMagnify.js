import React from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Transformer, Circle } from 'react-konva';
import { useStore } from '../../../zustandstore';
import { BB_text } from '../bb_text';
import Portal from '../portal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCross } from '@fortawesome/free-solid-svg-icons';
import './shapeCust.css';
import ReactImageMagnify from 'react-image-magnify';
import { Text } from 'react-konva';
import { useState } from 'react';

export const CustMagnify = React.memo(
	({ shapeProps, isSelected, onSelect, onChange, data, mapData }) => {
		const shapeRef = React.useRef();
		const trRef = React.useRef();
		const textShapeRef = React.useRef();
		const { cur_ann_type } = useStore();
		const hideOptions = useStore((s) => s.hideOptions);
		const [show, toggle] = useState(false);
		const ttRef = React.useRef();
		const [textSelected, setTextSelected] = useState(false);
		const { annotations, setAnnotations, history, setHistory } = useStore();

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

		React.useEffect(() => {
			if (isSelected && textSelected == false && cur_ann_type == null) {
				trRef.current.nodes([shapeRef.current]);
				trRef.current.getLayer().batchDraw();
			}

			if (textSelected && cur_ann_type == null) {
				ttRef.current.nodes([textShapeRef.current]);
				ttRef.current.getLayer().batchDraw();
			}
			if (isSelected == false) {
				setTextSelected(false);
			}
		}, [isSelected]);

		const handleClick = (e) => {
			setTextSelected(true);
			onSelect();
		};

		return (
			<React.Fragment>
			
				<Rect
					name="shape"
					perfectDrawEnabled={false}
					onClick={onSelect}
					onTap={onSelect}
					onDblClick={() => {
						toggle(!show);
					}}
					ref={shapeRef}
					{...shapeProps}
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
					draggable
					onDragEnd={(e) => {
						onChange({
							...shapeProps,
							x: e.target.x(),
							y: e.target.y(),
						});
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
							width: Math.max(5, node.width() * scaleX),
							height: Math.max(node.height() * scaleY),
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
						name="cross_remove"
						x={shapeProps.x}
						y={shapeProps.y}
						radius={
							shapeProps.strokeWidth == null ? 25 : shapeProps.strokeWidth * 2
						}
						fill="black"
						align="right"
						zIndex={2}
						onClick={deletepop}
						rotation={data.rotation}
						offset={{
							x: -shapeProps.width,
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
							shapeProps.strokeWidth == null ? 20 : shapeProps.strokeWidth * 2
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
							x: -shapeProps.width + shapeProps.strokeWidth / 3,
							y: shapeProps.strokeWidth / 2,
						}}
						text={'x'}
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
	},
);
