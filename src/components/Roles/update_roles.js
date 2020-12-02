import React, { useState, useEffect } from 'react';
import '../../Styles/rights_create.css';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Label,
	Row,
	Col,
	Container,
} from 'reactstrap';
import {
	AvForm,
	AvField,
	AvCheckboxGroup,
	AvCheckbox,
	AvGroup,
} from 'availity-reactstrap-validation';

import { URL } from '../../modal/url';

import Switch from 'react-switch';

import { EmpHTTP } from '../Interceptors/empInterceptor';

const RolesUpdate = ({
	showRoleUpdateModal,
	toggleModal,
	updateId,
	selectedRow,
	getData,
}) => {

	const [allRights, setAllRights] = useState();
	const { createRoleUrl } = URL;
	const [nestedModal, setNestedModal] = useState(false);
	const [checkboxConfModal, setCheckboxConfModal] = useState(false);
	const [removeModal, setRemoveModal] = useState(false);
	const [closeAll, setCloseAll] = useState(false);
	const [roleStatus, setRoleStatus] = useState();
	const [rolesAssigned, setRolesAssigned] = useState([]);
	const [formData, setFormData] = React.useState('');
	const [assignRightValue, setAssignRightValue] = useState('');
	const [removeRightValue, setRemoveRightValue] = useState('');

	const getRights = async () => {
		const res = await EmpHTTP.get(URL.GET_RIGHTS);
		try {
			console.log('DDD', res.data);
			setAllRights(res.data.rights);
			console.log(allRights);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getRights();
	}, []);

	const handleRoleActiveSwitch = (e) => {
		console.log(e);
		setRoleStatus(!roleStatus);
	};

	const roleSubmit = async (events, errors, values) => {
		if (errors.length === 0) {
			const { label, desc } = values;
			const data = {
				_id: updateId,
				label: label,
				desc: desc,
				active: roleStatus,
			};
			const res = await EmpHTTP.post(URL.SAVE_ROLES, data);
			try {
				console.log(res.data);
				getData();
				toggleModal();
			} catch (error) {
				console.log(error);
			}
		}
	};

	const assignRight = (value) => {
		toggleCheckboxModal();
		setAssignRightValue(value);
	};

	const removeRight = (value) => {
		toggleCheckboxModalRemove();
		setRemoveRightValue(value);
	};

	const closeBtn = (
		<button className="close" onClick={toggleModal}>
			&times;
		</button>
	);

	const toggleNested = () => {
		setNestedModal(!nestedModal);
		setCloseAll(false);
	};

	const toggleCheckboxModal = () => {
		setCheckboxConfModal(!checkboxConfModal);
		setCloseAll(false);
	};

	const toggleCheckboxModalRemove = () => {
		setRemoveModal(!removeModal);
		setCloseAll(false);
	};

	const handleDeleteRole = async () => {
		// Delete Role Api Call
		console.log(updateId);
		const res = await EmpHTTP.post(URL.DELETE_ROLES, {
			_id: updateId,
		});
		try {
			console.log('Deleted Successfully');
			getData();
			setNestedModal(!nestedModal);
			toggleModal();
		} catch (error) {
			console.log(error);
		}
	};

	const closeDelete = () => {
		setNestedModal(false);
	};

	const closeAllModal = () => {
		setCloseAll(!closeAll);
	};

	const handleYes = () => {
		setCheckboxConfModal(!checkboxConfModal);
		setCloseAll(false);
		setRolesAssigned([...rolesAssigned, assignRightValue]);
		const newData = allRights.filter((i) => i.label !== assignRightValue.label);
		setAllRights(newData);
		console.log('RA', rolesAssigned, newData, assignRightValue);

		console.log('roles assigned', rolesAssigned);
		//checked api call

		const data = {
			roleId: selectedRow.id,
			rightId: assignRightValue._id,
		};

		saveRoleRightMap(data);
		console.log('DD', data);
	};

	const saveRoleRightMap = (data) => {
		const res = EmpHTTP.post('/empApi/', data);
	};

	const handleNo = () => {
		setCheckboxConfModal(false);
		setCloseAll(false);
	};

	const handleRemoveYes = () => {
		setRemoveModal(!removeModal);
		setCloseAll(false);
		setAllRights([...allRights, removeRightValue]);
		const newData = rolesAssigned.filter(
			(i) => i.label !== removeRightValue.label,
		);
		setRolesAssigned(newData);
		console.log('Rmrr', rolesAssigned, removeRightValue);
		console.log('roles assigned', rolesAssigned);
		// uncheck Api call
	};

	const handleRemoveNo = () => {
		setRemoveModal(!removeModal);
		setCheckboxConfModal(false);
		setCloseAll(false);
	};

	console.log(selectedRow);

	const defaultValues = {
		label: selectedRow.role_name,
		desc: selectedRow.role_description,
	};

	return (
		<React.Fragment>
			<Modal isOpen={showRoleUpdateModal} toggle={toggleModal} size="lg">
				<ModalHeader toggle={toggleModal} close={closeBtn}>
					Update Role
				</ModalHeader>
				<ModalBody className="bg-light">
					<div className="create-right-form">
						<div id="form">
							<Container>
								<Row>
									<Col sm="8">
										<AvForm onSubmit={roleSubmit} model={defaultValues}>
											<AvGroup>
												<Label htmlFor="label">Role Name</Label>
												<AvField
													type="text"
													name="label"
													required
													className="form-control"
													id="role-label-id"
													placeholder="Enter label name"
													errorMessage="Right name can't be left empty"
												/>
											</AvGroup>
											<AvGroup>
												<Label htmlFor="url">Description</Label>
												<AvField
													type="textarea"
													name="desc"
													id="description-id"
													rows="2"
													placeholder="Add a short description about the role..."
													required
												/>
											</AvGroup>
											<AvGroup>
												<Label htmlFor="url">Activation Status</Label>
												<br />
												<Switch
													checked={selectedRow.role_status}
													onChange={handleRoleActiveSwitch}
												/>
											</AvGroup>
											<div className="mt-3">
												<Button color="primary" type="submit">
													Save
												</Button>
												<Button
													className="ml-3"
													color="danger"
													onClick={toggleNested}
												>
													Delete Role
												</Button>
											</div>
										</AvForm>
									</Col>
									<Col sm="4">
										<Row>
											<h6>Available Rights</h6>
										</Row>
										<Row>
											{allRights ? (
												allRights.map((right, index) => (
													<div
														id="assigned-right-btn"
														onClick={() => assignRight(right)}
													>
														{right.label}
														<span
															className="tick"
															id="tick-btn"
															onClick={checkboxConfModal}
														>
															&#10003;
														</span>
													</div>
												))
											) : (
												<div></div>
											)}
										</Row>

										<Row className="mt-5">
											<h6>Assigned Rights</h6>
										</Row>
										<Row>
											{rolesAssigned.length !== 0 ? (
												rolesAssigned.map((right, index) => (
													<div
														id="assign-right-btn"
														onClick={() => removeRight(right)}
													>
														{right.label}{' '}
														<button className="close" id="close-btn">
															&times;
														</button>
													</div>
												))
											) : (
												<div style={{ color: 'grey' }}>No rights assigned</div>
											)}
										</Row>
									</Col>
								</Row>
							</Container>
						</div>
					</div>
					<Modal
						isOpen={nestedModal}
						toggle={toggleNested}
						onClosed={closeAll ? toggleModal : undefined}
					>
						<ModalHeader>Delete Role</ModalHeader>
						<ModalBody>Are you sure you want to delete this role ..?</ModalBody>
						<ModalFooter>
							<Button color="success" onClick={handleDeleteRole}>
								Yes
							</Button>{' '}
							<Button color="danger" onClick={closeDelete}>
								No
							</Button>
						</ModalFooter>
					</Modal>
					<Modal
						isOpen={checkboxConfModal}
						toggle={toggleCheckboxModal}
						onClosed={closeAll ? showRoleUpdateModal : undefined}
					>
						<ModalHeader>Assign Rights</ModalHeader>
						<ModalBody>
							Are you sure you want to assign this role to the user ..?
						</ModalBody>
						<ModalFooter>
							<Button color="success" onClick={handleYes}>
								Yes
							</Button>
							<Button color="danger" onClick={handleNo}>
								No
							</Button>
						</ModalFooter>
					</Modal>
					<Modal
						isOpen={removeModal}
						toggle={toggleCheckboxModalRemove}
						//onClosed={closeAll ? showRoleUpdateModal : undefined}
					>
						<ModalHeader>Remove Rights</ModalHeader>
						<ModalBody>Are you sure you want to remove this role..?</ModalBody>
						<ModalFooter>
							<Button color="success" onClick={handleRemoveYes}>
								Yes
							</Button>
							<Button color="danger" onClick={handleRemoveNo}>
								No
							</Button>
						</ModalFooter>
					</Modal>
				</ModalBody>
				<ModalFooter>
					<Button color="secondary" onClick={toggleModal}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</React.Fragment>
	);
};

export default RolesUpdate;
