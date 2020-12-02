import React, { Component } from 'react';
import './imageHover.css';
import LoadingScreen from 'react-loading-screen';
import { Table } from 'react-bootstrap';
import LimitedCanvas from '../../components/map_limited_feature/map.canvas';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { setstore, intialState } from '../../zustandstore';
import { initialFiterState, setFilterState } from '../../zustandfilter';
import Xml_data from '../../components/XML/xml_data';
import styled from 'styled-components';
import CropCanvas from '../../components/Cropper/map.canvas';
import { toast } from 'react-toastify';
import { EmpHTTP } from '../../components/Interceptors/empInterceptor';
import { URL } from '../../modal/url';

const CardStyle = styled.div`
	padding: 10px;
	margin: 10px;
	font-size: 13px;
`;

class CropShow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
			curpath: null,
			activeOptionStatus: false,
			activeOptionCode: null,
			file: null,
			loadcrop: true,
			apiButtonText: null,
			location: localStorage.getItem('locationMap'),
			images: [],
			curData: null,
		};
	}

	toggle = (val) => {
		this.setState({
			...this.state,
			show: val,
		});
	};

	getAllocationData = async (id) => {
		try {
			let data = await EmpHTTP.post(URL.GET_ALLOC_MAP_DATA, { id: id });
			let resp_data = data.data;
			if (resp_data.status == true) {
				console.log(resp_data);
				this.setState({
					...this.state,
					curpath: resp_data.alloc.img_path,
					location: resp_data.alloc.locationName,
					curData: resp_data.alloc,
				});
			} else {
				toast.error('Error Occurred');
			}
		} catch (err) {
			if (err.response) {
				toast.error(err.response.data.message);
			} else if (err.message) {
				toast.error(err.message);
			} else {
				toast.error(err);
			}
			this.props.history.push('/dashboard/locations');
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

		if (params != null && params.cur != null) {
			this.getAllocationData(params.cur);
		} else {
			this.props.history.push('/dashboard/locations');
		}

		//api call with id params
	}

	//     checkDetection=(val)=>{
	//         this.setState({
	//             ...this.state,
	//              activateOptionStatus:false,
	//              activeOptionCode:null,
	//              show:false
	//         })
	//         localStorage.setItem('reference',val.file);
	//    localStorage.setItem(`${val.file}${this.state.timestamp}`,JSON.stringify({"Image_Path_1":"C:/Users/user/Desktop/Cofyview_Django/cofyview/media/images/maps/gulmud/1595709326000.jpg","Image_Path_2":"C:/Users/user/Desktop/Cofyview_Django/cofyview/media/images/maps/gulmud/1599719326000.jpg","reference":{"rows":11,"columns":10},"modified":{"rows":11,"columns":10},"Annotation":{"Point":[["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/0.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/1.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/2.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/3.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/4.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/5.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/6.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/7.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/8.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/9.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/10.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/11.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/12.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/13.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/14.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/15.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/16.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/17.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/18.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/19.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/20.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/21.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/22.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/23.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/24.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/25.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/26.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/27.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/28.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/29.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/30.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/31.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/32.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/33.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/34.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/35.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/36.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/37.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/38.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/39.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/40.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/41.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/42.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/43.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/44.jpg",[[817,851,40,45],[882,847,33,40]]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/45.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/46.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/47.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/48.jpg",[[255,848,19,24],[218,836,23,25],[181,827,23,26],[144,820,21,25]]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/49.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/50.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/51.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/52.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/53.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/54.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/55.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/56.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/57.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/58.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/59.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/60.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/61.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/62.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/63.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/64.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/65.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/66.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/67.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/68.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/69.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/70.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/71.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/72.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/73.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/74.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/75.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/76.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/77.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/78.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/79.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/80.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/81.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/82.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/83.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/84.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/85.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/86.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/87.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/88.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/89.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/90.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/91.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/92.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/93.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/94.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/95.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/96.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/97.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/98.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/99.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/100.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/101.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/102.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/103.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/104.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/105.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/106.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/107.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/108.jpg",[]],["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/109.jpg",[]]]}}));
	//          this.props.history.push(`/dashboard/changeDetect/${val.file}${this.state.timestamp}`);
	//     }

	// checkDetection = () => {
	//     this.setState({
	//         ...this.state,
	//         activateOptionStatus: false,
	//         activeOptionCode: null,
	//         show: false
	//     })

	//     localStorage.setItem(`${this.state.reftimestamp}${this.state.curtimestamp}`, JSON.stringify({ "Image_Path_1": "C:/Users/user/Desktop/Cofyview_Django/cofyview/media/images/maps/gulmud/1595709326000.jpg", "Image_Path_2": "C:/Users/user/Desktop/Cofyview_Django/cofyview/media/images/maps/gulmud/1599719326000.jpg", "reference": { "rows": 11, "columns": 10 }, "modified": { "rows": 11, "columns": 10 }, "Annotation": { "Point": [["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/0.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/1.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/2.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/3.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/4.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/5.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/6.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/7.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/8.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/9.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/10.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/11.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/12.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/13.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/14.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/15.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/16.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/17.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/18.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/19.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/20.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/21.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/22.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/23.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/24.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/25.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/26.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/27.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/28.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/29.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/30.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/31.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/32.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/33.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/34.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/35.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/36.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/37.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/38.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/39.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/40.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/41.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/42.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/43.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/44.jpg", [[817, 851, 40, 45], [882, 847, 33, 40]]], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/45.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/46.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/47.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/48.jpg", [[255, 848, 19, 24], [218, 836, 23, 25], [181, 827, 23, 26], [144, 820, 21, 25]]], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/49.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/50.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/51.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/52.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/53.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/54.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/55.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/56.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/57.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/58.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/59.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/60.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/61.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/62.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/63.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/64.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/65.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/66.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/67.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/68.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/69.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/70.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/71.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/72.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/73.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/74.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/75.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/76.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/77.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/78.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/79.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/80.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/81.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/82.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/83.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/84.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/85.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/86.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/87.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/88.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/89.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/90.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/91.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/92.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/93.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/94.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/95.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/96.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/97.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/98.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/99.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/100.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/101.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/102.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/103.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/104.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/105.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/106.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/107.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/108.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/109.jpg", []]] } }));
	//     this.props.history.push(`/dashboard/changeDetect/${this.state.reftimestamp}${this.state.curtimestamp}`);
	// }

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

	base64toBlob(base64, mimeType) {
		const bytes = atob(base64.split(',')[1]);
		const arrayBuffer = new ArrayBuffer(bytes.length);
		const uintArray = new Uint8Array(arrayBuffer);
		for (let i = 0; i < bytes.length; i++) {
			uintArray[i] = bytes.charCodeAt(i);
		}
		return new Blob([arrayBuffer], { type: mimeType });
	}

	getCroppedImagePngFile = async (formdata) => {
		try {
			let data = await EmpHTTP.post(URL.SAVE_CROP_IMAGE, formdata, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});

			let resp_data = data.data;

			if (resp_data.status == true) {
				this.props.history.push('/dashboard/croppedimage/' + resp_data.map._id);
			} else {
				throw new Error('Empty Data');
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

	navigateToMap = async (val) => {
		if (val != null) {
			const imgRegEx = /^data:(image\/(gif|png|jpg|jpeg))/;
			const mimeType = imgRegEx.exec(val.image)[1];
			const blob = this.base64toBlob(val.image, mimeType);
			const fileExt = mimeType.replace('image/', '');
			const fileName = 'crop.' + fileExt;
			let formdata = new FormData();
			formdata.append('cropImage', blob, fileName);
			formdata.append('x', val.x);
			formdata.append('y', val.y);
			formdata.append('img_width', val.img_width);
			formdata.append('img_height', val.img_height);
			formdata.append('emp_map_alloted_id', this.state.curData._id);
			formdata.append('complete_map_width', val.inputWidth);
			formdata.append('complete_map_height', val.inputHeight);
			await this.getCroppedImagePngFile(formdata);
		} else {
			toast.error('No Data Retreived');
		}
	};

	componentWillUnmount() {
		setstore.setState(intialState);
		setFilterState.setState(initialFiterState);
	}

	render() {
		return (
			<React.Fragment>
				{this.state.curData != null ? (
					<div style={{ marginTop: '5rem' }}>
						<div className="right-panel">
							<CropCanvas
								imagepath={this.state.curpath}
								navigateToMap={this.navigateToMap}
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
						<div
							color="primary"
							style={{ position: 'fixed', top: '12rem', right: '0rem' }}
						>
							<Button
								onClick={() => {
									this.props.history.push(
										'/dashboard/viewcompleteMap/' + this.state.curData._id,
									);
								}}
							>
								{' '}
								Annotate
							</Button>
						</div>
					</div>
				) : null}
			</React.Fragment>
		);
	}
}

export default CropShow;
