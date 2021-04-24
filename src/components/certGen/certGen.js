import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {useFirebase, isLoaded, useFirestoreConnect, isEmpty,} from "react-redux-firebase";
import {useEffect, useState} from "react";


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



    useEffect(() => {
        console.log("insiude useEffect")
        if (firestoreState !== undefined) {
            if (firestoreState.data !== undefined) {
                if (firestoreState.data.users !== undefined) {
                    if (firestoreState.data.users[auth.uid] !== undefined) {
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


    useFirestoreConnect({
        collection: 'users',
        doc: auth.uid
    })



    // const user = useSelector(state => state.firestore.data.users)[auth.uid];


    const signOut = () => {
        // firebase_firebase.auth().signOut()
        //     .then(() => {
        //         history.push('/login');
        //     })
        //     .catch((err) => {
        //
        //     });
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
            <div>
                <div>Hello, {userState.name}.</div>
                <button onClick={signOut}>Sign Out</button>
                {/*{isLoaded(auth)?<p>Auth is loaded</p>:<p>auth is not loaded</p>}*/}
                {/*{!isEmpty(auth)?<p>User is authenticated</p>:<p>user is not authenticated</p>}*/}
            </div>
        </div>
    );
}


export default CertGen;
