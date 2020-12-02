import {
	Page,
	Text,
	View,
	Image,
	Font,
	Document,
	StyleSheet,
} from '@react-pdf/renderer';
import React from 'react';
import { Tcol } from './tcol';

export const Trow = (props) => {
	console.log('TR', props.ele);

	return (
		<View style={{ flexDirection: 'row' }}>
			{props.ele.child.map(
				(tcol, key) =>
					tcol.attr ? (
						<Tcol ele={tcol} key={key} className="col" />
					) : (
						<Tcol ele={tcol} key={key} />
					),

				// <Tcol ele={tcol} key={key} style={{ color: 'green' }} />
			)}
		</View>
	);
};
