import loginStyles from "./styles/loginStyles.module.css";
import {useRef, useState} from "react";
import {useSelector} from "react-redux";
import {useHistory} from 'react-router-dom';
import {useFirebase} from "react-redux-firebase";
import {isLoaded, isEmpty} from "react-redux-firebase";


const Login = () => {
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [credentialError, setCredentialError] = useState(null);
    const emailVal = useRef(null);
    const passwordVal = useRef(null);
    const history = useHistory();
    const firebase = useFirebase();

    // TEST: delete it after use
    const auth = useSelector(state => state.firebase.auth);


    const verifyEmailAndPassword = () => {
        if (emailVal.current.value === "" || passwordVal.current.value === "") {
            setCredentialError("Please Enter Email and password")
            return 0;
        }
        return 1;
    };


    const handleLoginButtonClick = (e) => {
        e.preventDefault();
        setButtonDisabled(true);

        // TEST
        if (true || verifyEmailAndPassword()) {
            firebase.login({email: process.env.REACT_APP_TEST_EMAIL, password: process.env.REACT_APP_TEST_PWORD})
                .then((user) => {
                    history.push('/');
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
        <div className={loginStyles.container}>
            <div className={loginStyles.loginTextHeader}>Login</div>
            <input type="text" ref={emailVal} placeholder={'email'} required />
            <input type="password" ref={passwordVal} placeholder={'password'} required />
            <div>{credentialError}</div>
            <button disabled={buttonDisabled} onClick={(e) => handleLoginButtonClick(e)}>Log In</button>
            {/*{isLoaded(auth)?<p>Auth is loaded</p>:<p>auth is not loaded</p>}*/}
            {/*{!isEmpty(auth)?<p>User is authenticated</p>:<p>user is not authenticated</p>}*/}
        </div>
    );
};


export default Login;
