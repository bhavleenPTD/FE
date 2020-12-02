import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';

//Import Section Title
import SectionTitle from "../common/section-title";
import { EmpHTTP } from '../Interceptors/empInterceptor';
import LogInMessage from './logInMessage';
import TileBox from "./tilesBox";

class Tiles extends Component {
    constructor(props) {
        super(props);
    
    }

    componentDidMount(){
       
    }

    render() {
        return (
            <section className="section bg-light" style={{paddingTop:"7rem"}} id="blog">
            <Container>
             <LogInMessage user={this.props.user}/>
                {/* section title */}
                <SectionTitle title={this.props.data.title } desc={this.props.data.desc} />

                <Row className="margin-t-30">
                    {/* blog box */}
                    <TileBox tiles={this.props.data.tiles} />
                </Row>

            </Container>
        </section>
        );
    }
}

export default Tiles;