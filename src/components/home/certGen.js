import {Redirect, useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {useFirebase, isLoaded, useFirestoreConnect, isEmpty,} from "react-redux-firebase";
import {useEffect, useState} from "react";
import axios from 'axios';

import NavBar from "./navBar";
import Body from "./body/index";
import Footer from "./footer";

const CertGen = () => {
    const auth = useSelector(state => state.firebase.auth);
    useFirestoreConnect({
        collection: 'users',
        doc: auth.uid
    })
    const history = useHistory();
    const firebase = useFirebase();
    const firestoreState = useSelector(state => state.firestore)
    const [userState, setUserState] = useState({
        name: "",
        role: "",
        picture: ""
    });


    // TODO: Redirect to CertGen if null
    useEffect(() => {
        console.log("insiude useEffect")
        if (firestoreState) {
            if (firestoreState.data) {
                if (firestoreState.data.users) {
                    if (firestoreState.data.users[auth.uid]) {
                        const user = firestoreState.data.users[auth.uid];
                        setUserState({
                            name: user.name,
                            role: user.role,
                            picture: user.picture
                        })
                    }
                }
            }
        }
    }, [])

    axios.interceptors.request.use(async config => {
        config.headers.idToken = await firebase.auth().currentUser.getIdToken()
        return config
    }, (error) => {
        return Promise.reject(error)
    })


    useFirestoreConnect({
        collection: 'users',
        doc: auth.uid
    })


    const signOut = () => {
        firebase.logout()
            .then(() => {
                history.push('/login');
            })
            .catch((err) => {
                //TODO: handle logout error
            })
    };


    return (
        <div>
            <NavBar userState={userState} signOut={signOut} />
            <Body />
            <Footer />
        </div>
    );
}


export default CertGen;
