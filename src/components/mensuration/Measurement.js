import React, { useState } from 'react';
import { useStore } from '../../zustandstore';
import { polygon } from 'polygon-tools';
import beizer from 'bezier-curve';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default (props) => {
	const {
		annotations,
		annotationId,
		naturalwidth,
		width,
		height,
		naturalheight,
		scale,
		zoomf,
	} = useStore();
	const [mens, setMens] = useState({
		pointDis: [],
		length: 0,
		breadth: 0,
		area: 0,
		radiusX: 0,
		radiusY: 0,
		totaldist: 0,
	});
	const [res, setRes] = useState({
		resX:
			props.mapData != null &&
			props.mapData.xml != null &&
			props.mapData.xml.resolution != null
				? props.mapData.xml.resolution
				: 0,
		resY:
			props.mapData != null &&
			props.mapData.xml != null &&
			props.mapData.xml.resolution != null
				? props.mapData.xml.resolution
				: 0,
	});
	const getDist = (x, y, x1, y1, resX, resY) => {
		return Math.sqrt(
			Math.pow(x - x1, 2) * Math.pow(resX, 2) +
				Math.pow(y - y1, 2) * Math.pow(resY, 2),
		);
	};

	const getCalculationAccToType = () => {
		setMens(null);
		if (annotationId != null) {
			console.log(annotationId);

			let arr = annotations.filter((an) => an.id == annotationId);
			if (arr.length > 0) {
				let ann = arr[0];

				if (ann.type == 'R') {
					let l = getDist(
						ann.x,
						ann.y,
						ann.x,
						ann.y + ann.height,
						res.resX,
						res.resY,
					);
					let b = getDist(
						ann.x,
						ann.y,
						ann.x + ann.width,
						ann.y,
						res.resX,
						res.resY,
					);

					setMens({
						length: l,
						breadth: b,
						area: l * b,
						totaldist: 2 * (l + b),
					});
				} else if (ann.type == 'S') {
					let l = getDist(
						ann.x,
						ann.y,
						ann.x,
						ann.y + ann.height,
						res.resX,
						res.resY,
					);
					let b = getDist(
						ann.x,
						ann.y,
						ann.x + ann.width,
						ann.y,
						res.resX,
						res.resY,
					);

					setMens({
						length: l,
						breadth: b,
						area: l * b,
						totaldist: 2 * (l + b),
					});
				} else if (ann.type == 'E') {
					let rY = getDist(
						ann.x,
						ann.y,
						ann.x,
						ann.y + ann.radiusY,
						res.resX,
						res.resY,
					);
					let rX = getDist(
						ann.x,
						ann.y,
						ann.x + ann.radiusX,
						ann.y,
						res.resX,
						res.resY,
					);

					setMens({
						radiusX: rX,
						radiusY: rY,
						area: Math.PI * rX * rY,
						totaldist:
							2 * Math.PI * Math.sqrt((Math.pow(rX, 2) + Math.pow(rY, 2)) / 2),
					});
				} else if (ann.type == 'FD' || ann.type == 'DL') {
					if (ann.points.length > 1) {
						let totaldistance = 0;
						let disArr = [];
						for (let i = 1; i < ann.points.length; i++) {
							let distance = getDist(
								ann.points[i].x,
								ann.points[i].y,
								ann.points[i - 1].x,
								ann.points[i - 1].y,
								res.resX,
								res.resY,
							);
							disArr.push(distance);
							totaldistance += distance;
						}
						if (
							ann.points[0].x == ann.points[ann.points.length - 1].x &&
							ann.points[ann.points.length - 1].y
						) {
							setMens({
								pointDis: disArr,
								totaldist: totaldistance,
								area: polygon.area(
									ann.points.map((p) => [p.x * res.resX, p.y * res.resY]),
								),
							});
						} else {
							setMens({
								pointDis: disArr,
								totaldist: totaldistance,
							});
						}
					}
				} else if (ann.type == 'P') {
					if (ann.points.length > 1) {
						let totaldistance = 0;
						let disArr = [];
						for (let i = 1; i < ann.points.length; i++) {
							let distance = getDist(
								ann.points[i].x,
								ann.points[i].y,
								ann.points[i - 1].x,
								ann.points[i - 1].y,
								res.resX,
								res.resY,
							);
							disArr.push(distance);
							totaldistance += distance;
						}

						setMens({
							pointDis: disArr,
							totaldist: totaldistance,
							area: polygon.area(
								ann.points.map((p) => [p.x * res.resX, p.y * res.resY]),
							),
						});
					}
				} else if (ann.type == 'A') {
					let d = getDist(
						ann.points[1].x,
						ann.points[1].y,
						ann.points[0].x,
						ann.points[0].y,
						res.resX,
						res.resY,
					);
					setMens({
						totaldist: d,
					});
				} else if (ann.type == 'PL') {
					let pointsArr = [];
					let totaldistance = 0;
					let disArr = [];
					let d2points = ann.points.map((p) => [
						p.x * res.resX,
						p.y * res.resY,
					]);
					for (let t = 0; t < 1; t += 0.1) {
						pointsArr.push(beizer(t, d2points));
					}
					for (let i = 1; i < pointsArr.length; i++) {
						let distance = getDist(
							pointsArr[i][0],
							pointsArr[i][1],
							pointsArr[i - 1][0],
							pointsArr[i - 1][1],
							res.resX,
							res.resY,
						);
						disArr.push(distance);
						totaldistance += distance;
					}

					setMens({
						pointDis: disArr,
						totaldist: totaldistance,
					});
				} else {
					setMens({});
				}
			}
		} else {
			setMens({});
		}
	};

	const [modal, setModal] = useState(false);

	const toggle = () => setModal(!modal);

	React.useEffect(() => {
		if (
			props.mapData != null &&
			props.mapData.xml != null &&
			props.mapData.xml.resolution != null
		) {
			setRes({
				resX: props.mapData.xml.resolution,
				resY: props.mapData.xml.resolution,
			});
			getCalculationAccToType();
		}
	}, [annotations, annotationId]);
	return (
		<div>
			{annotationId != null && mens != null ? (
				<div
					className="d-flex"
					style={{ fontSize: '11px', marginTop: '0.5rem' }}
				>
					{mens.length != null ? (
						<div className="d-flex ml-1">
							<div
								style={{
									backgroundColor: 'black',
									color: 'white',
									padding: '5px 5px 5px 10px',
									borderTopLeftRadius: '25%',
									borderBottomLeftRadius: '25%',
								}}
							>
								Length
							</div>
							<div
								style={{
									backgroundColor: 'white',
									minWidth: '20px',
									padding: '5px 10px 5px 5px',
									borderTopRightRadius: '20%',
									borderBottomRightRadius: '20%',
								}}
							>
								{mens.length.toFixed(4)}m
							</div>
						</div>
					) : null}
					{mens.breadth != null ? (
						<div className="d-flex ml-1">
							<div
								style={{
									backgroundColor: 'black',
									color: 'white',
									padding: '5px 5px 5px 10px',
									borderTopLeftRadius: '25%',
									borderBottomLeftRadius: '25%',
								}}
							>
								Breadth
							</div>
							<div
								style={{
									backgroundColor: 'white',
									minWidth: '20px',
									padding: '5px 10px 5px 5px',
									borderTopRightRadius: '20%',
									borderBottomRightRadius: '20%',
								}}
							>
								{mens.breadth.toFixed(4)}m
							</div>
						</div>
					) : null}
					{mens.radiusX != null ? (
						<div className="d-flex ml-1">
							<div
								style={{
									backgroundColor: 'black',
									color: 'white',
									padding: '5px 5px 5px 10px',
									borderTopLeftRadius: '25%',
									borderBottomLeftRadius: '25%',
								}}
							>
								RadiusX
							</div>
							<div
								style={{
									backgroundColor: 'white',
									minWidth: '20px',
									padding: '5px 10px 5px 5px',
									borderTopRightRadius: '20%',
									borderBottomRightRadius: '20%',
								}}
							>
								{mens.radiusX.toFixed(4)}m
							</div>
						</div>
					) : null}
					{mens.radiusY != null ? (
						<div className="d-flex ml-1">
							<div
								style={{
									backgroundColor: 'black',
									color: 'white',
									padding: '5px 5px 5px 10px',
									borderTopLeftRadius: '25%',
									borderBottomLeftRadius: '25%',
								}}
							>
								RadiusY
							</div>
							<div
								style={{
									backgroundColor: 'white',
									minWidth: '20px',
									padding: '5px 10px 5px 5px',
									borderTopRightRadius: '20%',
									borderBottomRightRadius: '20%',
								}}
							>
								{mens.radiusY.toFixed(4)}m
							</div>
						</div>
					) : null}
					{mens.totaldist != null ? (
						<div className="d-flex ml-1">
							<div
								style={{
									backgroundColor: 'black',
									color: 'white',
									padding: '5px 5px 5px 10px',
									borderTopLeftRadius: '25%',
									borderBottomLeftRadius: '25%',
								}}
							>
								Total Dist
							</div>
							<div
								style={{
									backgroundColor: 'white',
									minWidth: '20px',
									padding: '5px 10px 5px 5px',
									borderTopRightRadius: '20%',
									borderBottomRightRadius: '20%',
								}}
							>
								{mens.totaldist.toFixed(4)}m
							</div>
						</div>
					) : null}
					{mens.area != null ? (
						<div className="d-flex ml-1">
							<div
								style={{
									backgroundColor: 'black',
									color: 'white',
									padding: '5px 5px 5px 10px',
									borderTopLeftRadius: '25%',
									borderBottomLeftRadius: '25%',
								}}
							>
								Area
							</div>
							<div
								style={{
									backgroundColor: 'white',
									minWidth: '20px',
									padding: '5px 10px 5px 5px',
									borderTopRightRadius: '20%',
									borderBottomRightRadius: '20%',
								}}
							>
								{mens.area.toFixed(4)}m
							</div>
						</div>
					) : null}

					{mens.pointDis != null && mens.pointDis.length > 0 ? (
						<div className="d-flex ml-1">
							<div
								style={{
									backgroundColor: 'black',
									color: 'white',
									padding: '5px 5px 5px 10px',
									borderTopLeftRadius: '25%',
									borderBottomLeftRadius: '25%',
								}}
							>
								Points Distance
							</div>
							<div
								onClick={toggle}
								style={{
									backgroundColor: 'white',
									minWidth: '20px',
									padding: '5px 10px 5px 5px',
									borderTopRightRadius: '20%',
									borderBottomRightRadius: '20%',
									cursor: 'pointer',
								}}
							>
								:::
							</div>
						</div>
					) : null}
					{mens.pointDis != null ? (
						<Modal isOpen={modal} toggle={toggle}>
							<ModalHeader toggle={toggle}>Points </ModalHeader>
							<ModalBody>
								{mens.pointDis != null &&
									mens.pointDis.map((val, key) => (
										<div>
											{key + 1}&nbsp;-&nbsp;{key + 2} : {val}
										</div>
									))}
							</ModalBody>
							<ModalFooter></ModalFooter>
						</Modal>
					) : null}
				</div>
			) : null}
		</div>
	);
};
