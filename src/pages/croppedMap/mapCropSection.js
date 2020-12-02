import React, { Component } from 'react';
import NavbarPage from "../../components/Navbar/Navbar_Page";
import Footer from "../../components/Footer/footer";
import MapAnnotate from './mapCropAnnotate';
import { withRouter } from 'react-router-dom';
import { URL } from '../../modal/url';
import { toast } from 'react-toastify';
import { EmpHTTP } from '../../components/Interceptors/empInterceptor';

class MapSection extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            navItems : [],
            mapId:null,
            mapData:null,
            navClass : ""
        };
    }

    getCroppedImage=async (id)=>{
        try{
        let data = await EmpHTTP.post(URL.GET_CROP_IMAGE,{id});
  
          let resp_data = data.data;
  
          if (resp_data.status === true) {
            this.setState({
                ...this.state,
                mapId:id,
                map:resp_data.map,
                mapData:resp_data.mapData
                        }) 
//console.log(`maps/${resp_data.mapData.locationName}/${resp_data.mapData.img_name}`)
        localStorage.setItem('cropimage',`maps/${resp_data.mapData.locationName}/${resp_data.mapData.img_name}`)

                        console.log(this.state);
  
          } else {
            throw new Error('Empty Data');
          }
        } catch (err) {
          if (err.response) {
            toast.error(err.response.data.message);
          } else if (err.message) {
            toast.error(err.message);
  
          } else {
            toast.error(err);
          }
          this.props.history.push('/dashboard/locations');
        }
  
    }

    componentDidMount(){
        const { match: { params } } = this.props;
          this.getCroppedImage(params.id);

     
       
    }

    componentWillUnmount(){
   
    }

    render() {
        return (
            <React.Fragment>

                {/* Importing Navbar */}
                {/* <NavbarPage  navItems={this.state.navItems} navClass={this.state.navClass} style={{backgroundColor:"#272a33"}}/> */}
                {this.state.mapId!=null?
                 <MapAnnotate mapData={this.state.map} alloted_map_data={this.state.mapData} />:null
                }
            
              {/* <Footer/> */}
            </React.Fragment>
        );
    }
}

export default withRouter(MapSection);