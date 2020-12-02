import React from 'react';

export default(props)=>{
const {date}=props;
const [converted,setDate]=React.useState(null);

React.useEffect(()=>{
let d=new Date(date);
setDate((d.getDate()) + " / " + (d.getMonth() + 1) + " / " + (d.getFullYear()));
},[date])
return(

    <React.Fragment>
    {date!=null?
  converted:null    
     }
    </React.Fragment>
)



}