import React, { useState } from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';

export default (props) => {
	const [value, setValue] = useState(props.data.value);

	return (
		<div>
			<Form>
				<Form.Group size="sm">
					<Row style={{ width: '100%' }}>
						<Col xs="4" style={{ textAlign: 'right' }}>
							{props.data.fname}
						</Col>
						<Col xs="4">
							<RangeSlider
								value={value}
								size="sm"
								min={props.data.min}
								step={props.data.step}
								max={props.data.max}
								onChange={(e) => {
									setValue(parseFloat(e.target.value));
									props.data.onChange(parseFloat(e.target.value));
								}}
							/>
						</Col>
						<Col xs="4">
							<Form.Control
								size="sm"
								max={props.data.max}
								min={props.data.min}
								value={value}
								onChange={(e) => {
									setValue(e.target.value);
									if (!isNaN(e.target.value)) {
										props.data.onChange(parseFloat(e.target.value));
									}
								}}
							/>
						</Col>
					</Row>
				</Form.Group>
			</Form>
		</div>
	);
};
