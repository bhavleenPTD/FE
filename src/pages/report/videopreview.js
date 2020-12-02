import { Checkbox, FormControlLabel } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from 'reactstrap';
import { EmpHTTP } from '../../components/Interceptors/empInterceptor';
import { URL } from '../../modal/url';

class VideoPreview extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            showVp:false,
            downloadPath:null,
           current_image: props.subreports.length != 0 ? props.subreports[0] : null,
           subreports: props.subreports,
           report: props.report,
           main_image: props.main_image,
           selectedImages:[].concat(props.selectedImages)
        }
        console.log(this.state);
    }

    componentDidMount() {

    }

    selectAll=()=>{
        this.setState({
            ...this.state,
            selectedImages:[].concat(this.state.subreports)
        })
    }

    handleCurrent=(sr)=>{
        this.setState({
            ...this.state,
            current_image:sr
        })
    }

    createReel=async ()=>{
        this.setState({
            ...this.state,
         downloadPath:null
        })
        this.props.setSelectedImages(this.state.selectedImages);
      console.log(this.state.selectedImages);
        try{
            let data=await EmpHTTP.post(URL.CREATE_REEL,{slides:this.state.selectedImages});
        
            let resp_data = data.data;
        
            if (resp_data.status == true) {
               this.setState({
                   ...this.state,
                   downloadPath:resp_data.path
               })
             
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
          }
        // this.setState({
        //     ...this.state,
        //     showVp:truee
        // })
    }


    pushInSelected=(sr)=>{
        this.setState({
            ...this.state,
            selectedImages:[...this.state.selectedImages,sr]
        })
    }
    popInSelected=(sr)=>{
        this.setState({
            ...this.state,
            selectedImages:this.state.selectedImages.filter((si)=>(si._id!=sr._id))
        })
    }

    render() {
        return (
            <div>

                <div className="d-flex justify-content-between ">
                    <div style={{width:"60%",margin:'10px',padding:'10px',boxShadow:"0px 0px 5px lightgray",
                            borderRadius:"10px"}} className="mt-1">
                       {this.state.current_image!=null?
                       <img style={{ width: "100%" ,height:"100%"}} src={this.state.current_image.thumbnail_path} />:"No Sub Report Submitted"
                       } 
                    </div>
                    <div style={{width:"35%",overflow:"scroll",maxHeight:"90vh"}} className="d-flex justify-content-between mt-1 flex-wrap">
                        {this.state.subreports.map((sr, key) => (

                            <div style={{margin:'10px',padding:'10px',
                            width:"45%",
                            height: "290px",
                            boxShadow:"0px 0px 5px lightgray",
                            borderRadius:"10px"}} key={key}>
                                <div>

                                    {this.state.selectedImages.findIndex((img,key)=> img._id==sr._id)==-1?
                                        //   <Button  style={{margin:'5px', padding:'5px'}} color="primary" size="sm" onClick={()=>{setCheckImage(tile._id)}}> Recent Image</Button>
                                        <div style={{ fontSize: '12px' }} className="d-flex justify-content-between">
                                            <FormControlLabel
                                                control={<Checkbox
                                                    checked={false}
                                                    onClick={() => { this.pushInSelected(sr) }} fontSize="small" />}
                                                label="Select"
                                            />
                                        </div>

                                        : null}
                                    {this.state.selectedImages.findIndex((img,key)=> img._id==sr._id)!=-1?
                                        //    <Button style={{margin:'5px', padding:'5px'}} color="danger"  size="sm" onClick={()=>{setCheckImage(null)}}>Remove Recent Image</Button>:null
                                       
                                       <div style={{ fontSize: '12px' }} className="d-flex justify-content-between">
                                            <FormControlLabel
                                                control={<Checkbox
                                                    checked={true}

                                                    onClick={() => { this.popInSelected(sr) }} fontSize="small" />}
                                                label="Selected"
                                            />
                                        </div> : null
                                    }

                                </div>
                                {sr!=null?
                                 <div style={{cursor:"pointer",    height:" 80%"}} onClick={()=>this.handleCurrent(sr)}>

                                 <img style={{width:"100%",height:"100%"}} src={sr.thumbnail_path} />
                             </div>:null
                                }
                               
                            </div>

                        ))}
                    </div>
                </div>
                <div>
                <Button  color="light" onClick={this.selectAll}>Select All</Button>{' '}
                    <Button disabled={this.state.selectedImages.length==0} color="success" onClick={this.createReel}>Create Reel</Button>{' '}
                    {this.state.downloadPath?
                     <Button outline color="primary" ><Link to={"/"+this.state.downloadPath} target="_blank" download>Download Video</Link></Button>:null
                    }
                    </div>

            </div>
        )
    }

}

export default VideoPreview;