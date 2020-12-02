import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
	Container,
	Row,
	Col,
	Card,
	CardBody,
	FormGroup,
	Label,
	Input,
	Button,
} from 'reactstrap';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { URL } from '../../modal/url';
import { AvForm, AvField } from 'availity-reactstrap-validation';

class Signup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: null,
			email: null,
			password: null,
			rme: null,
		};
	}

	componentDidMount() {
		if (localStorage.getItem('userToken') != null) {
			this.props.history.push('/dashboard');
		}
	}

	handleInput = (input) => (e) => {
		this.setState({
			...this.state,
			[input]: input != 'rme' ? e.target.value : e.target.checked,
		});
	};

	handleSubmit = (events, errors, values) => {
		console.log(values);
		if (errors.length == 0) {
			//     localStorage.setItem('name',this.state.name);
			//     localStorage.setItem('email',this.state.email);
			//     localStorage.setItem('password',this.state.password);
			//     localStorage.setItem('rme',this.state.rme);
			//     localStorage.setItem('userToken','userld231');
			//    // console.log('here');

			Axios.post(URL.EMP_SIGNUP, this.state)
				.then((data) => {
					let resp_data = data.data;
					if (resp_data.status == true) {
						toast.success("You may login after manager's approval !!!");
					}
				})
				.catch((err) => {
					if (err.response) {
						toast.error(err.response.data.message);
					} else {
						toast.error(err.message);
					}
				});
		}
	};

	render() {
		return (
			<React.Fragment>
				<div className="account-home-btn d-none d-sm-block">
					<Link to="/" className="text-white">
						<i className="mdi mdi-home h1"></i>
					</Link>
				</div>

				<section className="bg-account-pages height-100vh">
					<div className="display-table">
						<div className="display-table-cell">
							<Container>
								<Row className="justify-content-center">
									<Col lg={5}>
										<Card className="account-card">
											<CardBody>
												<div className="text-center mt-3">
													<h3 className="font-weight-bold">
														<Link
															to="/"
															className="text-dark text-uppercase account-pages-logo"
														>
															CofyView
														</Link>
													</h3>
													<p className="text-muted">
														Sign up for a new Account
													</p>
												</div>
												<div className="p-3">
													<AvForm onSubmit={this.handleSubmit}>
														<FormGroup>
															<Label htmlFor="name">First Name</Label>
															<AvField
																name="name"
																required
																type="text"
																onChange={this.handleInput('name')}
																className="form-control"
																id="name"
																placeholder="Enter First Name"
															/>
														</FormGroup>

														<FormGroup>
															<Label htmlFor="name">Last Name</Label>
															<AvField
																name="lastname"
																required
																type="text"
																onChange={this.handleInput('lastname')}
																className="form-control"
																id="name"
																placeholder="Enter Last Name"
															/>
														</FormGroup>

														<FormGroup>
															<Label htmlFor="email">Email</Label>
															<AvField
																type="email"
																name="email"
																required
																className="form-control"
																id="email"
																onChange={this.handleInput('email')}
																placeholder="Enter Email"
															/>
														</FormGroup>

														<FormGroup>
															<Label htmlFor="userpassword">Password</Label>
															<AvField
																type="password"
																name="password"
																required
																className="form-control"
																id="userpassword"
																onChange={this.handleInput('password')}
																placeholder="Enter password"
															/>
														</FormGroup>

														{/* <div className="custom-control custom-checkbox">
                                                            <Input type="checkbox" className="custom-control-input" id="customControlInline" onChange={this.handleInput("rme")} />
                                                            <Label className="custom-control-label" htmlFor="customControlInline">Remember me</Label>
                                                        </div> */}

														<div className="mt-3">
															<Button
																type="submit"
																color="none"
																className="btn-custom btn-block"
															>
																Sign Up
															</Button>
														</div>

														<div className="mt-4 mb-0 text-center">
															<p className="mb-0">
																Already have an account ?{' '}
																<Link to="/login" className="text-danger">
																	Sign in
																</Link>
															</p>
														</div>
													</AvForm>
												</div>
											</CardBody>
										</Card>
									</Col>
								</Row>
							</Container>
						</div>
					</div>
				</section>
			</React.Fragment>
		);
	}
}

export default Signup;
