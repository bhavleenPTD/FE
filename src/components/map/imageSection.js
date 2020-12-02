import React, { useRef, useState, useEffect } from "react";
import { Image as RImage, Layer } from "react-konva";
import useImage from "use-image";
import IMAGE from "../../pages/geotiff/unititled-0.jpg";
import { useStore, setstore, intialState } from "../../zustandstore";
import Konva from "konva";
import {
	useFilterStore,
	setFilterState,
	initialFiterState,
} from "../../zustandfilter";

const IMAGE_URL = IMAGE;

const getImageFromDataURL = () => {};

export default (props) => {
	console.log(props);
	//console.log("img",localStorage.getItem('image'));

	const [image] =
		props.imagetype == "reference"
			? useImage(localStorage.getItem("refimage"), "Anonymous")
			: props.imagetype == "current"
			? useImage(localStorage.getItem("curimage"), "Anonymous")
			: useImage(props.imgUrlpath, "Anonymous");

	const setImage = useStore((state) => state.setImage);

	const setImageSize = useStore((state) => state.setImageSize);
	const setScale = useStore((state) => state.setScale);
	const setSize = useStore((state) => state.setSize);
	const setNaturalwidth = useStore((state) => state.setNaturalwidth);
	const setNaturalheight = useStore((state) => state.setNaturalheight);
	const width = useStore((state) => state.width);
	const height = useStore((state) => state.height);
	const setInitialImageScale = useStore((state) => state.setInitialImageScale);
	const blurRadius = useFilterStore((s) => s.blurRadius);
	const brightness = useFilterStore((s) => s.brightness);
	const contrast = useFilterStore((s) => s.contrast);
	const grayScale = useFilterStore((s) => s.grayScale);
	const { estrength, ewlevel, isHeavy, canvasRotation } = useFilterStore();
	const { hue, lum, sat, valb } = useFilterStore();
	const { r, g, b } = useFilterStore();
	const invert = useFilterStore((s) => s.invert);
	const pixel = useFilterStore((s) => s.pixel);
	const imageRef = useRef();
	const setZoomf = useStore((s) => s.setZoomf);
	React.useEffect(() => {
		if (!image) {
			return;
		}
		setImage(image);
		const scale = Math.min(width / image.width, height / image.height);
		//console.log(scale)
		setInitialImageScale(scale);
		setScale(scale);
		setZoomf(scale);
		setImageSize({ width: image.width, height: image.height });
		const ratio = image.width / image.height;
		setSize({
			width: width,
			height: width / ratio,
		});
		const inputImage = new Image();

		// we want to wait for our image to load
		inputImage.onload = () => {
			setNaturalwidth(inputImage.naturalWidth);
			setNaturalheight(inputImage.naturalHeight);
		};

		// start loading our image
		inputImage.src = image.src;
	}, [image, width, height, setScale, setImageSize, setSize]);

	const layerRef = React.useRef(null);
	//  React.useEffect(()=>{
	//       if(!image) {return;
	//       }

	//   const inputImage = new Image();

	//   // we want to wait for our image to load
	//   inputImage.onload = () => {
	//     setNaturalwidth(inputImage.naturalWidth);
	//     setNaturalheight(inputImage.naturalHeight);

	//   };

	//   // start loading our image
	//   inputImage.src = image.src;

	//  },[image])

	useEffect(() => {
		if (image) {
			// you many need to reapply cache on some props changes like shadow, stroke, etc.
			imageRef.current.cache({ pixelRatio: 1 });
			// since this update is not handled by "react-konva" and we are using Konva methods directly
			// we have to redraw layer manually
			imageRef.current.getLayer().batchDraw();
			const canvas = layerRef.current.getCanvas()._canvas;

			canvas.style.filter = `brightness(${
				brightness * 100
			}%) blur(${blurRadius}px) contrast(${contrast}%) grayScale(${grayScale}%) invert(${invert}%) hue-rotate(${hue}deg) saturate(${sat}%)
      `;
		}
	}, [image, brightness, blurRadius, contrast, grayScale, invert, hue, sat]);

	return (
		<Layer ref={layerRef}>
			{image != null && isHeavy == true ? (
				<RImage
					name="image"
					ref={imageRef}
					image={image}
					rotation={canvasRotation}
					x={image.x + image.width / 2}
					y={image.y + image.height / 2}
					offset={{
						x: image.width / 2,
						y: image.height / 2,
					}}
					filters={[
						Konva.Filters.Emboss,
						Konva.Filters.HSV,
						Konva.Filters.HSL,
						Konva.Filters.RGB,
						Konva.Filters.Pixelate,
					]}
					embossStrength={estrength}
					embossWhiteLevel={ewlevel}
					embossBlend={true}
					luminance={parseInt(lum)}
					red={r}
					green={g}
					blue={b}
					pixelSize={parseInt(pixel)}
				/>
			) : (
				<React.Fragment>
					{image != null ? (
						<RImage
							name="image"
							ref={imageRef}
							image={image}
							rotation={canvasRotation}
							x={image.x + image.width / 2}
							y={image.y + image.height / 2}
							offset={{
								x: image.width / 2,
								y: image.height / 2,
							}}
						/>
					) : null}
				</React.Fragment>
			)}
		</Layer>
	);
};
