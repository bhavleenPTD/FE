import React from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Transformer, Circle } from 'react-konva';
import { useStore } from '../../../zustandstore';
import { BB_text } from '../bb_text';
import Portal from '../portal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCross } from '@fortawesome/free-solid-svg-icons';
import './shapeCust.css';
import { Text } from 'react-konva';
import { useState } from 'react';
import { Text_Options } from '../text_options';

export const CustText = React.memo(
	({ shapeProps, isSelected, onSelect, onChange, data, mapData }) => {
		const shapeRef = React.useRef();
		const trRef = React.useRef();
		const { cur_ann_type } = useStore();
		const [show, toggle] = useState(false);
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
			console.log('AAA', annotations);
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
			if (isSelected && cur_ann_type == null) {
				// we need to attach transformer manually

				trRef.current.nodes([shapeRef.current]);
				trRef.current.getLayer().batchDraw();
			}
		}, [isSelected]);

		return (
			<React.Fragment>
				<Rect
					name="shape"
					perfectDrawEnabled={false}
					fill="white"
					opacity={0.4}
					{...shapeProps}
					strokeWidth={50}
					//height={shapeProps.fontSize}
					// height={
					// 	shapeProps.height > shapeProps.fontSize
					// 		? shapeProps.height
					// 		: shapeProps.fontSize
					// }
				/>
				<Text
					name="shape"
					perfectDrawEnabled={false}
					onClick={onSelect}
					onTap={onSelect}
					onDblClick={() => {
						toggle(!show);
					}}
					ref={shapeRef}
					{...shapeProps}
					stroke={'whitesmoke'}
					strokeWidth={shapeProps.strokeWidth / 10}
					draggable
					fill={shapeProps.stroke}
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
							width: Math.max(node.width() * scaleX, 5),
							height: Math.max(node.height() * scaleY),

							rotation: node.rotation(),
							// set minimal value
						});
					}}
				/>
				{isSelected && (
					<Transformer
						ref={trRef}
						enabledAnchors={['middle-left', 'middle-right']}
						boundBoxFunc={(oldBox, newBox) => {
							// limit resize

							return newBox;
						}}
					/>
				)}
				<Text_Options
					mapData={mapData}
					bb={data}
					show={show}
					toggle={toggle}
					deletepop={deletepop}
					setdata={setdata}
				/>
			</React.Fragment>
		);
	},
);
