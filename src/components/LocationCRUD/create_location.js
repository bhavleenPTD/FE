import React, { useState, useEffect } from 'react';
import {
	AvForm,
	AvField,
	AvGroup,
	AvInput,
	AvFeedback,
} from 'availity-reactstrap-validation';
import { Button, Label, FormGroup, Col, Input } from 'reactstrap';
import defaultImage from './default-image.png';
import Switch from 'react-switch';
import { EmpHTTP } from '../Interceptors/empInterceptor';
import { URL } from '../../modal/url';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateLocation = () => {
	const [imageUrl, setImageUrl] = useState('');
	const [fileData, SetFileData] = useState('');
	const [countries, setCountries] = useState([]);
	const [formData, setFormData] = React.useState('');
	const [locationStatus, setLocationStatus] = useState(true);
	const [selectedId, setSelectedId] = useState('');

	useEffect(() => {
		getCountryData();
	}, []);

	const handleLocationActiveSwitch = (e) => {
		setLocationStatus(!locationStatus);
	};

	const handleSubmit = (events, errors, values) => {
		const currentCountry = countries.filter((ele) => {
			return ele.country_name == values.country;
		});
		console.log('current', currentCountry);

		var bodyFormData = new FormData();
		bodyFormData.set('location', values.location);
		bodyFormData.set('country', currentCountry[0].country_name);
		bodyFormData.set('country_id', currentCountry[0]._id);
		bodyFormData.set('active', locationStatus);
		bodyFormData.append('img_path', fileData);

		saveLocation(bodyFormData);
	};

	const saveLocation = async (data) => {
		const config = {
			headers: { 'content-type': 'multipart/form-data' },
		};
		console.log('data', data);
		const res = await EmpHTTP({
			method: 'post',
			url: URL.SAVE_LOCATION,
			config,
			data: data,
		});
		try {
			if (res.data != null) {
				toast.success('Location Added Successfully!!!');
			}
			console.log(res);
		} catch (error) {
			toast.success('Location Creation Failed!!!');
			console.log(error);
		}
	};

	const getCountryData = async () => {
		const res = await EmpHTTP.get(URL.GET_COUNTRY_DATA);
		try {
			console.log(res);
			setCountries(res.data.country);
		} catch (error) {
			console.log(error);
		}
	};

	const handleImage = (event) => {
		console.log('event', event.target.files);
		const file = event.target.files[0];
		let reader = new FileReader();
		SetFileData(file);
		reader.onloadend = () => {
			const base64String = reader.result
				.replace('data:', '')
				.replace(/^.+,/, '');
			localStorage.setItem('thumbnail', base64String);
			setImageUrl(`data:image/png;base64,${base64String}`);
		};

		const URL = reader.readAsDataURL(file);
		console.log('URL', URL);
	};

	return (
		<React.Fragment>
			<div>
				<h1 style={{ marginTop: '2rem' }}> Create Location</h1>
				<hr />
			</div>
			<div id="image-upload-form">
				<AvForm
					onSubmit={handleSubmit}
					style={{ width: '500px', height: 'auto' }}
				>
					<AvGroup row>
						<Label sm="4" className="mt-1" for="location">
							Location Name
						</Label>
						<Col sm="8">
							<AvInput type="text" name="location" required />
							<AvFeedback>Please Enter location name !!!</AvFeedback>
						</Col>
					</AvGroup>
					<AvGroup row>
						<Label sm="4" className="mt-1" for="country">
							Select Country
						</Label>
						<Col sm="8">
							<AvInput type="select" name="country" required>
								{countries.map((ele) => (
									<option value={ele.country_name}>{ele.country_name}</option>
								))}
							</AvInput>
							<AvFeedback>Please select Country!!!</AvFeedback>
						</Col>
						<p style={{ color: 'crimson', fontSize: '10px' }}>
							* If Country is not in the list{' '}
							<Link to="/dashboard/location-allocations">click here</Link> to
							create new
						</p>
					</AvGroup>

					<AvGroup row>
						<Label sm="4" className="mt-1" for="thumbnail">
							Upload Thumbnail
						</Label>
						<Col sm="8">
							<AvInput
								type="file"
								name="thumbnail"
								required
								onChange={(event) => handleImage(event)}
							/>
							<AvFeedback>Please upload an Image for thumbnail !!!</AvFeedback>
						</Col>
					</AvGroup>
					<AvGroup row>
						<Label sm="8" className="mt-1" for="thumbnail">
							Preview
						</Label>
						<Col sm="8" className="mt-2">
							<div className="ml-5 mb-5">
								<img
									src={imageUrl ? imageUrl : defaultImage}
									width="200"
									height="200"
									alt=""
								/>
							</div>
						</Col>
					</AvGroup>
					<FormGroup>
						<Label htmlFor="url">Activation Status</Label>
						<br />
						<Switch
							checked={locationStatus}
							onChange={handleLocationActiveSwitch}
						/>
					</FormGroup>
					<FormGroup>
						<Button color="danger">Submit</Button>
					</FormGroup>
				</AvForm>
			</div>
		</React.Fragment>
	);
};

export default CreateLocation;
