import loginStyles from "./styles/loginStyles.module.css";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { Button, Container, Form, Row } from "react-bootstrap";
import Img from "../../assets/images/logo.png";

const Login = () => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [credentialError, setCredentialError] = useState(null);
  const emailVal = useRef(null);
  const passwordVal = useRef(null);
  const history = useHistory();
  const firebase = useFirebase();

  // TEST: delete it after use
  const auth = useSelector((state) => state.firebase.auth);

  const verifyEmailAndPassword = () => {
    if (emailVal.current.value === "" || passwordVal.current.value === "") {
      setCredentialError("Please Enter Email and password");
      return 0;
    }
    return 1;
  };

  const handleLoginButtonClick = (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    console.log("reached before if");
    // TEST
    if (verifyEmailAndPassword()) {
      console.log(emailVal.current.value);
      firebase
        .login({
          email: emailVal.current.value,
          password: passwordVal.current.value,
        })
        .then((user) => {
          history.push("/");
        })
        .catch((err) => {
          setCredentialError(err);
          emailVal.current.value = "";
          passwordVal.current.value = "";
          setButtonDisabled(false);
        });
    }
  };

  return (
    <Container
      fluid
      className={`${loginStyles.loginContainer} ${loginStyles.boxCenter}`}
    >
      <Row className={`${loginStyles.loginRow} ${loginStyles.boxCenter}`}>
        <div
          className={`col-12 ${loginStyles.sectionTop} ${loginStyles.boxCenter}`}
        >
          <img src={Img} alt='img here ' className={loginStyles.heroImg} />
          <h1>ACGAM</h1>
          <h3>Welcome Back :)</h3>
        </div>
        <div
          className={`col-12 ${loginStyles.sectionBottom} ${loginStyles.boxCenter}`}
        >
          <Form className={`col-md-6 m-5 ${loginStyles.loginForm}`}>
            <Form.Group controlId='formBasicEmail'>
              <Form.Control
                type='email'
                placeholder='Enter email'
                ref={emailVal}
                required
              />
              <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
              <Form.Control
                type='password'
                placeholder='Password'
                ref={passwordVal}
                required
              />
            </Form.Group>

            <Button
              size='sm'
              variant='primary'
              type='submit'
              disabled={buttonDisabled}
              onClick={(e) => handleLoginButtonClick(e)}
              className={loginStyles.submitBtn}
            >
              Submit
            </Button>
          </Form>
        </div>
      </Row>
    </Container>
  );
};

export default Login;
