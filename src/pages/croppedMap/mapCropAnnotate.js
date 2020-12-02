import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdjust } from '@fortawesome/free-solid-svg-icons';
import Canvas from '../../components/map/canvas';
import SplitCanvas from '../../components/map/splitCanvas';
import { DATA_JSON } from '../../modal/datajson';
import { useStore } from '../../zustandstore';
import { Table } from 'react-bootstrap';
import AnnotationMenu from '../../components/AnnotationMenu/bbMenu';
import { withRouter } from 'react-router-dom';
import MenuBar from './menuBar';
import {
	Label,
	Input,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from 'reactstrap';
import ToolbarSection from '../../components/toolbar/toolbarSection';
import ReportMenu from '../../components/Report/reportMenu';
import SubReportMenu from '../../components/Report/subreportMenu';
import { toast } from 'react-toastify';
import { EmpHTTP } from '../../components/Interceptors/empInterceptor';
import { URL } from '../../modal/url';
import Axios from 'axios';
import Annotation from '../../components/map/annotation';
import { FORMULA } from '../../modal/centreFormula';

const MapAnnotate = (props) => {
	const setAnnotations = useStore((s) => s.setAnnotations);
	const cref = React.useRef();
	const setHideOptions = useStore((s) => s.setHideOptions);
	const annotations = useStore((s) => s.annotations);
	const splitCanvas = useStore((s) => s.splitCanvas);
	const naturalwidth = useStore((s) => s.naturalwidth);
	const naturalheight = useStore((s) => s.naturalheight);
	// const canvasWidth=useStore(s=>s.canvasWidth);
	// const canvasHeight=useStore(s=>s.canvasHeight);
	const setLatLng = useStore((s) => s.setLatLng);
	const setSplitCanvas = useStore((s) => s.setSplitCanvas);
	const [reportShow, setReportShow] = useState(false);
	const [subreportShow, setSubReportShow] = useState(false);
	const setAnnotationId = useStore((s) => s.setAnnotationId);

	const toggleSubReport = (val) => {
		setSubReportShow(val);
	};

	const toggleReport = (val) => {
		setReportShow(val);
	};

	const checkAnnotationsEmpty = () => {
		console.log('here');
		setAnnotationId(null);
		let flag = false;
		annotations.forEach((element) => {
			if (
				// element.type == 'R' ||
				(element.type == 'C' || element.type == 'P' || element.type == 'S') &&
				(element.ann_text == null || element.ann_text.trim() == '')
			) {
				flag = true;
				return;
			}
		});

		if (flag == true) {
			toast.error('Fill All Annotation Text');
		} else {
			toggleSubReport(!subreportShow);
		}
	};
	// const calcVal = () => {
	//   // console.log(canvasWidth,canvasHeight);
	//   // let rows= parseInt(localStorage.getItem('rows'));
	//   // let columns= parseInt(localStorage.getItem('columns'));
	//   let currow = parseInt(localStorage.getItem('currow'));
	//   let curcol = parseInt(localStorage.getItem('curcol'));
	//   if (currow == null || curcol == null) {
	//     throw new Error('Parameters Insufficient')
	//   }
	//   //  let ew=canvasWidth/columns;
	//   //  let eh=canvasHeight/rows;

	//   return { x: curcol * naturalwidth, y: currow * naturalheight };

	// }

	const getLatLngPos = async (obj) => {
		let { x, y } = calcVal();
		await getData(obj, x, y);
		setLatLng({ lat: obj.lat, long: obj.long });
	};

	const calcVal = () => {
		if (props.mapData == null) {
			let currow = parseInt(localStorage.getItem('currow'));
			let curcol = parseInt(localStorage.getItem('curcol'));
			if (currow == null || curcol == null) {
				throw new Error('Parameters Insufficient');
			}
			return { x: curcol * naturalwidth, y: currow * naturalheight };
		} else {
			return { x: props.mapData.x, y: props.mapData.y };
		}
	};

	const getData = async (bb, x, y) => {
		let data = await Axios.post(
			URL.GET_LAT_LONG,
			{
				locationName: localStorage.getItem('locationMap'),
				image_name: `maps/${localStorage.getItem('locationMap')}/${
					props.alloted_map_data.img_name
				}`,
				X_value: bb.x + x,
				Y_value: bb.y + y,
			},
			{
				crossdomain: true,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
			},
		);

		let resp_data = data.data;

		if (resp_data[0] != null && resp_data[0].status == true) {
			bb.lat = resp_data[0].response.Long;
			bb.long = resp_data[0].response.Lat; //change
			return bb;
		} else {
			throw new Error('Empty Data');
		}

		// if(lat==null){
		// setLat(bb.x/10+0.03*2);
		// setLong(bb.y/10+0.03*2);
		// }
	};

	// const getLatLng = async (x, y) => {
	// 	let arr = [].concat(annotations);

	// 	// let finalarr= arr.map(async (obj, key) => {
	// 	//   let val= obj.type!='A' && obj.type!='T'?await getData(obj, x, y):obj;
	// 	//   return val;
	// 	// });

	// 	return arr;
	// };

	const getBBCentrePoints = (obj) => {
		if (obj.type == 'R' || obj.type == 'S') {
			return FORMULA.getRECTC(obj);
		} else if (obj.type == 'E') {
			return FORMULA.getELLIPSEC(obj);
		} else if (obj.type == 'P') {
			return FORMULA.getPOLYC(obj);
		}
	};

	const getLatLng = async (x, y) => {
		let arr = [].concat(annotations.filter((bb) => bb.type != 'G')); //change
		let returnArr = [];
		for (let obj of arr) {
			if (
				obj.type == 'R' ||
				obj.type == 'C' ||
				obj.type == 'P' ||
				obj.type == 'S'
			) {
				let p = getBBCentrePoints(obj);
				let val = await getData(
					{
						...obj,
						x: p.x,
						y: p.y,
					},
					x,
					y,
				);
				returnArr.push({
					...val,
					x: obj.x,
					y: obj.y,
				});
			} else {
				returnArr.push(obj);
			}
		}

		return returnArr;
	};

	const updateLatLng = async () => {
		let { x, y } = calcVal();
		let an = await getLatLng(x, y);
		setAnnotations(an);
	};

	function base64toBlob(base64, mimeType) {
		const bytes = atob(base64.split(',')[1]);
		const arrayBuffer = new ArrayBuffer(bytes.length);
		const uintArray = new Uint8Array(arrayBuffer);
		for (let i = 0; i < bytes.length; i++) {
			uintArray[i] = bytes.charCodeAt(i);
		}
		return new Blob([arrayBuffer], { type: mimeType });
	}

	const redirectViewReport = () => {
		props.history.push(
			'/dashboard/report/' + localStorage.getItem('current_report_id'),
		);
	};

	const saveSubReport = async (obj) => {
		if (localStorage.getItem('current_report_id') != null) {
			try {
				setHideOptions(true);
				let canvas = cref.current.getCanvas();

				// let image=canvas.toDataURL()
				let imageData = canvas.toDataURL();
				const imgRegEx = /^data:(image\/(gif|png|jpg|jpeg))/;
				const mimeType = imgRegEx.exec(imageData)[1];
				const blob = base64toBlob(imageData, mimeType);
				const fileExt = mimeType.replace('image/', '');
				const fileName = 'thumbnail.' + fileExt;
				let { x, y } = calcVal();

				//let { lat, lng } = await getData({ x: x, y: y },0,0);
				let { lat, long } = await getData({ x: x, y: y }, 0, 0);
				console.log(lat, long);
				let ann = await getLatLng(x, y);
				console.log(ann);
				let formdata = new FormData();
				formdata.append('thumbnail', blob, fileName);
				formdata.append('img_path', props.mapData.img_path);
				formdata.append(
					'final_report_id',
					localStorage.getItem('current_report_id'),
				);
				formdata.append('annotations', JSON.stringify(ann));
				formdata.append('sub_location_name', obj.sub_location_name);
				formdata.append('description', obj.description);
				formdata.append('x', x);
				formdata.append('y', y);
				formdata.append('width', naturalwidth);
				formdata.append('height', naturalheight);
				formdata.append('lat', lat);
				formdata.append('long', long);
				setHideOptions(false);
				//   for (var pair of formdata.entries()) {
				//     console.log( pair[0] + '–' + pair[1]) ;
				// }

				let data = await EmpHTTP.post(URL.CREATE_UPDATE_SUB_REPORT, formdata, {
					headers: { 'Content-Type': 'multipart/form-data' },
				});

				let resp_data = data.data;

				if (resp_data.status == true) {
					toggleSubReport(!subreportShow);
					toast.success('Sub Report Saved');
				} else {
					throw new Error('Empty Data');
				}
			} catch (err) {
				setHideOptions(false);
				if (err.response) {
					toast.error(err.response.data.message);
				} else if (err.message) {
					toast.error(err.message);
				} else {
					toast.error(err);
				}
			}
		} else {
			toast.error('Report Not Selected For Sub Report To Be Submitted');
			toggleReport(true);
		}
	};

	const splitImages = () => {
		setSplitCanvas(!splitCanvas);
	};

	useEffect(() => {
		if (localStorage.getItem('userToken') == null) {
			props.history.push('/login');
		}
		localStorage.setItem('main_image', props.alloted_map_data.img_name);
	}, []);

	return (
		<React.Fragment>
			<div className="App">
				<div
					className="left-panel"
					style={{
						position: 'fixed',
						top: '40%',
						right: '0px',
						width: 'auto',
						padding: '0px',
						margin: '0px',
						height: 'auto',
						backgroundColor: 'transparent',
					}}
				>
					<ToolbarSection />
				</div>
				<div
					style={{
						position: 'fixed',
						left: '0px',
						right: '0px',
						width: '100%',
						top: '4rem',
						zIndex: '10',
					}}
				>
					<MenuBar mapData={props.alloted_map_data} />
				</div>

				<div style={{ marginTop: '15rem' }} className="right-panel">
					<div>
						<Canvas
							getLatLng={getLatLngPos}
							imagetype="crop"
							ref={cref}
							mapData={props.mapData}
						/>
					</div>
				</div>

				{reportShow == true ? (
					<ReportMenu
						mapData={props.mapData}
						cur_alloted_map_data={props.alloted_map_data}
						redirectViewReport={redirectViewReport}
						modal={reportShow}
						toggle={() => toggleReport(!reportShow)}
					/>
				) : null}

				{subreportShow == true ? (
					<SubReportMenu
						modal={subreportShow}
						toggle={() => toggleSubReport(!subreportShow)}
						saveSubReport={saveSubReport}
					/>
				) : null}

				<div
					style={{
						position: 'fixed',
						right: '0px',
						top: '16rem',
						textAlign: 'right',
					}}
				>
					{/* <div>
            <Button color="danger" style={{ backgroundColor:"#EB913B",borderColor:"#EB913B" ,textTransform: 'uppercase' }} onClick={(e) => splitImages()}>{splitCanvas == false ?
              "Comparison View" :
              "Single Map View"}</Button></div> */}
					<div>
						<Button
							onClick={() => toggleReport(!reportShow)}
							style={{
								marginTop: '2px',
								width: '100%',
								textTransform: 'uppercase',
							}}
							color="light"
						>
							Reports
						</Button>
					</div>
					<div>
						<Button
							style={{
								marginTop: '2px',
								width: '100%',
								textTransform: 'uppercase',
							}}
							color="success"
							onClick={() => {
								checkAnnotationsEmpty();
							}}
						>
							Sub Report
						</Button>
					</div>
					<div>
						<Button
							style={{
								marginTop: '2px',
								width: '100%',
								textTransform: 'uppercase',
							}}
							color="primary"
							onClick={() => {
								updateLatLng();
							}}
						>
							Get Coordinates
						</Button>
					</div>
				</div>

				<div style={{ textAlign: 'center' }}>
					<Table
						striped
						bordered
						hover
						size="sm"
						style={{ margin: '10px auto' }}
					>
						<thead>
							<tr>
								<th>S.No</th>
								<th>Annotation Text</th>
								<th>X (px)</th>
								<th>Y (px)</th>
								<th>Width (px)</th>
								<th>Height (px)</th>
								<th>Lat</th>
								<th>Long</th>
								<th>Ann Type</th>
								<th>Rotation</th>
							</tr>
						</thead>
						<tbody>
							{annotations
								.filter(
									(obj, key) =>
										obj.type == 'R' ||
										obj.type == 'E' ||
										obj.type == 'P' ||
										obj.type == 'S',
								)
								.map((ann, key) => (
									<tr key={key}>
										<td>{key + 1}</td>
										<td>{ann.ann_text}</td>
										<td>{ann.x}</td>
										<td>{ann.y}</td>
										<td>{ann.width}</td>
										<td>{ann.height}</td>
										<td>{ann.lat}</td>
										<td>{ann.long}</td>
										<td>
											{ann.type == 'R'
												? 'Rectangle'
												: ann.type == 'E'
												? 'Ellipse'
												: ann.type == 'P'
												? 'Polygon'
												: 'Symbol'}
										</td>
										<td>{ann.rotation}</td>
									</tr>
								))}
						</tbody>
					</Table>
				</div>
			</div>
		</React.Fragment>
	);
};

export default withRouter(MapAnnotate);
