import React, { useState } from 'react';
import '../../Styles/rights_create.css';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Label,
} from 'reactstrap';
import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';
import { URL } from '../../modal/url';
import Switch from 'react-switch';
import {EmpHTTP} from '../Interceptors/empInterceptor';

const RightsUpdates = ({
	showUpdatemodal,
	toggleModal,
	sendUpdateId,
	selectedRow,
	getData,
}) => {
	const { createRightUrl } = URL;
	console.log(selectedRow);
	const { _id, label, url, desc, active } = selectedRow;
	const [rightDescription, setRightDescription] = useState('');
	const [rightStatus, setRightStatus] = useState(true);
	const [modal, setModal] = useState(false);
	const [nestedModal, setNestedModal] = useState(false);
	const [closeAll, setCloseAll] = useState(false);
	const [formData, setFormData] = React.useState('');

	const handleRightActiveSwitch = (e) => {
		console.log(e);
		setRightStatus(!rightStatus);
	};

	const rightSubmit = async (event, errors, values) => {
		if (errors.length === 0) {
			const { label, desc, url } = values;
			console.log('uid', sendUpdateId, _id);
			const data = {
				_id: sendUpdateId,
				label: label,
				desc: desc,
				url: url,
				active: rightStatus,
			};
			console.log('RT', rightStatus);

			const res = await EmpHTTP.post(URL.SAVE_RIGHTS, data);
			try {
				console.log('response', 'updated', res.data);
				toggleModal();
				getData();
			} catch (error) {
				console.log(error);
			}
		}
		console.log('data', event, errors, values);
	};
	const closeBtn = (
		<button className="close" onClick={toggleModal}>
			&times;
		</button>
	);
	const handleValidSubmit = (event, values) => {
		console.log(event, values);
	};

	const handleInvalidSubmit = (event, errors, values) => {
		console.log(event, errors, values);
	};

	const toggleNested = () => {
		setNestedModal(!nestedModal);
		setCloseAll(false);
	};

	const toggleAll = () => {
		setNestedModal(!nestedModal);
		setCloseAll(true);
	};

	const handleYes = async () => {
		const res = await EmpHTTP.post(URL.DELETE_RIGHT, {
			id: sendUpdateId,
		});
		try {
			console.log('Deleted Successfully');
			toggleNested(!nestedModal);
			toggleModal();
			getData();
		} catch (error) {
			console.log(error);
		}
	};

	const defaultValues = {
		label: selectedRow.right_name,
		url: selectedRow.right_url,
		desc: selectedRow.right_description,
	};

	return (
		<React.Fragment>
			<Modal isOpen={showUpdatemodal} toggle={toggleModal}>
				<ModalHeader toggle={toggleModal} close={closeBtn}>
					Update Right
				</ModalHeader>
				<ModalBody>
					<div className="create-right-form">
						<div id="form">
							<AvForm
								model={defaultValues}
								onSubmit={rightSubmit}
								onValidSubmit={handleValidSubmit}
								onInvalidSubmit={handleInvalidSubmit}
							>
								<AvGroup>
									<Label htmlFor="label">Right Name</Label>
									<AvField
										type="text"
										name="label"
										required
										className="form-control"
										id="right-label-id"
										placeholder="Enter label name"
										errorMessage="Right name can't be left empty"
									/>
								</AvGroup>
								<AvGroup>
									<Label htmlFor="url">URL</Label>
									<AvField
										type="text"
										name="url"
										required
										className="form-control"
										id="right-url-id"
										placeholder="Enter URL"
										errorMessage="Right url can't be left empty"
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
										checked={selectedRow.right_status}
										onChange={handleRightActiveSwitch}
									/>
								</AvGroup>
								<div className="mt-3">
									<Button color="info" type="submit">
										Save
									</Button>
									<Button
										className="ml-3"
										color="danger"
										onClick={toggleNested}
									>
										Delete Right
									</Button>
								</div>
							</AvForm>
						</div>
					</div>
					<Modal
						isOpen={nestedModal}
						toggle={toggleNested}
						onClosed={closeAll ? toggleNested : undefined}
					>
						<ModalHeader>Delete Right</ModalHeader>
						<ModalBody>
							Are you sure you want to delete this right ..?
						</ModalBody>
						<ModalFooter>
							<Button color="success" onClick={handleYes}>
								Yes
							</Button>
							<Button color="danger" onClick={toggleNested}>
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

export default RightsUpdates;
