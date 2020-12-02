import React, {
	useEffect,
	useState,
	forwardRef,
	useImperativeHandle,
} from 'react';
import '../../Styles/rights_table.css';
// import { Table } from 'reactstrap';
import { Badge } from 'reactstrap';
import RolesUpdate from '../Roles/update_roles';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { URL } from '../../modal/url';
import { EmpHTTP } from '../Interceptors/empInterceptor';
import ReactPaginate from 'react-paginate';

const RolesTable = forwardRef((props, ref) => {
	const [showRoleUpdateModal, setShowRoleUpdateModal] = useState(false);
	const [roles, setRoles] = useState([]);
	const [updateId, setUpdateId] = useState('');
	const [selectedRow, setSelectedRow] = useState('');

	useEffect(() => {
		getRoles();
	}, []);

	const getRoles = async () => {
		const res = await EmpHTTP.get(URL.GET_ROLES);
		try {
			console.log(res.data.roles);
			setRoles(res.data.roles);
		} catch (error) {
			console.log(error);
		}
	};

	useImperativeHandle(ref, () => ({
		getRoles: getRoles,
	}));

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

	var count = 1;
	const rows = roles.map((role) => ({
		sr_no: count++,
		id: role._id,
		role_name: role.label,
		role_description: role.desc,
		role_status: role.active,
		date: role.createdAt,
		displayDate: timeConverter(role.createdAt),
	}));

	const columns = [
		{
			dataField: 'sr_no',
			text: 'Sr. No.',
			headerStyle: (column, colIndex) => {
				return { width: '80px' };
			},
		},
		{
			dataField: 'role_name',
			text: 'Role Name',
			headerStyle: (column, colIndex) => {
				return { width: '250px' };
			},
		},
		{
			dataField: 'role_description',
			text: 'Description',
		},
		{
			dataField: 'role_status',
			text: 'Status',
			headerStyle: (column, colIndex) => {
				return { width: '180px' };
			},
			formatter: (cellContent, rows) => {
				if (rows.role_status) {
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

	const getRights = async () => {
		const res = await EmpHTTP.get(URL.GET_RIGHTS);
		try {
			console.log('DDD', res.data);
		} catch (error) {
			console.log(error);
		}
	};

	const rowEvents = {
		onClick: (e, row, rowIndex) => {
			if (row) {
				setUpdateId(row.id);
				setSelectedRow(row);
				getRights();
			}
			setShowRoleUpdateModal(!showRoleUpdateModal);
			console.log(`clicked on row with index: ${rowIndex}`);
		},
	};

	const handlePageClick = (e) => {
		console.log(e.selected);
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
			<BootstrapTable
				keyField="id"
				data={rows}
				columns={columns}
				rowEvents={rowEvents}
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

			<RolesUpdate
				showRoleUpdateModal={showRoleUpdateModal}
				toggleModal={rowEvents.onClick}
				updateId={updateId}
				selectedRow={selectedRow}
				getData={getRoles}
			/>
		</React.Fragment>
	);
});

export default RolesTable;
