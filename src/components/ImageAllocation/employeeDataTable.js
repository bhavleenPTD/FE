import React, { useState, useEffect } from 'react';
import '../../Styles/rights_table.css';
import {
	Table,
	Container,
	Row,
	Col,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';
import { URL } from '../../modal/url';
import {EmpHTTP} from '../Interceptors/empInterceptor'

const EmployeeDataTable = () => {
	const [searchResults, setSearchResults] = useState('');
	const [employees, setEmployees] = useState([]);

	useEffect(() => {
		console.log('loaded');
		const theEmployee = localStorage.getItem('imageData');
		console.log(theEmployee);
		getUsers();
	}, []);

	const getUsers = async () => {
		const data = {
			page: 1,
			res_ppage: 10,
		};
		const res = await EmpHTTP.get(URL.GET_ACTIVE_USERS, { params: data });
		try {
			console.log(res.data.users.page_user);
			setEmployees(res.data.users.page_user);
		} catch (error) {
			console.log(error);
		}
	};

	let count = 1;
	const rows = employees.map((ele) => ({
		id: count++,
		name: ele.name,
		assigned: ele.assigned,
		completed: ele.completed,
		left: ele.left,
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
			dataField: 'name',
			text: 'Name',
			sort: false,
			headerStyle: (column, colIndex) => {
				return { width: '250px' };
			},
		},
		{
			dataField: 'assigned',
			text: 'Total Assigned',
			sort: false,
			headerStyle: (column, colIndex) => {
				return { width: '150px' };
			},
		},
		{
			dataField: 'completed',
			text: 'Total Completed',
			sort: false,
			headerStyle: (column, colIndex) => {
				return { width: '150px' };
			},
		},

		{
			dataField: 'left',
			text: 'Left',
			headerStyle: (column, colIndex) => {
				return { width: '150px' };
			},
			sortValue: (cell, rows) => rows.e_date,
			sort: false,
		},

		{
			dataField: 'Details',
			text: 'Details',
			sort: false,
			headerStyle: (column, colIndex) => {
				return { width: '150px' };
			},
			formatter: (cellContent, row, editor) => {
				return (
					<Link to="/details">
						<div> Click me</div>
					</Link>
				);
			},
		},
	];

	const rowEvents = {
		onClick: (e, row, rowIndex) => {},
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

	return (
		<React.Fragment>
			<Container className="mb-5">
				<h1>Employee Details</h1>
				<hr />
				<Col>
					<Row>
						<div className="Img-all-datadiv">
							<div>
								<h4>Total Employees</h4>
							</div>
							<div>
								<Container>
									<Row>
										<Col>
											<FontAwesomeIcon
												className="mt-2"
												icon={faChartPie}
												size="4x"
												color="green"
											/>
										</Col>
										<Col>
											<div style={{ color: 'green', fontSize: '50px' }}>23</div>
										</Col>
									</Row>
								</Container>
							</div>
						</div>
					</Row>
				</Col>
			</Container>
			<BootstrapTable
				className="mt-3"
				keyField="id"
				data={rows}
				columns={columns}
				rowEvents={rowEvents}
				hover
				condensed
			/>
			<ReactPaginate
				previousLabel={'<<'}
				nextLabel={'>>'}
				breakLabel={''}
				pageCount={1}
				//marginPagesDisplayed={2}
				pageRangeDisplayed={1}
				//onPageChange={this.handlePageClick}
				containerClassName={'pagination'}
				subContainerClassName={'pages pagination'}
				activeClassName={'active'}
			/>
			<div>
				{searchResults.length !== 0 ? (
					<Table size="sm">
						<thead>
							<tr>
								<th>Name</th>
							</tr>
						</thead>
						{searchResults ? (
							searchResults.map((ele, i) => (
								<tbody>
									<tr>
										<td>{ele.employee_name} </td>
									</tr>
								</tbody>
							))
						) : (
							<div></div>
						)}
					</Table>
				) : (
					<div></div>
				)}
			</div>
		</React.Fragment>
	);
};

export default EmployeeDataTable;
