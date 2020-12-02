import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from "react-router-dom";

class GetStart extends Component {
    render() {
        return (
            <section className="section section-lg bg-get-start">
            <div className="bg-overlay"></div>
            <Container>
                <Row>
                    <Col lg={{size : 8, offset:2}} className="text-center">
                        <h1 className="get-started-title text-white">Let's Get Started</h1>
                        <div className="section-title-border margin-t-20 bg-white"></div>
                        <p className="section-subtitle font-secondary text-white text-center padding-t-30">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. </p>
                        <Link to="#" className="btn btn-bg-white waves-effect margin-t-20 mb-4">Get Started <i className="mdi mdi-arrow-right"></i> </Link>
                    </Col>
                </Row>
            </Container>
            <div className="bg-pattern-effect">
                <img src="assets/images/bg-pattern-light.png" alt="pattern"/>
            </div>
        </section>
        );
    }
}

export default GetStart;