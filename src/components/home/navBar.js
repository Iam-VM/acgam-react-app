import { useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import ConfirmSignOut from './confirmSignOut';
import logo from '../../assets/images/logo.png';
import styles from './styles/certGenStyles.module.css';

const NavBar = ({ userState, signOut }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand className={styles.avatar}>
          <div className={styles.circle}>
            <span class={styles.initials}>{userState.name[0]}</span>
          </div>
        </Navbar.Brand>
        <Nav>
        <Nav.Link className={styles.logo}>
          <img alt="" src={logo} width="93" height="43" />{' '}
        </Nav.Link>
        </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link>
              <Button
                className={styles.navButton}
                onClick={() => {
                  setShow(true);
                }}
              >
                Sign Out
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <ConfirmSignOut
          show={show}
          signOut={signOut}
          onHide={() => setShow(false)}
        ></ConfirmSignOut>
      </Navbar>
    </>
  );
};

export default NavBar;
