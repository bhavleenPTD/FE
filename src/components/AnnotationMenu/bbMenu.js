import React from 'react';
import AnnType from './bb_type';
import { faCircle, faImage } from '@fortawesome/free-regular-svg-icons';
import {
	faVectorSquare,
	faDrawPolygon,
	faArrowUp,
	faFont,
	faSquareFull,
	faChartLine,
	faPen,
	faGripLines,
	faWindowMaximize,
	faSearch,
} from '@fortawesome/free-solid-svg-icons';

class AnnotationMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ann_types: [
				{ type: 'E', label: faCircle },
				{ type: 'R', label: faVectorSquare },
				{ type: 'A', label: faArrowUp },
				{ type: 'T', label: faFont },
				{ type: 'G', label: faSquareFull },
				{ type: 'PL', label: faChartLine },
				{ type: 'FD', label: faPen },
				{ type: 'P', label: faDrawPolygon },
				{ type: 'S', label: faImage },
				{ type: 'DL', label: faGripLines },
				// { type: 'IG', label: faWindowMaximize },
				{ type: 'M', label: faSearch },

				//   {type:"P",label:faDrawPolygon}
			],
		};
	}

	render() {
		return (
			<div>
				<div className="d-flex justify-content-around">
					{this.state.ann_types &&
						this.state.ann_types.map((ann_type, key) => (
							<AnnType key={key + ann_type.type} icon={ann_type} />
						))}
				</div>
			</div>
		);
	}
}

export default AnnotationMenu;
