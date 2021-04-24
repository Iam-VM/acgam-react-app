import loginStyles from "./styles/loginStyles.module.css";
import {useRef, useState} from "react";
import {useSelector} from "react-redux";
import {useHistory} from 'react-router-dom';
import {useFirebase} from "react-redux-firebase";
import {isLoaded, isEmpty} from "react-redux-firebase";
import firebase_FIREBASE from "../../firebase";


const LogIn = () => {
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [credentialError, setCredentialError] = useState(null);
    const emailVal = useRef(null);
    const passwordVal = useRef(null);
    const history = useHistory();
    const firebase = useFirebase();

    // TEST: delete it after use
    const auth = useSelector(state => state.firebase.auth);
    const data = useSelector(state => state.firebase.data);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);


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

            firebase_FIREBASE.auth().signInWithEmailAndPassword( emailVal.current.value,  passwordVal.current.value)
                .then((user) => {
                    history.push('/');
                })
                .catch((err) => {
                    setCredentialError(err);
                    emailVal.current.value = "";
                    passwordVal.current.value = "";
                    setButtonDisabled(false);
                });

            // firebase.login({email: "vishnumohanantheking@gmail.com", password: "hellohello123"})
            //     .then((user) => {
            //         console.log("reached here")
            //         history.push('/');
            //         console.log("reached here")
            //     })
            //     .catch((err) => {
            //         console.log(err)
            //         setCredentialError(err);
            //         emailVal.current.value = "";
            //         passwordVal.current.value = "";
            //         setButtonDisabled(false);
            //     });
        }
    };


    return (
        <div className={loginStyles.container}>
            <div className={loginStyles.loginTextHeader}>Login</div>
            <input type="text" ref={emailVal} placeholder={'email'} required />
            <input type="password" ref={passwordVal} placeholder={'password'} required />
            <div>{credentialError}</div>
            <button disabled={buttonDisabled} onClick={(e) => handleLoginButtonClick(e)}>Log In</button>
            {isLoaded(auth)?<p>Auth is loaded</p>:<p>auth is not loaded</p>}
            {!isEmpty(auth)?<p>User is authenticated</p>:<p>user is not authenticated</p>}
        </div>
    );
};


export default LogIn;
