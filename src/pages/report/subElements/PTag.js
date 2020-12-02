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
import { OlList } from './OlList';
import { LiList } from './LiList';

export default (props) => {
	return (
		<React.Fragment>
			<View>
				{props.ele.child.map((ele, key) => {
					return ele.node == 'text' ? (
						<TextData key={key} ele={ele} />
					) : ele.tag == 'i' ? (
						<Italic key={key} ele={ele} />
					) : ele.tag == 'text' ? (
						<Bold key={key} ele={ele} />
					) : ele.tag == 'ol' ? (
						<OlList key={key} ele={ele} />
					) : ele.tag == 'ul' ? (
						<LiList key={key} ele={ele} />
					) : null;
				})}
			</View>
		</React.Fragment>
	);
};
