import React from 'react';
import {
	Page,
	Text,
	View,
	Image,
	Font,
	Document,
	StyleSheet,
} from '@react-pdf/renderer';

import { TextData } from './text';
import { Italic } from './italic';
import Bold from './bold';

export default (props) => {
	return (
		<React.Fragment>
			<View style={{ flexDirection: 'row' }}>
				<Text style={{ fontSize: 11 }}>
					{props.ol == true ? props.number + '.' : '\u2022'} &nbsp;
				</Text>
				{props.ele.child.map((ele, key) => {
					return ele.node == 'text' ? (
						<TextData key={key} ele={ele} />
					) : ele.tag == 'i' ? (
						<Italic key={key} ele={ele} />
					) : ele.tag == 'strong' ? (
						<Bold key={key} ele={ele} />
					) : null;
				})}
			</View>
		</React.Fragment>
	);
};
