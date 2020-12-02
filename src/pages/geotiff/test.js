import React from 'react';
import * as GeoTiff from 'geotiff';
import * as plotty from 'plotty'
import useImage from 'use-image';


class GeoTiffTest extends React.Component{
constructor(props){
    super(props);
    this.imageRef=React.createRef();
    console.log('working')
}

async componentDidMount(){
//     const response = await fetch('assets/images/test.tif');
//     const arrayBuffer = await response.arrayBuffer();
//     const tiff = await GeoTiff.fromArrayBuffer(arrayBuffer);
//        const image=  await tiff.getImage();
      
//        const data = await image.readRasters();
//        console.log(data[0]);
//    plotty.addColorScale("mycolorscale", ["#000000", "#0000ff", "#ff0000"], [0, 0.5, 1]);
//        let plot= new plotty.plot({
//           canvas:this.imageRef.current,
//             data:data[0],
//             width:image.getWidth(),
//             height:image.getHeight(),
//            domain:[0,255],
        
//         })    
//         plot.render();
}
    render(){
        return (
       <div style={{width:"100%",overflow:"scroll"}}>
            <img src="assets/images/unititled-0.jpg"/>
  
       </div>


           
        )
    }
}

export default GeoTiffTest;