import create from 'zustand';


const [useCompareStore,set] = create(set => ({
  
   reference:null,
   checkimage:null,
   refData:null,
   curData:null

  }))


  export default useCompareStore;