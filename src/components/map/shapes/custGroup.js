import React from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Transformer, Circle, Text } from 'react-konva';
import { useStore } from '../../../zustandstore';
import { BB_text } from '../bb_text';
import Portal from '../portal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCross } from '@fortawesome/free-solid-svg-icons';
import './shapeCust.css';
import { useState } from 'react';

export const CustGroup = React.memo(
	({ shapeProps, isSelected, onSelect, onChange, data, mapData }) => {
		const shapeRef = React.useRef();
		const trRef = React.useRef();

		const { cur_ann_type } = useStore();
		const [show, toggle] = useState(false);
		const { annotations, setAnnotations } = useStore();
		const hideOptions = useStore((s) => s.hideOptions);

		const checkOutside = (ann, x, y, x2, y2) => {
			if (ann.type == 'R' || ann.type == 'T') {
				if (ann.x < x || ann.y < y || ann.x > x2 || ann.y > y2) {
					return true;
				}
			} else if (ann.type == 'E') {
				if (ann.x < x || ann.y < y || ann.x > x2 || ann.y > y2) {
					return true;
				}
			} else {
				if (
					ann.points[0].x < x ||
					ann.points[0].y < y ||
					ann.points[0].x > x2 ||
					ann.points[0].y > y2
				) {
					return true;
				}
			}
			return false;
		};
		const deletepop = () => {
			let inboundx = data.x;
			let inboundy = data.y;
			let outboundx = data.x + data.width;
			let outboundy = data.y + data.height;
			let newmpap = annotations.filter((ann, key) => {
				if (
					ann.id != data.id &&
					checkOutside(ann, inboundx, inboundy, outboundx, outboundy) == true
				) {
					return ann;
				}
			});

			setAnnotations(newmpap.filter((ann) => ann.id != data.id));
		};

		// React.useEffect(() => {

		//   // if (isSelected && cur_ann_type==null) {
		//   //   // we need to attach transformer manually

		//   //   trRef.current.nodes([shapeRef.current]);
		//   //   trRef.current.getLayer().batchDraw();
		//   // }
		// });

		return (
			<React.Fragment>
				{hideOptions == false ? (
					<Rect
						name="shape"
						perfectDrawEnabled={false}
						onClick={onSelect}
						dash={[33, 10]}
						onTap={onSelect}
						onDblClick={() => {
							toggle(!show);
						}}
						ref={shapeRef}
						{...shapeProps}
						stroke="red"
						draggable={cur_ann_type == null ? true : false}
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
				) : null}

				{hideOptions == false ? (
					<Circle
						x={shapeProps.x}
						y={shapeProps.y}
						name="cross_remove"
						radius={
							shapeProps.strokeWidth == null ? 20 : shapeProps.strokeWidth * 2
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

				{hideOptions == false ? (
					<Text
						name="cross_remove"
						x={shapeProps.x}
						y={shapeProps.y}
						fontSize={
							shapeProps.strokeWidth == null ? 20 : shapeProps.strokeWidth + 20
						}
						fill="white"
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
			</React.Fragment>
		);
	},
);
