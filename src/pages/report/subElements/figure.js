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

import {TextData} from "./text";
import Bold from './bold';
import { Trow } from './trow';

export const FigureTable=(props)=>{
 

    return (

         <React.Fragment>
             <View style={{marginTop:"4"}}>

                 {props.ele.child[0].child[0].child.map((tr,key)=>(

                      <Trow ele={tr} key={key} />
                 ))}

             </View>
         
         </React.Fragment>

    )
}