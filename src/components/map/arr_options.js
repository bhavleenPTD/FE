import React from 'react';
import { useState, useEffect } from 'react';
import Portal from './portal';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';

import Axios from 'axios';
import { URL } from '../../modal/url';
import { toast } from 'react-toastify';
import { EmpHTTP } from '../Interceptors/empInterceptor';
import { SketchPicker } from 'react-color';
import { FormGroup, Label, FormText } from 'reactstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import { Form, Col, Row } from 'react-bootstrap';

export const Ann_Options = (props) => {
	const { bb } = props;

	const textRef = React.useRef();
	const [btntypeclick, setBtnClickType] = useState(null);
	const [color, setColor] = useState(bb.color);
	const [pointerLength, setPointerLength] = useState(
		bb.pointerLength == null ? 10 : bb.pointerLength,
	);
	const [pointerWidth, setPointerWidth] = useState(
		bb.pointerWidth == null ? 10 : bb.pointerWidth,
	);
	const [strokewidth, setStrokeWidth] = useState(
		bb.strokeWidth == null ? 1 : bb.strokeWidth,
	);
	const [stroketype, setStrokeType] = useState(bb.stroketype);
	const [nestedModal, setNestedModal] = useState(false);
	const [pointerAtBeginning, setpointerAtBeginning] = useState(bb.pointerAtBeginning)
	const [closeAll, setCloseAll] = useState(false);
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);

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
			props.deletepop();
		}
	};

	const cancel = () => {
		setNestedModal(!nestedModal);
	};

	const handleColorChange = (e) => {
		setColor(e.hex);
	};

	//  const handleChange= (e)=>{

	//    setBB_Text(e.target.value);

	//   }

	const handleStrokeType = (val) => {
		setStrokeType(val);
	};

	const setClickEvent = (data) => (e) => {
		setBtnClickType(data);
		toggleNested();
	};

	const setValue = (e) => {
		props.bb.color = color;
		props.bb.stroketype = stroketype;
		if (isNaN(strokewidth) == false) {
			props.bb.strokeWidth = parseFloat(strokewidth);
		}
		if (isNaN(pointerWidth) == false) {
			props.bb.pointerWidth = parseFloat(pointerWidth);
		}
		if (isNaN(pointerLength) == false) {
			props.bb.pointerLength = parseFloat(pointerLength);
		}
		props.bb.pointerAtBeginning = pointerAtBeginning;
		props.setdata();
		toggleAll();

		//console.log(props.bb.ann_text);
	};

	return (
		<React.Fragment>
			<Portal>
				<Modal
					isOpen={props.show}
					toggle={props.toggle}
					centered={true}
					size="md"
				>
					<ModalHeader toggle={(e) => props.toggle()}>
						Annotation Options
					</ModalHeader>
					<ModalBody>
						<div className="d-flex justify-content-between mt-2">
							<div style={{ flexGrow: 0.8, marginRight: '15px' }}>
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
									<div style={{ textAlign: 'left' }}>Select Pointer Width</div>

									<Form.Group as={Row} size="sm">
										<Col xs="7">
											<RangeSlider
												value={pointerWidth}
												size="sm"
												min={1}
												step={1}
												max={100}
												onChange={(e) => {
													setPointerWidth(parseInt(e.target.value));
												}}
											/>
										</Col>
										<Col xs="4">
											<Form.Control
												size="sm"
												max={100}
												min={1}
												value={pointerWidth}
												onChange={(e) => {
													if (
														e.target.value.trim() != '' &&
														isNaN(e.target.value) == false
													) {
														console.log(e.target.value);
														setPointerWidth(parseInt(e.target.value));
													}
												}}
											/>
										</Col>
									</Form.Group>
									<div style={{ textAlign: 'left' }}>Select Pointer Length</div>

									<Form.Group as={Row} size="sm">
										<Col xs="7">
											<RangeSlider
												value={pointerLength}
												size="sm"
												min={1}
												step={1}
												max={100}
												onChange={(e) => {
													setPointerLength(parseInt(e.target.value));
												}}
											/>
										</Col>
										<Col xs="4">
											<Form.Control
												size="sm"
												max={100}
												min={1}
												value={pointerLength}
												onChange={(e) => {
													if (
														e.target.value.trim() != '' &&
														isNaN(e.target.value.trim()) == false
													) {
														setPointerLength(parseInt(e.target.value));
													}
												}}
											/>
										</Col>
									</Form.Group>
									<Form.Group controlId="formBasicCheckbox">
										<div className="d-flex">
										<Form.Check  checked={pointerAtBeginning}
											onChange={(e) => { setpointerAtBeginning(e.target.checked) }}
											type="checkbox"  />
											<div>
												Double Head
												</div>
											</div>
									</Form.Group>
								</Form>
							</div>
							<div>
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
						<Button color="primary" onClick={setClickEvent('R')}>
							Relevant
						</Button>{' '}
						<Button color="danger" onClick={setClickEvent('I')}>
							Irrelevant
						</Button>{' '}
						<Button
							color="danger"
							onClick={() => {
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
