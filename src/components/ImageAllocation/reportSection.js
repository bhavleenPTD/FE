import React, { useState, useEffect } from 'react';
import '../../Styles/rights_table.css';
import BootstrapTable from 'react-bootstrap-table-next';
import { Link, withRouter } from 'react-router-dom';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Badge,
	Container,
	Row,
	Col,
	Table,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartArea } from '@fortawesome/free-solid-svg-icons';
import { EmpHTTP } from '../Interceptors/empInterceptor';
import { URL } from '../../modal/url';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';

const ReportSection = (props) => {
	const [allReports, setAllReports] = useState([]);
	const [allReportsSubmitted, setAllReportsSubmitted] = useState([]);
	const [currPage, setCurrPage] = useState(1);
	const [pages, setTotalPages] = useState([]);
	const [totalImages, setTotalImages] = useState('');
	const [modal, setModal] = useState(false);
	const [allocObj, setAllocObj] = useState(null);
	const [reportData, setReportData] = useState(null);
	const toggle = () => setModal(!modal);

	useEffect(() => {
		getAllReports();
		getReports();
		//updateReports()
		updateReportStatus();
	}, []);

	const getAllReports = async () => {
		const res = await EmpHTTP.get(URL.GET_ALL_FINAL_REPORTS);
		try {
			console.log(res);
			setAllReportsSubmitted(res.data.rp);
		} catch (error) {
			console.log(error);
		}
	};

	const getReports = async (page = 1) => {
		const data = {
			page: page,
			res_ppage: 10,
		};
		console.log(data);
		const res = await EmpHTTP.get(URL.GET_EMPLOYEE_ALLOC, { params: data });
		try {
			console.log(res.data);
			//setAllReports(res.data.empAlloc);
			setTotalImages(res.data.allData.allImages.length);
			setAllReports(res.data.allData.allocs);
			setTotalPages(res.data.allData.pages);
			setCurrPage(page);
		} catch (error) {
			console.log(error);
		}
	};

	// const getReports = async () => {

	// 	const res = await EmpHTTP.get(URL.GET_EMPLOYEE_ALLOC)
	// 	try {
	// 		console.log(res);
	// 		setAllReports(res.data.empAlloc);

	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	// const updateReports = async () => {
	// 	const res = await EmpHTTP.get(URL.UPDATE_ALLOC_DATA,allReports)
	// 	try {
	// 		console.log(res);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }

	const updateReportStatus = async () => {
		const res = await EmpHTTP.get(URL.UPDATE_REPORTS_DATA);
		try {
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};
	const redirectViewReport = (id) => {
		props.history.push('/dashboard/report/' + id);
	};

	// router.post('/updateReportData', async (req, res) => {
	// 	try {

	// 		let allocData = await AdminCRUD.updateReportsData();
	// 		console.log('Updated', allocData);
	// 		res.status(200).json({ status: true, allocData });
	// 	} catch (error) {
	// 		res.status(409).json({ status: false, msg: error });
	// 	}
	// });

	const getReportsOfAlloc = async () => {
		try {
			let postData = allReports.filter((obj) => obj._id == allocObj._id);
			console.log(postData, allReports, allocObj);
			if (postData.length != 0) {
				let data = {
					location_name: postData[0].locationName,
					emp_map_alloted_id: postData[0]._id,
					assigned_date: postData[0].assignedOn,
				};

				let res = await EmpHTTP.post(URL.GET_MAP_REPORTS, data);

				let resp_data = res.data;

				if (resp_data.status == true) {
					console.log(
						'data',
						resp_data.reports.filter((r) => r.completed == true),
					);
					setReportData(resp_data.reports.filter((r) => r.completed == true));
				} else {
					throw new Error('Empty Data');
				}
			} else {
				throw new Error('No Such Data Exist');
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

	const timeConverter = (UNIX_timestamp) => {
		const newDate = new Date(UNIX_timestamp);
		const months = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		];
		const year = newDate.getFullYear();
		const month = months[newDate.getMonth()];
		const date = newDate.getDate();
		const time = date + ' ' + month + ' ' + year;
		return time;
	};

	const rows = allReports.map((ele, key) => ({
		id: 10 * (currPage - 1) + key + 1,
		_id: ele._id,
		location: ele.locationName.toUpperCase(),
		assigned_on_tstamp: ele.createdAt,
		assigned_on: timeConverter(ele.createdAt),
		status: ele.reports_status,
		img_name: ele.img_name,
		image_link: ele.img_path,
		report_link: ele.report_link,
		assigned_to: ele.empName,
		report_date_tstamp: ele.report_date == undefined ? ele.report_date : 'N/A',
		report_date:
			ele.report_date != undefined ? timeConverter(ele.report_date) : 'N/A',
		QA: 2,
	}));

	const columns = [
		{
			dataField: 'id',
			text: 'Sr. No.',
			editable: false,
			headerStyle: (column, colIndex) => {
				return { width: '80px' };
			},
		},
		{
			dataField: 'location',
			text: 'Location Details',
			sort: false,
			editable: false,
			headerStyle: (column, colIndex) => {
				return { width: '150px' };
			},
		},
		{
			dataField: 'assigned_on',
			text: 'Assigned on',
			sort: true,
			editable: false,
			headerStyle: (column, colIndex) => {
				return { width: '120px' };
			},
		},
		{
			dataField: 'img_name',
			text: 'Image Details',
			sort: false,
			editable: false,
			headerStyle: (column, colIndex) => {
				return { width: '270px' };
			},
			formatter: (cellContent, rows) => {
				return <h6 style={{ wordWrap: 'break-word' }}>{cellContent}</h6>;
			},
		},
		{
			dataField: 'status',
			text: 'Reports Status',
			editable: false,
			headerStyle: (column, colIndex) => {
				return { width: '150px' };
			},
			sort: true,
			formatter: (cellContent, rows) => {
				if (cellContent === true) {
					return (
						<h6>
							<Badge color="success">Done</Badge>
						</h6>
					);
				}
				return (
					<h6>
						<Badge color="danger">Pending</Badge>
					</h6>
				);
			},
		},
		{
			dataField: 'image_link',
			text: 'Image Link',
			editable: false,
			headerStyle: (column, colIndex) => {
				return { width: '100px' };
			},
			sortValue: (cell, rows) => rows.e_date,
			sort: false,
			formatter: (cellContent, rows) => {
				if (cellContent !== '') {
					return (
						<a href={cellContent} download>
							Download
						</a>
					);
				}
				return <div>N/A</div>;
			},
		},
		{
			dataField: 'assigned_to',
			text: 'Assigned To',
			sort: false,
			editable: false,
			headerStyle: (column, colIndex) => {
				return { width: '120px' };
			},
			formatter: (cellContent, rows) => {
				console.log(cellContent);
				if (cellContent) {
					return <h6>{cellContent}</h6>;
				}
			},
		},
		// {
		// 	dataField: 'report_link',
		// 	text: 'Report',
		// 	sort: false,
		// 	editable: false,
		// 	headerStyle: (column, colIndex) => {
		// 		return { width: '120px' };
		// 	},
		// 	formatter: (cellContent, rows) => {
		// 		if (cellContent) {
		// 			return <a href={cellContent}>Download</a>;
		// 		}
		// 		return <div>N/A</div>;
		// 	},
		// },
		{
			dataField: 'report_date',
			text: 'Report Date',
			sort: true,
			editable: false,
			headerStyle: (column, colIndex) => {
				return { width: '120px' };
			},
			formatter: (cellContent, rows) => {
				if (rows.report_date_tstamp !== '') {
					return <div>{cellContent}</div>;
				}
				return <div>N/A</div>;
			},
		},
		// {
		// 	dataField: 'QA',
		// 	text: 'QA',
		// 	sort: false,
		// 	editable: false,
		// 	headerStyle: (column, colIndex) => {
		// 		return { width: '100px' };
		// 	},
		// 	formatter: (cellContent, rows) => {
		// 		if (cellContent == 1) {
		// 			return (
		// 				<h6>
		// 					<Badge color="success">Done</Badge>
		// 				</h6>
		// 			);
		// 		}
		// 		if (cellContent == 2) {
		// 			return (
		// 				<h6>
		// 					<Badge color="danger">Pending</Badge>
		// 				</h6>
		// 			);
		// 		}
		// 		if (cellContent == 3) {
		// 			return <div>N/A</div>;
		// 		}
		// 	},
		// },
	];

	const rowEvents = {
		onClick: (e, row, rowIndex) => {
			setAllocObj(row);
			toggle();
		},
	};

	const options = {
		custom: true,
		totalSize: rows.length,
		prePageText: 'Back',
		nextPageText: 'Next',
		nextPageTitle: 'First page',
		prePageTitle: 'Pre page',
		showTotal: true,
	};

	const handlePageClick = (e) => {
		console.log(e.selected + 1);
		getReports(e.selected + 1);
		//getImageDetails();
	};

	return (
		<React.Fragment>
			<h1>Reports Status</h1>
			<hr />
			<Container>
				<Row>
					<Col sm="4">
						<div className="Img-all-datadiv">
							<Row>
								<h4>Total Allocations</h4>
							</Row>
							<Row>
								<Col>
									<FontAwesomeIcon
										className="mt-2"
										icon={faChartArea}
										size="4x"
										color="blue"
									/>
								</Col>
								<Col>
									<div style={{ color: 'blue', fontSize: '50px' }}>
										{totalImages}
									</div>
								</Col>
							</Row>
						</div>
					</Col>
					<Col>
						<div className="Img-all-datadiv">
							<Row>
								<h4>Total Reports Submitted</h4>
							</Row>
							<Row>
								<Col>
									<FontAwesomeIcon
										className="mt-2"
										icon={faChartArea}
										size="4x"
										color="green"
									/>
								</Col>
								<Col>
									<div style={{ color: 'green', fontSize: '50px' }}>
										{
											allReports.filter((ele) => {
												return ele.reports_status == true;
											}).length
										}
									</div>
								</Col>
							</Row>
						</div>
					</Col>
					<Col>
						<div className="Img-all-datadiv">
							<Row>
								<h4>Total Reports Pending</h4>
							</Row>
							<Row>
								<Col>
									<FontAwesomeIcon
										className="mt-2"
										icon={faChartArea}
										size="4x"
										color="crimson"
									/>
								</Col>
								<Col>
									<div style={{ color: 'crimson', fontSize: '50px' }}>
										{
											allReports.filter((ele) => {
												return ele.reports_status == false;
											}).length
										}
									</div>
								</Col>
							</Row>
						</div>
					</Col>
				</Row>
			</Container>
			{/* <Link to="/image-detail-table">
				<Button
					color="primary"
					style={{ float: 'right', marginRight: '-5rem', marginBottom: '2rem' }}
				>
					Assign Images
				</Button>
			</Link> */}
			<div>
				<BootstrapTable
					keyField="id"
					data={rows}
					columns={columns}
					rowEvents={rowEvents}
					cellEdit={cellEditFactory({ mode: 'click', blurToSave: true })}
					hover
					condensed
				/>
				<ReactPaginate
					previousLabel={'<<'}
					nextLabel={'>>'}
					pageCount={pages}
					marginPagesDisplayed={0}
					pageRangeDisplayed={5}
					onPageChange={handlePageClick}
					containerClassName={'pagination'}
					subContainerClassName={'pages pagination'}
					activeClassName={'active'}
				/>
			</div>

			<Modal onOpened={getReportsOfAlloc} isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle}>Reports</ModalHeader>
				<ModalBody>
					<Table striped bordered hover size="sm" style={{ width: '100%' }}>
						<thead>
							<tr>
								<th>S.No</th>
								<th>Assigned On</th>
								<th>Report Created At</th>
								<th>PDF/REEL</th>
							</tr>
						</thead>
						<tbody>
							{reportData != null &&
								reportData.length != 0 &&
								reportData.map((rp, key) => {
									let d = new Date(rp.assigned_date);
									let ct = new Date(rp.createdAt);
									// let ut = new Date(rp.updatedAt)

									return (
										<tr key={key}>
											<td>{key + 1}</td>
											<td>
												{d.getDate() +
													'-' +
													(d.getMonth() + 1) +
													'-' +
													d.getFullYear()}
											</td>
											<td>
												{ct.getDate() +
													'-' +
													(ct.getMonth() + 1) +
													'-' +
													ct.getFullYear() +
													' : ' +
													ct.getHours() +
													'h' +
													' : ' +
													ct.getMinutes() +
													'min' +
													' : ' +
													ct.getSeconds() +
													's'}
											</td>

											<td style={{ width: '100px' }}>
												<Button
													onClick={() => {
														redirectViewReport(rp._id);
													}}
													style={{ width: '100%' }}
													outline
													color="success"
												>
													Load Pdf
												</Button>
											</td>
										</tr>
									);
								})}
						</tbody>
					</Table>
				</ModalBody>
			</Modal>
		</React.Fragment>
	);
};

export default withRouter(ReportSection);
