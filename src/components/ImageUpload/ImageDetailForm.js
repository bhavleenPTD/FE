import React, { useState } from 'react';
import {
	AvForm,
	AvGroup,
	AvInput,
	AvFeedback,
} from 'availity-reactstrap-validation';
import { Button, Label, FormGroup, Col } from 'reactstrap';
import { EmpHTTP } from '../Interceptors/empInterceptor';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ImageDetailForm = ({ imageUrl }) => {
	const [formData, setFormData] = useState('');

	const notify = () =>
		toast.success('Image Uploaded Successfully !!!', {
			position: 'top-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});

	const handleSubmit = async (events, errors, values) => {
		localStorage.setItem('imageData', JSON.stringify(formData));
		const theData = JSON.parse(localStorage.getItem('imageData'));
		console.log('TD', theData, values);
		//Api Call

		var bodyFormData = new FormData();
        
		bodyFormData.set('locationDetails', values.location);
		bodyFormData.set('satellite', values.satellite);
		bodyFormData.set('source', values.source);
		bodyFormData.set('country', values.country);
		bodyFormData.append('imgPath', imageUrl);
		bodyFormData.append('imgDetails', values.image);
		console.log(bodyFormData.get('imgPath'));
		const config = {
			headers: { 'content-type': 'multipart/form-data' },
		};
		const res = await EmpHTTP.post({
			url: URL.IMAGE_UPLOAD,
			config,
			data: bodyFormData,
		});
		try {
			console.log(res);
			notify();
		} catch (error) {
			console.log(error);
		}
	};

	//const getImageDetails = (values) => {};

	// const saveImageDetails = async (values) => {
	// 	const { location, image, source, satellite, country } = values;

	// 	// const data = {
	// 	// 	imgPath: imageUrl,
	// 	// 	locationDetails: location,
	// 	// 	imgDetails: image,
	// 	// 	sattelite: satellite,
	// 	// 	source: source,
	// 	// 	country: country,
	// 	// };
	// 	// console.log(data);
	// 	//const config = {};

	//

	// 	console.log(bodyFormData, 'bfd');

	// };
	return (
		<React.Fragment>
			<div>
				<h1>Image Details</h1>
				<hr />
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
				<div id="image-upload-form">
					<AvForm
						onSubmit={handleSubmit}
						style={{ width: '500px', height: 'auto' }}
					>
						<AvGroup row>
							<Label sm="4" className="mt-1" for="location">
								Location Details
							</Label>
							<Col sm="8">
								<AvInput type="select" name="location" required>
									<option>Location 1</option>
									<option>Location 2</option>
									<option>Location 3</option>
									<option>Location 4</option>
								</AvInput>
								<AvFeedback>Please select location !!!</AvFeedback>
							</Col>
						</AvGroup>
						<AvGroup row>
							<Label sm="4" for="example">
								Image Details
							</Label>
							<Col sm="8">
								<AvInput name="image" id="example" required />
								<AvFeedback>Please fill in image details !!!</AvFeedback>
							</Col>
						</AvGroup>
						<AvGroup row>
							<Label sm="4" for="example">
								Source
							</Label>
							<Col sm="8">
								<AvInput name="source" id="example" required />
								<AvFeedback>Please fill in Source name !!!</AvFeedback>
							</Col>
						</AvGroup>
						<AvGroup row>
							<Label sm="4" for="example">
								Satellite
							</Label>
							<Col sm="8">
								<AvInput name="satellite" id="example" required />
								<AvFeedback>Please fill in Satellite details !!!</AvFeedback>
							</Col>
						</AvGroup>
						<AvGroup row>
							<Label sm="4" for="example">
								Country
							</Label>
							<Col sm="8">
								<AvInput name="country" id="example" required />
								<AvFeedback>Please fill in Country name !!!</AvFeedback>
							</Col>
						</AvGroup>
						<FormGroup>
							<Button color="danger">Submit</Button>
						</FormGroup>
					</AvForm>
				</div>
			</div>
		</React.Fragment>
	);
};

export default ImageDetailForm;
