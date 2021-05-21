import {Modal, Button} from 'react-bootstrap';
import buttonStyle from './styles/certGenStyles.module.css'

export const preSignOut = () => {

}
const ConfirmSignOut = (props) => {
    return (
    <>
      <Modal {...props}  animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Out</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure?</Modal.Body>
        <Modal.Footer>
          <Button className={buttonStyle.navButton} onClick={props.signOut}>
            Yes!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  }

export default ConfirmSignOut;
