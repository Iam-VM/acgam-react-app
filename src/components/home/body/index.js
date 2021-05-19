import {useState} from "react";
import AddEvent from "./addEvent";
import Home from "./home";
import SendCerts from "./sendCerts";

const Body = () => {
    const [bodyState, setBodyState] = useState("root");

    return (
        (bodyState === "eventAdd")?
            <AddEvent setBodyState={setBodyState} />:
            ((bodyState === "root")?
                <Home setBodyState={setBodyState} />:
                <SendCerts setBodyState={setBodyState} />)
    );
}

export default Body;
