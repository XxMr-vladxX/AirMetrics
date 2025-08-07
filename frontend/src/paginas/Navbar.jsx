import {Navbar, Nav, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Logo from './AirMetrics.png';

function Navegacion(){
    return(
        <>
            <Navbar className='navBase' expand='lg'>
                <Container className='navLeft'>
                    <img src={Logo} height={75} width={75} alt='Logo.png'/>
                    <h1 style={{marginLeft: 10, color: '#c2cfb3'}}>AirMetrics</h1>
                </Container>
                <Navbar className='navRight' expand='lg'>
                    <Container>
                        <Navbar.Collapse id='basic-navbar-nav'>
                            <Nav className='menu'>
                                <Nav.Link as={Link} to='/'>Inicio</Nav.Link>
                                <Nav.Link as={Link} to='/login'>Dashboard</Nav.Link>
                                <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Navbar>
        </>
    );
}

export default Navegacion;