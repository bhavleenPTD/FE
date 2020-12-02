import create from "zustand";

const initialFiterState={
  isHeavy:false,
  brightness: 1,
blurRadius:0,
contrast:100,
invert:0,
grayScale:0,
pixel:1,
canvasRotation:0,
  estrength:0,
  ewlevel:0,
  etype:"top"
,

  hue:0,
  sat:100,
  lum:0,
  valb:0,

  r:255,
  g:255,
  b:255,
}
const [useFilterStore,setFilterState] = create(set => ({
 
   isHeavy:false,
   setIsHeavy:isHeavy=>set({isHeavy}),
  blurRadius:0,
  contrast:100,
  invert:0,
  grayScale:0,
  pixel:1,
  canvasRotation:0,

 setCanvasRotation:(val)=>set(()=>({canvasRotation:val})),
    estrength:0,
    ewlevel:0,
    etype:"top"
  ,
 
    hue:0,
    sat:100,
    lum:0,
    valb:0,

    r:255,
    g:255,
    b:255,
 


  RGBRed: (val)=>set(()=>({
        r:val
    })),
 
  RGBGreen:(val)=>set(()=>({
      g:val
    })),

 RGBBlue:(val)=>set(()=>({
  
        b:val
    })),

  setPixel:(val)=>set(()=>({pixel:val})),
  setRGB:(val)=>set(()=>({RGB:val})),
  setINVT:(val)=>set(()=>({invert:val})),
  setHSLVH:(val)=>set(()=>({hue:val})),
  setHSLVS:(val)=>set(()=>({sat:val})),
  setHSLVL:(val)=>set(()=>({lum:val})),
  setHSLVV:(value)=>set(()=>({valb:value})),
  setEmbossS:(val)=>set(()=>({estrength:val})),
  setEmbossW:(val)=>set(()=>({ewlevel:val})),
  setContrast:(val)=>set(()=>({contrast:val})),
  setGrayScale:(val)=>set(()=>({grayScale:val})),
setBlurRadius:(val)=>set(()=>({blurRadius:val})),

  brightness: 1,
  setBrightness: brightness => set({ brightness }),

  clearStore:()=>set({
    isHeavy:false,
    brightness: 1,
  blurRadius:0,
  contrast:100,
  invert:0,
  grayScale:0,
  pixel:1,
  canvasRotation:0,
    estrength:0,
    ewlevel:0,
    etype:"top"
  ,
 
    hue:0,
    sat:100,
    lum:0,
    valb:0,

    r:255,
    g:255,
    b:255,
 
  })

}));

export  {useFilterStore ,setFilterState,initialFiterState};
