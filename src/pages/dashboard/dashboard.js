import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
	Link,
	withRouter,
} from 'react-router-dom';
import AnnLocation from '../locations/bb_location';
import { MENU_ITEMS } from '../../modal/menuItems';
import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import NavbarPage from '../../components/Navbar/Navbar_Page';
import {
	Container,
	Row,
	Col,
	Navbar,
	Nav,
	NavItem,
	Button,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFileCode,
	faCompass,
	faBell,
	faEnvelope,
	faArrowAltCircleRight,
} from '@fortawesome/free-regular-svg-icons';
import { faAnchor } from '@fortawesome/free-solid-svg-icons';
import Index1 from '../Index1/Index1';
import Index2 from '../Index2/Index2';
import ImageStitch from '../ImageStitch/imageStitch';
import MapSection from '../viewmap/mapSection';
import UserSection from '../userCrud/userSection';
//import LocationContainer from '../locationCRUD/locationContainer';
import LocAllocate from '../EmpAllocated/locAlloctable';
import ImageShow from '../ImageShow/imageShow';
import TimePop from '../../components/PopUp/locationPortalPop';
import CropShow from '../ImageShow/cropShow';
import ReportPage from '../report/reportpage';
import MapCropSection from '../croppedMap/mapCropSection';
import PrintPreview from '../report/printpreview';
import ImageUpload from '../../components/ImageUpload/ImageUpload';
import ImageDetailForm from '../../components/ImageUpload/ImageDetailForm';
import ImageDetailTable from '../../components/ImageUpload/imageDetailTable';
import ImageAllocation from '../../components/ImageAllocation/imageAllocation';
import EmployeeDataTable from '../../components/ImageAllocation/employeeDataTable';
import ReportSection from '../../components/ImageAllocation/reportSection';
import LocationAllocation from '../../components/LocationAllocations/locationAllocation';
import CreateRights from '../../components/Rights/rights_create';
//import RightsTable from '../../components/Rights/rightstable';
import CreateRoles from '../../components/Roles/create_roles';
//import RolesTable from '../../components/Roles/roles_table';
import CreateLocation from '../../components/LocationCRUD/create_location';
import UsersTable from '../../components/UserCrud/user_table';
import CompleteMapSection from '../completemap/mapSection';
import { URL } from '../../modal/url';
import { EmpHTTP } from '../../components/Interceptors/empInterceptor';
import UserTasks from '../../components/UserTasks/usertasks';
import MosaicSection from '../mosaic/mosaicSection';

class UserDashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			xoffset: -100,
			width: '12',
			navItems: [],
			imageUrl: '',
			sidebarOpen: false,
			loggedInUserID: '',
			filteredTabs: '',
			superAdmin: true,
			currUser: {},
		};
		this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
	}

	getImageUrl = (data) => {
		this.setState({
			...this.state,
			imageUrl: data,
		});
	};

	componentDidMount() {
		this.getCurrentUserID();
	}

	toggleSidenav = () => {
		this.setState({
			...this.state,
			xoffset: this.state.xoffset == 0 ? -100 : 0,
		});
	};

	getCurrentUserID = async () => {
		try {
			let res = await EmpHTTP.post(URL.GET_USER_DATA_FROM_TOKEN, {});
			console.log(res);
			let resp_data = res.data;
			this.setState(
				{
					currUser: resp_data.data,
					loggedInUserID: resp_data.data.empId,
					superAdmin: resp_data.data.superAdmin,
				},
				() => {
					this.filterNavItems();
				},
			);
		} catch (error) {
			console.log(error);
		}
	};

	filterNavItems = () => {
		const managerId = '46Juzcyx';
		const superAd = true;

		if (
			managerId == this.state.loggedInUserID &&
			superAd == this.state.superAdmin
		) {
			const currentTabs = MENU_ITEMS.filter((ele) => {
				return ele.superuser == 'manager';
			});
			this.setState({
				filteredTabs: currentTabs,
			});
			console.log(currentTabs);
		}
		if (
			superAd == this.state.superAdmin &&
			managerId != this.state.loggedInUserID
		) {
			const currentTabs = MENU_ITEMS.filter((ele) => {
				return ele.user == 'superAdmin';
			});
			this.setState({
				filteredTabs: currentTabs,
			});
			console.log(currentTabs);
		}
	};

	onSetSidebarOpen(open) {
		this.setState({ sidebarOpen: open });
	}

	goTo = (right) => (e) => {
		localStorage.setItem('currentRight', right._id);
		this.props.history.push('/dashboard' + right.to);
	};

	render() {
		const arr = [faCompass, faFileCode, faEnvelope, faBell, faAnchor];
		console.log('Check', this.state.filteredTabs);
		return (
			<React.Fragment>
				<NavbarPage
					navItems={this.state.navItems}
					navClass={null}
					style={{ backgroundColor: '#272a33' }}
				/>
				<div>
					<div
						className="rounded-right sidenavcustom"
						style={{
							width: `${this.state.width}%`,
							transform: `translatex(${this.state.xoffset}%)`,
						}}
					>
						{this.state.filteredTabs.length !== 0 ? (
							this.state.filteredTabs.map((item, key) => (
								<div key={item._id + key}>
									<Button
										onClick={this.goTo(item)}
										style={{ width: '100%', padding: '30px' }}
										variant="custom"
									>
										<FontAwesomeIcon icon={arr[key]} /> &nbsp;
										{item.label}
									</Button>
								</div>
							))
						) : (
							<div></div>
						)}

						{/* {MENU_ITEMS &&
							MENU_ITEMS.map((item, key) => (
								<div key={item._id + key}>
									<Button
										onClick={this.goTo(item)}
										style={{ width: '100%', padding: '30px' }}
										variant="custom"
									>
										<FontAwesomeIcon icon={arr[key]} /> &nbsp;
										{item.label}
									</Button>
								</div>
							))}  */}
						<div className="togsidenav" onClick={this.toggleSidenav}>
							<Button variant="primary">
								{' '}
								<FontAwesomeIcon icon={faArrowAltCircleRight} />
							</Button>
						</div>
					</div>
					<div></div>
					<div></div>
				</div>

				<div>
					<Switch>
						<Redirect exact from="/dashboard" to="/dashboard/locations" />
						<Route
							path="/dashboard/locations"
							render={(props) => (
								<AnnLocation {...props} currUser={this.state.currUser} />
							)}
						/>
						<Route path="/dashboard/location/:id" component={TimePop} />
						<Route path="/dashboard/check" component={Index1} />
						<Route path="/dashboard/cropmap/:cur" component={CropShow} />
						{/* <Route path="/dashboard/map/:id" component={ImageShow} /> */}
						<Route
							path="/dashboard/mapCompare/:ref/:cur"
							component={ImageShow}
						/>
						<Route path="/dashboard/viewmap/:ref/:cur" component={MapSection} />
						<Route
							path="/dashboard/viewcompleteMap/:cur"
							component={CompleteMapSection}
						/>
						<Route
							path="/dashboard/changeDetect/:ref/:cur"
							component={ImageStitch}
						/>
						{/* <Route path="/dashboard/userCrud" component={UsersTable} /> */}
						<Route path="/dashboard/locEmpAlloc" component={LocAllocate} />
						<Route path="/dashboard/mosaic" component={MosaicSection} />
						<Route path="/dashboard/location-crud" component={CreateLocation}>
							<Container>
								<Row>
									<Col
										style={{
											marginLeft: '3rem',
											marginTop: '6rem',
											marginBottom: '5rem',
										}}
									>
										<CreateLocation />
									</Col>
								</Row>
							</Container>
						</Route>
						{/* <Route
							path="/dashboard/locationCrud"
							component={LocationContainer}
						/> */}
						<Route path="/dashboard/report/:id" component={ReportPage} />
					



					
					
						<Route
							path="/dashboard/croppedimage/:id"
							component={MapCropSection}
						/>






						<Route path="/dashboard/printReport" component={PrintPreview} />

						<Route path="/dashboard/create-rights">
							<Container>
								<Row>
									<Col>
										<CreateRights />
									</Col>
								</Row>
							</Container>
						</Route>
						<Route path="/dashboard/create-roles">
							<Container>
								<Row>
									<Col>
										<CreateRoles />
									</Col>
								</Row>
							</Container>
						</Route>
						<Route path="/dashboard/userCrud">
							<Container>
								<Row>
									<Col style={{ marginLeft: '3rem', marginTop: '8rem' }}>
										<UsersTable />
									</Col>
								</Row>
							</Container>
						</Route>
						<Route path="/dashboard/image-upload">
							<Container>
								<Row>
									<Col style={{ marginLeft: '3rem', marginTop: '8rem' }}>
										<ImageUpload getImageUrl={this.getImageUrl} />
									</Col>
								</Row>
							</Container>
						</Route>
						<Route path="/dashboard/image-details">
							<Container>
								<Row>
									<Col style={{ marginLeft: '7rem', marginTop: '8rem' }}>
										<ImageDetailForm imageUrl={this.imageUrl} />
									</Col>
								</Row>
							</Container>
						</Route>
						<Route path="/dashboard/image-allocation">
							<Container>
								<Row>
									<Col style={{ marginLeft: '3rem', marginTop: '8rem' }}>
										<ImageAllocation />
									</Col>
								</Row>
							</Container>
						</Route>
						<Route path="/dashboard/assign-images">
							<Container>
								<Row>
									<Col style={{ marginLeft: '2.5rem', marginTop: '8rem' }}>
										<ImageDetailTable />
									</Col>
								</Row>
							</Container>
						</Route>
						<Route path="/dashboard/employee-data">
							<Container>
								<Row>
									<Col style={{ marginLeft: '3rem', marginTop: '8rem' }}>
										<EmployeeDataTable />
									</Col>
								</Row>
							</Container>
						</Route>
						<Route path="/dashboard/reports">
							<Container>
								<Row>
									<Col style={{ marginLeft: '0rem', marginTop: '8rem' }}>
										<ReportSection />
									</Col>
								</Row>
							</Container>
						</Route>
						<Route path="/dashboard/details">
							<Container>
								<Row>
									<Col style={{ marginLeft: '3rem', marginTop: '8rem' }}>
										<h1>Details</h1>
										<hr />
									</Col>
								</Row>
							</Container>
						</Route>
						<Route path="/dashboard/location-allocations">
							<Container>
								<Row>
									<Col style={{ marginLeft: '3rem', marginTop: '8rem' }}>
										<LocationAllocation />
									</Col>
								</Row>
							</Container>
						</Route>
						<Container>
							<Row>
								<Col style={{ marginLeft: '3rem', marginTop: '8rem' }}>
									<Route
										path="/dashboard/mytasks"
										render={(props) => (
											<UserTasks {...props} currUser={this.state.currUser} />
										)}
									/>
								</Col>
							</Row>
						</Container>
					</Switch>
				</div>
			</React.Fragment>
		);
	}
}

export default UserDashboard;
