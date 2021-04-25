import {useRef} from "react";
import {useFirestore} from "react-redux-firebase";

const AddEvent = () => {
    const eventNameRef = useRef("");

    const handleAddEventSubmission = (e) => {
        e.preventDefault();

        // TODO: Add event to postgres
        

    }


    return (
        <div>
            <input type="text" ref={eventNameRef} placeholder={"enter event name"} />
            <button type={"submit"} onClick={handleAddEventSubmission}>Add</button>
        </div>
    );
};

export default AddEvent;
