import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
class HeaderComp extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	render() {
		return (
			<div id="headerblock">
				<Navbar bg="dark" variant="dark">
					<Navbar.Brand href="#home">
						<img
							alt=""
							src="/logo.svg"
							width="30"
							height="30"
							className="d-inline-block align-top"
						/>{' '}
						Annotate Map
					</Navbar.Brand>
				</Navbar>
			</div>
		);
	}
}

export default HeaderComp;
