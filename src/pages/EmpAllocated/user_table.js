import React, { useState } from 'react';
import '../../Styles/rights_table.css';
import { Badge, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory, {
	PaginationProvider,
	PaginationListStandalone,
} from 'react-bootstrap-table2-paginator';
import Switch from 'react-switch';
import PropTypes from 'prop-types';
import axios from 'axios';

class SwitchControl extends React.Component {
	componentWillMount() {}
	static propTypes = {
		value: PropTypes,
		onUpdate: PropTypes.func.isRequired,
	};
	static defaultProps = {
		value: '',
	};
	getValue() {
		console.log('value', this.props.value);
		return JSON.parse(!this.props.value);
	}
	render() {
		const { value, onUpdate, index, ...rest } = this.props;
		console.log('props data', this.props);
		return [
			<Switch
				checked={value}
				key={index}
				onChange={() => onUpdate(this.getValue())}
			/>,
		];
	}
}

const UsersTable = () => {
	const [currentPage, setCurrentPage] = useState();
	const users = [
		{
			user_name: 'Robb Stark',
			user_email: 'rob@gmail',
			user_status: false,
			user_role: 'Analyst',
			iat: 1599638569,
		},
		{
			user_name: 'Jon Snow',
			user_email: 'jon@gmail',
			user_status: false,
			user_role: 'FSD',
			iat: 1596538547,
		},
		{
			user_name: 'Walter White',
			user_email: 'bb@gmail',
			user_status: true,
			user_role: 'Manager',
			iat: 1551632145,
		},
		{
			user_name: 'White Walker',
			user_email: 'got@gmail.com',
			user_status: true,
			user_role: 'Agent',
			iat: 1556659632,
		},
		{
			user_name: 'Elon Musk',
			user_email: 'elon@gmail',
			user_status: true,
			user_role: 'Field Agent',
			iat: 1539637532,
		},
		{
			user_name: 'Robb Stark',
			user_email: 'rob@gmail',
			user_status: false,
			user_role: 'Analyst',
			iat: 1599638569,
		},
		{
			user_name: 'Jon Snow',
			user_email: 'jon@gmail',
			user_status: false,
			user_role: 'FSD',
			iat: 1596538547,
		},
		{
			user_name: 'Walter White',
			user_email: 'bb@gmail',
			user_status: true,
			user_role: 'Manager',
			iat: 1551632145,
		},
		{
			user_name: 'White Walker',
			user_email: 'got@gmail.com',
			user_status: true,
			user_role: 'Agent',
			iat: 1556659632,
		},
		{
			user_name: 'Elon Musk',
			user_email: 'elon@gmail',
			user_status: true,
			user_role: 'Field Agent',
			iat: 1539637532,
		},
		{
			user_name: 'Robb Stark',
			user_email: 'rob@gmail',
			user_status: false,
			user_role: 'Analyst',
			iat: 1599638569,
		},
		{
			user_name: 'Jon Snow',
			user_email: 'jon@gmail',
			user_status: false,
			user_role: 'FSD',
			iat: 1596538547,
		},
		{
			user_name: 'Walter White',
			user_email: 'bb@gmail',
			user_status: true,
			user_role: 'Manager',
			iat: 1551632145,
		},
		{
			user_name: 'White Walker',
			user_email: 'got@gmail.com',
			user_status: true,
			user_role: 'Agent',
			iat: 1556659632,
		},
		{
			user_name: 'Elon Musk',
			user_email: 'elon@gmail',
			user_status: true,
			user_role: 'Field Agent',
			iat: 1539637532,
		},
		{
			user_name: 'Robb Stark',
			user_email: 'rob@gmail',
			user_status: false,
			user_role: 'Analyst',
			iat: 1599638569,
		},
		{
			user_name: 'Jon Snow',
			user_email: 'jon@gmail',
			user_status: false,
			user_role: 'FSD',
			iat: 1596538547,
		},
		{
			user_name: 'Walter White',
			user_email: 'bb@gmail',
			user_status: true,
			user_role: 'Manager',
			iat: 1551632145,
		},
		{
			user_name: 'White Walker',
			user_email: 'got@gmail.com',
			user_status: true,
			user_role: 'Agent',
			iat: 1556659632,
		},
		{
			user_name: 'Elon Musk',
			user_email: 'elon@gmail',
			user_status: true,
			user_role: 'Field Agent',
			iat: 1539637532,
		},
		{
			user_name: 'Robb Stark',
			user_email: 'rob@gmail',
			user_status: false,
			user_role: 'Analyst',
			iat: 1599638569,
		},
		{
			user_name: 'Jon Snow',
			user_email: 'jon@gmail',
			user_status: false,
			user_role: 'FSD',
			iat: 1596538547,
		},
		{
			user_name: 'Walter White',
			user_email: 'bb@gmail',
			user_status: true,
			user_role: 'Manager',
			iat: 1551632145,
		},
		{
			user_name: 'White Walker',
			user_email: 'got@gmail.com',
			user_status: true,
			user_role: 'Agent',
			iat: 1556659632,
		},
		{
			user_name: 'Elon Musk',
			user_email: 'elon@gmail',
			user_status: true,
			user_role: 'Field Agent',
			iat: 1539637532,
		},
		{
			user_name: 'Robb Stark',
			user_email: 'rob@gmail',
			user_status: false,
			user_role: 'Analyst',
			iat: 1599638569,
		},
		{
			user_name: 'Jon Snow',
			user_email: 'jon@gmail',
			user_status: false,
			user_role: 'FSD',
			iat: 1596538547,
		},
		{
			user_name: 'Walter White',
			user_email: 'bb@gmail',
			user_status: true,
			user_role: 'Manager',
			iat: 1551632145,
		},
		{
			user_name: 'White Walker',
			user_email: 'got@gmail.com',
			user_status: true,
			user_role: 'Agent',
			iat: 1556659632,
		},
		{
			user_name: 'Elon Musk',
			user_email: 'elon@gmail',
			user_status: true,
			user_role: 'Field Agent',
			iat: 1539637532,
		},
		{
			user_name: 'Robb Stark',
			user_email: 'rob@gmail',
			user_status: false,
			user_role: 'Analyst',
			iat: 1599638569,
		},
		{
			user_name: 'Jon Snow',
			user_email: 'jon@gmail',
			user_status: false,
			user_role: 'FSD',
			iat: 1596538547,
		},
		{
			user_name: 'Walter White',
			user_email: 'bb@gmail',
			user_status: true,
			user_role: 'Manager',
			iat: 1551632145,
		},
		{
			user_name: 'White Walker',
			user_email: 'got@gmail.com',
			user_status: true,
			user_role: 'Agent',
			iat: 1556659632,
		},
		{
			user_name: 'Elon Musk',
			user_email: 'elon@gmail',
			user_status: true,
			user_role: 'Field Agent',
			iat: 1539637532,
		},
		{
			user_name: 'Robb Stark',
			user_email: 'rob@gmail',
			user_status: false,
			user_role: 'Analyst',
			iat: 1599638569,
		},
		{
			user_name: 'Jon Snow',
			user_email: 'jon@gmail',
			user_status: false,
			user_role: 'FSD',
			iat: 1596538547,
		},
		{
			user_name: 'Walter White',
			user_email: 'bb@gmail',
			user_status: true,
			user_role: 'Manager',
			iat: 1551632145,
		},
		{
			user_name: 'White Walker',
			user_email: 'got@gmail.com',
			user_status: true,
			user_role: 'Agent',
			iat: 1556659632,
		},
		{
			user_name: 'Elon Musk',
			user_email: 'elon@gmail',
			user_status: true,
			user_role: 'Field Agent',
			iat: 1539637532,
		},
		{
			user_name: 'Robb Stark',
			user_email: 'rob@gmail',
			user_status: false,
			user_role: 'Analyst',
			iat: 1599638569,
		},
		{
			user_name: 'Jon Snow',
			user_email: 'jon@gmail',
			user_status: false,
			user_role: 'FSD',
			iat: 1596538547,
		},
		{
			user_name: 'Walter White',
			user_email: 'bb@gmail',
			user_status: true,
			user_role: 'Manager',
			iat: 1551632145,
		},
		{
			user_name: 'White Walker',
			user_email: 'got@gmail.com',
			user_status: true,
			user_role: 'Agent',
			iat: 1556659632,
		},
		{
			user_name: 'Elon Musk',
			user_email: 'elon@gmail',
			user_status: true,
			user_role: 'Field Agent',
			iat: 1539637532,
		},
		{
			user_name: 'Jon Snow',
			user_email: 'jon@gmail',
			user_status: false,
			user_role: 'FSD',
			iat: 1596538547,
		},
		{
			user_name: 'Walter White',
			user_email: 'bb@gmail',
			user_status: true,
			user_role: 'Manager',
			iat: 1551632145,
		},
		{
			user_name: 'White Walker',
			user_email: 'got@gmail.com',
			user_status: true,
			user_role: 'Agent',
			iat: 1556659632,
		},
		{
			user_name: 'Elon Musk',
			user_email: 'elon@gmail',
			user_status: true,
			user_role: 'Field Agent',
			iat: 1539637532,
		},
		{
			user_name: 'Robb Stark',
			user_email: 'rob@gmail',
			user_status: false,
			user_role: 'Analyst',
			iat: 1599638569,
		},
		{
			user_name: 'Jon Snow',
			user_email: 'jon@gmail',
			user_status: false,
			user_role: 'FSD',
			iat: 1596538547,
		},
		{
			user_name: 'Walter White',
			user_email: 'bb@gmail',
			user_status: true,
			user_role: 'Manager',
			iat: 1551632145,
		},
		{
			user_name: 'White Walker',
			user_email: 'got@gmail.com',
			user_status: true,
			user_role: 'Agent',
			iat: 1556659632,
		},
		{
			user_name: 'Elon Musk',
			user_email: 'elon@gmail',
			user_status: true,
			user_role: 'Field Agent',
			iat: 1539637532,
		},
	];

	console.log(users);

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

	const roles = [
		{ id: 1, name: 'Analyst' },
		{ id: 2, name: 'Agent' },
		{ id: 3, name: 'Manager' },
		{ id: 4, name: 'FSD' },
		{ id: 5, name: 'Field Agent' },
	];
	var count = 1;
	const rows = users.map((user) => ({
		id: count++,
		user_name: user.user_name,
		user_email: user.user_email,
		user_role: user.user_role,
		user_status: user.user_status,
		iat: user.iat,
		displayDate: timeConverter(user.iat),
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
			dataField: 'user_name',
			text: 'Name',
			editable: false,
			headerStyle: (column, colIndex) => {
				return { width: '250px' };
			},
		},
		{
			dataField: 'user_email',
			text: 'Email',
			editable: false,
			headerStyle: (column, colIndex) => {
				return { width: '250px' };
			},
		},
		{
			dataField: 'user_role',
			text: 'Role',
			editable: true,
			headerStyle: (column, colIndex) => {
				return { width: '150px' };
			},

			editor: {
				type: Type.SELECT,
				getOptions: (setOptions, { row, column }) => {
					console.log(`current editing row id: ${row._id}`);
					console.log(`current editing column: ${column.dataField}`);
					const data = roles.map((role) => ({
						label: role.name,
						value: role.name,
					}));
					return data;
				},
			},
		},
		{
			dataField: 'user_status',
			text: 'Status',
			editable: true,
			editorRenderer: (
				editorProps,
				value,
				row,
				column,
				rowIndex,
				columnIndex,
			) => <SwitchControl {...editorProps} index={rowIndex} value={value} />,
			headerStyle: (column, colIndex) => {
				return { width: '180px' };
			},
			formatter: (cellContent, row, editor) => {
				if (cellContent == true) {
					return (
						<h5>
							<Badge color="success">Active</Badge>
						</h5>
					);
				}
				return (
					<h5>
						<Badge color="danger">Not Active</Badge>
					</h5>
				);
			},
		},
		{
			dataField: 'displayDate',
			text: 'Date',
			editable: false,
			headerStyle: (column, colIndex) => {
				return { width: '150px' };
			},
			sort: true,
			sortValue: (cell, rows) => rows.iat,
		},
	];

	const rowEvents = {
		onClick: (e, row, rowIndex) => {
			// setShowRoleUpdateModal(!showRoleUpdateModal);
			console.log(`clicked on row with index: ${rowIndex}`);
		},
	};

	console.log(currentPage);
	const options = {
		paginationSize: 5,
		pageStartIndex: 1,
		firstPageText: 'First',
		prePageText: 'Back',
		nextPageText: 'Next',
		lastPageText: 'Last',
		nextPageTitle: 'First page',
		prePageTitle: 'Pre page',
		firstPageTitle: 'Next page',
		lastPageTitle: 'Last page',
		showTotal: true,
		hideSizePerPage: true,
		onPageChange: (page, sizePerPage) => {
			console.log('Page change!!!');
			console.log('Newest size per page:' + sizePerPage);
			console.log('Newest page:' + page);
		},

		disablePageTitle: true,
	};

	return (
		<React.Fragment>
			<div>
				<BootstrapTable
					keyField="id"
					data={rows}
					columns={columns}
					rowEvents={rowEvents}
					cellEdit={cellEditFactory({
						mode: 'click',
						blurToSave: false,
					})}
					pagination={paginationFactory(options)}
				/>
				<div style={{ marginRight: '50%' }}></div>
			</div>
		</React.Fragment>
	);
};

export default UsersTable;
