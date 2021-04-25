import {useState} from "react";
import AddEvent from "./addEvent";
import Root from "./root";
import SendCerts from "./sendCerts";

const Body = () => {
    const [bodyState, setBodyState] = useState("root");

    return (
        (bodyState === "eventAdd")?
            <AddEvent />:
            ((bodyState === "root")?
                <Root setBodyState={setBodyState} />:
                <SendCerts />)
    );
}

export default Body;
