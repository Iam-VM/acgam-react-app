import {useRef, useState} from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import {postJson} from "../../../lib/postJson";


const AddEvent = ({setBodyState}) => {
    const eventNameRef = useRef("");
    const [startDate, setStartDate] = useState(new Date());
    const handleAddEventSubmission = (e) => {
        e.preventDefault();
        postJson('/private/event/add', {startDate, eventName: eventNameRef.current.value});
    }


    return (
        <div>
            <div>
                <input type="text" ref={eventNameRef} placeholder={"enter event name"} />
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                <button type={"submit"} onClick={handleAddEventSubmission}>Add</button>
            </div>
            <button onClick={() => setBodyState('root')}>Back</button>
        </div>
    );
};

export default AddEvent;
