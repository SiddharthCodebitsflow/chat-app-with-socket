import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
function Header(props) {
    return (
        <Navbar expand="lg" className="bg-primary text-white container">
            <Container fluid>
                <Link href="/" className='text-white'>Logo</Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 d-flex text-white w-100 d-flex justify-content-between my-lg-0 "
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="#action1" className='text-white'>Home</Nav.Link>
                        <Form className="d-flex me-5">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-white text-white border border-white">Search</Button>
                        </Form>
                    </Nav>
                    <Button className='border border-white' onClick={props.logOut}>Logout</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;