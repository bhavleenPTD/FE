import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DatePicker from 'react-datepicker';
import LoadingScreen from 'react-loading-screen';
import { Col } from 'reactstrap';
import { green } from '@material-ui/core/colors';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { Input, Label } from 'reactstrap';
import 'react-datepicker/dist/react-datepicker.css';
import useStore from '../../zustandstore';
import { EmpHTTP } from '../Interceptors/empInterceptor';
import { URL } from '../../modal/url';
import { setstore, intialState } from '../../zustandstore';
import {
	useFilterStore,
	initialFiterState,
	setFilterState,
} from '../../zustandfilter';
import { toast } from 'react-toastify';
import CheckBoxOutlineBlankIcon from '@material-ui/core/Checkbox';
import Checkbox from '@material-ui/core/Checkbox';
import Axios from 'axios';

import SectionTitle from '../common/section-title';
import Footer from '../Footer/footer';
const TimePop = (props) => {
	const [page, setPageNumber] = useState(1);
	const [totalcount, setTotalCount] = useState(0);
	const CancelToken = Axios.CancelToken;
	const source = CancelToken.source();

	const getMaps = (id) => {
		EmpHTTP.post(URL.GET_EMP_ALLOC, {
			locationId: id,
			from: from,
			to: to,
			page: page,
			resppage: 10,
		})
			.then((data) => {
				let res_data = data.data;
				if (res_data.status == true) {
					if (
						res_data.allocations.empAllocLoc != null &&
						res_data.allocations.empAllocLoc.length != 0
					) {
						localStorage.setItem(
							'locationMap',
							res_data.allocations.empAllocLoc[0].locationName.toLowerCase(),
						);
					}
					setMaps(res_data.allocations.empAllocLoc);

					setTotalCount(res_data.totalCount);
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

	const [maps, setMaps] = useState([]);
	useEffect(() => {
		//   localStorage.setItem('locationMap',data.to);

		const {
			match: { params },
		} = props;

		getMaps(params.id);

		setstore.setState(intialState);
		setFilterState.setState(initialFiterState);
		//backend Call

		// switch (params.id) {

		//     case '1': {arr = [
		//         {locationId:'1',
		//         locationName:'hotan',
		//         thumbnail:'hotan/1595709326000',
		//         img_id:'1595709326000',
		//         empId:'Pn4v9G2Lb',
		//         img_path:"hotan/1595709326000",
		//          assigned_on: 1601536337601,
		//          xml:{
		//             target_name:"C2B051147_01011PS_20200102_DIP_ort",
		//             satellite_id:"C2B",
		//             d_o_p: 1595709326000,
		//             corners:{
		//                 lat1:37.082,
		//                 long1:79.8217,
		//                 lat2:37.082,
		//                 long2:79.9322,
		//                 lat3:36.9597,
		//                 long3:79.9322,
		//                 lat4:36.9597,
		//                 long4:79.8217,
		//             },
		//             bands:1,
		//             datum:"WGS-84",
		//             projection:"GEO",
		//             resolution:0.8 ,
		//             correction_type:"Local",
		//             accuracy:"SYSTEM-LEVEL"

		//          }

		//         },
		//         {locationId:'1',
		//         locationName:'hotan',
		//         thumbnail:'hotan/1599719326000',
		//         img_id:'1599719326000',
		//         empId:'Pn4v9G2Lb',
		//         img_path:"hotan/1599719326000",
		//           assigned_on: 1601536337602,
		//          xml:{
		//             target_name:"C2B051147_01011PS_20200102_DIP_ort",
		//             satellite_id:"C2B",
		//             d_o_p: 1599719326000,
		//             corners:{
		//                 lat1:37.082,
		//                 long1:79.8217,
		//                 lat2:37.082,
		//                 long2:79.9322,
		//                 lat3:36.9597,
		//                 long3:79.9322,
		//                 lat4:36.9597,
		//                 long4:79.8217,
		//             },
		//             bands:1,
		//             datum:"WGS-84",
		//             projection:"GEO",
		//             resolution:0.8 ,
		//             correction_type:"Local",
		//             accuracy:"SYSTEM-LEVEL"

		//          },

		//         },
		//         {locationId:'1',
		//         locationName:'hotan',
		//         thumbnail:'hotan/1599719326000',
		//         img_id:'1595719326000',
		//         empId:'Pn4v9G2Lb',
		//         img_path:"hotan/1595719326000",
		//          assigned_on: 1601536337603,
		//          xml:{
		//             target_name:"C2B051147_01011PS_20200102_DIP_ort",
		//             satellite_id:"C2B",
		//             d_o_p: 1595709316000,
		//             corners:{
		//                 lat1:37.082,
		//                 long1:79.8217,
		//                 lat2:37.082,
		//                 long2:79.9322,
		//                 lat3:36.9597,
		//                 long3:79.9322,
		//                 lat4:36.9597,
		//                 long4:79.8217,
		//             },
		//             bands:1,
		//             datum:"WGS-84",
		//             projection:"GEO",
		//             resolution:0.8 ,
		//             correction_type:"Local",
		//             accuracy:"SYSTEM-LEVEL"

		//          }

		//         },
		//         {locationId:'1',
		//         locationName:'hotan',
		//         thumbnail:'hotan/1599719326000',
		//         img_id:'1599519326000',
		//         empId:'Pn4v9G2Lb',
		//         img_path:"hotan/1599519326000",
		//         assigned_on: 1601536337604,
		//          xml:{
		//             target_name:"C2B051147_01011PS_20200102_DIP_ort",
		//             satellite_id:"C2B",
		//             d_o_p: 1595519326000,
		//             corners:{
		//                 lat1:37.082,
		//                 long1:79.8217,
		//                 lat2:37.082,
		//                 long2:79.9322,
		//                 lat3:36.9597,
		//                 long3:79.9322,
		//                 lat4:36.9597,
		//                 long4:79.8217,
		//             },
		//             bands:1,
		//             datum:"WGS-84",
		//             projection:"GEO",
		//             resolution:0.8 ,
		//             correction_type:"Local",
		//             accuracy:"SYSTEM-LEVEL"

		//          },
		//         },
		//         {locationId:'1',
		//         locationName:'hotan',
		//         thumbnail:'hotan/1599719326000',
		//         img_id:'1595719326000',
		//         empId:'Pn4v9G2Lb',
		//         img_path:"hotan/1595719326000",
		//          assigned_on: 1601536337605,
		//          xml:{
		//             target_name:"C2B051147_01011PS_20200102_DIP_ort",
		//             satellite_id:"C2B",
		//             d_o_p: 1598719326000,
		//             corners:{
		//                 lat1:37.082,
		//                 long1:79.8217,
		//                 lat2:37.082,
		//                 long2:79.9322,
		//                 lat3:36.9597,
		//                 long3:79.9322,
		//                 lat4:36.9597,
		//                 long4:79.8217,
		//             },
		//             bands:1,
		//             datum:"WGS-84",
		//             projection:"GEO",
		//             resolution:0.8 ,
		//             correction_type:"Local",
		//             accuracy:"SYSTEM-LEVEL"

		//          }

		//         },
		//         {locationId:'1',
		//         locationName:'hotan',
		//         thumbnail:'hotan/1599719326000',
		//         img_id:'1598719326000',
		//         empId:'Pn4v9G2Lb',
		//         img_path:"hotan/1598719326000",
		//         assigned_on: 1601536337606,
		//          xml:{
		//             target_name:"C2B051147_01011PS_20200102_DIP_ort",
		//             satellite_id:"C2B",
		//             d_o_p: 1598719321000,
		//             corners:{
		//                 lat1:37.082,
		//                 long1:79.8217,
		//                 lat2:37.082,
		//                 long2:79.9322,
		//                 lat3:36.9597,
		//                 long3:79.9322,
		//                 lat4:36.9597,
		//                 long4:79.8217,
		//             },
		//             bands:1,
		//             datum:"WGS-84",
		//             projection:"GEO",
		//             resolution:0.8 ,
		//             correction_type:"Local",
		//             accuracy:"SYSTEM-LEVEL"

		//          },

		//         },
		//         {locationId:'1',
		//         locationName:'hotan',
		//         thumbnail:'hotan/1599719326000',
		//         img_id:'1595719326000',
		//         empId:'Pn4v9G2Lb',
		//         img_path:"hotan/1595719326000",
		//          assigned_on: 1601536337607,
		//          xml:{
		//             target_name:"C2B051147_01011PS_20200102_DIP_ort",
		//             satellite_id:"C2B",
		//             d_o_p: 1595715326000,
		//             corners:{
		//                 lat1:37.082,
		//                 long1:79.8217,
		//                 lat2:37.082,
		//                 long2:79.9322,
		//                 lat3:36.9597,
		//                 long3:79.9322,
		//                 lat4:36.9597,
		//                 long4:79.8217,
		//             },
		//             bands:1,
		//             datum:"WGS-84",
		//             projection:"GEO",
		//             resolution:0.8 ,
		//             correction_type:"Local",
		//             accuracy:"SYSTEM-LEVEL"

		//          }

		//         },
		//         {locationId:'1',
		//         locationName:'hotan',
		//         thumbnail:'hotan/1599719326000',
		//         img_id:'1599719325000',
		//         empId:'Pn4v9G2Lb',
		//         img_path:"hotan/1599719325000",
		//          assigned_on: 1601536337608,
		//          xml:{
		//             target_name:"C2B051147_01011PS_20200102_DIP_ort",
		//             satellite_id:"C2B",
		//             d_o_p: 1599719225000,
		//             corners:{
		//                 lat1:37.082,
		//                 long1:79.8217,
		//                 lat2:37.082,
		//                 long2:79.9322,
		//                 lat3:36.9597,
		//                 long3:79.9322,
		//                 lat4:36.9597,
		//                 long4:79.8217,
		//             },
		//             bands:1,
		//             datum:"WGS-84",
		//             projection:"GEO",
		//             resolution:0.8 ,
		//             correction_type:"Local",
		//             accuracy:"SYSTEM-LEVEL"

		//          },

		//         },
		//         // { file: "1595709326000", date_time: 1595709326000, maplabel: "hotan", desc: "Annotations Present , Review Needed" },
		//         // { file: "1599719326000", date_time: 1599719326000, maplabel: "hotan", desc: "Annotations Present , Review Needed" },
		//         // { file: "file", id: "21234", maplabel: "Katmandu Border", desc: "Annotations Present , Review Needed" },
		//         // { file: "file", id: "23274", maplabel: "Border", desc: "Annotations Present , Review Needed" },
		//         // { file: "file", id: "28204", maplabel: "Ladakh Border", desc: "Annotations Absent , Review Not Needed" }

		//     ]
		//     break;
		// }
		//     default:arr=[]

		// }

		//       if(data.to=='gulmud'){

		//        arr=[
		//         { file: "1595709326000", date_time: 1595709326000, maplabel: "hotan", desc: "Annotations Present , Review Needed" },
		//         { file:  "1599719326000", date_time: 1599719326000, maplabel: "hotan", desc: "Annotations Present , Review Needed" },
		//         // { file: "file", id: "21234", maplabel: "Katmandu Border", desc: "Annotations Present , Review Needed" },
		//         // { file: "file", id: "23274", maplabel: "Border", desc: "Annotations Present , Review Needed" },
		//         // { file: "file", id: "28204", maplabel: "Ladakh Border", desc: "Annotations Absent , Review Not Needed" }

		//     ]
		// }
		//    if(data.to=='hotan'){
		//        arr=[

		//        ]
		//    }
		//     if(arr.length!=0){
		//   localStorage.setItem('locationMap',arr[0].locationName);
		//     }
		//     setMaps(arr)
		return () => {};
	}, []);

	const [isLoading, setIsLoading] = useState(false);
	const viewImages = () => {
		setIsLoading(true);
		// localStorage.setItem(`${reference}${checkimage}`,
		// JSON.stringify({ "Image_Path_1": "C:/Users/user/Desktop/Cofyview_Django/cofyview/media/images/maps/gulmud/1595709326000.jpg", "Image_Path_2": "C:/Users/user/Desktop/Cofyview_Django/cofyview/media/images/maps/gulmud/1599719326000.jpg", "reference": { "rows": 11, "columns": 10 }, "modified": { "rows": 11, "columns": 10 }, "Annotation": { "Point": [["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/0.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/1.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/2.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/3.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/4.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/5.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/6.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/7.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/8.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/9.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/10.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/11.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/12.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/13.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/14.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/15.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/16.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/17.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/18.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/19.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/20.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/21.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/22.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/23.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/24.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/25.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/26.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/27.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/28.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/29.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/30.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/31.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/32.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/33.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/34.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/35.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/36.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/37.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/38.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/39.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/40.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/41.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/42.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/43.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/44.jpg", [[817, 851, 40, 45], [882, 847, 33, 40]]], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/45.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/46.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/47.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/48.jpg", [[255, 848, 19, 24], [218, 836, 23, 25], [181, 827, 23, 26], [144, 820, 21, 25]]], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/49.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/50.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/51.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/52.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/53.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/54.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/55.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/56.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/57.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/58.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/59.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/60.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/61.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/62.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/63.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/64.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/65.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/66.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/67.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/68.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/69.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/70.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/71.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/72.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/73.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/74.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/75.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/76.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/77.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/78.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/79.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/80.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/81.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/82.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/83.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/84.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/85.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/86.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/87.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/88.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/89.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/90.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/91.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/92.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/93.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/94.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/95.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/96.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/97.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/98.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/99.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/100.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/101.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/102.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/103.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/104.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/105.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/106.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/107.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/108.jpg", []], ["C:/Users/user/Desktop/Cofyview_Django/cofyview/media/modified/109.jpg", []]] } }));

		props.history.push(
			'/dashboard/mapCompare/' + reference._id + '/' + checkimage._id,
		);

		// Axios.post(URL.GET_CHANGE_DETECT,{
		//     locationName:localStorage.getItem('locationMap'),
		//     reference:reference,
		//     checkimage:checkimage,},{ cancelToken:source.token, crossdomain: true, headers: { 'Content-Type': 'application/json'
		// ,
		//   'Access-Control-Allow-Origin':'*'
		// }}).then(data=>{

		//    let resp_data=data.data;

		//    if(resp_data[0]!=null && resp_data[0].status==true){

		//          localStorage.setItem('reference',reference);
		//          localStorage.setItem('checkimage',checkimage);
		//          localStorage.setItem(`${reference}${checkimage}`,JSON.stringify(resp_data[0].response));
		//     props.history.push("/dashboard/map/" + `${reference}${checkimage}`);
		//    }else{
		//        toast.error('Empty Data');
		//    }
		// }).catch(err=>{
		//     if(err.response){
		//         toast.error(err.response.data.message);
		//         }else{
		//         toast.error(err.message);
		//         }

		// })
	};

	const viewMap = (tile) => {
		localStorage.removeItem('reference');
		localStorage.removeItem('checkimage');
		localStorage.removeItem('refData');
		localStorage.removeItem('curData');
		localStorage.removeItem('current_report_id');
		props.history.push('/dashboard/cropmap/' + tile._id);
	};

	const [from, setFromDate] = useState(new Date(1595609326000));
	const [to, setToDate] = useState(new Date());
	const [reference, setReference] = useState(null);
	const [checkimage, setCheckImage] = useState(null);

	const handleChange = (input) => (date) => {
		if (input == 'from') {
			setFromDate(date);
		} else {
			setToDate(date);
		}
	};

	return (
		<div id="timepop" style={{ marginTop: '8rem' }}>
			<SectionTitle
				title={'Location Portal'}
				desc={'Select Images For Change Detection'}
			/>

			{/* <Modal size="lg" centered={true}
                isOpen={modal} toggle={() => {
                    
                   
                    props.toggle() }} className={className}>
                <ModalHeader toggle={() => { 
                   
                props.toggle() }}>{data != null ? data.locationlabel : "Time Stamp"}</ModalHeader>
                <ModalBody style={{backgroundColor:"#f0f0f0"}} > */}
			{/* <div style={{ padding: "10px", textAlign: "center" }}>
                <span>Select Images For Change Detection</span>
            </div> */}
			<div className="d-flex">
				<div style={{ margin: 'auto', width: '83%' }}>
					<div className="d-flex justify-content-around">
						<div style={{ position: 'relative' }}>
							<FontAwesomeIcon icon={faCalendar} /> From Date : &nbsp;{' '}
							<DatePicker
								dateFormat="dd/MM/yyyy"
								key={0}
								selected={from}
								value={new Date(1595609326000)}
								maxDate={new Date()}
								onChange={handleChange('from')}
							/>
						</div>
						<div style={{ position: 'relative' }}>
							<FontAwesomeIcon icon={faCalendar} /> To Date:{' '}
							<DatePicker
								key={1}
								dateFormat="dd/MM/yyyy"
								selected={to}
								maxDate={new Date()}
								onChange={handleChange('to')}
							/>
						</div>
						<div>
							<Button
								color="danger"
								outline
								onClick={() => {
									getMaps(localStorage.getItem('locationId'));
								}}
							>
								Fetch Allocated Maps
							</Button>
						</div>
						<div>
							<Button
								color="primary"
								disabled={reference == null || checkimage == null}
								onClick={viewImages}
							>
								View Maps
							</Button>
						</div>
						{/* <LoadingScreen
    loading={isLoading}
    bgColor='#f1f1f1'
    spinnerColor='#9ee5f8'
    textColor='#676767'
    text='Getting Changes from our AI Engine'

   
  > 
 
  </LoadingScreen> */}
					</div>
					{maps && maps.length != 0 ? (
						<div className="d-flex flex-wrap m-4">
							{maps.map((tile, key) => {
								let d = new Date(
									tile.xml != null && tile.xml.d_o_p != null
										? tile.xml.d_o_p
										: null,
								);

								return (
									<Col
										key={key}
										lg={3}
										className="p-2 scale-hover-effect "
										style={{
											borderRadius: '5px',
											margin: '30px 10px',
											cursor: 'pointer',
											backgroundColor:
												reference == tile._id || checkimage == tile._id
													? 'rgb(127,200,153)'
													: 'white',
											flex: '0 0 23%',
										}}
									>
										<div
											className="tile-box"
											style={{ backgroundColor: 'white', padding: '10px' }}
										>
											<div>
												<div
													className="mt-3 d-flex justify-content-between"
													style={{ height: '60px' }}
												>
													{reference == null &&
													(checkimage == null || checkimage._id != tile._id) ? (
														<div
															style={{
																fontSize: '12px',
																padding: '5px',
																position: 'relative',
															}}
														>
															<FormControlLabel
																control={
																	<Checkbox
																		checked={false}
																		onClick={() => {
																			setReference(tile);
																		}}
																		fontSize="small"
																	/>
																}
																label="Reference"
															/>
															{/*                                 
                                   <Label check>
                                  <Input type="checkbox"  checked={false} onClick={()=>{setReference(tile._id)}}  />{''}
                                    <span>Reference</span>
                               </Label>
                                   
         <div style={{display:'flex'}}><span style={{margin:"auto"}}>Reference</span></div>  */}
														</div>
													) : //  <Button style={{margin:'5px', padding:'5px'}} color="primary"  size="sm" onClick={()=>{setReference(tile._id)}}>Reference Image</Button>

													null}

													{/* {reference!=null && reference==tile._id?
 <Button style={{margin:'5px', padding:'5px'}} color="danger" size="sm" onClick={()=>{setReference(null)}}>Remove Reference</Button>

:null} */}

													{reference != null && reference._id == tile._id ? (
														<div
															style={{ fontSize: '12px' }}
															className="d-flex justify-content-between"
														>
															<FormControlLabel
																control={
																	<Checkbox
																		checked={true}
																		onClick={() => {
																			setReference(null);
																		}}
																		fontSize="small"
																	/>
																}
																label="Reference"
															/>
														</div>
													) : null}

													{checkimage == null &&
													(reference == null || reference._id != tile._id) ? (
														//   <Button  style={{margin:'5px', padding:'5px'}} color="primary" size="sm" onClick={()=>{setCheckImage(tile._id)}}> Recent Image</Button>
														<div
															style={{ fontSize: '12px' }}
															className="d-flex justify-content-between"
														>
															<FormControlLabel
																control={
																	<Checkbox
																		checked={false}
																		onClick={() => {
																			setCheckImage(tile);
																		}}
																		fontSize="small"
																	/>
																}
																label="Recent"
															/>
														</div>
													) : null}
													{checkimage != null &&
													(checkimage == null || checkimage._id == tile._id) ? (
														//    <Button style={{margin:'5px', padding:'5px'}} color="danger"  size="sm" onClick={()=>{setCheckImage(null)}}>Remove Recent Image</Button>:null
														<div
															style={{ fontSize: '12px' }}
															className="d-flex justify-content-between"
														>
															<FormControlLabel
																control={
																	<Checkbox
																		checked={true}
																		onClick={() => {
																			setCheckImage(null);
																		}}
																		fontSize="small"
																	/>
																}
																label="Recent"
															/>
														</div>
													) : null}
													{/* <Button color="danger" onClick={()=>{seleteTile()}}> {}<i className="mdi mdi-arrow-right"></i></Button> */}
												</div>
											</div>
											<div>
												{tile.thumbnail != null ? (
													<img
														style={{ width: '100%' }}
														src={tile.thumbnail}
														className="img-fluid"
														alt="tile"
													/>
												) : (
													<img
														style={{ width: '100%' }}
														src={'thumbnail/reserved.jpg'}
														className="img-fluid"
														alt="tile"
													/>
												)}
											</div>
											<div>
												{/* <h5 className="mt-4 text-muted">{tile.maplabel}</h5> */}
												<h4 className="mt-3">
													<Link to="#" className="blog-title text-uppercase">
														{' '}
														{tile.locationName}{' '}
													</Link>
												</h4>
												<div style={{ fontSize: '12px' }}>
													{/* <div className="d-flex justify-content-between">
                                                  <div>
                                                  Target Name :
         
                                                  </div>
                                                  <div>
                                                       {tile.xml.target_name}
                                                  </div>
                                               </div> */}
													<div>
														{tile.xml == null ? 'XML DATA NOT AVAILABLE' : null}
													</div>
													<div className="d-flex justify-content-between">
														<div>Satellite Id :</div>
														<div>
															{tile.xml != null && tile.xml.satellite_id != null
																? tile.xml.satellite_id
																: 'N/A'}
														</div>
													</div>
													<div className="d-flex justify-content-between">
														<div>Date :</div>
														<div>
															{tile.xml != null && tile.xml.d_o_p != null
																? d.getDate() +
																  '-' +
																  (d.getMonth() + 1) +
																  '-' +
																  d.getFullYear()
																: 'N/A'}
														</div>
													</div>
													<div className="d-flex justify-content-between">
														<div>Bands :</div>
														<div>
															{tile.xml != null && tile.xml.bands != null
																? tile.xml.bands
																: 'N/A'}
														</div>
													</div>
													<div className="d-flex justify-content-between">
														<div>Datum :</div>
														<div>
															{tile.xml != null && tile.xml.datum != null
																? tile.xml.datum
																: 'N/A'}
														</div>
													</div>
													<div className="d-flex justify-content-between">
														<div>Projection :</div>
														<div>
															{tile.xml != null && tile.xml.projection != null
																? tile.xml.projection
																: 'N/A'}
														</div>
													</div>
													<div className="d-flex justify-content-between">
														<div>Resolution :</div>
														<div>
															{tile.xml != null && tile.xml.resolution != null
																? tile.xml.resolution
																: 'N/A'}
														</div>
													</div>
													<div className="d-flex justify-content-between">
														<div>Correction Type :</div>
														<div>
															{tile.xml != null &&
															tile.xml.correction_type != null
																? tile.xml.correction_type
																: 'N/A'}
														</div>
													</div>
													{/* <div className="d-flex justify-content-between">
                                                  <div>
                                                Corners Lat : Long
         
                                                  </div>
                                                  <div>
                                                      {tile.xml.corners.lat1} :{tile.xml.corners.long1} , {tile.xml.corners.lat2} :{tile.xml.corners.long2} , {tile.xml.corners.lat3} :{tile.xml.corners.long3} ,
                                                      {tile.xml.corners.lat4} :{tile.xml.corners.long4} 
                                                  </div>
                                               </div> */}
												</div>
												{/* <div></div> Date:  {(d.getDate()) + "-" + (d.getMonth() + 1) + "-" + (d.getFullYear())}</p> */}
												{/* <Button color="danger" onClick={() => { viewMap(tile) }}>View Map<i className="mdi mdi-arrow-right"></i></Button> */}

												{/* 
                                            <div className="mt-3 d-flex justify-content-between">

                                                {reference==null && checkimage!=tile._id?
                                                 <Button style={{margin:'5px', padding:'5px'}} color="primary"  size="sm" onClick={()=>{setReference(tile._id)}}>Reference Image</Button>
                                               
                                                :null
                                                }

                                                {reference!=null && reference==tile._id?
                                                 <Button style={{margin:'5px', padding:'5px'}} color="danger" size="sm" onClick={()=>{setReference(null)}}>Remove Reference</Button>
                                              
                                                :null}

                                                {checkimage==null && reference!=tile._id?
                                                  <Button  style={{margin:'5px', padding:'5px'}} color="primary" size="sm" onClick={()=>{setCheckImage(tile._id)}}> Recent Image</Button>
                                             
                                                :null}
                                                {checkimage!=null && checkimage==tile._id?
                                                   <Button style={{margin:'5px', padding:'5px'}} color="danger"  size="sm" onClick={()=>{setCheckImage(null)}}>Remove Recent Image</Button>:null
                                               
                    
                                            } 
                                       
                                               
                                               

                                            </div> */}
												<div className="mt-3">
													<Button
														color="danger"
														size="sm"
														onClick={() => {
															viewMap(tile);
														}}
													>
														{' '}
														View Map <i className="mdi mdi-arrow-right"></i>
													</Button>
												</div>
											</div>
										</div>
									</Col>
								);
							})}
						</div>
					) : (
						<div style={{ padding: '100px' }}>
							<span>Choose The Date for the time stamp to be shown </span>
						</div>
					)}
				</div>
			</div>

			{/* </ModalBody>
                {/* <ModalFooter>
          <Button color="primary" onClick={props.toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={props.toggle}>Cancel</Button>
        </ModalFooter> */}
			{/* </Modal> */}

			{/* <Footer/> */}
		</div>
	);
};

export default withRouter(TimePop);
