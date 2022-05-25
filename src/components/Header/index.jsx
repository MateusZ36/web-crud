import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

import logoApp from '../../images/logo.png';

import './style.css';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import React from "react";

function Header() {
	return(
		<header>
			<Navbar expand='md'>
				<Container>
					<Navbar.Brand to='/dashboard' as={Link}>
						<img src={logoApp} alt='Logo App' width='70' />
					</Navbar.Brand>

					<Navbar.Toggle className="toggle-icon">
						<i className="fa fa-bars" style={{color: 'white'}}></i>
					</Navbar.Toggle>

					<Navbar.Collapse className="justify-content-end">
						<Nav.Link to="/department" as={Link}>Departamento</Nav.Link>
						<Nav.Link to="/category" as={Link}>Categorias</Nav.Link>
						<Nav.Link to="/patrimony" as={Link}>Patrimônios</Nav.Link>
						<Navbar.Text className="divisor" />
						<Nav.Link href="/">Sair</Nav.Link>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<ToastContainer
				position="bottom-center"
				theme="colored"
				autoClose={10000}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</header>
	);
}

export default Header;