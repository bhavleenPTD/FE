import React from 'react';
import { Table } from 'react-bootstrap';

export default(props)=>{
  
const [annotations,setAnnotations]=React.useState(props.ann.filter((obj,key)=>(obj.type=='R' || obj.type=='E' || obj.type=='P' || obj.type=='S')));

    return (
        <div style={{textAlign:"center"}}>
        <Table striped bordered hover size="sm" style={{ margin: "10px auto"}}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Annotation Text</th>
              <th>Latitude ° N</th>
              <th>Longitude ° E</th>

            </tr>
          </thead>
          <tbody>
            { annotations.map((ann, key) => (
              
                 <tr key={key}>
                    <td>{key+1}</td>
                    <td>{ann.ann_text}</td>
                    <td>{ann.lat}</td>
                    <td>{ann.long}</td>
                
                  </tr>
            ))}
            
          </tbody>
        </Table>
      </div>
    )
}