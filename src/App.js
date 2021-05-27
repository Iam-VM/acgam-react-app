import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import CertGen from "./components/home";
import Login from "./components/login";
import Error404 from "./components/error/Error404";
import {AuthenticatedOnlyRoute, UnAuthenticatedRoute} from "./PrivateRoutes";
import {useEffect} from "react";
import firebase_FIREBASE from "./firebase";
import {useDispatch} from "react-redux";
import SendCerts from "./components/home/body/sendCerts";


function App () {
    const dispatch = useDispatch();

    useEffect(() => {
        firebase_FIREBASE.auth().onAuthStateChanged((user) => {
            dispatch({type: 'SET_UID', uid: (user)?user.uid:null});
        })
    }, []);


    return (
        <Router>
            <Switch>
                <AuthenticatedOnlyRoute exact path={"/"}>
                    <Route component={CertGen} />
                </AuthenticatedOnlyRoute>
                <UnAuthenticatedRoute path={"/login"}>
                    <Route component={Login} />
                </UnAuthenticatedRoute>
                <Route component={Error404} />
            </Switch>
        </Router>
    );
}


export default App;
