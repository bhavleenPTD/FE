import React, { Component } from 'react';
import './imageHover.css';
import LoadingScreen from 'react-loading-screen';
import { Table } from 'react-bootstrap';
import LimitedCanvas from '../../components/map_limited_feature/map.canvas';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Xml_data from '../../components/XML/xml_data';
import styled from 'styled-components';
import Footer from '../../components/Footer/footer';
import { EmpHTTP } from '../../components/Interceptors/empInterceptor';
import { URL } from '../../modal/url';
import { toast } from 'react-toastify';
import Axios from 'axios';

const CardStyle = styled.div`
	padding: 10px;
	margin: 10px;
	font-size: 13px;
`;

class ImageShow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
			refpath: null,
			curpath: null,
			activeOptionStatus: false,
			activeOptionCode: null,
			file: null,
			loading: false,
			loadcrop: true,
			apiButtonText: null,
			location: localStorage.getItem('locationMap'),
			reftimestamp: null,
			curtimestamp: null,
			images: [],
		};
	}

	toggle = (val) => {
		this.setState({
			...this.state,
			show: val,
		});
	};

	getRefCur = async (obj) => {
		try {
			let data = await EmpHTTP.post(URL.GET_REF_CUR_DATA, {
				cur: obj.cur,
				ref: obj.ref,
			});
			let resp_data = data.data;
			if (resp_data.status == true) {
				console.log(resp_data);
				this.setState({
					...this.state,
					cur_id: obj.cur,
					ref_id: obj.ref,
					refpath: resp_data.ref.img_path,
					curpath: resp_data.cur.img_path,
					locationId: resp_data.cur.locationId,
					location: resp_data.cur.locationName,
					refData: resp_data.ref,
					curData: resp_data.cur,
					reftimestamp: resp_data.ref._id,
					curtimestamp: resp_data.cur._id,
				});
			} else {
				toast.error('Error Occured');
			}
		} catch (err) {
			if (err.response) {
				toast.error(err.response.data.message);
			} else if (err.message) {
				toast.error(err.message);
			} else {
				toast.error(err);
			}
		}
	};

	componentDidMount() {
		if (localStorage.getItem('userToken') == null) {
			this.props.history.push('/login');
			return;
		}

		const {
			match: { params },
		} = this.props;

		if (params != null && params.ref != null && params.cur != null) {
			this.getRefCur(params);
		} else {
			this.props.history.push('/dashboard/locations');
		}

		//api call with id params
	}

	checkDetection = () => {
		console.log(this.state);
		this.setState({
			...this.state,
			loading: true,
		});
		Axios.post(
			URL.GET_CHANGE_DETECT,
			{
				locationName: localStorage.getItem('locationMap'),
				ref_id: this.state.ref_id,
				cur_id: this.state.cur_id,
				reference: this.state.refData.img_name,
				checkimage: this.state.curData.img_name,
			},
			{
				crossdomain: true,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
			},
		)
			.then((data) => {
				let resp_data = data.data;
				console.log(this.state, resp_data);
				if (resp_data[0] != null && resp_data[0].status == true) {
					this.setState({
						...this.state,
						activateOptionStatus: false,
						activeOptionCode: null,
						show: false,
						loading: false,
					});
					// localStorage.setItem(`${this.state.refData._id}${this.state.curData._id}`,JSON.stringify(resp_data[0].response));
					localStorage.setItem(
						`${this.state.refData._id}${this.state.curData._id}`,
						JSON.stringify(resp_data[0].response),
					);
					//  localStorage.setItem(`${this.state.refData._id}${this.state.curData._id}`,JSON.stringify({"Image_Path_1":"C:/Users/user/Desktop/Cofyview_Django/cofyview/media/images/maps/gulmud/1595709326000.jpg","Image_Path_2":"C:/Users/user/Desktop/Cofyview_Django/cofyview/media/images/maps/gulmud/1599719326000.jpg","reference":{"rows":11,"columns":10},"modified":{"rows":11,"columns":10},"Annotation":{"Point":[["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/0.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/1.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/2.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/3.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/4.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/5.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/6.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/7.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/8.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/9.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/10.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/11.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/12.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/13.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/14.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/15.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/16.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/17.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/18.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/19.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/20.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/21.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/22.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/23.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/24.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/25.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/26.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/27.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/28.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/29.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/30.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/31.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/32.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/33.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/34.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/35.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/36.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/37.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/38.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/39.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/40.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/41.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/42.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/43.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/44.jpg",[[817,851,40,45],[882,847,33,40]]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/45.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/46.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/47.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/48.jpg",[[255,848,19,24],[218,836,23,25],[181,827,23,26],[144,820,21,25]]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/49.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/50.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/51.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/52.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/53.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/54.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/55.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/56.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/57.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/58.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/59.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/60.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/61.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/62.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/63.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/64.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/65.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/66.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/67.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/68.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/69.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/70.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/71.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/72.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/73.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/74.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/75.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/76.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/77.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/78.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/79.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/80.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/81.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/82.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/83.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/84.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/85.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/86.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/87.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/88.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/89.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/90.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/91.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/92.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/93.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/94.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/95.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/96.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/97.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/98.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/99.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/100.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/101.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/102.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/103.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/104.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/105.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/106.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/107.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/108.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/109.jpg",[]]]}}));
					this.props.history.push(
						`/dashboard/changeDetect/${this.state.refData._id}/${this.state.curData._id}`,
					);
				} else {
					toast.error('Empty Data');
				}
			})
			.catch((err) => {
				if (err.response) {
					toast.error(err.response.data.message);
				} else {
					toast.error(err.message);
				}
			});
	};

	activateOptions = (code) => {
		this.setState({
			...this.state,
			activeOptionStatus: true,
			activeOptionCode: code,
		});
	};

	goBack = () => {
		this.setState({
			...this.state,
			activeOptionCode: null,
			activeOptionStatus: false,
		});
	};

	render() {
		return (
			<React.Fragment>
				<div
					style={{
						marginTop: '5.5rem',
						position: 'relative',
						backgroundColor: 'white',
					}}
				>
					<div className="d-flex ">
						<div
							className="split-panel"
							style={{ marginRight: '1px', width: '50%' }}
						>
							<div>
								<LimitedCanvas
									key={0}
									imagepath={this.state.refpath}
									imagetype="ref"
								/>
							</div>
							<div
								style={{
									boxShadow: '0px 0px 5px lightgray',
									margin: '2px 0px 2px 2px',
								}}
							>
								<div
									className="text-uppercase"
									style={{
										backgroundColor: 'black',
										borderRadius: '5px',
										padding: '5px 5px 3px 5px',
										color: 'white',
									}}
								>
									<h2>Location Map Data</h2>
								</div>
								<CardStyle>
									{this.state.refData != null ? (
										<Xml_data tile={this.state.refData} />
									) : null}
								</CardStyle>
							</div>
						</div>
						<div className="split-panel" style={{ position: 'relative' }}>
							<div>
								<LimitedCanvas
									key={1}
									imagepath={this.state.curpath}
									imagetype="cur"
								/>
							</div>
							<div
								style={{
									boxShadow: '0px 0px 5px lightgray',
									margin: '2px 2px 2px 0px',
								}}
							>
								<div
									className="text-uppercase"
									style={{
										backgroundColor: 'black',
										borderRadius: '5px',
										padding: '5px 5px 3px 5px',
										color: 'white',
									}}
								>
									<h2>Location Map DATA</h2>
								</div>
								<CardStyle>
									{this.state.curData != null ? (
										<Xml_data tile={this.state.curData} />
									) : null}
								</CardStyle>
							</div>
						</div>
					</div>
					<div
						style={{ position: 'fixed', top: '10rem', right: '0px', zIndex: 2 }}
					>
						<Button
							color="danger"
							onClick={() => {
								this.toggle(!this.state.show);
							}}
						>
							{this.state.loadcrop == true ? 'AI Analysis' : 'Main Image'}
						</Button>
					</div>
					<div>
						<Modal
							centered={true}
							size={this.state.activeOptionStatus == true ? 'lg' : 'md'}
							isOpen={this.state.show}
							toggle={(e) => this.toggle(!this.state.show)}
						>
							<ModalHeader toggle={(e) => this.toggle(!this.state.show)}>
								Select AI Algorithm
							</ModalHeader>
							<ModalBody>
								<LoadingScreen
									loading={this.state.loading}
									bgColor="#f1f1f1"
									spinnerColor="#9ee5f8"
									textColor="#676767"
									text="Average Time Taken
         2min 30s"
								></LoadingScreen>
								<div>
									{this.state.activeOptionStatus == true ? (
										<Button
											size="sm"
											color="danger"
											onClick={(e) => this.goBack()}
										>
											Back
										</Button>
									) : null}
									{this.state.activeOptionStatus == true &&
									this.state.activeOptionCode == 'CD' ? (
										// <div style={{marginTop:"10px"}}>
										//     <h2>Choose Reference Time</h2>
										//     <Table striped bordered hover size="sm">
										//         <thead>
										//             <tr>
										//                 <th>S.No</th>
										//                 <th>Map Label</th>
										//                 <th>Date</th>

										//             </tr>
										//         </thead>
										//         <tbody>
										//             {[
										//                 { file: "1595709326000", date_time: 1595709326000, maplabel: "Hutan" },
										//                 { file: "1599719326000", date_time: 1599719326000, maplabel: "Hutan", }].map((map, key) => {
										//                     let d = new Date(map.date_time);
										//                     let count = 1;
										//                     return map.file != this.state.timestamp ?

										//                         <tr key={key} onClick={()=>this.checkDetection(map)}>
										//                             <td>{count++}</td>
										//                             <td>{map.maplabel}</td>

										//                             <td>{(d.getDate()) + "-" + (d.getMonth() + 1) + "-" + (d.getFullYear())}</td>
										//                         </tr>

										//                         : null
										//                 })
										//             }
										//         </tbody>
										//     </Table>

										// </div>
										<div style={{ textAlign: 'center' }}>
											<div>
												<h3>Are You Sure you want to continue?</h3>
											</div>
											<div>
												<Button
													onClick={(e) => {
														this.checkDetection();
													}}
													outline
													color="success"
												>
													Yes
												</Button>{' '}
												<Button outline color="danger">
													No
												</Button>
											</div>
										</div>
									) : null}

									{this.state.activeOptionStatus == false ? (
										<div className="d-flex flex-wrap justify-content-around">
											<div>
												<div style={{ width: '180px' }}>
													<Button
														outline
														color="info"
														onClick={(e) => this.activateOptions('CD')}
														size="lg"
														style={{ width: '100%' }}
													>
														Change Detection{' '}
													</Button>
												</div>
												<div style={{ width: '180px', marginTop: '10px' }}>
													<Button
														outline
														color="info"
														onClick={(e) => this.activateOptions('SA')}
														size="lg"
														style={{ width: '100%' }}
													>
														Spatial Analysis{' '}
													</Button>
												</div>
											</div>
											<div>
												<div style={{ width: '180px' }}>
													<Button
														outline
														color="info"
														onClick={(e) => this.activateOptions('OD')}
														size="lg"
														style={{ width: '100%' }}
													>
														Object Detection{' '}
													</Button>
												</div>
												<div style={{ marginTop: '10px', width: '180px' }}>
													<Button
														outline
														color="info"
														onClick={(e) => this.activateOptions('MA')}
														size="lg"
														style={{ width: '100%' }}
													>
														More Analysis Here{' '}
													</Button>
												</div>
											</div>
										</div>
									) : null}
								</div>
							</ModalBody>
							<ModalFooter>
								{this.state.loading == false ? (
									<Button
										color="danger"
										onClick={(e) => this.toggle(!this.state.show)}
									>
										Cancel
									</Button>
								) : null}
							</ModalFooter>
						</Modal>
					</div>

					{/* <Footer/> */}
				</div>
			</React.Fragment>
		);
	}
}

export default ImageShow;
