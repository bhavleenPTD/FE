import React from 'react';
import { useState, useEffect } from 'react';
import { Text, Arrow, Transformer } from 'react-konva';
import Portal from './portal';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { useStore } from '../../zustandstore';
import Axios from 'axios';
import { URL } from '../../modal/url';
import { toast } from 'react-toastify';
// import { EmpHTTP } from '../Interceptors/empInterceptor';
import { Form, Col, Row } from 'react-bootstrap';
import { FormGroup, Label, FormText } from 'reactstrap';
import { SketchPicker } from 'react-color';
import RangeSlider from 'react-bootstrap-range-slider';
import { FORMULA } from '../../modal/centreFormula';

export const BB_text = (props) => {
	const { bb, mapData } = props;

	// const textRef = React.useRef();
	// const canvasWidth=useStore(s=>s.canvasWidth);
	// const canvasHeight=useStore(s=>s.canvasHeight);
	const naturalwidth = useStore((s) => s.naturalwidth);
	const naturalheight = useStore((s) => s.naturalheight);
	// const backImage=useStore(s=>s.image);
	const [btntypeclick, setBtnClickType] = useState(null);
	const [bb_text, setBB_Text] = useState(props.bb.ann_text);
	const [lat, setLat] = useState(null);
	const [long, setLong] = useState(null);
	const [strokewidth, setStrokeWidth] = useState(
		bb.strokeWidth == null ? 1 : bb.strokeWidth,
	);
	const [stroketype, setStrokeType] = useState(bb.stroketype);
	const [contact, setContact] = useState({
		f: { x: 0, y: 0 },
		s: { x: 0, y: 0 },
	});
	const [color, setColor] = useState(bb.color);
	const [nestedModal, setNestedModal] = useState(false);
	const [closeAll, setCloseAll] = useState(false);
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

	const calcVal = () => {
		if (mapData == null) {
			let currow = parseInt(localStorage.getItem('currow'));
			let curcol = parseInt(localStorage.getItem('curcol'));
			return { x: curcol * naturalwidth, y: currow * naturalheight };
		} else {
			return { x: mapData.x, y: mapData.y };
		}
	};

	const getBBCentrePoints = (obj) => {
		if (obj.type == 'R' || obj.type == 'S') {
			return FORMULA.getRECTC(obj);
		} else if (obj.type == 'E') {
			return FORMULA.getELLIPSEC(obj);
		} else if (obj.type == 'P') {
			return FORMULA.getPOLYC(obj);
		}
	};
	const getData = () => {
		// console.log(bb);

		let { x, y } = calcVal();
		let points = getBBCentrePoints(bb);
		console.log(
			`maps/${localStorage.getItem('locationMap')}/${localStorage.getItem(
				'main_image',
			)}`,
		);
		Axios.post(
			URL.GET_LAT_LONG,
			{
				locationName: localStorage.getItem('locationMap'),
				image_name: `maps/${localStorage.getItem(
					'locationMap',
				)}/${localStorage.getItem('main_image')}`,
				X_value: points.x + x,
				Y_value: points.y + y,
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

				if (resp_data[0] != null && resp_data[0].status == true) {
					console.log(data);
					setLat(resp_data[0].response.Long);
					setLong(resp_data[0].response.Lat);
					props.bb.lat = resp_data[0].response.Long;
					props.bb.long = resp_data[0].response.Lat;
					props.bb.end = false;
					props.setdata();
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

		// if(lat==null){
		// setLat(bb.x/10+0.03*2);
		// setLong(bb.y/10+0.03*2);
		// }
	};

	const rotatedPoints = (x, y, x1, y1, rot) => {
		var angle = rot * (Math.PI / 180);
		console.log(angle);
		let s = Math.sin(angle);
		let c = Math.cos(angle);

		// translate point back to origin:
		x -= x1;
		y -= y1;

		// rotate point
		let xnew = x * c - y * s;
		let ynew = x * s + y * c;

		// translate point back:
		x = xnew + x1;
		y = ynew + y1;
		return { x: x, y: y };
	};

	React.useEffect(() => {
		setContact(getNearestCorner());
	}, [bb]);

	const getNearestCorner = () => {
		if (bb.type == 'R' || bb.type == 'S') {
			let rotx = bb.x;
			let roty = bb.y;

			let firstpoint = { x: bb.x + bb.width / 2, y: bb.y };
			let secondpoint = { x: bb.x + bb.width, y: bb.y + bb.height / 2 };
			let thirdpoint = { x: bb.x, y: bb.y + bb.height / 2 };
			let fourthpoint = { x: bb.x + bb.width / 2, y: bb.y + bb.height };

			let sfirstPoint = { x: bb.annX + bb.annWidth / 2, y: bb.annY };
			let ffourthpoint = {
				x: bb.annX + bb.annWidth / 2,
				y: bb.annY + Math.max(bb.annHeight, bb.fontSize),
			};

			let arr = [firstpoint, secondpoint, thirdpoint, fourthpoint];
			let cArr = arr.map((obj) =>
				rotatedPoints(obj.x, obj.y, rotx, roty, bb.rotation),
			);

			let text = [sfirstPoint, ffourthpoint];
			let textArr = text.map((obj) =>
				rotatedPoints(
					obj.x,
					obj.y,
					bb.annX,
					bb.annY,
					bb.annRotation == null ? 0 : bb.annRotation,
				),
			);
			let minDist = -Infinity;
			let minPoints = arr[0];
			let minSecondPoints = text[0];
			for (let obj of cArr) {
				for (let sobj of textArr) {
					let dist = Math.pow(sobj.x - obj.x, 2) + Math.pow(sobj.y - obj.y, 2);
					if (Math.pow(minDist, 2) > Math.pow(dist, 2)) {
						minDist = dist;
						minPoints = obj;
						minSecondPoints = sobj;
					}
				}
			}
			return { f: minPoints, s: minSecondPoints };
		} else if (bb.type == 'E') {
			let rotx = bb.x;
			let roty = bb.y;
			let firstpoint = { x: bb.x + bb.radiusX, y: bb.y };
			let secondpoint = { x: bb.x + bb.radiusX * 2, y: bb.y + bb.radiusY };
			let thirdpoint = { x: bb.x, y: bb.y + bb.radiusY };
			let fourthpoint = { x: bb.x + bb.radiusX, y: bb.y + bb.radiusY * 2 };

			let sfirstPoint = { x: bb.annX + bb.annWidth / 2, y: bb.annY };
			let ffourthpoint = {
				x: bb.annX + bb.annWidth / 2,
				y: bb.annY + Math.max(bb.fontSize, bb.annHeight),
			};

			let arr = [firstpoint, secondpoint, thirdpoint, fourthpoint];
			let cArr = arr.map((obj) =>
				rotatedPoints(obj.x, obj.y, rotx, roty, bb.rotation),
			);

			let text = [sfirstPoint, ffourthpoint];
			let textArr = text.map((obj) =>
				rotatedPoints(
					obj.x,
					obj.y,
					bb.annX,
					bb.annY,
					bb.annRotation == null ? 0 : bb.annRotation,
				),
			);
			let minDist = -Infinity;
			let minPoints = arr[0];
			let minSecondPoints = text[0];
			for (let obj of cArr) {
				for (let sobj of textArr) {
					let dist = Math.pow(sobj.x - obj.x, 2) + Math.pow(sobj.y - obj.y, 2);
					if (Math.pow(minDist, 2) > Math.pow(dist, 2)) {
						minDist = dist;
						minPoints = obj;
						minSecondPoints = sobj;
					}
				}
			}
			return { f: minPoints, s: minSecondPoints };
		} else if (bb.type == 'P') {
			let arr = [].concat(bb.points);

			let sfirstPoint = { x: bb.annX + bb.annWidth / 2, y: bb.annY };
			//  let ssecondPoint={x:bb.annX,y:bb.annY+bb.fontSize/2};
			//  let tthirdpoint={x:bb.annX+bb.annWidth,y:bb.annY+bb.fontSize/2};
			let ffourthpoint = {
				x: bb.annX + bb.annWidth / 2,
				y: bb.annY + Math.max(bb.fontSize, bb.annHeight),
			};

			let text = [sfirstPoint, ffourthpoint];
			let textArr = text.map((obj) =>
				rotatedPoints(
					obj.x,
					obj.y,
					bb.annX,
					bb.annY,
					bb.annRotation == null ? 0 : bb.annRotation,
				),
			);
			let minDist = -Infinity;
			let minPoints = arr[0];
			let minSecondPoints = text[0];
			for (let obj of arr) {
				for (let sobj of textArr) {
					let dist = Math.pow(sobj.x - obj.x, 2) + Math.pow(sobj.y - obj.y, 2);
					if (Math.pow(minDist, 2) > Math.pow(dist, 2)) {
						minDist = dist;
						minPoints = obj;
						minSecondPoints = sobj;
					}
				}
			}
			return { f: minPoints, s: minSecondPoints };
		}
	};

	const handleStrokeType = (val) => {
		setStrokeType(val);
	};

	const toggleNested = () => {
		setNestedModal(!nestedModal);
		setCloseAll(false);
	};
	const toggleAll = () => {
		setNestedModal(!nestedModal);
		setCloseAll(true);
	};
	const confirm = () => {
		if (btntypeclick == 'R') {
			//saveapi
			setValue();
		} else {
			console.log('delete');
			props.deletepop();
			//delete api
		}
	};

	const cancel = () => {
		setNestedModal(!nestedModal);
	};

	const handleLat = (e) => {};

	const handleLong = (e) => {};
	const handleColorChange = (e) => {
		setColor(e.hex);
	};

	const handleChange = (e) => {
		setBB_Text(e.target.value);
	};

	const setClickEvent = (data) => (e) => {
		setBtnClickType(data);
		toggleNested();
	};

	const setValue = (e) => {
		props.bb.ann_text = bb_text;
		props.bb.color = color;
		props.bb.lat = lat;
		props.bb.long = long;
		if (isNaN(strokewidth) == false) {
			props.bb.strokeWidth = parseFloat(strokewidth);
		}
		props.bb.stroketype = stroketype;
		props.setdata();
		toggleAll();

		//console.log(props.bb.ann_text);
	};

	return (
		<React.Fragment>
			{/* <Text
      name="text"
      ref={textRef}
      x={bb.x}   
      fontSize={20}
      width={
         bb.type=='R'?
        bb.width+2:
      bb.type=='E'?
      bb.radiusX*2+2:null
      }
      y={bb.y}

  
      offset={
         bb.type=='R'?
        {
          x:0,
          y:-bb.height-5
          
      }:bb.type=='E'?{
        x:0,
        y:-bb.radiusY*2-5
      }:null
    
    }
    
     fontStyle="bold"
      text={bb.ann_text?bb.ann_text:"Please Input"}
      // fontSize={Math.max(
      //   9,
      //  bb.type=='R'? bb.width/12+bb.height/12:
      //  bb.type=='E'? bb.radiusX/12+bb.radiusY/12:9)}
      rotation={bb.rotation}
      align= "center"
            fill={color}
     /> */}

			{bb.ann_text == '' || bb.ann_text == null ? null : (
				<Arrow
					stroke={color}
					strokeWidth={bb.strokeWidth}
					fill={color}
					points={[contact.f.x, contact.f.y, contact.s.x, contact.s.y]}
				/>
			)}
			{bb.ann_text == '' || bb.ann_text == null ? null : (
				<Text
					name="shape"
					x={bb.annX}
					y={bb.annY}
					ref={props.textShapeRef}
					onClick={props.handleClick}
					onTap={props.handleClick}
					width={bb.annWidth}
					fontSize={bb.fontSize}
					height={Math.max(bb.fontSize, bb.annHeight)}
					stroke={bb.color}
					rotation={bb.annRotation}
					fill={bb.color}
					text={bb.ann_text == null ? 'Text' : bb.ann_text}
					align="center"
					verticalAlign="middle"
					draggable
					onDragEnd={(e) => {
						props.onChange({
							...bb,
							annX: e.target.x(),
							annY: e.target.y(),
						});
					}}
					onTransformEnd={(e) => {
						// transformer is changing scale of the node
						// and NOT its width or height
						// but in the store we have only width and height
						// to match the data better we will reset scale on transform end
						const node = props.textShapeRef.current;
						// console.log(node);
						const scaleX = node.scaleX();
						const scaleY = node.scaleY();

						// we will reset it back
						node.scaleX(1);
						node.scaleY(1);
						props.onChange({
							...bb,
							annX: node.x(),
							annY: node.y(),
							annWidth: Math.max(node.width() * scaleX, 5),
							annHeight: Math.max(node.height() * scaleY, 5),
							annRotation: node.rotation(),
							// set minimal value
						});
					}}
				/>
			)}
			{props.textSelected && (
				<Transformer
					ref={props.ttRef}
					boundBoxFunc={(oldBox, newBox) => {
						// limit resize

						return newBox;
					}}
				/>
			)}
			<Portal>
				<Modal
					onOpened={getData}
					isOpen={props.show}
					toggle={props.toggle}
					centered={true}
					size="md"
				>
					<ModalHeader toggle={(e) => props.toggle()}>Annotate</ModalHeader>
					<ModalBody>
						<InputGroup>
							<InputGroupAddon addonType="prepend">
								<InputGroupText>::</InputGroupText>
							</InputGroupAddon>

							<Input
								type="textarea"
								placeholder="Write your notes"
								onChange={handleChange}
								defaultValue={bb_text}
								autoFocus
							/>
						</InputGroup>
						<FormGroup>
							<Label for="exampleSelect">Select Type Of Line</Label>
							<Input
								defaultValue={stroketype}
								onChange={(e) => handleStrokeType(e.target.value)}
								type="select"
								name="select"
								id="exampleSelect"
							>
								<option value="plain">Plain</option>
								<option value="dotted">Dotted</option>
								<option value="dashed">Dashed</option>
							</Input>
						</FormGroup>
						<div style={{ textAlign: 'left' }}>Select Stroke Width</div>
						<Form style={{ width: '90%' }}>
							<Form.Group as={Row} size="sm">
								<Col xs="7">
									<RangeSlider
										value={strokewidth}
										size="sm"
										min={1}
										step={1}
										max={100}
										onChange={(e) => {
											setStrokeWidth(parseFloat(e.target.value));
										}}
									/>
								</Col>
								<Col xs="4">
									<Form.Control
										size="sm"
										max={100}
										min={1}
										value={strokewidth}
										onChange={(e) => {
											if (
												e.target.value.trim() != '' &&
												isNaN(e.target.value) == false
											) {
												setStrokeWidth(parseFloat(e.target.value));
											}
										}}
									/>
								</Col>
							</Form.Group>
						</Form>

						<div className="d-flex justify-content-between mt-2">
							<div style={{ width: '40%' }}>
								{lat != null ? (
									<div>
										{' '}
										Lat: {''}{' '}
										<Input placeholder="Latitude" readOnly defaultValue={lat} />
									</div>
								) : null}

								{long != null ? (
									<div>
										{' '}
										Long:{''}
										<Input
											placeholder="Longitude"
											readOnly
											defaultValue={long}
										/>
									</div>
								) : null}
							</div>
							<div style={{ width: '50%' }}>
								<SketchPicker
									color={color}
									onChangeComplete={handleColorChange}
								/>
							</div>
						</div>
						<Modal
							isOpen={nestedModal}
							centered={true}
							toggle={toggleNested}
							onClosed={closeAll ? props.toggle : undefined}
						>
							<ModalHeader>Are you sure ?</ModalHeader>
							<ModalBody>
								{btntypeclick == 'R'
									? 'Do you want to save this?'
									: 'Do want to delete this?'}
							</ModalBody>

									{/* FIXME: */}
							<ModalFooter>
								<Button color="primary" onClick={confirm}>
									Yes
								</Button>{' '}
								<Button color="danger" onClick={cancel}>
									No
								</Button>
							</ModalFooter>
						</Modal>
					</ModalBody>
					<ModalFooter>
						<Button
							color="primary"
							disabled={lat == null || long == null}
							onClick={setClickEvent('R')}
						>
							Relevant
						</Button>{' '}
						<Button color="danger" onClick={setClickEvent('I')}>
							Irrelevant
						</Button>{' '}
						<Button
							color="danger"
							onClick={() => {
								setColor(bb.color);
								props.toggle();
							}}
						>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>
			</Portal>
		</React.Fragment>
	);
};
