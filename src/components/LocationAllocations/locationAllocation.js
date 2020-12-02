import React, { useState, useEffect } from 'react';
import { Button, Label } from 'reactstrap';
import {
	AvForm,
	AvGroup,
	AvInput,
	AvFeedback,
} from 'availity-reactstrap-validation';
import { EmpHTTP } from '../Interceptors/empInterceptor';
import { URL } from '../../modal/url';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const LocationAllocation = () => {
	const [modal, setModal] = useState(false);
	const [country, setCountry] = useState([]);
	const [empAllocData, setEmpAllocData] = useState([]);
	const toggle = () => setModal(!modal);
	const handleChange = (e) => {
		console.log(e.target.value);
	};

	useEffect(() => {
		getCountry();
		getEmployeeAlloc();
	}, []);

	const getCountry = async () => {
		const res = await EmpHTTP.get(URL.GET_COUNTRY_DATA);
		try {
			setCountry(res.data.country);
		} catch (error) {
			console.log(error);
		}
	};

	const getEmployeeAlloc = async () => {
		const res = await EmpHTTP.get(URL.GET_EMPLOYEE_ALLOC);
		try {
			console.log(res.data.empAlloc[0].thumbnail);

			setEmpAllocData(res.data.empAlloc);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = async (events, errors, values) => {
		toggle();
		const data = {
			country_name: values.country,
		};
		const res = await EmpHTTP.post(URL.SAVE_COUNTRY, data);
		try {
			toast.success('Country Saved Successfully!!!');
			console.log(res.data);
		} catch (error) {
			toast.success('Country Creation Failed!!!');
			console.log(error);
		}
		console.log(values);
	};

	return (
		<React.Fragment>
			<h1>Add New Country</h1>
			<hr />
			<AvForm onSubmit={handleSubmit}>
				<AvGroup>
					<Label for="example">Enter Country Name</Label>
					<AvInput name="country" id="example" required />
					<AvFeedback>This is an error!</AvFeedback>
				</AvGroup>
				<Button color="primary" type="submit">
					Save
				</Button>
				&nbsp;
				<Link to="/dashboard/location-crud">
					<Button color="danger" onClick={toggle}>
						Back to location Creation
					</Button>
				</Link>
			</AvForm>
		</React.Fragment>
	);
};

export default LocationAllocation;
