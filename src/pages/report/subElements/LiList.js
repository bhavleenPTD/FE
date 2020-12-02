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

export const LiList=(props)=>{

	return (
		<React.Fragment>
			{props.ele.child.map((ele,key)=>(
                <LiElement ele={ele} li={true} key={key}/>
			))}
		</React.Fragment>
	)

}