import create from "zustand";

const intialState={
  hideOptions:false,
    initialImageScale: 1,
    rotation: -90,
    autohover: false,
    cur_ann_type:null,
    image:null,
    splitCanvas:false,
    canvasWidth:null,
    canvasHeight:null,
    naturalwidth:0,
 naturalheight:0,
 imageWidth: 100,
 imageHeight: 100,
 hoverState: false,
 history:[[]],
 scale: 1,
 isDrawing: false,
 regions: [],
 selectedRigionId: null,
 annotations: [],
 annotationId: null,
 color:"#000000",
 fontSize:20,
  strokeWidth:10,
  symbol:null,
 main_alloted_Image_dimension:{
   w:0,
   h:0
 },
 zoomf:1,
 hoverLatLng:null,
hoverLatLngTrue:false,
}

const [useStore,setstore] = create(set => ({
  hideOptions:false,
  width: window.innerWidth,
  height: window.innerHeight,
  initialImageScale: 1,
  rotation: -90,
  autohover: false,
  cur_ann_type:null,
  image:null,
  symbol:null,
 main_alloted_Image_dimension:{
   w:0,
   h:0
 },
 zoomf:1,
 setZoomf:zoomf=>set(()=>({zoomf})),
  splitCanvas:false,
  setSplitCanvas:(val)=>set(()=>({splitCanvas:val})),
  canvasWidth:null,
  canvasHeight:null,
  color:"#000000",
  fontSize:20,
  setFontSize:(val)=>set(()=>({fontSize:val})),
  setColorAnn:(val)=>set(()=>({color:val})),
strokeWidth:10,
setStrokeWidth:(val)=>set(()=>({strokeWidth:val})),
distW:0,
setSymbol:(val)=>set(()=>({symbol:val})),
setDistW:distW=>set({distW}),
distH:0,
setDistH:distH=>set({distH}),

latlngMatrix:null,
setLatLngMatrix:latlngMatrix=>set({latlngMatrix}),
hoverLatLng:null,
setLatLng:hoverLatLng=>set({hoverLatLng}),
hoverLatLngTrue:false,
sethoverLatLngTrue:hoverLatLngTrue=>set({hoverLatLngTrue}),

//   blurRadius:0,
//   contrast:0,
//   invert:false,
//   grayScale:false,
//   pixel:1,

//   emboss:{
//     strength:0,
//     wlevel:0,
//     type:"top"
//   },
//   HSLV:{
//     hue:150,
//     sat:0,
//     lum:0,
//     val:0
//   },

//     r:150,
//     g:150,
//     b:150,
 


//   RGBRed: (val)=>set(()=>({
//         r:val
//     })),
 
//   RGBGreen:(val)=>set(()=>({
//       g:val
//     })),

//  RGBBlue:(val)=>set(()=>({
  
//         b:val
//     })),

//   setPixel:(val)=>set(()=>({pixel:val})),
//   setRGB:(val)=>set(()=>({RGB:val})),
//   setINVT:(val)=>set(()=>({invert:val})),
//   setHSLV:(val)=>set(()=>({HSLV:val})),
//   setEmboss:(val)=>set(()=>({emboss:val})),
//   setContrast:(val)=>set(()=>({contrast:val})),
//   setGrayScale:(val)=>set(()=>({grayScale:val})),
// setBlurRadius:(val)=>set(()=>({blurRadius:val})),
  setImage: (val)=>set(()=>(
 {image:val}
  )),

 naturalwidth:0,
 naturalheight:0,

 setNaturalwidth:(val)=>set(()=>({naturalwidth:val})),
 setNaturalheight:(val)=>set(()=>({naturalheight:val})),

  setAnnType:(val)=>set(()=>(
    {
    cur_ann_type:val
  }
  )),
  setHideOptions:(val)=>set(()=>({hideOptions:val})),

  history:[[]],
  setHistory:history=>set(()=>({history})),
  

  setCanvasWidth:(val)=>set(()=>({canvasWidth:val})),
  setCanvasHeight:(val)=>set(()=>({canvasHeight:val})),

  setAutoHover: (val) => set(() => ({ autohover: val })),

  setRotation: (rotation) => set(() => ({ rotation: rotation })),
  hoverState: false,
  setHoverState: () => set(state => ({ hoverState: !state.hoverState })),

  setInitialImageScale: initialImageScale => set(() => ({ initialImageScale: initialImageScale })),

  setSize: ({ width, height }) => set({ width, height }),

  imageWidth: 100,
  imageHeight: 100,

  setImageSize: size =>
    set(() => ({ imageWidth: size.width, imageHeight: size.height })),
  scale: 1,
  setScale: scale => set({ scale }),
  isDrawing: false,
  toggleIsDrawing: () => set(state => ({ isDrawing: !state.isDrawing })),

  regions: [],
  setRegions: regions => set(state => ({ regions })),

  selectedRigionId: null,
  selectRegion: selectedRigionId => set({ selectedRigionId }),

  annotations: [],
  setAnnotations: annotations => set(state => ({ annotations })),
  annotationId: null,
  setAnnotationId: annotationId => set({ annotationId }),




}));

export {useStore,setstore,intialState};
