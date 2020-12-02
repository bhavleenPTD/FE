import React from 'react';
import { EmpHTTP } from '../../components/Interceptors/empInterceptor';
import { URL } from '../../modal/url';
import { toast } from 'react-toastify';
import { Badge, Button } from 'reactstrap';
import '../../css/react_table.css';
import '../../css/react_pop_up.css';
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Label,
	FormGroup,
} from 'reactstrap';

import { AvForm,AvInput, AvField } from 'availity-reactstrap-validation';
import Switch from 'react-switch';
import AvGroup from 'availity-reactstrap-validation/lib/AvGroup';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory, {
	PaginationProvider,
	PaginationListStandalone,
} from 'react-bootstrap-table2-paginator';
import LocationPopUpCrud from './locationPopCrud';

class LocationContainer extends React.Component{

    constructor(props){
        super(props)
        this.state={
           
            currentModalData:null,
            showUpdateModal:false,
            options :{
                custom: true,
                totalSize: 0,
            },
        
            locations:[],
            columns:[
                // {
                //     dataField: 'sr_no',
                //     text: 'Sr. No.',
                    
                //     headerStyle: (column, colIndex) => {
                //         return { width: '80px' };
                //     },
                // },
                {
                    dataField: 'country',
                    text: 'Country',
                    headerStyle: (column, colIndex) => {
                        return { width: '250px' };
                    },
                },
                {
                    dataField: 'location',
                    text: 'Location',
                },
                {
                    dataField: 'active',
                    text: 'Status',
                    headerStyle: (column, colIndex) => {
                        return { width: '180px' };
                    },
                    formatter: (cellContent, rows) => {
                        if (rows.active === true) {
                        
                            return (
                                <h5>
                                    <Badge color="success">Active</Badge>
                                </h5>
                            );
                        }
                        return (
                            <h5>
                                <Badge color="danger">Not Active</Badge>
                            </h5>
                        );
                    },
                },
            ]
        }
    }


  
    
    setShowUpdateModal = (val,data,index)=>{
        console.log(data);
          this.setState({
            ...this.state,
            active:data.active,
            currentModalData:{
                ...data,
                index:index
            },
            showUpdateModal:val

        })
        //console.log(this.state.showUpdateModal);
    }
       getLocations(){
            EmpHTTP.get(URL.GET_LOCATIONS).then(data=>{
                let resp_data=data.data;
                if(resp_data.status==true){
                   this.setState({
                       ...this.state,
                       showUpdateModal:false,
                       currentModalData:null,
                       locations:resp_data.locations.map((obj,key)=>{
                           return {
                               ...obj,
                               sr_no:key+1
                           }
                       }),
                       options:{
                           ...this.state.options,
                           totalSize:resp_data.locations.length
                       }
                   })
                }
             }).catch(err=>{
                 if(err.response){
            toast.error(err.response.data.message);
                 }else{
                 toast.error(err.message);
                 }
             })
       }

       componentDidMount(){
           this.getLocations()
       }

       createNewLocation =()=>{
           this.setState({
               ...this.state,
               locations:this.state.locations.concat([
                   {
                    sr_no:this.state.locations.length+1,
                    _id:null,
                    country:'',
                    location:'',
                    active:false,
                    iat:Date.now()

                   }
               ])
           })
       }

      
     rightSubmit = (events,errors,values) => {
      
       if(errors.length==0){
          this.savelocation({
             ...this.state.currentModalData,
              ...values
          });
        }
       }
        savelocation= (data)=>{
          if(data._id==null){

      EmpHTTP.post(URL.SAVE_NEW_LOCATIONS,data).then(json=>{
          let resp_data=json.data;
          if(resp_data.status==true){
              this.getLocations();
          }else{
              toast.error('Error');
          }
      }).catch(err=>{
        if(err.response){
        toast.error(err.response.data.message);
        }else{
        toast.error(err.message);
        }
    })

          }else{
              //update
           
      EmpHTTP.post(URL.UPDATE_LOCATION,data).then(json=>{
        let resp_data=json.data;
        if(resp_data.status==true){
            this.getLocations();
        }else{
            toast.error('Error');
        }
    }).catch(err=>{
      if(err.response){
      toast.error(err.response.data.message);
      }else{
      toast.error(err.message);
      }
  })

          }
        }

        deleteLocation= (data)=>{
         
           if(data._id==null){
            
               this.setState({
                   ...this.state,
                   showUpdateModal:false,
                   currentModalData:null,
                   locations:this.state.locations.filter((obj,key)=>{
                       return obj.iat!=data.iat
                        
                   })
               })

           }else{

             
      EmpHTTP.post(URL.DELETE_LOCATION,data).then(json=>{
        let resp_data=json.data;
        if(resp_data.status==true){
            this.getLocations();
        }else{
            toast.error('Error');
        }
    }).catch(err=>{
      if(err.response){
      toast.error(err.response.data.message);
      }else{
      toast.error(err.message);
      }
  })


           }
           
        }



    //    updateModalData = (data)=>{
    //  this.setState({
    //      ...this.state,
    //      currentModalData:data
    //  })
    
    //    }


   toggle= ()=>{
        console.log(this.state.showUpdateModal)
       this.setState({
           ...this.state,
           showUpdateModal:!this.state.showUpdateModal
       })
   }

     rowEvents = {
		onClick: (e, row, rowIndex) => {
          
            this.setShowUpdateModal(!this.state.showUpdateModal,row,rowIndex);
             
			//console.log(`clicked on row with index: ${rowIndex}`);
		},
		onMouseEnter: (e, row, rowIndex) => {
		//	console.log(`enter on row with index: ${rowIndex}`);
		},
	};

	
    render(){


        return (
            <section className="section bg-light" style={{paddingLeft:'13rem',marginTop:'5rem'}} id="blog">
                <PaginationProvider pagination={paginationFactory(this.state.options)}>
				{({ paginationProps, paginationTableProps }) => (
					<div style={{width:"90%"}}>
						<BootstrapTable
                        
							keyField="sr_no"
							data={this.state.locations}
							columns={this.state.columns}
                            rowEvents={this.rowEvents}
                             
							{...paginationTableProps}
						/>
						<div style={{ marginRight: '50%' }}>
							<PaginationListStandalone {...paginationProps} />
						</div>
					</div>
				)}
			</PaginationProvider>
{/* 
			<RightsUpdate
				showUpdatemodal={showUpdateModal}
				toggleModal={rowEvents.onClick}
			/> */}
       {this.state.currentModalData!=null?
       <LocationPopUpCrud  key={this.state.currentModalData.iat}
       showUpdatemodal={this.state.showUpdateModal}
       toggleModal={this.toggle}
       data={this.state.currentModalData}
       saveform={
          this.savelocation
       }
       deleteform={
           this.deleteLocation
       }
       />
 

       :null
       }
         
            <div>
                <Button color="danger" onClick={this.createNewLocation}>Create Location</Button>
            </div>

            </section>
        )
    }

}

export default LocationContainer;