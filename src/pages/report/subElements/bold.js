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

export default (props) => {
	return (
		<React.Fragment>
			{props.ele.child.map((ele, key) => {
				return ele.node == 'text' ? (
					<TextData key={key} ele={ele} bold={true} italic={props.italic} />
				) : ele.tag == 'i' ? (
					<Italic key={key} bold={true} ele={ele} />
				) : null;
			})}
		</React.Fragment>
	);
};
