import React from 'react';
import { useStore } from '../../zustandstore';


export default ()=>{
    const {annotations,annotationId,setColorAnn,setAnnotations,history,setHistory,setAnnotationId}=useStore();
 const [ann,setAnn]=React.useState(null);


 const deleteAnn=()=>{
     let newmpap=annotations.filter((an)=>(ann.id!=an.id));
 setAnnotationId(null)
     history.push(newmpap);
     setHistory(history);
     setAnnotations(newmpap)
 }

    React.useEffect(()=>{
     
      let val=  annotations.find((ann,key)=>(ann.id==annotationId))
      
        setAnn(val)
    
    },[annotationId,annotations])

    return (
        <div style={{height:"2rem", marginTop:"5px",fontSize:"11px"}}>
        {ann!=null?
        <div className="d-flex">
      
              {ann.lat!=null && ann.long!=null?
                  <div className="d-flex ml-1">
                <div style={{backgroundColor:"black",color:"white",padding:"5px 5px 5px 10px",borderTopLeftRadius:"25%",borderBottomLeftRadius:"25%"}} >LAT </div> 
                <div style={{backgroundColor:"white", minWidth:"20px",padding:"5px 10px 5px 5px",borderTopRightRadius:"25%",borderBottomRightRadius:"25%"}}>{ann.lat.toFixed(4)}</div>
                </div>:null}
                {ann.lat!=null && ann.long!=null?
                <div className="d-flex ml-1">
                <div style={{backgroundColor:"black",color:"white",padding:"5px 5px 5px 10px",borderTopLeftRadius:"25%",borderBottomLeftRadius:"25%"}} >LONG</div> 
                <div style={{backgroundColor:"white", minWidth:"20px",padding:"5px 10px 5px 5px",borderTopRightRadius:"25%",borderBottomRightRadius:"25%"}}>{ann.long.toFixed(4)}</div>
                </div>:null
              }
            

              <div className="d-flex ml-1">
              <div style={{backgroundColor:"black",color:"white",padding:"5px 5px 5px 10px",borderTopLeftRadius:"25%",borderBottomLeftRadius:"25%"}} >ANN TEXT</div> 
              <div style={{backgroundColor:"white", minWidth:"20px",padding:"5px 10px 5px 5px",borderTopRightRadius:"20%",borderBottomRightRadius:"20%"}}>{ann.ann_text}</div>
              </div>
              <div className="d-flex ml-1">
              <div style={{backgroundColor:"black",color:"white",padding:"5px 5px 5px 10px",borderTopLeftRadius:"25%",borderBottomLeftRadius:"25%"}}>TYPE </div> 
              <div style={{backgroundColor:"white", minWidth:"20px",padding:"5px 10px 5px 5px",borderTopRightRadius:"25%",borderBottomRightRadius:"25%"}}>{ann.type}</div>
              </div>
              <div className="d-flex ml-1">
              <div style={{backgroundColor:"black",color:"white",padding:"5px 5px 5px 10px",borderTopLeftRadius:"25%",borderBottomLeftRadius:"25%"}}>ROT </div> 
              <div style={{backgroundColor:"white", width:"30px",overflow:"hidden",padding:"5px 10px 5px 5px",borderTopRightRadius:"25%",borderBottomRightRadius:"25%"}}>{ann.rotation==null?0:parseInt(ann.rotation)}</div>
              </div>
              <div className="d-flex ml-1">
              <div onClick={deleteAnn} style={{cursor:"pointer",backgroundColor:"red",color:"white",padding:"5px 5px 0px 5px",borderRadius:"50%"}}>DELETE </div> 
             
              </div>
            </div>:null   
    
     
    }
        </div>
    )
}