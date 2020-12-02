import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './home.css'
import {
    Container,
    Row,
    Col
} from "reactstrap";

//Import Particles
import Particles from 'react-particles-js';

//Importing Modal
import ModalSection from '../../components/common/ModalSection';

class Section extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: false
        }
        this.callModal.bind(this)
    }

    callModal = () => {
        this.refs.child.openModal();
    }
  
    render() {
        return (
            <React.Fragment>
                <section className="section bg-home height-100vh" id="home">
            <div className="bg-overlay">
            <Particles style={{height:"92vh"}}
                                params={{
                                    "particles": {
                                        "number": {
                                            "value": 140
                                        },
                                        "size": {
                                            "value": 4
                                        }
                                    },
                                    "interactivity": {
                                        "events": {
                                            "onhover": {
                                                "enable": true,
                                                "mode": "repulse"
                                            }
                                        }
                                    },
                                    "move" : {
                                        "radius" : 1
                                    }
                                }}
                            />
            </div>
            <div className="">
                <div className="">
                    <Container className="slidero" style={{zIndex:"59"}}>
                        <Row>
                            <Col lg={{size:8, offset :2}} className="text-white text-center">
                                <h1 className="home-title">Welcome To CofyView</h1>
                                <p className="padding-t-15 home-desc"><h3>Satellite Image Annotation Tool</h3></p>
                                {/* <p className="play-shadow margin-t-30 margin-l-r-auto"><Link to="#" onClick={this.callModal} className="play-btn video-play-icon"><i className="mdi mdi-play text-center"></i></Link></p>   */}
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
            {/* Render ModalSection Component for Modal */}
            <ModalSection ref="child" channel='vimeo' videoId='99025203' />
        </section>
            </React.Fragment>
        );
    }
}

export default Section;