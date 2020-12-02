import React from "react";
import { Image, Layer } from "react-konva";
import useImage from "use-image";
import {useMosaicStore} from "../../zustandMosaic";


export default (props) => {

  const [image] = useImage(props.imagepath, "Anonymous");
     const setImage=useMosaicStore(state=>state.setImage);
     
  const setImageSize = useMosaicStore(state => state.setImageSize);
  const setScale = useMosaicStore(state => state.setScale);
  const setSize = useMosaicStore(state => state.setSize);
  const width = useMosaicStore(state => state.width);
  const height = useMosaicStore(state => state.height);
   const setInitialImageScale=useMosaicStore(state=>state.setInitialImageScale)
     
  const { brightness } = useMosaicStore();
 
  React.useEffect(() => {
    if (!image) {
      return;
    }
    setImage(image);
    const scale = Math.min(width / image.width, height / image.height);
    //console.log(scale)
     setInitialImageScale(scale)
  
    setScale(scale);
    setImageSize({ width: image.width, height: image.height });

    const ratio = image.width / image.height;
    setSize({
      width: width,
      height:width / ratio
    });
  }, [image, width, height, setScale, setImageSize, setSize]);

  const layerRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = layerRef.current.getCanvas()._canvas;
   
    canvas.style.filter = `brightness(${(brightness + 1) * 100}%)`;
  }, [brightness]);

  return (
    <Layer ref={layerRef}>
      <Image name="image" image={image} />
    </Layer>
  );
};
