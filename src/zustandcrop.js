import create from 'zustand';


const useCropStore = create(set => ({
  width: window.innerWidth,
  height: window.innerHeight,
  initialImageScale: 1,
  image:null,
  cur_ann_type:null,
  setImage: (val)=>set(()=>(
 {image:val}
  )),

  setAnnType:(val)=>set(()=>(
    {
    cur_ann_type:val
  }
  )),

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
  brightness: 0,
  setBrightness: brightness => set({ brightness }),
  annotations: [],
  setAnnotations: annotations => set(state => ({ annotations })),
  annotationId: null,
  setAnnotationId: annotationId => set({ annotationId }),

  }))


  export default useCropStore;