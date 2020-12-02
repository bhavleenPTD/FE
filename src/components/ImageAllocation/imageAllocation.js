import React, { useState, useEffect } from 'react';
import '../../Styles/rights_table.css';
// import { Table } from 'reactstrap';
import { Badge, Container, Row, Col, Button } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';
import {EmpHTTP} from '../Interceptors/empInterceptor'

const ImageAllocation = () => {
	const [modal, setModal] = useState(false);
	const [searchResults, setSearchResults] = useState('');
	const [bulkAssignData, setBulkAssignData] = useState('');
	const [selectedEmployee, setSelectedEmployee] = useState('');
	const [selection, setSelection] = useState(false);

	useEffect(() => {
		// Update the document title using the browser API
		console.log('loaded');
		const theEmployee = localStorage.getItem('imageData');

		console.log(theEmployee);
	}, []);

	const bulkAssign = () => {
		setModal(!modal);
		console.log('BAD', bulkAssignData);
	};

	const toggleModal = () => {
		setSelectedEmployee('');
		setSearchResults('');
		setModal(!modal);
	};

	const handleSearch = (event) => {
		console.log('search', event.target.value);
		const searchQuery = event.target.value;

		const employees = [
			{
				employee_id: 1,
				employee_name: 'Raman',
			},
			{
				employee_id: 2,
				employee_name: 'Akshay',
			},
			{
				employee_id: 3,
				employee_name: 'Aman',
			},
			{
				employee_id: 4,
				employee_name: 'Ram',
			},
			{
				employee_id: 5,
				employee_name: 'Virat',
			},
		];
		var pattern = searchQuery
			.split('')
			.map((x) => {
				return `(?=.*${x})`;
			})
			.join('');
		var regex = new RegExp(`${pattern.toLowerCase()}`, 'g');
		const results = employees.filter((elem) => {
			return elem.employee_name.toLowerCase().match(regex);
		});

		console.log('SR', results, pattern);

		if (searchQuery.length !== 0) {
			setSearchResults(results);
		} else {
			setSearchResults('');
		}
	};

	const imageDetails = [
		{
			location: 'Gulmund',
			location_detail: 'China',
			assigned_to: 'Rohit',
			assigned_date: 1595138569,
			status: true,
			QA: 1,
		},
		{
			location: 'Hotan',
			location_detail: 'China',
			assigned_to: 'Virat',
			assigned_date: 1585238569,
			status: false,
			QA: 2,
		},
		{
			location: 'Leh',
			location_detail: 'India',
			assigned_to: 'Hardik',
			assigned_date: 1512038569,
			status: true,
			QA: 3,
		},
	];

	console.log(imageDetails);

	const timeConverter = (UNIX_timestamp) => {
		const newDate = new Date(UNIX_timestamp * 1000);
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
	let count = 1;
	const rows = imageDetails.map((ele) => ({
		id: count++,
		location: ele.location,
		location_detail: ele.location_detail,
		assigned_to: ele.assigned_to,
		assigned_date: timeConverter(ele.assigned_date),
		assigned_date_timeStamp: ele.assigned_date,
		status: ele.status,
		QA: ele.QA,
	}));

	const columns = [
		{
			dataField: 'id',
			text: 'Sr. No.',
			headerStyle: (column, colIndex) => {
				return { width: '80px' };
			},
		},
		{
			dataField: 'location',
			text: 'Location',
			sort: false,
			editable: false,
			headerStyle: (column, colIndex) => {
				return { width: '250px' };
			},
		},
		{
			dataField: 'location_detail',
			text: 'Location Details',
			sort: false,
			editable: false,
			headerStyle: (column, colIndex) => {
				return { width: '170px' };
			},
		},
		{
			dataField: 'assigned_to',
			text: 'Assigned to',
			sort: false,
			editable: false,
			headerStyle: (column, colIndex) => {
				return { width: '120px' };
			},
		},

		{
			dataField: 'assigned_date',
			text: 'Assigned date',
			editable: false,
			headerStyle: (column, colIndex) => {
				return { width: '150px' };
			},
			sortValue: (cell, rows) => rows.e_date,
			sort: false,
		},
		{
			dataField: 'status',
			text: 'Status',
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
			dataField: 'QA',
			text: 'QA',
			sort: false,
			editable: false,
			headerStyle: (column, colIndex) => {
				return { width: '150px' };
			},
			formatter: (cellContent, rows) => {
				if (cellContent === 1) {
					return <Badge color="success">Done</Badge>;
				}
				if (cellContent === 2) {
					return <Badge color="danger">Pending</Badge>;
				}
				if (cellContent === 3) {
					return <div>N/A</div>;
				}
			},
		},
	];

	const rowEvents = {
		onClick: (e, row, rowIndex) => {},
	};

	const handlePageClick = (e) => {
		console.log(e.selected);
	};

	const selectRow = {
		mode: 'checkbox',
		clickToSelect: true,
		classes: 'selection-row',
		onSelect: (row, isSelect, rowIndex, e) => {
			setBulkAssignData([...bulkAssignData, row]);
		},
		onSelectAll: (isSelect, rows, e) => {
			setBulkAssignData(rows);
		},
		headerColumnStyle: (status) => {
			return {
				width: '40px',
			};
		},
	};

	return (
		<React.Fragment>
			<Container className="mb-5">
				<h1>Location Allocation</h1>
				<hr />
				<Row>
					<Col>
						<div className="Img-all-datadiv">
							<h4>Total Locations Done</h4>

							<Row>
								<Col>
									<FontAwesomeIcon
										className="mt-2"
										icon={faChartBar}
										size="4x"
										color="green"
									/>
								</Col>
								<Col>
									<div style={{ color: 'green', fontSize: '50px' }}>23</div>
								</Col>
							</Row>
						</div>
					</Col>
					<Col>
						<div className="Img-all-datadiv">
							<h4>Total Pending Tasks</h4>
							<Row>
								<Col>
									<FontAwesomeIcon
										className="mt-2"
										icon={faChartBar}
										size="4x"
										color="crimson"
									/>
								</Col>
								<Col>
									<div style={{ color: 'crimson', fontSize: '50px' }}>49</div>
								</Col>
							</Row>
						</div>
					</Col>
					<Col>
						<div className="Img-all-datadiv">
							<h4>New Reports Uploaded</h4>
							<Row>
								<Col>
									<FontAwesomeIcon
										className="mt-2"
										icon={faChartBar}
										size="4x"
										color="blue"
									/>
								</Col>
								<Col>
									<div style={{ color: 'blue', fontSize: '50px' }}>21</div>
								</Col>
							</Row>
						</div>
					</Col>
				</Row>
			</Container>
			<Col>
				<Button
					color="primary"
					style={{
						float: 'right',
					}}
					disabled={!selection}
					onClick={toggleModal}
				>
					Select Employee/Bulk Assign
				</Button>
			</Col>
			<BootstrapTable
				keyField="id"
				data={rows}
				columns={columns}
				rowEvents={rowEvents}
				cellEdit={cellEditFactory({ mode: 'click', blurToSave: true })}
				selectRow={selectRow}
				hover
				condensed
			/>
			<ReactPaginate
				previousLabel={'<<'}
				nextLabel={'>>'}
				breakLabel={''}
				//pageCount={pageCount}
				marginPagesDisplayed={0}
				pageRangeDisplayed={4}
				onPageChange={handlePageClick}
				containerClassName={'pagination'}
				subContainerClassName={'pages pagination'}
				activeClassName={'active'}
			/>
		</React.Fragment>
	);
};

export default ImageAllocation;
