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
import Bold from './bold';

export const Italic = (props) => {
	return (
		<React.Fragment>
			{props.ele.child.map((ele, key) => {
				return ele.node == 'text' ? (
					<TextData key={key} ele={ele} italic={true} bold={props.bold} />
				) : ele.tag == 'strong' ? (
					<Bold ele={ele} key={key} italic={true} />
				) : null;
			})}
		</React.Fragment>
	);
};
