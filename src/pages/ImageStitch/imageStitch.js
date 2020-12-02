import React, { Component } from 'react';
import './imageHover.css';
import Footer from "../../components/Footer/footer";
import ImageContainer from './imageContainer';
import { Images } from './files';
import { Table } from 'react-bootstrap';
import CropCanvas from '../../components/Cropper/map.canvas';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { arrayMove } from 'react-sortable-hoc';
import Konva from 'konva';

class ImageStitch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: 3,
            col: 6,
            file: null,
            location: localStorage.getItem('locationMap'),
            timestamp: null,
            images: []
        };
    }

 

    openImg = (obj, row, col) => {
        console.log(obj)
        localStorage.setItem('currow', row);
        localStorage.setItem('curcol', col);
        localStorage.setItem("curimage", `assets/images/spliceLocation/${this.state.location}/${this.state.timestamp}/current/${obj.path}.jpg`);
        localStorage.setItem("refimage", `assets/images/spliceLocation/${this.state.location}/${this.state.timestamp}/reference/${obj.path}.jpg`);
        localStorage.setItem(this.state.timestamp + obj.path, JSON.stringify(obj.data.annotations));
        localStorage.setItem('blockId', obj.path);
        this.props.history.push('/dashboard/viewmap/' + this.state.ref+"/"+this.state.cur);
    }

    toggleLoad = () => {
        this.setState({
            ...this.state,
            loadcrop: !this.state.loadcrop
        })
    }

    componentDidMount() {
        if (localStorage.getItem('userToken') == null) {
            this.props.history.push('/login');
            return;
        }
        const { match: { params } } = this.props;
        console.log(params);
        let outarr = [[]];
        let rowindex = 0;
    //    let file = Images[localStorage.getItem('locationMap')][localStorage.getItem('checkimage')];
        let ann_data = JSON.parse(localStorage.getItem(params.ref+params.cur));
        console.log(ann_data);
        let data = [];

        if (ann_data != null) {
console.log(ann_data.Annotation.Point[0][0])
            for (let i = 0; i < ann_data.modified.rows * ann_data.modified.columns; i++) {
                data.push({
                    path: i, img_id: i, locationId: i, locationName: localStorage.getItem('locationMap'), data: {
                        // ann_length: (file.key=='modify' && i==48?4:file.key=='modify' && i==44?2:0),
                        
                        annotations: ann_data.Annotation.Point[i].length!=0 && ann_data.Annotation.Point[i][0].length!=0? ann_data.Annotation.Point[i][0][1].map((ann_obj, key) => {
                            console.log(ann_obj)
                            return {
                                id: key,
                                type: 'R',
                                x: ann_obj[0],
                                y: ann_obj[1],
                                width: ann_obj[2],
                                //    lat:36.40044484+0.03*i,
                                //    long:94.7873216+0.03*i,
                                height: ann_obj[3],
                                color: "blue",
                                rotation: 0
                            }
                        }):[],

                        // {
                        //     id: '12',
                        //     type: 'R',
                        //     x: 30,
                        //     y: 10,
                        //     ann_text: "AirCraft E",
                        //     width: 40,
                        //     height: 100,
                        //     points: [],
                        //     color: "white",
                        //     rotation: 0
                        // }, {
                        //     id: '22',
                        //     type: 'R',
                        //     x: 30,
                        //     y: 10,
                        //     ann_text: "AirCraft E",
                        //     width: 40,
                        //     height: 100,
                        //     points: [],
                        //     color: "blue",
                        //     rotation: 0
                        // },
                        // {
                        //     id: '23',
                        //     type: 'R',
                        //     x: 30,
                        //     y: 10,
                        //     ann_text: "AirCraft E",
                        //     width: 40,
                        //     height: 100,
                        //     points: [],
                        //     color: "red",
                        //     rotation: 0
                        // }
                        //],


                    }
                }

                )
            }



            data.map((img, key) => {
                outarr[rowindex].push(img)
                if ((key + 1) % ann_data.modified.columns == 0) {
                    rowindex++;
                    outarr[rowindex] = [];
                }

            })
            //full image set 
          
            localStorage.setItem('rows', ann_data.modified.rows);
            localStorage.setItem('columns', ann_data.modified.columns);
            //  console.log(outarr)
            this.setState({
                ...this.state,
                row: ann_data.modified.rows,
                col: ann_data.modified.columns,
                location: localStorage.getItem('locationMap'),
                timestamp: params.ref+params.cur,
               // file: file,
               ref:params.ref,
               cur:params.cur,
                images: this.state.images.concat(outarr)

            })
        } else {

            this.props.history.push('/dashboard/locations');
        }



        //api call with id params

    }





    goBack = () => {
        this.setState({
            ...this.state,
            activeOptionCode: null,
            activeOptionStatus: false
        })
    }



    render() {
        return (
            <React.Fragment>
                <div style={{ marginTop: "5.5rem", position: 'relative', backgroundColor: 'white' }}>

                    <div className="imgloadcrop">
                        {this.state.images.map((imgcontainer, ckey) => (
                            <div key={ckey} className="d-flex">

                                {imgcontainer.map((img, ikey) => (
                                    <div style={{ margin: '1px', cursor: "pointer" }} className="imgcontainer_insta" key={img.path} onClick={() => {
                                        this.openImg(img, ckey, ikey)
                                    }}>

                                        <ImageContainer key={img.img_id} data={img.data} path={`assets/images/spliceLocation/${this.state.location}/${this.state.timestamp}/current/${img.path}.jpg`} />

                                        {/* <img  src={img.path} /> */}
                                    </div>
                                ))}
                            </div>
                        )

                        )
                        }
                    </div>
                  

                   

                </div>

            </React.Fragment>
        );
    }
}

export default ImageStitch;