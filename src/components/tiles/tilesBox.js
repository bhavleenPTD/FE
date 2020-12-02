import React, { Component } from 'react';
import { Col } from "reactstrap";
import { Link, withRouter } from "react-router-dom";

class TileBox extends Component {


    constructor(props) {
        super(props);

        this.state = {
            data: null,
            modal: false
        }



    }

    timeMap = (obj) => {
        localStorage.setItem('locationMap', obj.location);
        localStorage.setItem('locationId', obj._id);
        this.props.history.push('/dashboard/location/' + obj._id)
    }



    render() {
        return (
            <React.Fragment>
                {
                    this.props.tiles.map((tile, key) =>
                        <Col key={key} lg={4}>
                            <div className="tile-box margin-t-30 hover-effect" style={{cursor:'pointer'}} onClick={() => { this.timeMap(tile) }}>
                                <img src={tile.img_path} className="img-fluid" alt="tile" />
                                <div>
                                    <h5 className="mt-4 text-muted text-uppercase">{tile.location}</h5>
                                    <h4 className="mt-3"><Link to="#" className="blog-title text-capitalize"> {tile.country} </Link></h4>
                                    <p className="text-muted">Annotated Images for {tile.location}</p>
                                    {/* <div className="mt-3">
                                        <Link to="#" className="read-btn">Read More <i className="mdi mdi-arrow-right"></i></Link>
                                    </div> */}
                                </div>
                            </div>
                        </Col>
                    )

                }


            </React.Fragment>
        );
    }
}

export default withRouter(TileBox);