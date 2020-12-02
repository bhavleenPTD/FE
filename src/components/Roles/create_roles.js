import React, { useState, useRef } from 'react';
import '../../Styles/rights_create.css';
import { AvForm, AvField } from 'availity-reactstrap-validation';
// import URL from '../../urls/urls';
import Switch from 'react-switch';
// import defaultImage from './default-image.png';
import { Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EmpHTTP } from '../Interceptors/empInterceptor';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Label,
	FormGroup,
	Container,
	Row,
} from 'reactstrap';
import RolesTable from './roles_table';
import { URL } from '../../modal/url';

const CreateRoles = () => {
	const [roleStatus, setRoleStatus] = useState(true);
	const [imageUrl, setImageUrl] = useState('');
	const [formData, setFormData] = React.useState('');
	const [roleModal, setRoleModal] = useState(false);
	const childRef = useRef(null);

	const handleRoleActiveSwitch = (e) => {
		setRoleStatus(!roleStatus);
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const notify = () =>
		toast.success('Role Created Successfully !!!', {
			position: 'top-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});

	const roleSubmit = async () => {
		const data = {
			label: formData.label,
			desc: formData.desc,
			active: roleStatus,
		};
		const res = await EmpHTTP.post(URL.SAVE_ROLES, data);
		try {
			console.log(childRef.current);
			childRef.current.getRoles();
			notify();
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};

	const toggleRoles = () => setRoleModal(!roleModal);

	const closeBtn = (
		<button className="close" onClick={toggleRoles}>
			&times;
		</button>
	);

	const handleImage = (event) => {
		console.log('event', event.target.files);
		const file = event.target.files[0];
		let reader = new FileReader();

		reader.onloadend = () => {
			const base64String = reader.result
				.replace('data:', '')
				.replace(/^.+,/, '');
			localStorage.setItem('wallpaper', base64String);
			console.log(`data:image/png;base64,${base64String}`);
			setImageUrl(`data:image/png;base64,${base64String}`);
			setFormData({
				...formData,
				imageUrl: `data:image/png;base64,${base64String}`,
			});
		};
		reader.readAsDataURL(file);
	};

	return (
		<React.Fragment>
			<Button
				color="none"
				onClick={toggleRoles}
				className="btn-custom navbar-btn btn-rounded waves-effect waves-light"
				style={{ marginLeft: '80%', marginTop: '5rem' }}
			>
				Create Role
			</Button>
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
			<Container>
				<Row style={{ marginLeft: '5.5rem' }}>
					<div>
						<h1>Roles</h1>
						<hr />
					</div>
					<Route>
						<RolesTable ref={childRef} />
					</Route>
				</Row>
			</Container>

			<Modal isOpen={roleModal} toggleRoles={toggleRoles}>
				<ModalHeader toggleRoles={toggleRoles} close={closeBtn}>
					Create Role
				</ModalHeader>
				<ModalBody>
					<div className="create-righrole-form">
						<div id="form">
							<AvForm onSubmit={roleSubmit}>
								<FormGroup>
									<Label htmlFor="role-name">Role Name</Label>
									<AvField
										type="text"
										name="label"
										required
										className="form-control"
										id="role-label-id"
										placeholder="Enter label name"
										errorMessage="Right name can't be left empty"
										onChange={handleChange}
									/>
								</FormGroup>
								<FormGroup>
									<Label htmlFor="description">Description</Label>
									<AvField
										type="textarea"
										name="desc"
										id="description-id"
										rows="2"
										placeholder="Add a short description about the role..."
										required
										onChange={handleChange}
									/>
								</FormGroup>
								{/* <FormGroup>
									<Label htmlFor="url">Image</Label>
									<AvField
										type="file"
										name="image"
										id="image-id"
										onChange={(event) => handleImage(event)}
									/>
								</FormGroup>
								<div className="ml-3 mb-5">
									<img
										src={imageUrl ? imageUrl : defaultImage}
										width="200"
										height="200"
									/>
								</div> */}
								<FormGroup>
									<Label htmlFor="url">Activation Status</Label>
									<br />
									<Switch
										checked={roleStatus}
										onChange={handleRoleActiveSwitch}
									/>
								</FormGroup>
								<div className="mt-3">
									<Button
										color="danger"
										type="submit"
										className="btn-custom navbar-btn btn btn-rounded waves-effect  waves-light"
										onClick={toggleRoles}
									>
										Create Role
									</Button>
								</div>
							</AvForm>
						</div>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button color="secondary" onClick={toggleRoles}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</React.Fragment>
	);
};

export default CreateRoles;
