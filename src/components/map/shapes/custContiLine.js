import React from 'react';
import './shapeCust.css';
import { CONSTANTS } from '../modal';
import { Circle, Line } from 'react-konva';

export const CustConLine = React.memo(({ shapeProps }) => {
	//   React.useEffect(() => {

	//     if (isSelected && cur_ann_type==null) {
	//       // we need to attach transformer manually

	//       trRef.current.nodes([shapeRef.current]);
	//       trRef.current.getLayer().batchDraw();
	//     }
	//   }, [isSelected]);

	return (
		<React.Fragment>
			<Line
				{...shapeProps}
				points={shapeProps.points.flatMap((p) => [p.x, p.y])}
				stroke={shapeProps.stroke}
				lineCap="round"
				//   globalCompositeOperation={
				//     bb.tool === 'eraser' ? 'destination-out' : 'source-over'
				//   }
			/>
			{shapeProps.points.map((coord, i) => (
				<Circle
					x={coord.x}
					y={coord.y}
					key={i}
					strokeWidth={
						shapeProps.strokeWidth == null ? 5 : shapeProps.strokeWidth
					}
					radius={shapeProps.strokeWidth == null ? 5 : shapeProps.strokeWidth}
					fill="blue"
					rotateEnabled={false}
				/>
			))}
		</React.Fragment>
	);
});
