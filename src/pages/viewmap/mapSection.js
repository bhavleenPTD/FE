import React, { Component } from 'react';

import NavbarPage from "../../components/Navbar/Navbar_Page";
import Footer from "../../components/Footer/footer";
import MapAnnotate from './mapAnnotate';
import { withRouter } from 'react-router-dom';
import {useStore,setstore,intialState} from '../../zustandstore';
import { useFilterStore,initialFiterState, setFilterState } from '../../zustandfilter';
import { EmpHTTP } from '../../components/Interceptors/empInterceptor';
import { toast } from 'react-toastify';
import { URL } from '../../modal/url';

class MapSection extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            navItems : [
            ],
            mapId:null,
            navClass : ""
        };
    }


   
        getAllocationData = async (id,ref) => {
            try {
                let data = await EmpHTTP.post(URL.GET_ALLOC_MAP_DATA, { id: id });
                let resp_data = data.data;
                if (resp_data.status == true) {
                    console.log(resp_data)
                    localStorage.setItem('checkimage',`maps/${resp_data.alloc.locationName}/${resp_data.alloc.img_name}`);
                    this.setState({
                        ...this.state,
                        curpath: resp_data.alloc.img_path,
                        mapId:ref+id,
                        location: resp_data.alloc.locationName,
                        curData:resp_data.alloc
                       
                    })
                } else {
                    toast.error('Error Occurred');
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
        this.getAllocationData(params.cur,params.ref)
       
       
    }

    
    componentWillUnmount(){
     setstore.setState(intialState);
      setFilterState.setState(initialFiterState);
    }

    render() {
        return (
            <React.Fragment>

                {/* Importing Navbar */}
                {/* <NavbarPage  navItems={this.state.navItems} navClass={this.state.navClass} style={{backgroundColor:"#272a33"}}/> */}
                {this.state.mapId!=null?
                 <MapAnnotate params={this.state.mapId} alloted_map_data={this.state.curData} />:null
                }
            
              {/* <Footer/> */}
            </React.Fragment>
        );
    }
}

export default withRouter(MapSection);