import {Navbar, Nav, Container, Modal} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Logo from './AirMetrics.png';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function Navegacion2(){
    const [showModal, setShowModal]=useState(false);    //Controla la visibilidad del modal
    const navigate=useNavigate();

    const handleOpen=() => {   //Muestra el modal para confirmar el cierre de sesion
        setShowModal(true);
    };
    const confirmLogout=() => {   //Cierra el modal y regresa a la pagina de login
        setShowModal(false);
        navigate('/login');
    };
    const handleClose=() => {   //Cierra el modal y evita el cierre de sesion
        setShowModal(false);
    };

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
                                <Nav.Link as={Link} to='/home'>Inicio</Nav.Link>
                                <Nav.Link as={Link} to='/dashboard'>Dashboard</Nav.Link>
                                <Nav.Link onClick={handleOpen}>Logout</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Navbar>

            <Modal className='modal' show={showModal} onHide={handleClose} backdrop={false} animation={false}>
                <Modal.Header style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#6f9e74', padding: '10px'}}>
                    <Modal.Title style={{fontSize: '24px', color: '#f3f3f3'}}>Cierre de sesion</Modal.Title>
                    <button className='x-button' onClick={handleClose}>x</button>
                </Modal.Header>
                <Modal.Body style={{fontSize: '20px', padding: '10px'}}>¿Esta seguro que quiere cerrar la sesion?</Modal.Body>
                <Modal.Footer style={{marginTop: '35px', padding: '10px'}}>
                    <button className='confirm-button' style={{marginLeft: '80px'}} onClick={confirmLogout}>Cerrar sesion</button>
                    <button className='cancel-button' style={{marginLeft: '15px'}} onClick={handleClose}>Cancelar</button>
                </Modal.Footer>
            </Modal>
            <Modal className='modal-backdrop' show={showModal} onHide={handleClose} backdrop={false} animation={false}></Modal>
        </>
    );
}

export default Navegacion2;