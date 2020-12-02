import React from 'react';
import { toast } from 'react-toastify';
import { URL } from '../../modal/url';
import { Table } from 'react-bootstrap';
import { EmpHTTP } from '../Interceptors/empInterceptor';
import { Radio } from '@material-ui/core';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'

class ReportMenu extends React.Component {



    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            current_report_id: localStorage.getItem('current_report_id'),
            location_name: props.cur_alloted_map_data.locationName,
            emp_map_alloted_id: props.cur_alloted_map_data._id,
            assigned_date:props.cur_alloted_map_data.assignedOn,
            map_data:props.cur_alloted_map_data,
            nestedModal:false,
            closeAll:false,
            operation:null,
            curr_operation_data:null,
            reports: []
        }
    }


 toggleNested = () => {

    this.setState({
        ...this.state,
        closeAll:false,
        nestedModal:!this.state.nestedModal
    })
    
  }
toggleAll = () => {
  
    this.setState({
        ...this.state,
        closeAll:true,
        nestedModal:!this.state.nestedModal
    })
    
  }


  updateOperation=(obj)=>{
      this.setState({
          ...this.state,
      operation:obj.operation,
      curr_operation_data:obj.curr_operation_data,
      closeAll:false,
      nestedModal:!this.state.nestedModal
      })
      
  }
  carryoperation=()=>{
      if(this.state.operation=='N'){
          this.createNewReport()
      }else if(this.state.operation=='D'){
          this.deleteReport(this.state.curr_operation_data)
      }else{
          toast.error('Invalid Operation')
      }

  }

    deleteReport=(rp)=>{
 
        EmpHTTP.post(URL.DELETE_REPORT, {
           _id:rp._id
        }).then(data => {
            let resp_data = data.data;
            if (resp_data.status == true) {
                toast.success('Report Deleted');
                if(this.state.current_report_id==rp._id){
                       this.state.current_report_id=null;
                    localStorage.removeItem('current_report_id');
                  }
                this.getReports()
            } else {
                toast.error('Error Occurred');
            }
        }).catch(err => {
            if (err.response) {
                toast.error(err.response.data.message);
            } else {
                toast.error(err.message);
            }
        })
    }

    selectAsCurrentreport=(obj)=>{
      this.setState({
          ...this.state,
          current_report_id:obj._id
      })

      localStorage.setItem('current_report_id',obj._id);
      toast.success('Current Report Selected, Any Sub Report submitted will be saved with current report')
    }
    createNewReport = () => {
   
        EmpHTTP.post(URL.CREATE_NEW_REPORT, {
            location_name: this.state.location_name,
            emp_map_alloted_id: this.state.emp_map_alloted_id,
            assigned_date: this.state.assigned_date,
            map_data: this.state.map_data
        }).then(data => {
            let resp_data = data.data;
            if (resp_data.status == true) {
                toast.success('Report Created');
                this.getReports()
            } else {
                toast.error('Error Occurred');
            }
        }).catch(err => {
            if (err.response) {
                toast.error(err.response.data.message);
            } else {
                toast.error(err.message);
            }
        })
    }

    viewReport=()=>{
        this.props.redirectViewReport()
    }

    getReports() {
        console.log(this.state)
        let data = {
            location_name: this.state.location_name,
            emp_map_alloted_id: this.state.emp_map_alloted_id,
            assigned_date: this.state.assigned_date
        }
        EmpHTTP.post(URL.GET_MAP_REPORTS, data).then(data => {
            let resp_data = data.data;
            if (resp_data.status == true) {

                this.setState({
                    ...this.state,
                     nestedModal:false,
                    reports: [].concat(resp_data.reports)
                })
                console.log(resp_data.reports);
            } else {
                toast.error('Error Occurred');
            }
        }).catch(err => {
            if (err.response) {
                toast.error(err.response.data.message);
            } else {
                toast.error(err.message);
            }
        })


    }

    componentDidMount() {

        this.getReports()
    }


    render() {
        return (
            <div>
                <Modal centered={true} size="lg" isOpen={this.props.modal} toggle={this.props.toggle} >
        <ModalHeader toggle={this.props.toggle}>Report Section</ModalHeader>
        <ModalBody>
        <Table striped bordered hover size="sm" style={{width:"100%"}}>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Assigned On</th>
                            <th>Report Created At</th>
                            {/* <th>Report Updated At</th> */}
                            <th style={{width:"100px"}}>Current Report</th>
                            <th style={{width:"100px"}}>Delete Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.reports.length != 0 && this.state.reports.map((rp, key) => {
                                let d = new Date(rp.assigned_date)
                                let ct = new Date(rp.createdAt)
                                // let ut = new Date(rp.updatedAt)

                                return (
                                    <tr key={key} >
                                        <td>{key + 1}</td>
                                        <td>{(d.getDate()) + "-" + (d.getMonth() + 1) + "-" + (d.getFullYear())}</td>
                                        <td>{(ct.getDate()) + "-" + (ct.getMonth() + 1) + "-" + (ct.getFullYear()) + " : " + ct.getHours() + "h" + " : " + ct.getMinutes() + "min" + " : " + ct.getSeconds() + "s"}</td>
                                       
                                        <td style={{width:"100px"}}>  <Radio
                                            checked={this.state.current_report_id === rp._id}
                                            onChange={()=>this.selectAsCurrentreport(rp)}
                                            value={rp._id}
                                           
                                            inputProps={{ 'aria-label': 'A' }}
                                        /></td>
                                        <td style={{width:"100px"}}>
                                            <Button disabled={rp.completed==true} onClick={()=>{this.updateOperation({curr_operation_data:rp,operation:'D'})}} style={{width:"100%"}} outline color="danger">
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </Table>
                <div>
                    <Button outline color="success" onClick={()=>this.updateOperation({curr_operation_data:null,operation:'N'})} >+ New Report</Button> &nbsp;
                    <Button outline color="primary" disabled={this.state.current_report_id==null} onClick={()=>this.viewReport()} >View Report</Button>
                </div>
          
          <Modal centered={true} isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.props.toggle : undefined}>
            <ModalHeader>Confirm Prompt</ModalHeader>
            <ModalBody>Are you sure {this.state.curr_operation_data==null? "you want to create new report ":"you want to delete this report "} ? </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={this.carryoperation}>Yes</Button>{' '}
              <Button color="danger" onClick={()=>this.toggleNested(!this.state.nestedModal)}>No</Button>
            </ModalFooter>
          </Modal>
        </ModalBody>
        {/* <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter> */}
      </Modal>

                
            </div>
        )
    }



}



export default ReportMenu;