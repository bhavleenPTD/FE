import React, { useState } from 'react';
import '../../css/react_pop_up.css';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Label,
	FormGroup,
} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import Switch from 'react-switch';
import AvGroup from 'availity-reactstrap-validation/lib/AvGroup';


const LocationPopUpCrud = (props) => {
 console.log(props.data)
//console.log(data);
  let defaultValues={
      ...props.data
  }
      const [active,setActive]= useState(props.data.active)

   //  console.log(form);


	const handleActiveSwitch = () => {
		
		setActive(!active)
	};

	const rightSubmit = (events,errors,values) => {
        console.log('here',values)
      
       if(errors.length==0){
          props.saveform({
              ...props.data,
              ...values,
              active:active
          });
          
       }
          
		//Api Call
		// axios.post(createRightUrl).then((res) => {
		// 	console.log(res.data);
		// });
    };

  const deleteForm = ()=>{
      
      props.deleteform(props.data);
    
  }


  

	const closeBtn = (
		<button className="close" onClick={props.toggleModal}>
			&times;
		</button>
	);

	return (
		<React.Fragment>
			<Modal isOpen={props.showUpdatemodal} toggle={props.toggleModal}>
				<ModalHeader toggle={props.toggleModal} close={closeBtn}>
					Update Location
				</ModalHeader>
				<ModalBody>
					<div className="create-react-form">
						<div id="form">
							<AvForm onSubmit={rightSubmit} model={defaultValues}>
								<AvGroup>
									<Label htmlFor="country">Country Name</Label>
									<AvField
										type="text"
										name="country"
										required
										className="form-control"
									  
										placeholder="Enter Country name"
										errorMessage="Field Required"
									
									/>
								</AvGroup>
								<AvGroup>
									<Label htmlFor="location">Location</Label>
									<AvField
										type="text"
										name="location"
										required
										className="form-control"
										placeholder="Enter Location"
										errorMessage="Field Required"
										
									/>
								</AvGroup>
						
								<AvGroup>
									<Label >Activation Status</Label>
									<br />
									<Switch
										checked={active}
										onChange={handleActiveSwitch}
									/>
								</AvGroup>
								<div className="mt-3">
									<Button
										color="primary"
										
										
									>
										Save
									</Button>
									
								</div>
							</AvForm>
						</div>
					</div>
				</ModalBody>
				<ModalFooter>
                <Button
										className="ml-3"
										color="danger"
                                         type="button"
                                         onClick={deleteForm}
									>
										Delete
									</Button>
					<Button color="secondary" onClick={props.toggleModal}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</React.Fragment>
	);
};

export default LocationPopUpCrud;
