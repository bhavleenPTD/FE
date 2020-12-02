import React from 'react';

export default (props) => {
	const { tile } = props;

	const d = new Date(
		tile.xml != null && tile.xml.d_o_p != null ? tile.xml.d_o_p : null,
	);

	return (
		<React.Fragment>
			<div>
				{tile.xml != null ? (
					<div>
						<div className="d-flex justify-content-between">
							<div className="font-weight-bold">Target Name :</div>
							<div>{tile.xml.target_name}</div>
						</div>
						<div className="d-flex justify-content-between">
							<div className="font-weight-bold">Satellite Id :</div>
							<div>
								{tile.xml != null && tile.xml.satellite_id != null
									? tile.xml.satellite_id
									: 'N/A'}
							</div>
						</div>
						<div className="d-flex justify-content-between">
							<div className="font-weight-bold">Date :</div>
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
							<div className="font-weight-bold">Bands :</div>
							<div>
								{tile.xml != null && tile.xml.bands != null
									? tile.xml.bands
									: 'N/A'}
							</div>
						</div>
						<div className="d-flex justify-content-between">
							<div className="font-weight-bold">Datum :</div>
							<div>
								{tile.xml != null && tile.xml.datum != null
									? tile.xml.datum
									: 'N/A'}
							</div>
						</div>
						<div className="d-flex justify-content-between">
							<div className="font-weight-bold">Projection :</div>
							<div>
								{tile.xml != null && tile.xml.projection != null
									? tile.xml.projection
									: 'N/A'}
							</div>
						</div>
						<div className="d-flex justify-content-between">
							<div className="font-weight-bold">Resolution :</div>
							<div>
								{tile.xml != null && tile.xml.resolution != null
									? tile.xml.resolution
									: 'N/A'}
							</div>
						</div>
						<div className="d-flex justify-content-between">
							<div className="font-weight-bold">Correction Type :</div>
							<div>
								{tile.xml != null && tile.xml.correction_type != null
									? tile.xml.correction_type
									: 'N/A'}
							</div>
						</div>
						<div className="d-flex justify-content-between">
							<div className="font-weight-bold">Corners Lat : Long</div>
							<div>
								{tile.xml != null && tile.xml.corners != null ? (
									<div>
										{tile.xml.corners.lat1} :{tile.xml.corners.long1} ,
										{tile.xml.corners.lat2} :{tile.xml.corners.long2} ,
										{tile.xml.corners.lat3} :{tile.xml.corners.long3} ,
										{tile.xml.corners.lat4} :{tile.xml.corners.long4}
									</div>
								) : null}
							</div>
						</div>
					</div>
				) : (
					<div>NO XML DATA AVAILABLE</div>
				)}
			</div>
		</React.Fragment>
	);
};
