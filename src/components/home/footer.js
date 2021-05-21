import { Nav, Navbar } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const footer = () => {
  return (
    <div>
      <Navbar bg="light" expand="lg" className="sticky-bottom">
        <Nav className="ml-auto ">
          <Nav.Link
            href="https://github.com/Computer-Society-Chapter/acgam-react-app"
            target="_blank"
          >
            <FaGithub />
          </Nav.Link>
          <Nav.Link
            href="https://www.linkedin.com/company/ieeesbgecpkd"
            target="_blank"
          >
            <FaLinkedin />
          </Nav.Link>
          <Nav.Link
            href="https://www.instagram.com/ieeesbgecpkd"
            target="_blank"
          >
            <FaInstagram />
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};

export default footer;
