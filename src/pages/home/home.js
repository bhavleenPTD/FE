import React, { Component } from 'react';

import NavbarPage from "../../components/Navbar/Navbar_Page";
import Section from './section';
import Footer from "../../components/Footer/footer";

class Index9 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navItems : [              
                { id: 1 , idnm : "home", navheading: "Home" },
               
            ],
            navClass : ""
        };
    }
    

    render() {
        return (
            <React.Fragment>

                {/* Importing Navbar */}
                <NavbarPage navItems={this.state.navItems} navClass={this.state.navClass} show={localStorage.getItem('userToken')!=null?true:false}/>
                <Section/>
                {/* <Footer/> */}
            </React.Fragment>
        );
    }
}

export default Index9;