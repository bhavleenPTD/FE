import React, { useState } from 'react';
import { useFilterStore } from '../../zustandfilter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdjust, faAd } from '@fortawesome/free-solid-svg-icons';
import { Label, Input } from 'reactstrap';
import { Button } from 'reactstrap';
import ToolbarOption from './toolbarOption';
import { Form, Col, Row } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';
const Btnoverlay = styled.div`
	margin: 2px;
	opacity: 0.6;
	&:hover {
		opacity: 1;
	}
`;

export default (props) => {
	const [lightNav, setLightNav] = useState(true);

	const [heavyNav, setHeavyNav] = useState(true);

	const setBrightness = useFilterStore((s) => s.setBrightness);
	const brightness = useFilterStore((s) => s.brightness);
    
	const setBlurRadius = useFilterStore((s) => s.setBlurRadius);
	const blurRadius = useFilterStore((s) => s.blurRadius);
	const magnifyGlass = useFilterStore((s) => s.magnigyGlass);
	const setContrast = useFilterStore((s) => s.setContrast);
	const contrast = useFilterStore((s) => s.contrast);
	const { setEmbossS, setEmbossW, estrength, ewlevel } = useFilterStore();
	const isHeavy = useFilterStore((s) => s.isHeavy);
	const setIsHeavy = useFilterStore((s) => s.setIsHeavy);
	const {
		RGBRed,
		RGBBlue,
		RGBGreen,
		r,
		g,
		b,
		grayScale,
		invert,
		pixel,
	} = useFilterStore();
	const {
		hue,
		sat,
		lum,
		valb,
		setHSLVH,
		setHSLVS,
		setHSLVL,
		setHSLVV,
	} = useFilterStore();
	const { canvasRotation, setCanvasRotation } = useFilterStore();
	const setINVT = useFilterStore((s) => s.setINVT);
	const setPixel = useFilterStore((s) => s.setPixel);
	const setGS = useFilterStore((s) => s.setGrayScale);
	const [show, setShow] = useState(false);
	const [currentOption, setCurOption] = useState(null);
	

	const handleClose = () => {
		setShow(false);
		setCurOption(null);
	};

	const handlOpen = () => {
		setShow(true);
	};

	//    const setHUE= (val)=>{
	//        setHSLV({
	//            ...HSLV,
	//            hue:val
	//        })
	//    }
	//    const setLUM= (val)=>{
	//     setHSLV({
	//         ...HSLV,
	//         lum:val
	//     })
	// }
	// const setSAT= (val)=>{
	//     setHSLV({
	//         ...HSLV,
	//         sat:val
	//     })
	// }
	// const setVAL= (val)=>{
	//     setHSLV({
	//         ...HSLV,
	//         val:val
	//     })
	// }

	const setGrayScale = (val) => {
		setGS(val);
	};

	const setInvert = (val) => {
		setINVT(val);
	};

	const ts = {
		lt: [
			{
				heading: 'Brightness | Contrast | Rotate ',
				iconInfo: 'BCR',
				body: [
					{
						icon: faAdjust,
						min: 0,
						max: 2,
						step: 0.05,
						value: brightness,
						onChange: setBrightness,
						fname: 'Brightness',
					},
					{
						icon: faAdjust,
						min: 1,
						max: 200,
						step: 2,
						value: contrast,
						onChange: setContrast,
						fname: 'Contrast',
					},
					{
						fname: 'Rotate',
						icon: faAdjust,
						min: 0,
						max: 360,
						step: 1,
						value: canvasRotation,
						onChange: setCanvasRotation,
					},
				],
			},

			{
				heading: 'Hue | Saturation | Blur ',
				iconInfo: 'HSB',
				body: [
					{
						icon: faAdjust,
						min: 0,
						max: 360,
						step: 1,
						value: hue,
						onChange: setHSLVH,
						fname: 'Hue',
					},
					{
						icon: faAdjust,
						min: 0,
						max: 100,
						step: 1,
						value: sat,
						onChange: setHSLVS,
						fname: 'Saturation',
					},
					{
						fname: 'Blur Radius',
						icon: faAdjust,
						min: 0,
						max: 40,
						step: 0.25,
						value: blurRadius,
						onChange: setBlurRadius,
					},
				],
			},
		],
		hv: [
			{
				heading: 'Emboss Strength | White Level | Pixel',
				iconInfo: 'EWP',
				body: [
					{
						icon: faAdjust,
						min: 0,
						max: 20,
						step: 0.2,
						value: estrength,
						onChange: setEmbossS,
						fname: 'Strength',
					},
					{
						icon: faAdjust,
						min: 0,
						max: 1,
						step: 0.1,
						value: ewlevel,
						onChange: setEmbossW,
						fname: 'White Level',
					},
					{
						icon: faAdjust,
						min: 1,
						max: 20,
						step: 1,
						value: pixel,
						onChange: setPixel,
						fname: 'Pixelate',
					},
				],
			},

			{
				heading: 'Red | Green | Blue ',
				iconInfo: 'RGB',
				body: [
					{
						icon: faAdjust,
						min: 0,
						max: 256,
						step: 1,
						value: r,
						onChange: RGBRed,
						fname: 'Red',
					},
					{
						icon: faAdjust,
						min: 0,
						max: 256,
						step: 1,
						value: g,
						onChange: RGBGreen,
						fname: 'Green',
					},
					{
						icon: faAdjust,
						min: 0,
						max: 256,
						step: 1,
						value: b,
						onChange: RGBBlue,
						fname: 'Blue',
					},
				],
			},
			{
				heading: 'GrayScale | Invert | Luminous | Value ',
				iconInfo: 'GILV',
				body: [
					{
						icon: faAdjust,
						min: 0,
						max: 100,
						step: 1,
						value: grayScale,
						onChange: setGrayScale,
						fname: 'Gray Scale',
					},
					{
						icon: faAdjust,
						min: 0,
						max: 100,
						step: 1,
						value: invert,
						onChange: setInvert,
						fname: 'Invert Scale',
					},
					{
						icon: faAdjust,
						min: 0,
						max: 2,
						step: 0.02,
						value: lum,
						onChange: setHSLVL,
						fname: 'Luminous',
					},
					{
						icon: faAdjust,
						min: 0,
						max: 2,
						step: 0.02,
						value: valb,
						onChange: setHSLVV,
						fname: 'Value',
					},
				],
			},
		],
	};

	return (
		<div>
			{currentOption != null ? (
				<Modal
					size="xl"
					centered={false}
					backdrop={false}
					key={currentOption.heading}
					show={show}
					onHide={handleClose}
				>
					<Modal.Header closeButton>
						<Modal.Title>{currentOption.heading}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="row">
							{currentOption.body.map((obj, key) => (
								<div key={key} className="col">
									<ToolbarOption key={key} data={obj} />
								</div>
							))}
						</div>
					</Modal.Body>
				</Modal>
			) : null}

			<div style={{ textAlign: 'right', position: 'relative' }}>
				<div>
					<div
						className="photoshopl"
						style={{
							right: lightNav == true ? '0px' : '-81px',
						}}
					>
						<div
							className="nvbarbtn1"
							onClick={(e) => setLightNav(!lightNav)}
						></div>
						<div>
							{ts.lt.map((obj, key) => (
								<div key={key}>
									<Btnoverlay
										style={
											currentOption != null &&
											currentOption.iconInfo == obj.iconInfo
												? { opacity: '1' }
												: null
										}
									>
										<Button
											color="light"
											style={{ width: '100%' }}
											onClick={(e) => {
												setCurOption(obj);
												handlOpen(true);
											}}
										>
											{obj.iconInfo}
										</Button>
									</Btnoverlay>
								</div>
							))}
						</div>
					</div>
					<div
						className="photoshoph"
						style={{
							right: heavyNav == true ? '0px' : '-98px',
						}}
					>
						<div
							className="nvbarbtn2"
							onClick={(e) => setHeavyNav(!heavyNav)}
						></div>
						<div>
							<div>
								<Btnoverlay style={isHeavy == true ? { opacity: '1' } : null}>
									<Button
										color="light"
										onClick={(e) => {
											setIsHeavy(!isHeavy);
										}}
									>
										HVY
									</Button>
								</Btnoverlay>
							</div>
							{ts.hv.map((obj, key) => (
								<div key={key}>
									<Btnoverlay
										style={
											currentOption != null &&
											currentOption.iconInfo == obj.iconInfo
												? { opacity: '1' }
												: null
										}
									>
										<Button
											color="light"
											style={{ width: '100%' }}
											onClick={(e) => {
												setCurOption(obj);
												handlOpen(true);
											}}
										>
											{obj.iconInfo}
										</Button>
									</Btnoverlay>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
