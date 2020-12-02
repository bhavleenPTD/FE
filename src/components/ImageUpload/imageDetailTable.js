import React, { useState, useEffect } from 'react';
import '../../Styles/rights_table.css';
// import { Table } from 'reactstrap';
import {
	Badge,
	Button,
	Modal,
	ModalBody,
	ModalHeader,
	Input,
	Table,
	Container,
	Row,
	Col,
} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import { EmpHTTP } from '../Interceptors/empInterceptor';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';
import { URL } from '../../modal/url';

const ImageDetailTable = () => {
	const [showRoleUpdateModal, setShowRoleUpdateModal] = useState(false);
	const [modal, setModal] = useState(false);
	const [searchResults, setSearchResults] = useState('');
	const [bulkAssignData, setBulkAssignData] = useState('');
	const [selectedEmployee, setSelectedEmployee] = useState();
	const [imageDetails, setImageDetails] = useState([]);
	const [employees, setEmployees] = useState([]);
	const [selection, setSelection] = useState(false);
	const [assignedCount, setAssignedCount] = useState();
	const [notAssignedCount, setNotAssignedCount] = useState();
	const [rowsSelected, setRowsSelected] = useState([]);
	const [totalImages, setTotalImages] = useState('');
	const [pages, setTotalPages] = useState([]);
	const [currPage, setCurrPage] = useState(1);
	const [allImageData, setAllImageData] = useState([]);
	const [postsPerPage] = useState(10);
	const [locSearch, setLocSearch] = useState([]);
	const [searchPageNo, setSearchPageNo] = useState('');
	const [searchPageTotal, setSearchPageTotal] = useState([]);

	useEffect(() => {
		//const theEmployee = localStorage.getItem("imageData");
		getImageDetails();
		getUsers();
		getExistingAllocData();
	}, []);

	const toggle = () => setModal(!modal);

	const getImageDetails = async (page = 1) => {
		const data = {
			page: page,
			res_ppage: 10,
		};
		const res = await EmpHTTP.get(URL.GET_IMAGE_DATA, { params: data });
		try {
			console.log('DATA', res.data.imageData.allImages);
			setTotalPages(res.data.imageData.pages);
			setTotalImages(res.data.imageData.totalImages);
			setImageDetails(res.data.imageData.images);
			setCurrPage(page);
			const assignedNum = res.data.imageData.allImages.filter((ele) => {
				return ele.active === true;
			});
			const notAssignedNum = res.data.imageData.allImages.filter((ele) => {
				return ele.active === false;
			});

			setAllImageData(res.data.imageData.allImages);
			setAssignedCount(assignedNum.length);
			setNotAssignedCount(notAssignedNum.length);
			console.log('AC', assignedCount, notAssignedCount);
		} catch (error) {
			console.log(error);
		}
	};

	const getExistingAllocData = async () => {
		const res = await EmpHTTP.get(URL.EXISTING_ALLOC_DATA);
		try {
			console.log('existing Data', res);
		} catch (error) {
			console.log(error);
		}
	};

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

	const toggleModal = () => {
		setSelectedEmployee('');
		setSearchResults('');
		setModal(!modal);
	};

	const bulkAssign = () => {
		const apiData = [];
		bulkAssignData.forEach((ele) => {
			return apiData.push({
				locationId: ele.locationId,
				locationName: ele.location.toLowerCase(),
				thumbnail: ele.thumbnail,
				img_Id: ele.id,
				img_name: ele.image_detail,
				empId: selectedEmployee.empId,
				empName: selectedEmployee.name,
				img_path: ele.img_path,
				xml: ele.xml,
				assignedOn: new Date(),
				status: true,
				report_status: false,
			});
		});
		const updateData = [];
		bulkAssignData.forEach((ele) => {
			return updateData.push({
				_id: ele.id,
				empId: selectedEmployee.empId,
				empName: selectedEmployee.name,
				assignedOn: new Date(),
				active: true,
			});
		});

		allocateImage(apiData);
		updateAllocationData(updateData);
		getImageDetails(currPage);

		console.log('BAD', bulkAssignData, '2', apiData);
	};

	const allocateImage = async (apiData) => {
		const res = await EmpHTTP.post(URL.SAVE_EMPLOYEE_ALLOC, apiData);
		try {
			console.log(res);
			notify();
			setModal(!modal);
			setBulkAssignData([]);
			setSelection(false);
			setRowsSelected([]);
		} catch (error) {
			console.log(error);
		}
	};

	const updateAllocationData = async (updateData) => {
		const res = await EmpHTTP.post(URL.UPDATE_ALLOC_DATA, updateData);
		try {
			console.log(res);
			getUsers();
			setBulkAssignData([]);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSearch = (event) => {
		console.log('search', event.target.value);
		const searchQuery = event.target.value;
		console.log(employees);
		var pattern = searchQuery
			.split('')
			.map((x) => {
				return `(?=.*${x})`;
			})
			.join('');
		var regex = new RegExp(`${pattern.toLowerCase()}`, 'g');
		const results = employees.filter((elem) => {
			return (elem.name + ' ' + elem.lastname).toLowerCase().match(regex);
		});
		console.log(results);

		if (searchQuery.length !== 0) {
			setSearchResults(results);
		} else {
			setSearchResults('');
			setSelectedEmployee('');
		}
	};

	const handleImagesSearch = (event) => {
		console.log('searchImages', event.target.value);
		if (event.target.value != null) {
			const searchQuery = event.target.value;
			console.log(employees);
			var pattern = searchQuery
				.split('')
				.map((x) => {
					return `(?=.*${x})`;
				})
				.join('');
			var regex = new RegExp(`${pattern.toLowerCase()}`, 'g');

			const results = allImageData.filter((elem) => {
				return elem.locationName.toLowerCase().match(regex);
			});
			setLocSearch(results);
			paginate(1);
		}
		if (event.target.value.length === 0) {
			getImageDetails();
			setCurrPage(1);
			setSearchPageNo();
		}
		// if (searchQuery.length !== 0) {
		// 	setSearchResults(results);
		// } else {
		// 	setSearchResults('');
		// 	setSelectedEmployee('');
		// }
	};

	const paginate = (page = 1) => {
		const indexOfLastPost = page * postsPerPage;
		const indexOfFirstPost = indexOfLastPost - postsPerPage;
		const currentPosts = locSearch.slice(indexOfFirstPost, indexOfLastPost);

		console.log(Math.ceil(locSearch.length / postsPerPage), locSearch);
		setSearchPageTotal(Math.ceil(locSearch.length / postsPerPage));

		console.log(searchPageNo);
		setImageDetails(currentPosts);
		setSearchPageNo(page);
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

	const rows = imageDetails.map((ele, key) => ({
		sr_no: !searchPageNo
			? 10 * (currPage - 1) + key + 1
			: 10 * (searchPageNo - 1) + key + 1,
		id: ele._id,
		location: ele.locationName.toUpperCase(),
		locationId: ele.locationId,
		thumbnail: ele.thumbnail,
		image_detail: ele.img_name.substr(0, ele.img_name.lastIndexOf('.')),
		img_path: ele.img_path,
		satellite: ele.satellite,
		e_date: ele.createdAt,
		xml: ele.xml,
		entry_date: timeConverter(ele.createdAt),
		last_assigned: ele.lastAssignedTo,
		isAssigned: ele.active,
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
			dataField: 'location',
			text: 'Location Details',
			sort: true,
			headerStyle: (column, colIndex) => {
				return { width: '180px' };
			},
		},
		{
			dataField: 'image_detail',
			text: 'Image Details',
			sort: true,
			headerStyle: (column, colIndex) => {
				return { width: '290px' };
			},
			formatter: (cellContent, rows) => {
				if (cellContent) {
					return <h6 style={{ wordWrap: 'break-word' }}>{cellContent}</h6>;
				}
			},
		},
		{
			dataField: 'satellite',
			text: 'Satellite',
			headerStyle: (column, colIndex) => {
				return { width: '100px' };
			},
			sort: true,
		},
		{
			dataField: 'entry_date',
			text: 'Date of Entry',
			editable: false,
			headerStyle: (column, colIndex) => {
				return { width: '150px' };
			},
			sort: true,
			sortValue: (cell, rows) => rows.e_date,
		},
		{
			dataField: 'last_assigned',
			text: 'Last assigned to',
			editable: false,
			sort: true,
			headerStyle: (column, colIndex) => {
				return { width: '200px' };
			},
			formatter: (cellContent, rows) => {
				if (cellContent) {
					return <h6>{cellContent}</h6>;
				}
				return <h6>Not Assigned Yet</h6>;
			},
		},
		{
			dataField: 'isAssigned',
			text: 'Assigned To',
			sort: true,
			headerStyle: (column, colIndex) => {
				return { width: '150px' };
			},
			formatter: (cellContent, rows) => {
				if (cellContent === true) {
					return (
						<h6>
							<Badge color="success">Assigned</Badge>
						</h6>
					);
				}
				return (
					<h6>
						<Badge color="danger">Not Assigned</Badge>
					</h6>
				);
			},
		},
	];

	const rowEvents = {
		onClick: (e, row, rowIndex) => {
			setShowRoleUpdateModal(!showRoleUpdateModal);
		},
	};

	const selectRow = {
		mode: 'checkbox',
		clickToSelect: true,
		classes: 'selection-row',
		selected: rowsSelected,
		hideSelectAll: true,
		nonSelectable: [0, 2, 4],
		onSelect: (row, isSelect, rowIndex, e) => {
			if (isSelect) {
				setBulkAssignData([...bulkAssignData, row]);
				setSelection(isSelect);
				setRowsSelected([...rowsSelected, row.id]);
			} else {
				setRowsSelected(rowsSelected.filter((x) => x != row.id));
				setBulkAssignData(bulkAssignData.filter((x) => x.id != row.id));
				//setSelection(isSelect);
			}
		},
		onSelectAll: (isSelect, rows, e) => {
			if (isSelect) {
				setBulkAssignData(rows);
				setSelection(isSelect);
			} else {
				// setBulkAssignData([...bulkAssignData, row]);
				setSelection([]);
			}
		},
		headerColumnStyle: (status) => {
			return {
				width: '40px',
			};
		},
	};

	const onEmployeeSelect = (data) => {
		console.log('Eid', data);
		setSelectedEmployee(data);
	};

	const handlePageClick = (e) => {
		console.log(e.selected + 1);
		getImageDetails(e.selected + 1);
	};

	const handleSearchPageClick = (e) => {
		console.log(e.selected + 1);
		paginate(e.selected + 1);

		//setSearchPageNo(e.selected + 1);
	};

	const notify = () =>
		toast.success('Assigned Successfully !!!', {
			position: 'bottom-left',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});

	return (
		<React.Fragment>
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={true}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<Container className="mb-5">
				<Row>
					<Col>
						<h1>Task Assignment</h1>
					</Col>
					<Col>
						{' '}
						<Button
							color="primary"
							style={{
								float: 'right',
							}}
							disabled={bulkAssignData.length == 0}
							onClick={toggleModal}
						>
							Select Employee/Bulk Assign
						</Button>
					</Col>
				</Row>
				<hr />
				<Row>
					<Col>
						<div className="Img-all-datadiv">
							<h4>Total Images</h4>
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
									<div style={{ color: 'blue', fontSize: '50px' }}>
										{totalImages}
									</div>
								</Col>
							</Row>
						</div>
					</Col>
					<Col>
						<div className="Img-all-datadiv">
							<h4>Assigned Count</h4>
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
									<div style={{ color: 'green', fontSize: '50px' }}>
										{assignedCount}
									</div>
								</Col>
							</Row>
						</div>
					</Col>

					<Col>
						<div className="Img-all-datadiv">
							<h4>Not Assigned Count</h4>
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
									<div style={{ color: 'crimson', fontSize: '50px' }}>
										{notAssignedCount}
									</div>
								</Col>
							</Row>
						</div>
					</Col>
				</Row>
			</Container>
			<div>
				<Input
					type="search"
					name="searchImages"
					id="Search"
					placeholder="Search Images By Location"
					onChange={handleImagesSearch}
				/>
				<BootstrapTable
					keyField="id"
					data={rows}
					columns={columns}
					rowEvents={rowEvents}
					selectRow={selectRow}
					cellEdit={cellEditFactory({ mode: 'click', blurToSave: true })}
				/>

				{locSearch.length === 0 ? (
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
				) : (
					<ReactPaginate
						previousLabel={'<<'}
						nextLabel={'>>'}
						pageCount={searchPageTotal}
						marginPagesDisplayed={0}
						pageRangeDisplayed={5}
						onPageChange={handleSearchPageClick}
						containerClassName={'pagination'}
						subContainerClassName={'pages pagination'}
						activeClassName={'active'}
					/>
				)}
			</div>

			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle}>Assign</ModalHeader>

				<ModalBody style={{ padding: '2rem' }}>
					<h6>Select Employee</h6>
					<Input
						type="search"
						name="search"
						id="exampleSearch"
						placeholder="Search Employees"
						onChange={handleSearch}
					/>
					<Container>
						{selectedEmployee ? (
							<div
								className="container"
								style={{
									background: 'wheat',
									border: '2px solid gold',
									padding: '1rem',
									margin: '0.5rem',
									borderRadius: '10px',
									display: 'flex',
								}}
							>
								<div className="row">
									<div className="col-9">
										Click done to allocate Image(s) to
										<h4>
											<Badge color="warning">{selectedEmployee.name}</Badge>
										</h4>
									</div>
									<div className="col-3">
										<Button color="primary" onClick={bulkAssign}>
											Done
										</Button>
									</div>
								</div>
							</div>
						) : (
							<div></div>
						)}
					</Container>

					<div style={{ display: 'flex', justifyContent: 'center' }}>
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
												<td onClick={() => onEmployeeSelect(ele)}>
													{ele.name + ' ' + ele.lastname}
												</td>
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
				</ModalBody>
			</Modal>
		</React.Fragment>
	);
};

export default ImageDetailTable;
