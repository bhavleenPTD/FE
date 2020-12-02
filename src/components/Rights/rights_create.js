import React, { useState, useEffect, useRef } from 'react';
import '../../Styles/rights_create.css';
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
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Route } from 'react-router-dom';
import Switch from 'react-switch';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RightsTable from './rightstable';
import {EmpHTTP} from '../Interceptors/empInterceptor';
import { URL } from '../../modal/url';

const CreateRights = () => {

	const [rightStatus, setRightStatus] = useState(true);
	const [imageUrl, setImageUrl] = useState('');
	const [formData, setFormData] = React.useState('');
	const [rightModal, setRightModal] = useState(false);
	const [newCreated, setNewCreated] = useState('');
	const [modal, setModal] = useState(false);
	const [rights, setRights] = useState('');
	const child = useRef();

	const handleRightActiveSwitch = () => {
		setRightStatus(!rightStatus);
		setFormData({
			...formData,
			rightStatus,
		});
	};

	const toggle = () => setModal(!modal);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const getData = (data) => {
		console.log(data);
	};

	const notify = () =>
		toast.success('Right Created Successfully !!!', {
			position: 'top-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});

	const rightSubmit = async (events, errors, values) => {
		console.log(errors);
		if (errors.length === 0) {
			const { label, desc, url } = formData;
			const data = {
				label: label,
				desc: desc,
				url: url,
				active: rightStatus,
			};
			const res = await EmpHTTP.post(URL.SAVE_RIGHTS, data);
			try {
				child.current.getRights();
				notify();
				toggle();
				console.log('response after creation', child.current, res);
			} catch (error) {
				console.log(error);
			}
		}
	};

	const closeBtn = (
		<button className="close" onClick={toggle}>
			&times;
		</button>
	);

	return (
		<React.Fragment>
			<Button
				color="none"
				onClick={toggle}
				className="btn-custom navbar-btn btn-rounded waves-effect waves-light"
				style={{ marginLeft: '80%', marginTop: '5rem' }}
			>
				Create Right
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
						<h1>Rights</h1>
						<hr />
					</div>
					<Route>
						<RightsTable ref={child} />
					</Route>
				</Row>
			</Container>

			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle} close={closeBtn}>
					Create Right
				</ModalHeader>
				<ModalBody>
					<div className="create-right-form">
						<div id="form">
							<AvForm onSubmit={rightSubmit}>
								<FormGroup>
									<Label htmlFor="label">Right Name</Label>
									<AvField
										type="text"
										name="label"
										required
										className="form-control"
										id="right-label-id"
										placeholder="Enter label name"
										errorMessage="Right name can't be left empty"
										onChange={(event) => handleChange(event)}
									/>
								</FormGroup>
								<FormGroup>
									<Label htmlFor="url">URL</Label>
									<AvField
										type="text"
										name="url"
										required
										className="form-control"
										id="right-url-id"
										placeholder="Enter URL"
										errorMessage="Right url can't be left empty"
										onChange={(event) => handleChange(event)}
									/>
								</FormGroup>
								<FormGroup>
									<Label htmlFor="url">Description</Label>
									<AvField
										type="textarea"
										name="desc"
										id="description-id"
										rows="2"
										placeholder="Add a short description about the role..."
										required
										onChange={(event) => handleChange(event)}
									/>
								</FormGroup>
								<FormGroup>
									<Label htmlFor="url">Activation Status</Label>
									<br />
									<Switch
										checked={rightStatus}
										onChange={handleRightActiveSwitch}
									/>
								</FormGroup>
								<div className="mt-3">
									<Button
										color="danger"
										type="submit"
										className="btn-custom navbar-btn btn btn-rounded waves-effect  waves-light"
									>
										Create Right
									</Button>
								</div>
							</AvForm>
						</div>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button color="secondary" onClick={toggle}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</React.Fragment>
	);
};

export default CreateRights;
