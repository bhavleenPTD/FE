import React, { createRef } from 'react';
import Footer from '../../components/Footer/footer';
import {
	Button,
	Container,
	Row,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	FormGroup,
	Input,
	Label,
} from 'reactstrap';

import { ListGroup } from 'react-bootstrap';
import SectionTitle from '../../components/common/section-title';
import SubReportContainer from './subreportContainer';
import PrevSubReportContainer from './prevSubReportContainer';
import { EmpHTTP } from '../../components/Interceptors/empInterceptor';
import { URL } from '../../modal/url';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import DateShow from '../../components/Date/DateShow';
import UserProfile from '../../components/UserProfile/UserProfile';
import VideoPreview from './videopreview';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
	Formik,
	useFormik,
	Form,
	Field,
	FieldArray,
	FastField,
	ErrorMessage,
} from 'formik';
import AutoComplete from '@material-ui/lab/Autocomplete';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import * as Yup from 'yup';
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { html2json } from 'html2json';

const Heading = styled.div`
	font-size: 3rem;
	font-weight: 600;
	text-align: center;
	text-transform: uppercase;
`;

const ReportSchema = Yup.object().shape({
	secret: Yup.string()
		.min(2, 'Too Short!')
		.max(25, 'Too Long!')
		.required('Required')
		.nullable(),
	date: Yup.date().required('Required').nullable(),
	resolution: Yup.number().required('Required').nullable(),
	orbit_no: Yup.number().required('Required').nullable(),
	sensor_id: Yup.string().required('Required').nullable(),
	s_reportId: Yup.string().required('Required').nullable(),
	areas: Yup.string().required('Required').nullable(),
	target_reported: Yup.string().required('Required').nullable(),
	indent_reference: Yup.string().required('Required').nullable(),
});

class ReportPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			report: null,
			selectedImages: [],
			subreports: [],
			modal: false,
			summary: null,
			conpleted: true,
			videoModal: false,
			allReports: [],
			prevReport: [],
			prevFullReport: [],
			prevSubReport: [],
			prevReportXML: [],
			importData: {},
			form: {
				secret: 'secret',
				date: new Date(),
				resolution: null,
				orbit_no: null,
				sensor: null,
				s_reportId: null,
				areas: null,
				target_reported: null,
				indent_reference: null,
				designation: null,
				addresses: null,
				rep_name: null,
				soft_copy_details: null,
			},
			main_image: `maps/${localStorage.getItem(
				'locationMap',
			)}/${localStorage.getItem('main_image')}.jpg`,
		};
	}

	generatepdf = () => {
		console.log(this.state);
		this.props.history.push({
			pathname: `/dashboard/printReport`,
			state: {
				main_image: this.state.main_image,
				report: this.state.report,
				subreports: this.state.subreports,
				summary: this.state.summary,
			},
		});
	};

	
	generateMosaic = () => {
		this.props.history.push({
			pathname: `/dashboard/mosaic`,
			state: {
				main_image: this.state.main_image,
				report: this.state.report,
				subreports: this.state.subreports,
				summary: this.state.summary,
			},
		});
	};

	getPreviousReport = async (val) => {
		const data = { location_name: val };
		console.log('D', data);
		const res = await EmpHTTP.post(URL.GET_PREVIOUS_REPORT, data);
		try {
			console.log('PRD', res.data.reports);
			this.setState({
				prevReport: res.data.reports,
			});
		} catch (error) {
			console.log('PRD', error);
		}
	};

	on;

	// savSummary = async () => {
	// 	try {
	// 		let data = await EmpHTTP.post(URL.SAVE_SUMMARY_MAP, {
	// 			_id: this.state.report._id,
	// 			summary: this.state.summary,
	// 		});

	// 		let resp_data = data.data;

	// 		if (resp_data.status == true) {
	// 			toast.success('Summary Updated');
	// 			this.setState({
	// 				...this.state,
	// 				summary: resp_data.rp.summary,
	// 			});
	// 		} else {
	// 			throw new Error('Empty Data');
	// 		}
	// 	} catch (err) {
	// 		if (err.response) {
	// 			toast.error(err.response.data.message);
	// 		} else if (err.message) {
	// 			toast.error(err.message);
	// 		} else {
	// 			toast.error(err);
	// 		}
	// 	}
	// };

	getReportData = async () => {
		const {
			match: { params },
		} = this.props;
		console.log(params);
		if (params != null && params.id != 'null') {
			try {
				let data = await EmpHTTP.post(URL.GET_REPORT_FULL_DATA, {
					id: params.id,
				});

				let resp_data = data.data;

				if (resp_data.status == true) {
					//  console.log(resp_data);
					this.setState({
						...this.state,
						completed: resp_data.rp.report.completed,
						report: resp_data.rp.report,
						form: {
							secret: resp_data.rp.report.confidentiality,
							date:
								resp_data.rp.report.xml != null &&
								resp_data.rp.report.xml.d_o_p != null
									? resp_data.rp.report.xml.d_o_p
									: new Date(),
							resolution:
								resp_data.rp.report.xml != null &&
								resp_data.rp.report.xml.resolution != null
									? resp_data.rp.report.xml.resolution
									: 0,
							orbit_no:
								resp_data.rp.report.xml != null &&
								resp_data.rp.report.xml.orbit_no != null
									? resp_data.rp.report.xml.orbit_no
									: 0,
							sensor_id:
								resp_data.rp.report.xml != null &&
								resp_data.rp.report.xml.sensor_id != null
									? resp_data.rp.report.xml.sensor_id
									: null,
							s_reportId: resp_data.rp.report.s_reportId,
							areas: resp_data.rp.report.areas,
							target_reported: resp_data.rp.report.target_reported,
							indent_reference: resp_data.rp.report.indent_reference,
							agency: resp_data.rp.report.agency,
							designation: resp_data.rp.report.designation,
							addresses: resp_data.rp.report.addresses,
							rep_name: resp_data.rp.report.rep_name,
							soft_copy_details: resp_data.rp.report.soft_copy_details,
						},
						summary: resp_data.rp.report.summary,
						subreports: [].concat(resp_data.rp.subreports),
					});
					this.getPreviousReport(resp_data.rp.report.location_name);
				} else {
					throw new Error('Empty Data');
				}
			} catch (err) {
				console.log(err.response);
				if (err.response) {
					toast.error(err.response.data.message);
				} else if (err.message) {
					toast.error(err.message);
				} else {
					toast.error('Error Occured');
				}
			}
		} else {
			this.props.history.push('/dashboard/locations');
		}
	};

	markcomplete = async () => {
		try {
			let data = await EmpHTTP.post(URL.MARK_REPORT_COMPLETE, {
				id: this.state.report._id,
			});

			let resp_data = data.data;

			if (resp_data.status == true) {
				this.toggle();
				toast.success('Report Marked Completed');
				this.setState({
					...this.state,
					completed: true,
				});
			} else {
				throw new Error('Empty Data');
			}
		} catch (err) {
			if (err.response) {
				toast.error(err.response.data.message);
			} else if (err.message) {
				toast.error(err.message);
			} else {
				toast.error(err);
			}
		}
	};

	handleChange = (e) => {
		this.setState({
			...this.state,
			[e.target.name]: e.target.value,
		});
	};

	toggle = () => {
		this.setState({
			...this.state,
			modal: !this.state.modal,
		});
	};
	setSelectedImages = (val) => {
		this.setState({
			...this.state,
			selectedImages: [].concat(val),
		});
	};

	toggleVideoModal = () => {
		//change
		this.setState({
			...this.state,
			videoModal: !this.state.videoModal,
		});
	};

	setUser = (user) => {
		this.setState({
			...this.state,
			report: {
				...this.state.report,
				empName: user.name,
			},
		});
	};

	updateSubReport = async (data) => {
		//backend call to update html data
		console.log('DATA', data);
		const res = await EmpHTTP.post(URL.UPDATE_HTML_DATA, data);
		try {
			console.log(res);
			toast.success('Report data updated successfully');
			setTimeout(function () {
				window.location.reload();
			}, 3000);
		} catch (error) {
			console.log(error);
			toast.success('Network Error !!!');
		}
	};

	updateReport = async (report) => {
		try {
			let data = await EmpHTTP.post(URL.UPDATE_REPORT_DATA_INFO, {
				_id: this.state.report._id,
				...report,
			});
			let updated_report = data.data;
			if (updated_report.status == true) {
				console.log(updated_report.map);
				toast.success('Updated Successfully');
				setTimeout(function () {
					window.location.reload();
				}, 3000);
			} else {
				toast.error('Error Occurred');
			}
		} catch (err) {
			if (err.response) {
				toast.error(err.response.data.message);
			} else if (err.message) {
				toast.error(err.message);
			} else {
				toast.error(err);
			}
		}
	};
	componentDidMount() {
		this.getReportData();
		this.getPreviousReport();
	}

	handleChangeSel = (e) => {
		//console.log('selected', e.target.value, this.state.prevReport);
		const selPrevReport = this.state.prevReport.filter((ele) => {
			return ele._id == e.target.value;
		});
		this.setState({ prevFullReport: selPrevReport });
		console.log('selected', e.target.value, selPrevReport);
		this.getPreviousReportbyId(e.target.value);
	};

	getPreviousReportbyId = async (id) => {
		let data = await EmpHTTP.post(URL.GET_REPORT_FULL_DATA, {
			id: id,
		});
		try {
			this.setState({
				prevFullReport: data.data.rp.report,
				prevSubReport: data.data.rp.subreports,
				prevReportXML: data.data.rp.report.xml,
				importData: {
					confidentiality: data.data.rp.report,
					sensor_id: data.data.rp.report.xml.sensor_id,
					resolution: data.data.rp.report.xml.resolution,
					orbit_no: data.data.rp.report.xml.orbit_no,
					date: data.data.rp.report.createdAt,
					s_reportId: data.data.rp.report.s_reportId,
					target_reported: data.data.rp.report.target_reported,
					indent_reference: data.data.rp.report.indent_reference,
					areas: data.data.rp.report.areas,
					agency: data.data.rp.report.agency,
					designation: data.data.rp.report.designation,
					addresses: data.data.rp.report.addresses,
					rep_name: data.data.rp.report.rep_name,
					soft_copy_details: data.data.rp.report.soft_copy_details,
				},
			});
			console.log('DATA', this.state.prevSubReport);
		} catch (error) {
			console.log(error);
		}
	};

	importDataFunc = () => {
		try {
			this.setState({
				form: {
					secret: this.state.importData.confidentiality,
					date:
						this.state.importData.createdAt != null
							? this.state.importData.createdAt
							: new Date(),
					resolution:
						this.state.importData.resolution != null
							? this.state.importData.resolution
							: 0,
					orbit_no:
						this.state.importData.orbit_no != null
							? this.state.importData.orbit_no
							: 0,
					sensor_id:
						this.state.importData.sensor_id != null
							? this.state.importData.sensor_id
							: null,
					s_reportId:
						this.state.importData.s_reportId != null
							? this.state.importData.s_reportId
							: 0,
					areas: this.state.importData.areas,
					target_reported:
						this.state.importData.target_reported != null
							? this.state.importData.target_reported
							: null,
					indent_reference:
						this.state.importData.indent_reference != null
							? this.state.importData.indent_reference
							: null,
					agency:
						this.state.importData.agency != null
							? this.state.importData.agency
							: null,
					designation:
						this.state.importData.designation != null
							? this.state.importData.designation
							: null,
					addresses: this.state.importData.addresses,
					rep_name:
						this.state.importData.rep_name != null
							? this.state.importData.rep_name
							: null,
					soft_copy_details:
						this.state.importData.soft_copy_details != null
							? this.state.importData.soft_copy_details
							: null,
				},
			});
			toast.success('Import Successful');
		} catch (error) {
			toast.error('Import Failed !');
		}
	};

	render() {
		return (
			<div>
				<section
					className="section bg-light"
					style={{ paddingTop: '7rem' }}
					id="blog"
				>
					<Container>
						{/* section title */}
						<SectionTitle title={'Report Section'} desc={'View Report'} />
					</Container>
					<div style={{ marginLeft: '15rem' }}>
						{this.state.report != null ? (
							<div>
								<Button
									disabled={this.state.report.empName == null}
									color="danger"
									onClick={() => {
										this.props.history.push('/dashboard/locations');
									}}
								>
									Back To Locations
								</Button>{' '}
								&nbsp;
								<Button
									disabled={this.state.report.empName == null}
									color="danger"
									onClick={() => {
										this.generatepdf();
									}}
								>
									Generate pdf
								</Button>{' '}
								&nbsp;
								<Button
									color={this.state.completed == false ? 'primary' : 'light'}
									disabled={this.state.completed == true}
									onClick={this.toggle}
								>
									{this.state.completed == false
										? 'Mark As Completed'
										: 'Report Marked As Completed'}{' '}
								</Button>
								&nbsp;
								<Button
									disabled={this.state.report.empName == null}
									color="success"
									onClick={this.toggleVideoModal}
								>
									Inset View
								</Button>
								&nbsp;
								<Button
									disabled={this.state.report.empName == null}
									color="success"
									onClick={this.generateMosaic}
								>
									Mosaic View
								</Button>
								&nbsp;
								{/* <Button
									disabled={this.state.report.empName == null}
									color="warning"
									onClick={this.generateMosaic}
								>
									Import Previous Reports
								</Button> */}
								{this.state.report.empName != null ? (
									<Modal
										centered={true}
										style={{ maxWidth: '90%' }}
										isOpen={this.state.videoModal}
										toggle={this.toggleVideoModal}
									>
										<ModalHeader toggle={this.toggleVideoModal}>
											Inset View
										</ModalHeader>
										<ModalBody>
											<VideoPreview
												setSelectedImages={this.setSelectedImages}
												selectedImages={this.state.selectedImages}
												report={this.state.report}
												subreports={this.state.subreports}
												main_image={this.state.main_image}
											/>
										</ModalBody>
										{/* <ModalFooter>
                                        <Button color="success" onClick={()=>this.markcomplete()}>Yes</Button>{' '}
                                        <Button color="danger" onClick={this.toggle}>Cancel</Button>
                                    </ModalFooter> */}
									</Modal>
								) : null}
								<Modal
									centered={true}
									size="md"
									isOpen={this.state.modal}
									toggle={this.toggle}
								>
									<ModalHeader toggle={this.toggle}>
										Confirmation Prompt
									</ModalHeader>
									<ModalBody>
										Are you sure you want to mark this report as completed , if
										once marked you would not be able to edit it later?
									</ModalBody>
									<ModalFooter>
										<Button color="success" onClick={() => this.markcomplete()}>
											Yes
										</Button>{' '}
										<Button color="danger" onClick={this.toggle}>
											Cancel
										</Button>
									</ModalFooter>
								</Modal>
								<div
									id="report_div"
									style={{ padding: '10px', marginRight: '5rem' }}
								>
									<div className="d-flex justify-content-between">
										<Heading>{this.state.report.location_name}</Heading>
										<div className="d-flex">
											<div style={{ margin: 'auto' }}>
												Created On : &nbsp;{' '}
												<DateShow date={this.state.report.createdAt} />
											</div>
										</div>
									</div>
									<div>
										<ListGroup variant="flush">
											<ListGroup.Item style={{ backgroundColor: '#FAFBFE' }}>
												{' '}
												Assigned On :{' '}
												<DateShow date={this.state.report.assigned_date} />
											</ListGroup.Item>
											<ListGroup.Item style={{ backgroundColor: '#FAFBFE' }}>
												{' '}
												Submitted By:{' '}
												<UserProfile
													setUser={this.setUser}
													user={this.state.report}
												/>{' '}
											</ListGroup.Item>
											<ListGroup.Item
												style={{
													backgroundColor: '#FAFBFE',
												}}
											>
												{' '}
												Latitude :
												{this.state.report.xml != null &&
												this.state.report.xml.corners != null &&
												this.state.report.xml.corners.lat1 != null ? (
													<h6>{this.state.report.xml.corners.lat1}° N</h6>
												) : (
													'NO XML DATA '
												)}
											</ListGroup.Item>
											<ListGroup.Item style={{ backgroundColor: '#FAFBFE' }}>
												Longitude:{' '}
												{this.state.report.xml != null &&
												this.state.report.xml.corners != null &&
												this.state.report.xml.corners.long1 != null ? (
													<h6>{this.state.report.xml.corners.long1}° E</h6>
												) : (
													'NO XML DATA'
												)}
											</ListGroup.Item>
											<ListGroup.Item style={{ backgroundColor: '#FAFBFE' }}>
												{' '}
												Date of Picture :{' '}
												{this.state.report.xml != null &&
												this.state.report.xml.d_o_p != null ? (
													<DateShow date={this.state.report.xml.d_o_p} />
												) : (
													'N/A'
												)}
											</ListGroup.Item>
										</ListGroup>
									</div>
									<div
										style={{
											border: '3px dashed black',
											padding: '1rem',
											background: 'whitesmoke',
										}}
									>
										{/* <div
											style={{
												backgroundColor: 'black',
												color: 'white',
												margin: '1rem 0rem',
												padding: '1rem',
											}}
										>
											Report Summary
										</div>
										<div>
											<FormGroup>
												<Input
													type="textarea"
													style={{ minHeight: '200px' }}
													name="summary"
													defaultValue={this.state.summary}
													onChange={this.handleChange}
													placeholder="Give Brief Description of Report"
													readOnly={this.state.completed == true}
												/>
											</FormGroup>
										</div> */}
										{/* <div>
											<Button
												onClick={this.savSummary}
												outline
												color="primary"
												disabled={
													this.state.summary == null ||
													this.state.summary.trim() == '' ||
													this.state.completed == true
												}
											>
												Save Summary
											</Button>
										</div> */}
										<div
											style={{
												backgroundColor: '#191970',
												color: 'white',
												margin: '1rem 0rem',
												padding: '1rem',
												marginBottom: '2rem',
											}}
										>
											Previous Report
										</div>
										<FormGroup>
											<Label>Select previous report to see Details</Label>
											<Input
												type="select"
												name="select"
												id="exampleSelect"
												onChange={this.handleChangeSel}
												style={{
													fontSize: '20px',
													padding: '0.5rem',
													textTransform: 'capitalize',
												}}
											>
												{this.state.prevReport.map((rp, key) => {
													let ct = new Date(rp.createdAt);
													return (
														<option
															key={key}
															value={rp._id}
															style={{
																fontSize: '20px',
																padding: '0.5rem',
																textTransform: 'capitalize',
															}}
														>
															{rp.location_name}
															{' | '}
															{' Report Date : '}
															{ct.getDate() +
																'-' +
																(ct.getMonth() + 1) +
																'-' +
																ct.getFullYear()}
														</option>
													);
												})}
											</Input>
											{/* <Button
												onClick={this.showPrevReport}
												outline
												color="primary"
												// disabled={
												// 	this.state.summary == null ||
												// 	this.state.summary.trim() == '' ||
												// 	this.state.completed == true
												// }
											>
												Show Selected Report
											</Button> */}
										</FormGroup>
										<div style={{ margin: '1rem' }}>
											{this.state.prevFullReport.length !== 0 ? (
												<div>
													<div
														style={{
															backgroundColor: '#191970',
															color: 'white',
															margin: '1rem -1rem',
															padding: '0.4rem',
															marginBottom: '2rem',
														}}
													>
														Previous Report Data
													</div>
													<div>
														<Button
															onClick={this.importDataFunc}
															outline
															color="primary"
															// disabled={
															// 	this.state.summary == null ||
															// 	this.state.summary.trim() == '' ||
															// 	this.state.completed == true
															// }
														>
															Import All to Current
														</Button>
													</div>
													<ListGroup horizontal style={{ flexWrap: 'wrap' }}>
														<ListGroup.Item
															style={{
																textTransform: 'capitalize',
																width: '17rem',
															}}
														>
															<h4>Confidentiality</h4>
															<hr />
															{this.state.prevFullReport.confidentiality
																? this.state.prevFullReport.confidentiality
																: 'Data not available'}
														</ListGroup.Item>
														<ListGroup.Item
															style={{
																textTransform: 'capitalize',
																width: '17rem',
															}}
														>
															<h4>Sensor Id</h4>
															<hr />
															{this.state.prevReportXML.sensor_id
																? this.state.prevReportXML.sensor_id
																: 'Data not available'}
														</ListGroup.Item>
														<ListGroup.Item
															style={{
																textTransform: 'capitalize',
																width: '17rem',
															}}
														>
															<h4>Resolution</h4>
															<hr />
															{this.state.prevReportXML.resolution
																? this.state.prevReportXML.resolution
																: 'Data not available'}
														</ListGroup.Item>
														<ListGroup.Item
															style={{
																textTransform: 'capitalize',
																width: '17rem',
															}}
														>
															<h4>Orbit No.</h4>
															<hr />
															{this.state.prevReportXML.orbit_no
																? this.state.prevReportXML.orbit_no
																: 'Data not available'}
														</ListGroup.Item>
														<ListGroup.Item
															style={{
																textTransform: 'capitalize',
																width: '17rem',
															}}
														>
															<h4>Report ID</h4>
															<hr />
															{this.state.prevFullReport.s_reportId
																? this.state.prevFullReport.s_reportId
																: 'Data not available'}
														</ListGroup.Item>
														<ListGroup.Item
															style={{
																textTransform: 'capitalize',
																width: '17rem',
															}}
														>
															<h4>Indent Reference</h4>
															<hr />
															{this.state.prevFullReport.indent_reference
																? this.state.prevFullReport.indent_reference
																: 'Data not available'}
														</ListGroup.Item>
														<ListGroup.Item
															style={{
																textTransform: 'capitalize',
																width: '17rem',
															}}
														>
															<h4>Area</h4>
															<hr />
															{this.state.prevFullReport.areas
																? this.state.prevFullReport.areas
																: 'Data not available'}
														</ListGroup.Item>
														<ListGroup.Item
															style={{
																textTransform: 'capitalize',
																width: '17rem',
															}}
														>
															<h4>Target Reported</h4>
															<hr />
															{this.state.prevFullReport.target_reported
																? this.state.prevFullReport.target_reported
																: 'Data not available'}
														</ListGroup.Item>
														<ListGroup.Item
															style={{
																textTransform: 'capitalize',
																width: '17rem',
															}}
														>
															<h4>Agency</h4>
															<hr />
															{this.state.prevFullReport.agency
																? this.state.prevFullReport.agency
																: 'Data not available'}
														</ListGroup.Item>
														<ListGroup.Item
															style={{
																textTransform: 'capitalize',
																width: '17rem',
															}}
														>
															<h4>Addresses</h4>
															<hr />
															{this.state.prevFullReport.addresses
																? this.state.prevFullReport.addresses
																: 'Data not available'}
														</ListGroup.Item>
													</ListGroup>
												</div>
											) : null}
										</div>

										<div>
											{this.state.prevSubReport.length !== 0 ? (
												<div
													style={{
														backgroundColor: '#191970',
														color: 'white',
														margin: '1rem 0rem',
														padding: '0.4rem',
														marginBottom: '2rem',
													}}
												>
													Previous Subreports
												</div>
											) : !this.state.prevSubReport ? (
												<div>No Subreport Submitted</div>
											) : null}

											{this.state.prevSubReport ? (
												this.state.prevSubReport.map((sr, key) => (
													<div style={{ paddingLeft: '1rem' }}>
														<PrevSubReportContainer
															openAll={this.state.openAll}
															subreport={sr}
															key={sr._id}
															index={key}
														/>
													</div>
												))
											) : (
												<div>No Subreport Submitted</div>
											)}
										</div>
									</div>
									<div style={{ marginTop: '1rem' }}>
										<div
											style={{
												backgroundColor: 'black',
												color: 'white',
												margin: '1rem 0rem',
												padding: '1rem',
												marginBottom: '2rem',
											}}
										>
											REPORT INFO
										</div>
										<ListGroup horizontal style={{ marginBottom: '3rem' }}>
											<ListGroup.Item>
												<h4>Map Name</h4> <hr />
												{localStorage.getItem('main_image')}
											</ListGroup.Item>
										</ListGroup>
										<Formik
											initialValues={this.state.form}
											validateOnChange={true}
											validationSchema={ReportSchema}
											enableReinitialize
											onSubmit={(values) => {
												console.log(values);
												this.updateReport(values);
											}}
										>
											{({
												values,
												errors,
												touched,
												setFieldValue,
												validateForm,
											}) => (
												<Form>
													{/* <Field name="secret" type="text" placeholder="Secret" /> */}
													<div className="d-flex justify-content-between">
														<div>
															<AutoComplete
																id="combo-box-demo"
																defaultValue={'secret'}
																value={
																	values.secret == null
																		? 'secret'
																		: values.secret
																}
																onChange={(event, newValue) => {
																	setFieldValue(
																		'secret',
																		newValue == null ? '' : newValue,
																		true,
																	);
																}}
																inputValue={values.secret}
																onInputChange={(event, newInputValue) => {
																	setFieldValue(
																		'secret',
																		newInputValue == null ? '' : newInputValue,
																		true,
																	);
																}}
																options={[
																	'secret',
																	'confidential',
																	'top secret',
																]}
																getOptionLabel={(option) => option}
																style={{ width: 180 }}
																renderInput={(params) => (
																	<TextField
																		{...params}
																		value={
																			values.secret == null
																				? 'secret'
																				: values.secret
																		}
																		defaultValue={'secret'}
																		label="Confidentiality"
																		variant="outlined"
																	/>
																)}
															/>
															{errors.secret && touched.secret ? (
																<div
																	style={{
																		fontSize: '10px',
																		color: 'red',
																		fontWeight: 600,
																		wordBreak: 'break-word',
																	}}
																>
																	{errors.secret}
																</div>
															) : null}
														</div>
														<div>
															<TextField
																id="filled-basic"
																onChange={(e) =>
																	setFieldValue(
																		'sensor_id',
																		e.target.value,
																		true,
																	)
																}
																value={values.sensor_id}
																label="Sensor"
																variant="outlined"
															/>
															{errors.sensor_id && touched.sensor_id ? (
																<div
																	style={{
																		fontSize: '10px',
																		color: 'red',
																		fontWeight: 600,
																		wordBreak: 'break-word',
																	}}
																>
																	{errors.sensor_id}
																</div>
															) : null}
														</div>
														<div>
															<TextField
																type="number"
																id="outlined-basic"
																onChange={(e) =>
																	setFieldValue(
																		'resolution',
																		e.target.value,
																		true,
																	)
																}
																value={values.resolution}
																label="Resolution"
																variant="outlined"
															/>
															{errors.resolution && touched.resolution ? (
																<div
																	style={{
																		fontSize: '10px',
																		color: 'red',
																		fontWeight: 600,
																		wordBreak: 'break-word',
																	}}
																>
																	{errors.resolution}
																</div>
															) : null}
														</div>
														<div>
															<TextField
																type="number"
																id="outlined-basic"
																onChange={(e) =>
																	setFieldValue(
																		'orbit_no',
																		e.target.value,
																		true,
																	)
																}
																value={values.orbit_no}
																label="Orbit No"
																variant="outlined"
															/>
															{errors.orbit_no && touched.orbit_no ? (
																<div
																	style={{
																		fontSize: '10px',
																		color: 'red',
																		fontWeight: 600,
																		wordBreak: 'break-word',
																	}}
																>
																	{errors.orbit_no}
																</div>
															) : null}
														</div>
														<div>
															<MuiPickersUtilsProvider
																utils={DateFnsUtils}
																style={{ marginTop: '1px' }}
															>
																<KeyboardDatePicker
																	disableToolbar
																	variant="inline"
																	format="dd/MM/yyyy"
																	margin="normal"
																	id="date-picker-inline"
																	label="Date"
																	value={values.date}
																	onChange={(e) => {
																		setFieldValue('date', e, true);
																	}}
																	KeyboardButtonProps={{
																		'aria-label': 'change date',
																	}}
																/>
															</MuiPickersUtilsProvider>
														</div>
													</div>
													<div className="d-flex justify-content-between mt-3">
														<div>
															<TextareaAutosize
																id="outlined-basic"
																style={{
																	pading: '10px',
																	backgroundColor: 'inherit',
																}}
																rows={2}
																cols={30}
																onChange={(e) =>
																	setFieldValue('areas', e.target.value, true)
																}
																value={values.areas}
																placeholder="Areas"
																variant="outlined"
															/>
															{errors.areas && touched.areas ? (
																<div
																	style={{
																		fontSize: '10px',
																		color: 'red',
																		fontWeight: 600,
																		wordBreak: 'break-word',
																	}}
																>
																	{errors.areas}
																</div>
															) : null}
														</div>
														<div>
															<TextareaAutosize
																id="outlined-basic"
																style={{
																	pading: '10px',
																	backgroundColor: 'inherit',
																}}
																rows={2}
																cols={30}
																onChange={(e) =>
																	setFieldValue(
																		's_reportId',
																		e.target.value,
																		true,
																	)
																}
																value={values.s_reportId}
																placeholder="Report Id"
																variant="outlined"
															/>
															{errors.s_reportId && touched.s_reportId ? (
																<div
																	style={{
																		fontSize: '10px',
																		color: 'red',
																		fontWeight: 600,
																		wordBreak: 'break-word',
																	}}
																>
																	{errors.s_reportId}
																</div>
															) : null}
														</div>
														<div>
															<TextField
																id="outlined-basic"
																onChange={(e) =>
																	setFieldValue(
																		'indent_reference',
																		e.target.value,
																		true,
																	)
																}
																value={values.indent_reference}
																label="Indent Reference"
																variant="outlined"
															/>
															{errors.indent_reference &&
															touched.indent_reference ? (
																<div
																	style={{
																		fontSize: '10px',
																		color: 'red',
																		fontWeight: 600,
																		wordBreak: 'break-word',
																	}}
																>
																	{errors.indent_reference}
																</div>
															) : null}
														</div>
														<div>
															<TextField
																id="outlined-basic"
																onChange={(e) =>
																	setFieldValue(
																		'target_reported',
																		e.target.value,
																		true,
																	)
																}
																value={values.target_reported}
																label="Target Reported"
																variant="outlined"
															/>
															{errors.target_reported &&
															touched.target_reported ? (
																<div
																	style={{
																		fontSize: '10px',
																		color: 'red',
																		fontWeight: 600,
																		wordBreak: 'break-word',
																	}}
																>
																	{errors.target_reported}
																</div>
															) : null}
														</div>
													</div>
													<div className="d-flex justify-content-between mt-3">
														<div>
															<TextField
																id="outlined-basic"
																onChange={(e) =>
																	setFieldValue('agency', e.target.value, true)
																}
																value={values.agency}
																label="Agency"
																variant="outlined"
															/>
															{errors.agency && touched.agency ? (
																<div
																	style={{
																		fontSize: '10px',
																		color: 'red',
																		fontWeight: 600,
																		wordBreak: 'break-word',
																	}}
																>
																	{errors.agency}
																</div>
															) : null}
														</div>
														<div>
															<TextField
																id="outlined-basic"
																onChange={(e) =>
																	setFieldValue(
																		'rep_name',
																		e.target.value,
																		true,
																	)
																}
																value={values.rep_name}
																label="Name"
																variant="outlined"
															/>
															{errors.rep_name && touched.rep_name ? (
																<div
																	style={{
																		fontSize: '10px',
																		color: 'red',
																		fontWeight: 600,
																		wordBreak: 'break-word',
																	}}
																>
																	{errors.rep_name}
																</div>
															) : null}
														</div>
														<div>
															<TextField
																id="outlined-basic"
																onChange={(e) =>
																	setFieldValue(
																		'designation',
																		e.target.value,
																		true,
																	)
																}
																value={values.designation}
																label="Designation"
																variant="outlined"
															/>
															{errors.designation && touched.designation ? (
																<div
																	style={{
																		fontSize: '10px',
																		color: 'red',
																		fontWeight: 600,
																		wordBreak: 'break-word',
																	}}
																>
																	{errors.designation}
																</div>
															) : null}
														</div>
														<div>
															<TextareaAutosize
																id="outlined-basic"
																style={{
																	pading: '10px',
																	backgroundColor: 'inherit',
																}}
																rows={2}
																cols={30}
																onChange={(e) =>
																	setFieldValue(
																		'addresses',
																		e.target.value,
																		true,
																	)
																}
																value={values.addresses}
																placeholder="List of addresses"
																variant="outlined"
															/>
															{errors.addresses && touched.addresses ? (
																<div
																	style={{
																		fontSize: '10px',
																		color: 'red',
																		fontWeight: 600,
																		wordBreak: 'break-word',
																	}}
																>
																	{errors.addresses}
																</div>
															) : null}
														</div>
													</div>
													<div className="d-flex justify-content-between mt-3">
														<div>
															<TextField
																id="outlined-basic"
																onChange={(e) =>
																	setFieldValue(
																		'soft_copy_details',
																		e.target.value,
																		true,
																	)
																}
																value={values.soft_copy_details}
																label="Soft Copy Details"
																variant="outlined"
															/>
															{errors.soft_copy_details &&
															touched.soft_copy_details ? (
																<div
																	style={{
																		fontSize: '10px',
																		color: 'red',
																		fontWeight: 600,
																		wordBreak: 'break-word',
																	}}
																>
																	{errors.soft_copy_details}
																</div>
															) : null}
														</div>
													</div>
													<div
														style={{ marginTop: '1rem', textAlign: 'right' }}
													>
														<Button type="submit" color="primary">
															Update
														</Button>
													</div>
												</Form>
											)}
										</Formik>
									</div>
									<div style={{ margin: '1rem' }}>
										<div
											style={{
												backgroundColor: 'black',
												color: 'white',
												margin: '1rem 0rem',
												padding: '1rem',
											}}
										>
											MAPS OVERVIEW
										</div>
										<div>
											<img
												style={{ width: '100%' }}
												src={this.state.main_image}
												alt="img"
											/>
										</div>
										<div className="d-flex flex-wrap justify-content-between">
											{this.state.subreports.map((mp, key) => (
												<div key={key} style={{ width: '20%', margin: '1rem' }}>
													<img
														style={{ width: '100%' }}
														src={mp.thumbnail_path}
														alt="img"
													/>
												</div>
											))}
										</div>
									</div>

									<div style={{ paddingLeft: '1rem' }}>
										{this.state.subreports.map((sr, key) => (
											<SubReportContainer
												openAll={this.state.openAll}
												subreport={sr}
												key={sr._id}
												index={key}
												updateSubReport={this.updateSubReport}
											/>
										))}
									</div>
								</div>{' '}
							</div>
						) : null}
					</div>
				</section>

				{/* <Footer /> */}
			</div>
		);
	}
}

export default ReportPage;
