import React, { useState } from 'react';
import { useRef } from 'react';
import { Layer } from 'react-konva';
import { SubReportImage } from './Image.Mosaic';

export default (props) => {
	const layerRef = useRef();
	const [subreports, setSubReports] = useState(props.data);

	return (
		<React.Fragment>
			<Layer ref={layerRef}>
				{subreports.map((sr, key) => (
					<SubReportImage key={key} data={sr} />
				))}
			</Layer>
		</React.Fragment>
	);
};
