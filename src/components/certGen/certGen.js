import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {useFirebase, isLoaded, useFirestoreConnect, isEmpty,} from "react-redux-firebase";

import homeStyles from "./styles/homeStyles.module.css";



const CertGen = () => {
    const history = useHistory();
    const firebase = useFirebase();
    const auth = useSelector(state => state.firebase.auth);


    useFirestoreConnect({
        collection: 'users',
        doc: auth.uid
    })


    const firestoreState = useSelector(state => state.firestore)
    console.log(firestoreState)
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
                <div>Hello, {}</div>
                <button onClick={signOut}>Sign Out</button>
                {isLoaded(auth)?<p>Auth is loaded</p>:<p>auth is not loaded</p>}
                {!isEmpty(auth)?<p>User is authenticated</p>:<p>user is not authenticated</p>}
            </div>
        </div>
    );
}


export default CertGen;
