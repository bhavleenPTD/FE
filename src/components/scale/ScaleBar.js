import React from 'react';
import { useStore } from '../../zustandstore';

export default (props) => {
	const { distW, setDistW,distH,setDistH, zoomf, naturalwidth ,naturalheight} = useStore();
	const { width, height } = useStore((s) => ({
		width: s.width,
		height: s.height,
	}));

	React.useEffect(() => {
		if (props.mapData!=null && props.mapData.xml!=null && props.mapData.xml.resolution) {
            setDistW(((naturalwidth / width) * props.mapData.xml.resolution) / zoomf);
            setDistH(((naturalheight / height) * props.mapData.xml.resolution) / zoomf);
            
		}
	}, [naturalwidth,naturalheight, zoomf]);

	// React.useEffect(()=>{
	//     const inputImage = new Image();

	//     inputImage.onload = () => {
	//       setMAID({w:inputImage.naturalWidth,
	//       h:inputImage.naturalHeight
	//       });

	//     };

	//     inputImage.src = props.mapData.img_path;

	// },[])

	return (
		<div style={{ background: "black 0.4", fontSize: "12px" }}>
			{props.mapData!=null && props.mapData.xml!=null && props.mapData.xml.resolution != null ? 
                <div>
              <div>
                  <strong>Scale X Axis </strong>: 1 px : {parseFloat(distW).toFixed(4)} m : {parseFloat(distW * 100).toFixed(4)} cm</div>
          <div>
             <strong> Scale Y Axis </strong>: 1 px : {parseFloat(distH).toFixed(4)} m : {parseFloat(distH * 100).toFixed(4)} cm
          </div>
          </div>
			 : null}
		</div>
	);
};
