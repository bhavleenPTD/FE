import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
    Container,
    Row,
    Col
} from "reactstrap";

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
                <section className="section bg-home home-half" id="home">
                    <div className="bg-overlay"></div>
                    <div className="display-table">
                        <div className="display-table-cell">
                            <Container>
                                <Row>
                                    <Col lg={{size:8, offset:2}} className="text-white text-center">
                                        <h1 className="home-title">We help startups launch their products</h1>
                                        <p className="padding-t-15 home-desc">Etiam sed.Interdum consequat proin vestibulum class at.</p>
                                        <p className="play-shadow margin-t-30 margin-l-r-auto"><Link to="#" onClick={this.callModal} className="play-btn video-play-icon"><i className="mdi mdi-play text-center"></i></Link></p>  
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </div>
                    <div className="bg-pattern-effect">
                        <img src="assets/images/bg-pattern.png" alt="dorsin"/>
                    </div>
                    {/* Render ModalSection Component for Modal */}
                    <ModalSection ref="child" channel='vimeo' videoId='99025203' />
                </section>
            </React.Fragment>
        );
    }
}

export default Section;