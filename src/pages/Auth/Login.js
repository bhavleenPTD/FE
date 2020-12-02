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
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { URL } from '../../modal/url';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: null,
			password: null,
			rme: false,
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

	onSubmit = (events, errors) => {
		if (errors.length == 0) {
			Axios.post(URL.EMP_LOGIN, this.state)
				.then((data) => {
					let resp_data = data.data;
					if (resp_data.status == true) {
						console.log(resp_data);
						localStorage.setItem('userToken', resp_data.token);
						this.props.history.push('/dashboard');
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
														Sign in to continue to CofyView.
													</p>
												</div>
												<div className="p-3">
													<AvForm onSubmit={this.onSubmit}>
														<FormGroup>
															<Label htmlFor="email">Email</Label>
															<AvField
																type="email"
																name="email"
																required
																className="form-control"
																id="email"
																onChange={this.handleInput('email')}
																placeholder="Enter email"
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
                                                    <Input  onChange={this.handleInput("rme")} type="checkbox" className="custom-control-input" id="customControlInline" />
                                                    <Label className="custom-control-label" htmlFor="customControlInline">Remember me</Label>
                                                </div> */}

														<div className="mt-3">
															<Button
																color="none"
																type="submit"
																className="btn-custom btn-block"
															>
																Log In
															</Button>
														</div>
														<div className="mt-4 mb-0 text-center">
															<p className="mb-0">
																Don't have an account?{' '}
																<Link to="/sign-up" className="text-danger">
																	Sign Up
																</Link>
															</p>
														</div>
														<div className="mt-4 mb-0 text-center">
															{/* <Link to="/password_forget" className="text-dark"><i className="mdi mdi-lock"></i> Forgot your password?</Link> */}
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

export default Login;
