import React, { useState, useEffect } from 'react';
import '../../Styles/rights_table.css';
import { Badge, Container, Col, Row } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import Switch from 'react-switch';
import PropTypes from 'prop-types';
import { EmpHTTP } from '../Interceptors/empInterceptor';
import { URL } from '../../modal/url';
import ReactPaginate from 'react-paginate';
import { useStore } from '../../zustandstore';
// import { objectValues } from 'react-toastify/dist/utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartArea } from '@fortawesome/free-solid-svg-icons';

const UserTasks = (props) => {
	const [allUsers, setAllUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [currPage, setCurrPage] = useState(1);
	const [userData, setUserData] = useState(1);
	const [pages, setTotalPages] = useState([]);
	const [totalTasksCount, setTotalTasksCount] = useState('');
	const [selectUser, setSelectUser] = useState('');

	useEffect(() => {
		if (props) {
			getUserAllocations();
		}
	}, []);

	const getUserAllocations = async (page = 1) => {
		const data = {
			page: page,
			res_ppage: 10,
			empId: props.currUser.empId,
		};
		const res = await EmpHTTP.post(URL.GET_USERS_TASKS, data);
		try {
			console.log(res);
			setAllUsers(res.data.tasks.page_tasks);
			setTotalPages(res.data.tasks.pages);
			setTotalTasksCount(res.data.tasks.totalTasksCount);
			setCurrPage(page);
		} catch (error) {
			console.log(error);
		}
	};

	const handlePageClick = (e) => {
		console.log(e.selected + 1);
		getUserAllocations(e.selected + 1);
	};

	const notify = () =>
		toast.success('User Activated Succefully !!!', {
			position: 'bottom-left',
			autoClose: 4000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});

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

	const rows = allUsers.map((ele, key) => ({
		id: 10 * (currPage - 1) + key + 1,
		_id: ele._id,
		location: ele.locationName.toUpperCase(),
		assigned_on_tstamp: ele.createdAt,
		assigned_on: timeConverter(ele.createdAt),
		status: ele.reports_status,
		img_name: ele.img_name,
		report_date_tstamp: ele.report_date != undefined ? ele.report_date : 'N/A',
		report_date:
			ele.report_date != undefined ? timeConverter(ele.report_date) : 'N/A',
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
			text: 'Location Name',
			editable: false,
			headerStyle: (column, colIndex) => {
				return { width: '180px' };
			},
		},
		{
			dataField: 'img_name',
			text: 'Image Name',
			editable: false,
			headerStyle: (column, colIndex) => {
				return { width: '250px' };
			},
			formatter: (cellContent, row, editor) => {
				// console.log(row.id);

				return <h5 style={{ wordWrap: 'break-word' }}>{cellContent}</h5>;
			},
		},

		{
			dataField: 'status',
			text: 'Report Status',
			headerStyle: (column, colIndex) => {
				return { width: '180px' };
			},
			formatter: (cellContent, row, editor) => {
				// console.log(row.id);
				if (cellContent == true) {
					return (
						<h5>
							<Badge color="success">Done</Badge>
						</h5>
					);
				}
				return (
					<h5>
						<Badge color="danger">Pending</Badge>
					</h5>
				);
			},
		},
		{
			dataField: 'assigned_on',
			text: 'Assigned on',
			editable: false,
			headerStyle: (column, colIndex) => {
				return { width: '150px' };
			},
			sort: true,
			sortValue: (cell, rows) => rows.iat,
		},
		{
			dataField: 'report_date',
			text: 'Report Date',
			editable: false,
			headerStyle: (column, colIndex) => {
				return { width: '150px' };
			},
			sort: true,
			sortValue: (cell, rows) => rows.iat,
		},
	];

	return (
		<React.Fragment>
			<h1>My Tasks</h1>
			<hr />
			<Container>
				<Row>
					<Col sm="4">
						<div className="Img-all-datadiv">
							<Row>
								<h4>My Tasks Count</h4>
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
										{allUsers.length}
									</div>
								</Col>
							</Row>
						</div>
					</Col>
				</Row>
			</Container>
			<div>
				<BootstrapTable
					keyField="id"
					data={rows}
					columns={columns}
					cellEdit={cellEditFactory({
						mode: 'click',
						blurToSave: true,
					})}
				/>
				<ReactPaginate
					previousLabel={'<<'}
					nextLabel={'>>'}
					pageCount={pages}
					marginPagesDisplayed={0}
					pageRangeDisplayed={4}
					onPageChange={handlePageClick}
					containerClassName={'pagination'}
					subContainerClassName={'pages pagination'}
					activeClassName={'active'}
				/>
				<div style={{ marginRight: '50%' }}></div>
			</div>
		</React.Fragment>
	);
};

export default UserTasks;
