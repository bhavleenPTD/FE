import React from 'react';
import AnnotationMenu from '../../components/AnnotationMenu/bbMenu';
import { useStore } from '../../zustandstore';
import ColorBar from '../../components/colorGrid/colorBar';
import AnnotationInfo from '../../components/AnnotationData/AnnotationInfo';
import TextMenu from '../../components/fontsMenu/TextMenu';
import ScaleBar from '../../components/scale/ScaleBar';
import Symbol from '../../components/Symbol/Symbol';
import Measurement from '../../components/mensuration/Measurement';
export default (props) => {
	const hoverLatLng = useStore((s) => s.hoverLatLng);

	return (
		<div className="p-2" style={{ backgroundColor: '#E5E5E5' }}>
			<div style={{ paddingTop: '2rem' }}>
				<div className="d-flex">
					<div className="mr-2 mt-2">
						<ColorBar />
					</div>
					<div className="mr-2">
						<AnnotationMenu />
					</div>
					<div className="mr-2">
						<TextMenu />
					</div>
					<div className="mr-2">
						<Symbol />
					</div>
					{hoverLatLng != null ? (
						<div style={{ fontSize: '11px', width: '200px' }}>
							<div
								style={{ margin: 'auto' }}
								className="d-flex justify-content-between"
							>
								<div className="d-flex">
									<div
										style={{
											backgroundColor: 'black',
											color: 'white',
											padding: '5px 5px 5px 10px',
											borderTopLeftRadius: '25%',
											borderBottomLeftRadius: '25%',
										}}
									>
										Lat
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
										{hoverLatLng.lat.toFixed(4)}
									</div>
								</div>
								<div className="d-flex">
									<div
										style={{
											backgroundColor: 'black',
											color: 'white',
											padding: '5px 5px 5px 10px',
											borderTopLeftRadius: '25%',
											borderBottomLeftRadius: '25%',
										}}
									>
										Long
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
										{hoverLatLng.long.toFixed(4)}
									</div>
								</div>{' '}
							</div>{' '}
						</div>
					) : null}
				</div>
			</div>
			<div
				className="d-flex justify-content-between"
				style={{ marginTop: '1rem' }}
			>
				<div>
					<AnnotationInfo />
				</div>
				<div>
					<Measurement mapData={props.mapData} />
				</div>
				<div>
					<ScaleBar mapData={props.mapData} />
				</div>
			</div>
		</div>
	);
};
