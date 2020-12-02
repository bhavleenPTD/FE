import React, { useState } from 'react';

import { PDFViewer } from '@react-pdf/renderer';
import MyDocument from './printreport';
import LoadingScreen from 'react-loading-screen';
import PDF from 'react-pdf-watermark';

const PrintPreview = (props) => {
	const [loading, setLoading] = useState(true);

	const pdfloaded = () => {
		setLoading(false);
	};

	return (
		<div
			id="pdf"
			style={
				loading == true
					? {
							marginTop: '5.5rem',
							display: 'flex',
							height: '90vh',
							Zindex: '-1',
					  }
					: null
			}
		>
			<LoadingScreen
				loading={loading}
				bgColor="#f1f1f1"
				spinnerColor="#9ee5f8"
				textColor="#676767"
				text="Loading PDF"
			>
				<div id="pdfview_here">
					<PDFViewer >
						<MyDocument pdfloaded={pdfloaded} data={props.location.state} />
					</PDFViewer>
				</div>
			</LoadingScreen>
		</div>
	);
};

export default PrintPreview;
