import {Redirect, Route} from "react-router-dom";
import {isLoaded, isEmpty} from "react-redux-firebase";
import {useSelector} from "react-redux";


// TODO: Add isEmpty(auth) in the conditional statement

export const AuthenticatedOnlyRoute = ({children, ...rest}) => {
    const auth = useSelector(state => state.firebase.auth);

    if (auth.uid === undefined) {
        return <div> There was a Problem while authenticating</div>
    }

    console.log(isLoaded(auth)?"Auth is loaded":"auth is not loaded")
    console.log(!isEmpty(auth)?"User is authenticated":"user is not authenticated");


    return (
        <Route {...rest}
        render={() => {
            if (isLoaded(auth)) {
                console.log("reached here")
                if (isEmpty(auth)) return <Redirect to={'/login'} />
                else return (children)
            }
            else {
                return <div>loading</div>
            }
        }}
        />
    )
};

export const UnAuthenticatedRoute = ({children, ...rest}) => {
    const auth = useSelector(state => state.firebase.auth);

    console.log(isLoaded(auth)?"Auth is loaded":"auth is not loaded")
    console.log(!isEmpty(auth)?"User is authenticated":"user is not authenticated");


    return (
        <Route {...rest}
               render={() => {
                   if (isLoaded(auth)) {
                       if (!isEmpty(auth)) return <Redirect to={'/'} />
                       else return (children)
                   }
                   else {
                       return <div>loading</div>
                   }
               }}
        />
    )
};
