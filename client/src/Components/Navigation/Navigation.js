import React from 'react'; 
import { Button, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tilt from 'react-tilt'
import corona from './logo.png';
import whats from './whatsapp.png';
import {Link} from 'react-router-dom'
import Aux from "../../hoc/Taux";
import isAuthenticated, {initLogout} from "../../service/AuthService";
import {withRouter} from "react-router";


const Navigation = (props) => {
	return (

/*<nav class="navbar navbar-expand-lg navbar-light  navbar-collapse " id="basic-navbar-nav">
	    <div class="container">
	      	<div ClassName='ma4 mt0 mr-3' style={{paddingLeft : '10px'}}> 
            	<Tilt className="Tilt br2 shadow-2" options={{ max : 60 }} style={{ height: 90, width: 80 }} >
              		<div className="Tilt-inner pa2"><a href="/"><img style={{paddingTop : '2px'}} src={corona} /></a></div>
           		 </Tilt>
            </div>
	        <ul class="navbar-nav ml-auto">
	          <li class="nav-item h3"><a href="/" class="nav-link">Accueil </a></li>
	          <li class="nav-item h3"><a href="/Actualite" class="nav-link">Actualites </a></li>	         
	          <li class="nav-item h3"><a href="/contact-us" class="nav-link">Contact </a></li>
	          {isAuthenticated() ? <li className="nav-item"><a onClick={() => {
					  initLogout();
					  props.history.push('/auth/login')
          }} className="nav-link h3">Se déconnecter</a></li> : <Aux>
						<li className="nav-item"><a href="/auth/login" className="nav-link h3">Se connecter</a></li>
					</Aux>}
	        </ul>

	      </div>
</nav>*/




		<Navbar collapseOnSelect expand="lg" >
			<Navbar.Brand href="/">
				<Tilt className="Tilt br2 shadow-2" options={{ max: 60 }}  >
				<img style={{ paddingTop: '4px', width:80, height:80 }} src={corona} />
				</Tilt>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mr-auto">
				</Nav>
				<Nav>
				    <Nav.Link style={{fontSize:'16px'}} href="/">Accueil</Nav.Link>
					<Nav.Link style={{fontSize:'16px'}} href="/Actualite">Actualites</Nav.Link>
					<Nav.Link style={{fontSize:'16px'}} href="/ScanMenu">Analyse Medicale</Nav.Link>
					{/* <Nav.Link style={{fontSize:'16px'}} href="/flowers">Bonus</Nav.Link> */}
					{/* <Nav.Link style={{fontSize:'16px'}} href="/ozo_testing">OZO WILDFIRE</Nav.Link> */}
					<Nav.Link style={{fontSize:'16px'}} href="/contact-us" eventKey={2}>
						Contact
      				</Nav.Link>
					{isAuthenticated() ? <Nav.Link style={{fontSize:'16px'}} onClick={()=>{initLogout();props.history.push('/auth/login')}} href="">Se déconnecter</Nav.Link>: 
					 <Nav.Link style={{fontSize:'16px'}} href="/auth/login">Se connecter</Nav.Link>}
				</Nav>
			</Navbar.Collapse>
		</Navbar>

		);
}

export default withRouter(Navigation);
