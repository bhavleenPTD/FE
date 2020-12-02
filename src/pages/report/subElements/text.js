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

export const TextData = (props) => {
	//     Font.register({ family: 'Arial', fonts: [
	//         { src: "assets/fonts/Arial.ttf" }, // font-style: normal, font-weight: normal
	//         { src: "assets/fonts/ArialItalic.ttf", fontStyle: 'italic' },
	//         {src:"assets/fonts/Arial-Bold-Italic.ttf",fontStyle:"italic",fontWeight:"bold"}
	//        ]});
	// const [fontSt,setFonst]=React.useState(null)

	//     React.useEffect(()=>{
	//         let str=" Arial";
	//         if(props.bold==true){
	//            str= str.concat(" Bold ")
	//         }

	//         if(props.italic==true){
	// str =str.concat(" Italic ");
	//         }
	//         console.log(str);
	//         setFonst({
	//             fontFamily:str.trim()
	//         })
	//     },[])

	// const styles = StyleSheet.create({
	// 	text:{fontFamily:"Arial" ,fontSize:"11", fontStyle:"italic",fontWeight:"bold",textAlign:"center"}
	// })

	return (
		<React.Fragment>
			{/* {fontSt!=null? */}
			<Text style={{ fontSize: 11, fontWeight: 'light' }}>
				{props.ele.text == '&nbsp;'
					? ' '
					: props.ele.text.replace(/&nbsp;/g, ' ').trim()}
			</Text>
			{/* :null
} */}
		</React.Fragment>
	);
};
