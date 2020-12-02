import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

class ImageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,

        }
    }


//     showOverlay = (val) => {
//  console.log(val);
//         this.setState({
//             ...this.state,
//             isShow: val
//         })

//     }

    render() {


        return (
            <React.Fragment>
                <div

                   className="hovercontainer"
                    style={{ position: "relative" }}
                >

                    <div style={{
                        background: this.props.data.annotations.length !=0 ?
                            "linear-gradient(rgba(255, 0, 0, 0.2),rgba(255, 0, 0, 0.2))" :
                            "linear-gradient(rgba(0, 215, 15, 0.2),rgba(0, 215, 15, 0.2))",

                    }}
             className="imagecontainerlazyload"
                    >
                        <div className="annot_data" >
                        
                                <span style={{width:"90%",fontSize:'6rem'}}>
                                 {this.props.data.annotations.length}
                               </span>
                        </div>


                    </div>


                    <img
                        src={this.props.path} // use normal <img> attributes as props
                    />

                </div>


            </React.Fragment>
        )
    }
}


export default ImageContainer;