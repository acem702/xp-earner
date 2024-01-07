import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'; // Import the user icon

const AppHeader = () => {
    const navigate = useNavigate();
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand
                onClick={() => {
                    navigate('/');
                }}
            >
                XP-EARNER
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto"></Nav>
                <Nav>
                    <Link to="/login" className="nav-link">
                        Login
                    </Link>
                    <Link to="/register" className="nav-link">
                        Sign Up
                    </Link>
                    <Link to="/profile" className="nav-link">
                        <FontAwesomeIcon
                            icon={faUser}
                            style={{ marginRight: '5px' }}
                        />
                        Profile
                    </Link>
                    <Link to="/">
                        <Button variant="danger">Logout</Button>
                    </Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default AppHeader;
