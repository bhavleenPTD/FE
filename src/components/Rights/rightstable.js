import React from 'react';
import '../../Styles/rights_table.css';
import '../../Styles/react_paginate.css';
import { Badge } from 'reactstrap';
import RightsUpdate from '../Rights/rights_update';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {EmpHTTP} from '../Interceptors/empInterceptor';
import ReactPaginate from 'react-paginate';
import { URL } from '../../modal/url';

class RightsTable extends React.Component {
	constructor() {
		super();
		this.state = {
			rights: [],
			page: '',
			showUpdateModal: false,
			updateId: '',
			selectedRow: '',
			offset: 0,
			data: [],
			elements: [],
			perPage: 5,
			currentPage: 1,
		};
	}
	// const [rights, setRights] = useState([]);

	// const [showUpdateModal, setShowUpdateModal] = useState(false);
	// const [updateId, setUpdateId] = useState('');
	// const [selectedRow, setSelectedRow] = useState('');

	componentDidMount() {
		this.getRights();
	}

	getRights = async () => {
		const res = await EmpHTTP.get(URL.GET_RIGHTS);
		try {
			this.setState({
				rights: res.data.rights,
			});
		} catch (error) {
			console.log(error);
		}
	};

	timeConverter = (UNIX_timestamp) => {
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

	columns = [
		{
			dataField: 'sr_no',
			text: 'Sr. No.',
			headerStyle: (column, colIndex) => {
				return { width: '80px' };
			},
		},
		{
			dataField: 'right_name',
			text: 'Role Name',
			headerStyle: (column, colIndex) => {
				return { width: '250px' };
			},
		},
		{
			dataField: 'right_description',
			text: 'Description',
		},
		{
			dataField: 'right_status',
			text: 'Status',
			headerStyle: (column, colIndex) => {
				return { width: '180px' };
			},
			formatter: (cellContent, rows) => {
				if (rows.right_status) {
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
			headerStyle: (column, colIndex) => {
				return { width: '150px' };
			},
			sort: true,
			sortValue: (cell, rows) => rows.date,
		},
	];

	getData() {
		this.callChildMethod();
	}

	handlePageClick = (e) => {
		this.setState({
			page: e.selected,
		});
		console.log('page no.', e.selected);
		//api call
	};

	render() {
		var count = 1;
		const rows = this.state.rights.map((right) => ({
			sr_no: count++,
			id: right._id,
			right_name: right.label,
			right_description: right.desc,
			right_status: right.active,
			right_url: right.url,
			date: right.createdAt,
			displayDate: this.timeConverter(right.createdAt),
		}));

		const rowEvents = {
			onClick: (e, row, rowIndex) => {
				console.log(e, row, rowIndex);
				if (row) {
					this.setState({
						updateId: row.id,
						selectedRow: row,
					});
				}
				this.setState({ showUpdateModal: !this.state.showUpdateModal });
			},
		};

		return (
			<React.Fragment>
				<BootstrapTable
					keyField="id"
					data={rows}
					columns={this.columns}
					rowEvents={rowEvents}
				/>
				<ReactPaginate
					previousLabel={'<<'}
					nextLabel={'>>'}
					breakLabel={''}
					initialPage={2}
					disableInitialCallback={true}
					pageCount={this.state.pageCount}
					marginPagesDisplayed={0}
					pageRangeDisplayed={4}
					onPageChange={this.handlePageClick}
					containerClassName={'pagination'}
					subContainerClassName={'pages pagination'}
					activeClassName={'active'}
				/>

				<RightsUpdate
					showUpdatemodal={this.state.showUpdateModal}
					toggleModal={rowEvents.onClick}
					sendUpdateId={this.state.updateId}
					selectedRow={this.state.selectedRow}
					getData={this.getRights}
				/>
			</React.Fragment>
		);
	}
}

export default RightsTable;
