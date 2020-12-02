import React,{Component} from 'react';
import NavbarPage from "../../components/Navbar/Navbar_Page";
import Service from "../../components/Service/service";
import Blog from '../../components/Blog/Blog';
import Tiles from '../../components/tiles/tiles';
import { EmpHTTP } from '../../components/Interceptors/empInterceptor';
import { URL } from '../../modal/url';
import { toast } from 'react-toastify';
class AnnLocation  extends Component{
constructor(props){
    super(props);
    this.state={
        title:"Location",
        desc:"Choose which location's satellite imagery needs to be checked",
        tiles:[
            // { _id:'1', image : "assets/images/location/china (6).jpg", locationlabel : "Hotan",  sublocationlabel:"Hotan",  
            // desc : "China - Hotan Surveillance | Satellite Imageries",to:'gulmud' },
            // { _id:'2',image : "assets/images/location/china (1).jpg", locationlabel :"Nepal",  sublocationlabel:"KatMandu",
            //   desc : "Nepal - Katmandu Surveillance | Satellite Imageries",to:'hutan' },
            // { _id:'3', image : "assets/images/location/china (2).jpg", locationlabel : "Pakistan",  sublocationlabel:"Kargil",
            //  desc : "Pakistan - Kargil Surveillance | Satellite Imageries" ,to:'gulmud' },
            // { _id:'4', image : "assets/images/location/china (3).jpg", locationlabel : "Gulumd",  sublocationlabel:"Gulmud",
            //  desc : "China - Gulmud Surveillance | Satellite Imageries",to:'gulmud' },
            // { _id:'5',image : "assets/images/location/china (4).jpg", locationlabel : "Mumbai",  sublocationlabel:"Taj Hotel", 
            // desc : "India - Mumbai Surveillance | Satellite Imageries", to:'gulmud' },
            // { _id:'6', image : "assets/images/location/china (5).jpg", locationlabel : "Punjab",  sublocationlabel:"Pathan Khot",
            //  desc : "Punjab - Pathan Kot Surveillance | Satellite Imageries" ,to:'gulmud' }
        ]
    }
}

getLocations=async ()=>{
   try{
  let data=  await EmpHTTP.post(URL.GET_ACTIVE_LOCATIONS,{});
  let resp_data=data.data;
  console.log(resp_data)
  if(resp_data.status==true){
      this.setState({
          ...this.state,
          tiles:resp_data.locations
      })
      console.log(this.state.tiles);
  }else{
      toast.error('Error Occurred');
  }
   }catch(err){
       if(err.response){
           toast.error(err.response.data.message);
       }else if(err.message){
           toast.error(err.message);
       }else{
           toast.error(err);
       }
   }
}

componentDidMount(){
    if(localStorage.getItem('userToken')==null){
        this.props.history.push('/login');
    }else{
        this.getLocations();
    }
}

    render(){
        return (
         <div>
            
             <Tiles user={this.props.currUser} data={this.state} spacing="pt-7"/>
        
         </div>
        )
    }
}


export default AnnLocation;