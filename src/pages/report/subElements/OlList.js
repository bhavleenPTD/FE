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
import LiElement from './LiElement';

export const OlList = (props) => {
	return (
		<React.Fragment>
			{props.ele.child.map((ele, key) => (
				<LiElement ele={ele} ol={true} key={key} number={key + 1} />
			))}
		</React.Fragment>
	);
};
