import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import { setstore, intialState } from '../../zustandMosaic';

import MapCanvas from './map.canvas';

class MapSection extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mapData: null,
			reports: [],
		};
	}

	componentDidMount() {
		if (this.props.location.state != null) {
			this.setState({
				mapData: this.props.location.state,
				reports: this.props.location.state.report,
			});
		}
	}

	componentWillUnmount() {
		setstore.setState(intialState);
	}

	render() {
		console.log('mapdata', this.state.mapData);
		return (
			<React.Fragment>
				<div style={{ marginTop: '5rem' }}>
					<div
						style={{
							borderBottom: '5px double black',
							background: 'wheat',
							padding: '1.5rem',
						}}
					>
						<h1 style={{ textAlign: 'center', textTransform: 'uppercase' }}>
							{this.state.reports.location_name}
						</h1>
						<div></div>
					</div>
					{this.state.mapData != null ? (
						<div className="right-panel">
							<MapCanvas mapData={this.state.mapData} />
						</div>
					) : null}
				</div>

				{/* <Footer/> */}
			</React.Fragment>
		);
	}
}

export default withRouter(MapSection);
