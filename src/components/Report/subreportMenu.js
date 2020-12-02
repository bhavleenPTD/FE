import React from 'react';
import {  Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { URL } from '../../modal/url';
import { EmpHTTP } from '../Interceptors/empInterceptor';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class SubReportMenu extends React.Component{

constructor(props){
    super(props);
    this.state={
      nestedModal:false,
      closeAll:false,
      sub_location_name:null,
      description:null
    }
}

handleSubmit=(e)=>{
e.preventDefault();
this.toggleNested()
}

saveSubReport=()=>{
  this.props.saveSubReport({
    sub_location_name:this.state.sub_location_name,
    description:this.state.description
  })
  this.toggleNested();
}

handleChange=(e)=>{
 this.setState({
   ...this.state,
   [e.target.name]:e.target.value
 })
}

toggleNested = () => {

  this.setState({
      ...this.state,
      closeAll:false,
      nestedModal:!this.state.nestedModal
  })
  
}



componentDidMount(){


}


render(){
    return (
        <div>

<Modal centered={true} size="lg" isOpen={this.props.modal} toggle={this.props.toggle} >
        <ModalHeader toggle={this.props.toggle}>Sub Report Section</ModalHeader>
        <ModalBody>
        <Form >
      <FormGroup>
        <Label >Sub Location Name</Label>
        <Input style={{marginLeft:'0px'}} name="sub_location_name" onChange={this.handleChange} placeholder="Enter Sub location" />
      </FormGroup>
      <FormGroup>
        <Label for="exampleText">Description</Label>
        <Input type="textarea" name="description" onChange={this.handleChange} placeholder="Enter valid description" />
      </FormGroup>
      <Button type="button" color="success" disabled={this.state.sub_location_name==null || 
        this.state.description==null || this.state.sub_location_name.trim()=='' ||
         this.state.description.trim()==''} onClick={this.handleSubmit}>Save Sub Report</Button>
    </Form>
          
          <Modal centered={true} isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.props.toggle : undefined}>
            <ModalHeader>Confirm Prompt</ModalHeader>
            <ModalBody>Are you sure you want to save this subreport ?</ModalBody>
            <ModalFooter>
              <Button   color="success" onClick={()=>this.saveSubReport()}>Yes</Button>{' '}
              <Button color="danger" onClick={()=>this.toggleNested()}>Cancel</Button>
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



export default SubReportMenu;