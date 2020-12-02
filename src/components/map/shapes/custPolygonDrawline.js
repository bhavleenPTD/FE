import React from 'react';
import { Circle, Line } from 'react-konva';
import { CONSTANTS } from '../modal';
import './shapeCust.css';

export const CustPolygonLine = React.memo(({ shapeProps }) => {
	const areIntersecting = (p2, p1) => {
		let curd = Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
		if (curd > Math.pow(shapeProps.strokeWidth, 2)) {
			return false;
		}
		return true;
	};

	return (
		<React.Fragment>
			<Line
				{...shapeProps}
				points={shapeProps.points.flatMap((p) => [p.x, p.y])}
				stroke={shapeProps.stroke}
				strokeWidth={
					shapeProps.strokeWidth == null ? 5 : shapeProps.strokeWidth
				}
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
					stroke="black"
					radius={shapeProps.strokeWidth == null ? 5 : shapeProps.strokeWidth}
					fill="blue"
					rotateEnabled={false}
					strokeWidth={
						i == 0 &&
						shapeProps.points.length > 2 &&
						areIntersecting(
							shapeProps.points[shapeProps.points.length - 1],
							shapeProps.points[0],
						) == true
							? shapeProps.strokeWidth + 10
							: 0
					}
				/>
			))}
		</React.Fragment>
	);
});
