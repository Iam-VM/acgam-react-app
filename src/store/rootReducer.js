import {combineReducers} from 'redux';
import {firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";
import authReducer from "./auth/reducer";

export default combineReducers({
   auth: authReducer,
   firebase: firebaseReducer,
   firestore: firestoreReducer
});
