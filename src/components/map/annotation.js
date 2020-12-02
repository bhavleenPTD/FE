import React from 'react';
import { Layer, Line, Circle, Rect, Ellipse } from 'react-konva';

import { useStore } from '../../zustandstore';
import { CustRectangle } from './shapes/custRectangle';
import { CustEllipse } from './shapes/custEllipse';
import { CustPolygon } from './shapes/custPolygon';
import { CustArrow } from './shapes/custArrow';
import { CustText } from './shapes/custText';
import { CustGroup } from './shapes/custGroup';
import { CustBeizerLine } from './shapes/custBeizer';
import { CustFreeLine } from './shapes/custFreeLine';
import { CustConLine } from './shapes/custContiLine';
import { CustPolygonLine } from './shapes/custPolygonDrawline';
import { CustSymbol } from './shapes/custSymbol';
import { CustDrawLine } from './shapes/custDistanceLine';
import { CustMagnify } from './shapes/custMagnify';

export default function Annotation(props) {
	const annotations = useStore((s) => s.annotations);
	const setAnnotations = useStore((s) => s.setAnnotations);
	const layerRef = React.useRef(null);
	const { cur_ann_type, setAnnType, isDrawing } = useStore();
	const curAnnotationId = useStore((s) => s.annotationId);
	const setAnnotationId = useStore((s) => s.setAnnotationId);

	return (
		<Layer ref={layerRef}>
			{annotations != null &&
				annotations.map((ann, i) => {
					return (
						<React.Fragment key={ann.id + i}>
							{/* first we need to erase previous drawings */}
							{
								/* we can do it with  destination-out blend mode */
								//console.log(ann.id)
							}
							{ann.type == 'E' ? (
								// <Circle
								//    name="shape"

								//     x={ann.x}
								//     y={ann.y}
								//     radius={ann.radius}
								//     stroke="black"
								// />
								<CustEllipse
									mapData={props.mapData}
									shapeProps={{
										x: ann.x,
										y: ann.y,
										lat: ann.lat,
										long: ann.long,
										annX: ann.annX == null ? ann.x : ann.annX,
										annY:
											ann.annY == null
												? ann.y + ann.radiusY * 2 + 20
												: ann.annY,
										annRotation: ann.annRotation,
										fontSize: ann.fontSize,
										annWidth:
											ann.annWidth == null ? ann.radiusX * 2 : ann.annWidth,
										strokeWidth: ann.strokeWidth,
										stroketype: ann.stroketype,
										radiusX: ann.radiusX,
										radiusY: ann.radiusY,
										rotation: ann.rotation,
										stroke: ann.color,
									}}
									data={{
										...ann,
										annX: ann.annX == null ? ann.x : ann.annX,
										annY: ann.annY == null ? ann.y + ann.height + 20 : ann.annY,
										annRotation: ann.annRotation,
										annWidth: ann.annWidth == null ? ann.width : ann.annWidth,
										annHeight:
											ann.annHeight == null ? ann.fontSize : ann.annHeight,
										fontSize: ann.fontSize,
										radiusX: ann.radiusX,
										radiusY: ann.radiusY,
										stroke: ann.color,
									}}
									isSelected={ann.id === curAnnotationId}
									onSelect={() => {
										if (isDrawing == false) {
											setAnnType(null);
											setAnnotationId(ann.id);
										}
									}}
									onChange={(newAttrs) => {
										const arr = annotations.slice();
										arr[i] = {
											...arr[i],
											...newAttrs,
										};
										// console.log(arr)
										setAnnotations(arr);
									}}
								/>
							) : null}
							{ann.type == 'A' ? (
								// <Rect
								//     x={ann.x}
								//     y={ann.y}
								//   width={ann.width}
								//   height={ann.height}
								//     stroke="red"
								// /> : null

								<CustArrow
									mapData={props.mapData}
									shapeProps={{
										stroketype: ann.stroketype,
										points: ann.points.flatMap((p) => [p.x, p.y]),
										stroke: ann.color,
										strokeWidth: ann.strokeWidth,
										pointerWidth: ann.pointerWidth,
										pointerLength: ann.pointerLength,
										pointerAtBeginning: ann.pointerAtBeginning,
									}}
									data={ann}
									isSelected={ann.id === curAnnotationId}
									onSelect={() => {
										if (isDrawing == false) {
											setAnnType(null);
											setAnnotationId(ann.id);
										}
									}}
									onChange={(newAttrs) => {
										const annAr = annotations.slice();
										annAr[i] = {
											...annAr[i],
											...newAttrs,
										};
										// console.log(rects)
										setAnnotations(annAr);
									}}
								/>
							) : null}

							{ann.type == 'R' ? (
								// <Rect
								//     x={ann.x}
								//     y={ann.y}
								//   width={ann.width}
								//   height={ann.height}
								//     stroke="red"
								// /> : null

								<CustRectangle
									mapData={props.mapData}
									shapeProps={{
										x: ann.x,
										y: ann.y,
										annX: ann.annX == null ? ann.x : ann.annX,
										annY: ann.annY == null ? ann.y + ann.height + 20 : ann.annY,
										annRotation: ann.annRotation,
										fontSize: ann.fontSize,
										strokeWidth: ann.strokeWidth,
										stroketype: ann.stroketype,
										width: ann.width,
										height: ann.height,
										annWidth: ann.annWidth == null ? ann.width : ann.annWidth,
										annHeight:
											ann.annHeight == null ? ann.fontSize : ann.annHeight,
										rotation: ann.rotation,
										stroke: ann.color,
									}}
									data={{
										...ann,
										annX: ann.annX == null ? ann.x : ann.annX,
										annY: ann.annY == null ? ann.y + ann.height + 20 : ann.annY,
										annRotation: ann.annRotation,
										fontSize: ann.fontSize,
										annWidth: ann.annWidth == null ? ann.width : ann.annWidth,
										annHeight:
											ann.annHeight == null ? ann.fontSize : ann.annHeight,
										stroke: ann.color,
									}}
									isSelected={ann.id === curAnnotationId}
									onSelect={() => {
										if (isDrawing == false) {
											setAnnType(null);
											setAnnotationId(ann.id);
										}
									}}
									onChange={(newAttrs) => {
										const rects = annotations.slice();
										rects[i] = {
											...rects[i],
											...newAttrs,
										};
										// console.log(rects)
										setAnnotations(rects);
									}}
								/>
							) : null}

							{ann.type == 'M' ? (
								// <Rect
								//     x={ann.x}
								//     y={ann.y}
								//   width={ann.width}
								//   height={ann.height}
								//     stroke="red"
								// /> : null

								<CustMagnify
									mapData={props.mapData}
									shapeProps={{
										x: ann.x,
										y: ann.y,
										annX: ann.annX == null ? ann.x : ann.annX,
										annY: ann.annY == null ? ann.y + ann.height + 20 : ann.annY,
										annRotation: ann.annRotation,
										fontSize: ann.fontSize,
										strokeWidth: ann.strokeWidth,

										stroketype: ann.stroketype,
										width: ann.width,
										annWidth: ann.annWidth == null ? ann.width : ann.annWidth,
										annHeight:
											ann.annHeight == null ? ann.fontSize : ann.annHeight,
										height: ann.height,
										rotation: ann.rotation,
										stroke: ann.color,
									}}
									data={{
										...ann,
										annX: ann.annX == null ? ann.x : ann.annX,
										annY: ann.annY == null ? ann.y + ann.height + 20 : ann.annY,
										annRotation: ann.annRotation,
										fontSize: ann.fontSize,
										annWidth: ann.annWidth == null ? ann.width : ann.annWidth,
										annHeight:
											ann.annHeight == null ? ann.fontSize : ann.annHeight,
										stroke: ann.color,
									}}
									isSelected={ann.id === curAnnotationId}
									onSelect={() => {
										if (isDrawing == false) {
											setAnnType(null);
											setAnnotationId(ann.id);
											console.log('hi');
										}
									}}
									onChange={(newAttrs) => {
										const rects = annotations.slice();
										rects[i] = {
											...rects[i],
											...newAttrs,
										};
										// console.log(rects)
										setAnnotations(rects);
									}}
								/>
							) : null}

							{ann.type == 'T' ? (
								// <Rect
								//     x={ann.x}
								//     y={ann.y}
								//   width={ann.width}
								//   height={ann.height}
								//     stroke="red"
								// /> : null

								<CustText
									mapData={props.mapData}
									shapeProps={{
										x: ann.x,
										y: ann.y,
										text: ann.ann_text,
										width: ann.width,
										height: ann.height,
										fontSize: ann.fontSize,
										textDecoration: ann.textDecoration,
										fontStyle: ann.fontStyle,
										rotation: ann.rotation,
										stroke: ann.color,
										strokeWidth: ann.strokeWidth,
										align: ann.align,
									}}
									data={ann}
									isSelected={ann.id === curAnnotationId}
									onSelect={() => {
										if (isDrawing == false) {
											setAnnType(null);
											setAnnotationId(ann.id);
										}
									}}
									onChange={(newAttrs) => {
										const rects = annotations.slice();
										rects[i] = {
											...rects[i],
											...newAttrs,
										};
										// console.log(rects)
										setAnnotations(rects);
									}}
								/>
							) : null}

							{ann.type == 'S' ? (
								<CustSymbol
									mapData={props.mapData}
									shapeProps={{
										x: ann.x,
										y: ann.y,
										annX: ann.annX == null ? ann.x : ann.annX,
										annY: ann.annY == null ? ann.y + ann.height + 20 : ann.annY,
										annRotation: ann.annRotation,
										fontSize: ann.fontSize,
										strokeWidth: ann.strokeWidth,
										stroketype: ann.stroketype,
										width: ann.width,
										annWidth: ann.annWidth == null ? ann.width : ann.annWidth,
										height: ann.height,
										rotation: ann.rotation,
										stroke: ann.color,
									}}
									data={{
										...ann,
										annX: ann.annX == null ? ann.x : ann.annX,
										annY: ann.annY == null ? ann.y + ann.height + 20 : ann.annY,
										annRotation: ann.annRotation,
										fontSize: ann.fontSize,
										annHeight:
											ann.annHeight == null ? ann.fontSize : ann.annHeight,
										annWidth: ann.annWidth == null ? ann.width : ann.annWidth,
										stroke: ann.color,
									}}
									isSelected={ann.id === curAnnotationId}
									onSelect={() => {
										if (isDrawing == false) {
											setAnnType(null);
											setAnnotationId(ann.id);
										}
									}}
									onChange={(newAttrs) => {
										const rects = annotations.slice();
										rects[i] = {
											...rects[i],
											...newAttrs,
										};
										// console.log(rects)
										setAnnotations(rects);
									}}
								/>
							) : null}

							{ann.type == 'DL' ? (
								<CustDrawLine
									mapData={props.mapData}
									shapeProps={{
										points: ann.points,
										stroke: ann.color,
										strokeWidth: ann.strokeWidth,
									}}
									data={ann}
									isSelected={ann.id === curAnnotationId}
									onSelect={() => {
										if (isDrawing == false) {
											setAnnType(null);

											setAnnotationId(ann.id);
										}
									}}
								/>
							) : null}

							{ann.type == 'G' ? (
								// <Rect
								//     x={ann.x}
								//     y={ann.y}
								//   width={ann.width}
								//   height={ann.height}
								//     stroke="red"
								// /> : null

								<CustGroup
									mapData={props.mapData}
									shapeProps={{
										x: ann.x,
										y: ann.y,
										width: ann.width,
										strokeWidth: ann.strokeWidth,
										// lat:ann.lat,
										// long:ann.long,
										height: ann.height,
										rotation: ann.rotation,
										stroke: ann.color,
									}}
									data={ann}
									isSelected={ann.id === curAnnotationId}
									onSelect={() => {
										if (isDrawing == false) {
											setAnnType(null);
											setAnnotationId(ann.id);
										}
									}}
									onChange={(newAttrs) => {
										const rects = annotations.slice();
										rects[i] = {
											...rects[i],
											...newAttrs,
										};
										// console.log(rects)
										setAnnotations(rects);
									}}
								/>
							) : null}

							{ann.type == 'FD' ? (
								<CustFreeLine
									mapData={props.mapData}
									shapeProps={{
										x: ann.x,
										y: ann.y,
										points: ann.points.flatMap((p) => [p.x, p.y]),
										lat: ann.lat,
										long: ann.long,
										strokeWidth: ann.strokeWidth,
										stroke: ann.color,
									}}
									data={ann}
									isSelected={ann.id === curAnnotationId}
									onSelect={() => {
										if (isDrawing == false) {
											setAnnType(null);
											setAnnotationId(ann.id);
										}
									}}
									onChange={(newAttrs) => {
										const rects = annotations.slice();
										rects[i] = {
											...rects[i],
											...newAttrs,
										};
										// console.log(rects)
										setAnnotations(rects);
									}}
								/>
							) : null}
							{ann.type == 'CL' ? (
								<CustConLine
									mapData={props.mapData}
									shapeProps={{
										points: ann.points,
										stroke: ann.color,
										strokeWidth: ann.strokeWidth,
									}}
								/>
							) : null}
							{ann.type == 'PCL' ? (
								<CustPolygonLine
									mapData={props.mapData}
									shapeProps={{
										points: ann.points,
										stroke: ann.color,
										strokeWidth: ann.strokeWidth,
									}}
								/>
							) : null}

							{ann.type == 'PL' ? (
								<CustBeizerLine
									mapData={props.mapData}
									shapeProps={{
										points: ann.points,
										lat: ann.lat,
										long: ann.long,
										strokeWidth: ann.strokeWidth,
										stroke: ann.color,
										lineCap: 'round',
									}}
									data={ann}
									isSelected={ann.id === curAnnotationId}
									onSelect={() => {
										if (isDrawing == false) {
											setAnnType(null);

											setAnnotationId(ann.id);
										}
									}}
									onChange={(newAttrs) => {
										console.log(newAttrs);
										const rects = annotations.slice();
										rects[i] = {
											...rects[i],
											...newAttrs,
										};
										// console.log(rects)
										setAnnotations(rects);
									}}
								/>
							) : null}

							{ann.type == 'P' ? (
								<CustPolygon
									mapData={props.mapData}
									shapeProps={{
										x: ann.x,
										y: ann.y,
										points: ann.points,
										rotation: ann.rotation,
										stroke: ann.color,
										fontSize: ann.fontSize,
										fontStyle: ann.fontStyle,
										annWidth: ann.annWidth,
										strokeWidth:
											ann.strokeWidth != null ? ann.strokeWidth : '10',
									}}
									data={ann}
									isSelected={ann.id === curAnnotationId}
									onSelect={() => {
										setAnnotationId(ann.id);
									}}
									onChange={(newAttrs) => {
										const bb = annotations.slice();
										bb[i] = {
											...bb[i],
											...newAttrs,
										};
										// console.log(rects)
										setAnnotations(bb);
									}}
								/>
							) : null}
						</React.Fragment>
					);
				})}
		</Layer>
	);
}
