import React from 'react';
import { useState, useEffect } from 'react';
import { Text } from 'react-konva';
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

export const Text_Options = (props) => {
	const { bb } = props;
	const [bb_text, setBB_Text] = useState(bb.ann_text);
	const textRef = React.useRef();
	const [btntypeclick, setBtnClickType] = useState(null);
	const [color, setColor] = useState(bb.color);
	const [fontStyle, setFontStyle] = useState(bb.fontStyle);
	const [fontSize, setFontSize] = useState(bb.fontSize);
	const [textDecoration, setTextDecoration] = useState(
		bb.textDecoration == null ? 'normal' : bb.textDecoration,
	);
	const [nestedModal, setNestedModal] = useState(false);
	const [strokeWidth, setStrokeWidth] = useState(bb.strokeWidth);
	const [closeAll, setCloseAll] = useState(false);
	const [modal, setModal] = useState(false);
	const [align, setAlign] = useState(bb.align);
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

	const handleTextDecoration = (val) => {
		console.log('VAL', val);
		setTextDecoration(val);
	};

	const handleAlignText = (val) => {
		setAlign(val);
	};

	const setClickEvent = (data) => (e) => {
		setBtnClickType(data);
		toggleNested();
	};

	const setValue = (e) => {
		props.bb.color = color;
		props.bb.textDecoration = textDecoration;
		props.bb.align = align;
		props.bb.fontStyle = fontStyle;
		props.bb.ann_text = bb_text;
		props.bb.strokeWidth = strokeWidth;
		if (isNaN(fontSize) == false) {
			props.bb.fontSize = parseFloat(fontSize);
		}

		props.setdata();
		toggleAll();

		console.log('COLOR', strokeWidth);
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
					<ModalHeader toggle={(e) => props.toggle()}>Text Options</ModalHeader>
					<ModalBody>
						<div className="d-flex justify-content-between mt-2">
							<div style={{ flexGrow: 0.8, marginRight: '15px' }}>
								<InputGroup>
									<InputGroupAddon addonType="prepend">
										<InputGroupText>:::</InputGroupText>
									</InputGroupAddon>
									<Input
										type="textarea"
										placeholder="Write your notes"
										onChange={(e) => setBB_Text(e.target.value)}
										defaultValue={bb_text}
										autoFocus
									/>
								</InputGroup>
								<FormGroup>
									<Label for="exampleSelect">Select Text Decoration</Label>
									<Input
										defaultValue={textDecoration}
										onChange={(e) => handleTextDecoration(e.target.value)}
										type="select"
										name="select"
										id="exampleSelect"
									>
										<option value="underline">Underline</option>
										<option value="line-through">Line Through</option>
										<option value="normal">Normal</option>
									</Input>
								</FormGroup>
								<FormGroup>
									<Label for="exampleSelect">Align Text</Label>
									<Input
										defaultValue={align}
										onChange={(e) => handleAlignText(e.target.value)}
										type="select"
										name="select"
										id="exampleSelect"
									>
										<option value="left">Left</option>
										<option value="center">Center</option>
										<option value="right">Right</option>
									</Input>
								</FormGroup>

								<div style={{ textAlign: 'left' }}>Select Font Size</div>
								<Form style={{ width: '90%' }}>
									<Form.Group as={Row} size="sm">
										<Col xs="7">
											<RangeSlider
												value={fontSize}
												size="sm"
												min={1}
												step={1}
												max={50}
												onChange={(e) => {
													setFontSize(parseFloat(e.target.value));
												}}
											/>
										</Col>
										<Col xs="4">
											<Form.Control
												size="sm"
												max={50}
												min={1}
												value={fontSize}
												onChange={(e) => {
													if (
														e.target.value.trim() != '' &&
														isNaN(e.target.value) == false
													) {
														setFontSize(parseInt(e.target.value));
													}
												}}
											/>
										</Col>
									</Form.Group>
									<div style={{ textAlign: 'left' }}>
										Select Text Strokewidth
									</div>
									<Form.Group as={Row} size="sm">
										<Col xs="7">
											<RangeSlider
												value={strokeWidth}
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
												value={strokeWidth}
												onChange={(e) => {
													if (
														e.target.value.trim() != '' &&
														isNaN(e.target.value) == false
													) {
														setStrokeWidth(parseInt(e.target.value));
													}
												}}
											/>
										</Col>
									</Form.Group>
									<Form.Group>
										<Button
											onClick={() => {
												fontStyle != 'italic'
													? setFontStyle('italic')
													: setFontStyle(null);
											}}
											style={{
												opacity: fontStyle != 'italic' ? 0.3 : 1,
												fontStyle: 'italic',
											}}
										>
											I
										</Button>
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
