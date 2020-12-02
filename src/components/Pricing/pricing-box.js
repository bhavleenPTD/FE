import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Col } from "reactstrap";

class PricingBox extends Component {
    render() {
        return (
            <React.Fragment>
                {
                    this.props.pricings.map((pricing, key) =>
                        <Col lg={4} key={key} >
                            <div className={pricing.isActive ? "text-center pricing-box bg-white hover-effect price-active" : "text-center pricing-box hover-effect"}>
                                <h4 className="text-uppercase">{pricing.title}</h4>
                                <h1>${pricing.price}</h1>
                                <h6 className="text-uppercase text-muted">Billing Per {pricing.duration}</h6>
                                <div className="pricing-border"></div>
                                <div className="plan-features margin-t-30">
                                    {
                                        pricing.features.map((feature, key) =>
                                            <p key={key}>{feature.title}: <b className="text-custom">{feature.value}</b></p>
                                        )
                                    }
                                </div>
                                <Link to="#" className="btn btn-custom waves-effect waves-light margin-t-30">Join Now</Link>
                            </div>
                        </Col>
                    )
                }
            </React.Fragment>
        );
    }
}

export default PricingBox;