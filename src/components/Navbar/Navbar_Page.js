import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
	Navbar,
	Nav,
	NavbarBrand,
	NavbarToggler,
	NavItem,
	NavLink,
	Container,
	Collapse,
	Button,
} from 'reactstrap';

import ScrollspyNav from './scrollSpy';

//stickey header
import 'react-sticky-header/styles.css';
import StickyHeader from 'react-sticky-header';

class NavbarPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpenMenu: false,
		};
	}

	handleLog = () => {
		if (localStorage.getItem('userToken') != null) {
			localStorage.removeItem('userToken');
		}
	};

	toggle = () => {
		this.setState({ isOpenMenu: !this.state.isOpenMenu });
	};

	render() {
		//Store all Navigationbar Id into TargetID variable(Used for Scrollspy)
		let targetId = this.props.navItems.map((item) => {
			return item.idnm;
		});
		return (
			<React.Fragment>
				<StickyHeader
					header={
						<Navbar
							expand="lg"
							fixed="top"
							className={
								'Header_root navbar-custom sticky sticky-dark ' +
								this.props.navClass
							}
							style={this.props.style}
						>
							<Container>
								<NavbarBrand className="logo text-uppercase">
									<Link to="/" style={{ color: 'white' }}>
										{' '}
										CofyView
									</Link>
								</NavbarBrand>
								<NavbarToggler onClick={this.toggle}>
									<i className="mdi mdi-menu"></i>
								</NavbarToggler>

								<Collapse
									id="navbarCollapse"
									isOpen={this.state.isOpenMenu}
									navbar
								>
									{targetId && targetId.length != 0 ? (
										<ScrollspyNav
											scrollTargetIds={targetId}
											scrollDuration="800"
											headerBackground="true"
											activeNavClass="active"
											className="navbar-collapse"
										>
											<Nav navbar className="navbar-center" id="mySidenav">
												{this.props.navItems.map((item, key) => (
													<NavItem
														key={key}
														className={item.navheading === '' ? '' : ''}
													>
														<NavLink href={'#' + item.idnm}> {''}</NavLink>
													</NavItem>
												))}
											</Nav>
										</ScrollspyNav>
									) : null}

									<div className="nav-button ml-auto">
										<Nav navbar className="navbar-right">
											{localStorage.getItem('userToken') != null &&
											this.props.show == true ? (
												<Link to="/dashboard">
													<Button
														color="none"
														type="button"
														className="btn-custom navbar-btn btn-rounded waves-effect waves-light"
													>
														Dashboard
													</Button>
												</Link>
											) : null}{' '}
											&nbsp;
											<Link to="/login">
												<Button
													color="none"
													onClick={this.handleLog}
													type="button"
													className="btn-custom navbar-btn btn-rounded waves-effect waves-light"
												>
													{localStorage.getItem('userToken') == null
														? 'Log In'
														: 'Log Out'}
												</Button>
											</Link>
										</Nav>
									</div>
								</Collapse>
							</Container>
						</Navbar>
					}
					stickyOffset={-100}
				></StickyHeader>
			</React.Fragment>
		);
	}
}

export default NavbarPage;
