import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AnnotationTable from '../../components/AnnotationTable/AnnotationTable';
import DateShow from '../../components/Date/DateShow';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const editorConfig = {
	toolbar: {
		items: [
			'bulletedList',
			'font',
			'numberedList',
			'|',
			'insertTable',
			'|',
			'fontFamily',
			'undo',
			'redo',
		],
	},

	table: {
		contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
	},

	language: 'en',
};

const Heading = styled.div`
	font-size: 1rem;
	font-weight: 600;
	text-align: center;
	cursor: pointer;
	text-transform: uppercase;
`;

const SubReportContainer = (props) => {
	const { subreport } = props;
	const [collapse, setCollapse] = useState(props.index == 0 ? true : false);
	const [status, setStatus] = useState('Closed');
	const [addData, setAddData] = useState(props.subreport.htmldata);

	const onEntering = () => setStatus('Opening...');

	const onEntered = () => setStatus('Opened');

	const onExiting = () => setStatus('Closing...');

	const onExited = () => setStatus('Closed');

	const toggle = () => setCollapse(!collapse);

	// React.useEffect(()=>{
	//  setCollapse(props.openAll==true?true:collapse)
	// },[props.openAll])

	const updateSubReport = () => {
		console.log('props', props);
		props.updateSubReport({
			...subreport,
			htmldata: addData,
		});
	};

	return (
		<div>
			<div
				onClick={toggle}
				className="d-flex justify-content-between"
				style={{
					color: 'white',
					backgroundColor: '#272A33',
					padding: '10px',
					marginBottom: '0.5rem',
					width: '100%',
				}}
			>
				<div style={{ paddingLeft: '5px' }}>{props.index + 1}</div>
				<Heading> {subreport.sub_location_name}</Heading>
				<div style={{ paddingRight: '5px' }}>
					{collapse == true ? (
						<FontAwesomeIcon icon={faChevronUp} />
					) : (
						<FontAwesomeIcon icon={faChevronDown} />
					)}
				</div>
			</div>

			<Collapse
				isOpen={collapse}
				onEntering={onEntering}
				onEntered={onEntered}
				onExiting={onExiting}
				onExited={onExited}
			>
				<section className="section bg-light" id="features">
					<Container>
						<Row className="vertical-content justify-content-around">
							<Col lg={5}>
								<div className="features-box">
									<h3>{subreport.sub_location_name}</h3>
									<p
										className="text-muted web-desc"
										style={{ wordWrap: 'break-word' }}
									>
										{subreport.description}
									</p>
									<ul className="text-muted list-unstyled margin-t-30 features-item-list">
										<li className="">Latitude : {subreport.lat}° N </li>
										<li className="">Longitude : {subreport.long}° E </li>
										<li className="">
											Sub Report Submitted On : &nbsp;{' '}
											<DateShow date={subreport.createdAt} />{' '}
										</li>
									</ul>

									<AnnotationTable ann={subreport.annotations} />

									{/* <Link to="#" className="btn btn-custom margin-t-30 waves-effect waves-light">Edit
                                     <i className="mdi mdi-arrow-right"></i></Link> */}
								</div>
							</Col>
							<Col lg={6}>
								<div className="features-right text-right">
									<img
										src={subreport.thumbnail_path}
										alt="Map"
										className="img-fluid"
									/>
								</div>
							</Col>
						</Row>
					</Container>
					<div>
						<div
							className="d-flex justify-content-between"
							style={{
								color: 'white',
								backgroundColor: '#272A33',
								padding: '10px',
								marginBottom: '0.5rem',
								width: '100%',
							}}
						>
							<div style={{ paddingLeft: '5px' }}>Additional Data</div>
						</div>
						<CKEditor
							config={editorConfig}
							editor={ClassicEditor}
							data={addData}
							onReady={(editor) => {
								// You can store the "editor" and use when it is needed.
								console.log('Editor is ready to use!', editor);
							}}
							onChange={(event, editor) => {
								const data = editor.getData();
								setAddData(data);
								console.log({ event, editor, data });
							}}
							// onBlur={ ( event, editor ) => {
							//     console.log( 'Blur.', editor );
							// } }
							// onFocus={ ( event, editor ) => {
							//     console.log( 'Focus.', editor );
							// } }
						/>
					</div>
					<div style={{ marginTop: '1rem' }}>
						<Button onClick={updateSubReport} outline color="success">
							Update
						</Button>
						{/* {' '}<Button onClick={deleteSubReport} outline color="danger">Delete</Button> */}
					</div>
				</section>
			</Collapse>
		</div>
	);
};

export default SubReportContainer;
