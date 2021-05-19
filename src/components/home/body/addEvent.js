import {useRef, useState} from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";


const AddEvent = ({setBodyState}) => {
    const eventNameRef = useRef("");
    const [startDate, setStartDate] = useState(new Date());
    // Newly added
    const [loading, setLoading] = useState(false);
    const [addEventStatus, setAddEventStatus] = useState(null);
    const [networkStatus, setNetworkStatus] = useState(true);


    const handleAddEventSubmission = (e) => {
        e.preventDefault();

        // newly added
        const headerConfig = {
            'Content-Type': 'application/JSON'
        };
        setLoading(true);

        axios.post('/private/event/add',
            JSON.stringify({startDate, eventName: eventNameRef.current.value}), {headers: headerConfig})
            .then((res) => {
                // newly added
                setLoading(false);
                if (res.status === 200) {
                    setNetworkStatus(true);
                    setAddEventStatus(true);
                }
                else {
                    setNetworkStatus(true);
                    setAddEventStatus(false);
                }
            })
            .catch((err) => {
                // newly added
                setLoading(false);
                setNetworkStatus(false);
            });
    }


    return (
        <div>
            <div>
                <input type="text" ref={eventNameRef} placeholder={"enter event name"} />
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                {
                    (loading) ? <div>Loading</div>:
                    (networkStatus === false) ? <div>Sorry, Couldn't reach server.. !!</div>:
                        (addEventStatus === true) ? <div>Event Added Successfully</div>:
                            (addEventStatus === false) ? <div>Event not added, there were some issues.</div>:
                                null
                }
                <button type={"submit"} onClick={handleAddEventSubmission}>Add</button>
            </div>
            <button onClick={() => setBodyState('root')}>Back</button>
        </div>
    );
};

export default AddEvent;
