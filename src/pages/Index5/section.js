import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

class Section extends Component {
    
    render() {
        return (
            <React.Fragment>
        <section className="home-padding-t-150 position-relative" id="home" style={{backgroundImage : `url(assets/images/img-2.jpg)`, backgroundSize : 'cover', backgroundPosition : 'center' }}>
            <div className="bg-overlay"></div>
            <div className="display-table">
                <div className="home-cell-bottom">
                    <Container>
                        <Row>
                            <Col lg={{size:8, offset:2}} className="text-white text-center">
                                <h1 className="home-title">We help startups launch their products</h1>
                                <p className="padding-t-15 home-desc">Etiam sed.Interdum consequat proin vestibulum class at a euismod mus luctus quam.Lorem ipsum dolor sit amet, consectetur adipisicing eli.</p>
                                <Link to="#" className="btn btn-custom margin-t-20">Get Started</Link>
                                <img src="assets/images/home-dashboard.png" alt="dashboard" className="img-fluid center-block margin-t-20" />  
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </section>
            </React.Fragment>
        );
    }
}

export default Section;