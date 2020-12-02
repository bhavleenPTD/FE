import React from 'react';
import { toast } from 'react-toastify';
import { URL } from '../../modal/url';
import { EmpHTTP } from '../Interceptors/empInterceptor';


export default({user,setUser})=>{

    const [userdata,setUserdata]=React.useState({});

React.useEffect(()=>{
 
   EmpHTTP.post(URL.GET_USER_DATA,{empId:user.empId}).then(data=>{
    let resp=data.data;
    if(resp.status==true){
setUserdata(resp.emp)
 setUser(resp.emp)
    }
   }).catch(err=>{
    if (err.response) {
        toast.error(err.response.data.message);
      } else if (err.message) {
        toast.error(err.message);

      } else {
        toast.error(err);
      }
   })
 return ()=>{

 }

},[])


return (
    <React.Fragment>
      {userdata.name}
    </React.Fragment>
)

}