import React, { useState, useEffect } from 'react';
import '../../Styles/rights_table.css';
import { Badge, Container, Row, Col } from 'reactstrap';
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

class SwitchControl extends React.Component {
	state = {
		switchValue: '',
	};
	static propTypes = {
		value: PropTypes,
		onUpdate: PropTypes.func.isRequired,
	};
	static defaultProps = {
		value: '',
	};
	getValue() {
		console.log('value', this.props.value);
		this.setState({
			switchValue: JSON.parse(!this.props.value),
		});
		this.props.editUserStatus(this.state.switchValue);
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
	const [allUsers, setAllUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [currPage, setCurrPage] = useState(1);
	const [userData, setUserData] = useState(1);
	const [pages, setTotalPages] = useState([]);
	const [totalUserCount, setTotalUserCount] = useState('');
	const [selectUser, setSelectUser] = useState('');

	useEffect(() => {
		getUsers();
		//getRoles();
	}, []);

	const getUsers = async (page = 1) => {
		const data = {
			page: page,
			res_ppage: 10,
		};
		const res = await EmpHTTP.get(URL.GET_USERS, { params: data });
		try {
			console.log(res);
			setAllUsers(res.data.users.page_user);
			setTotalPages(res.data.users.pages);
			setTotalUserCount(res.data.users.totaluserCount);
			setCurrPage(page);
		} catch (error) {
			console.log(error);
		}
	};

	const handlePageClick = (e) => {
		console.log(e.selected + 1);
		getUsers(e.selected + 1);
	};

	const editUserStatus = async (switchValue) => {
		console.log(switchValue);
		const data = {
			empId: selectUser.empId,
			active: switchValue,
		};
		const res = await EmpHTTP.post(URL.AUTHENTICATE_EMP, data);
		try {
			console.log(res);
			notify();
			getUsers();
		} catch (error) {
			console.log(error);
		}
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

	// const getRoles = async () => {
	// 	const res = await EmpHTTP.get(URL.GET_ROLES);
	// 	try {
	// 		console.log(res.data.roles);
	// 		setRoles(res.data.roles);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

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

	const rows = allUsers.map((user, key) => ({
		id: 10 * (currPage - 1) + key + 1,
		empId: user.empId,
		user_name: user.name,
		user_email: user.email,
		user_role: user.role,
		user_status: user.active,
		iat: user.createdAt,
		displayDate: timeConverter(user.createdAt),
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
		// {
		// 	dataField: 'user_role',
		// 	text: 'Role',
		// 	editable: true,
		// 	headerStyle: (column, colIndex) => {
		// 		return { width: '150px' };
		// 	},

		// 	editor: {
		// 		type: Type.SELECT,
		// 		getOptions: (setOptions, { row, column }) => {
		// 			//console.log(row.user_role);
		// 			console.log('roles', roles);

		// 			const data = roles.map((role) => ({
		// 				label: role.label,
		// 				value: role.label,
		// 			}));

		// 			return data;
		// 		},
		// 	},
		// 	formatter: (cellContent, row, editor) => {
		// 		console.log(cellContent);
		// 		if (cellContent !== undefined) {
		// 			return <p>{cellContent}</p>;
		// 		} else {
		// 			return <p>No Role Assigned</p>;
		// 		}
		// 	},
		// },
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
			) => (
				<SwitchControl
					{...editorProps}
					index={rowIndex}
					value={value}
					editUserStatus={editUserStatus}
				/>
			),
			headerStyle: (column, colIndex) => {
				return { width: '180px' };
			},
			formatter: (cellContent, row, editor) => {
				// console.log(row.id);
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
			// const userUpdateData = {};
			// setShowRoleUpdateModal(!showRoleUpdateModal);
			setSelectUser(row);
			console.log(row);
		},
	};

	// function beforeSaveCell(oldValue, newValue, row, column, done) {
	// 	setTimeout(() => {
	// 		if (alert('Do you want to accep this change?')) {
	// 			console.log(oldValue, newValue);
	// 			done(true);
	// 		} else {
	// 			console.log(oldValue, newValue);
	// 			done(false);
	// 		}
	// 	}, 0);
	// 	return { async: true };
	// }

	return (
		<React.Fragment>
			<h1>Users Management</h1>
			<hr />
			<Container>
				<Row>
					<Col sm="4">
						<div className="Img-all-datadiv">
							<Row>
								<h4>New SignUps Count</h4>
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
			<ToastContainer
				position="left_bottom"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={true}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<div>
				<BootstrapTable
					keyField="id"
					data={rows}
					columns={columns}
					rowEvents={rowEvents}
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

export default UsersTable;
