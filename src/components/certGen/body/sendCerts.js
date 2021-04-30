import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {postJson} from '../../../lib/postJson';


const SendCerts = ({setBodyState}) => {
    const eventNameRef = useRef(null);
    const templateRef = useRef(null);
    const fileRef = useRef(null);
    const recipientTypeRef = useRef(null);
    const [eventList, setEventList] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fileError, setFileError] = useState(0);
    /*
    * fileError - 0 - No error at all
    * fileError - 1 - File not added
    * fileError - 2 - Unsupported file format
    * fileError - 3 - File size larger than expected
    * TODO: Add File size larger error
    * */

    useEffect(() => {
        axios.get('private/event/fetch-all')
            .then((res) => {
                setEventList(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log('Error occurred' + err);
            })
    }, []);

    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (fileRef.current.files[0] === null) {
            setFileError(1);
        }
        setFileError(0)
        const formData = new FormData();
        formData.append('eventName', eventNameRef.current.value);
        formData.append('templateType', templateRef.current.value);
        formData.append('recipientType', recipientTypeRef.current.value);
        formData.append('file', fileRef.current.files[0]);
        axios.post('/private/send', formData)
            .then((res) => {

            })
            .catch(err => {
                console.log("error occurred while sending form");
            });
    }

    const fileChangeHandler = () => {
        setFileError(0);
        if (fileRef.current.files[0].type !== 'text/csv') {
            setFileError(2);
            fileRef.current.value = "";
        }
    }

    return (
        <div>
            <form onSubmit={formSubmitHandler}>
                <label>
                    Choose the event:
                    <select ref={eventNameRef} name={"eventName"} disabled={loading}>
                        {(eventList !== null) ? eventList.map((event) => <option key={event.id} value={event.id}>{event.eventName}</option>) : <option>loading</option>}
                    </select>
                </label>
                <label>
                    Choose a Template:
                    <select ref={templateRef} name={"templateName"}>
                        <option value={"SB Template"}>SB Template</option>
                        <option value={"CS Template"}>CS Template</option>
                        <option value={"IAS Template"}>IAS Template</option>
                        <option value={"WIE Template"}>WIE Template</option>
                    </select>
                </label>
                <label>
                    Certificate for:
                    <select ref={recipientTypeRef} name={"recipientType"}>
                        <option value={"Coordinators"}>Coordinators</option>
                        <option value={"Volunteers"}>Volunteers</option>
                        <option value={"Participants"}>Participants</option>
                        <option value={"Winners"}>Winners</option>
                    </select>
                </label>
                <label>
                    <input type="file" name={"uploadedFile"} ref={fileRef} onChange={fileChangeHandler} />
                    <p>{fileError === 2 ? "Unsupported file format" : null}</p>
                </label>
                <input type="submit" name={"Send"} disabled={([1, 2].includes(fileError))}/>
            </form>
            <button onClick={() => setBodyState('root')}>Back</button>
        </div>
    );
};

export default SendCerts;
