import {useEffect, useRef, useState} from "react";
import axios from "axios";
import SocketIOClient from 'socket.io-client';
import NetworkError from "../../error/networkError";
import SendingCerts from "./sendingCerts";

const execution_mode = process.env.REACT_APP_MODE;


const SendCerts = ({setBodyState}) => {
    // const domain = (execution_mode === 'development') ? 'http://localhost:4000/':'https://acgam.herokuapp.com';

    const eventNameRef = useRef(null);
    const templateRef = useRef(null);
    const fileRef = useRef(null);
    const [eventList, setEventList] = useState([]);
    const [loading, setLoading] = useState(null);
    const [fileError, setFileError] = useState(0);
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [resError, setResError] = useState(null);
    const [resOkay, setResOkay] = useState(null);
    const [loadEventsStatus, setLoadEventsStatus] = useState(true);
    const [networkStatus, setNetworkStatus] = useState(true);
    const [sendingCertsFlag, setSendingCertsFlag] = useState(false);
    const [log, setLog] = useState("sending certificate to John doe...");


    // const socket = SocketIOClient(domain);


    /*
    * fileError - 0 - No error at all
    * fileError - 1 - File not added
    * fileError - 2 - Unsupported file format
    * fileError - 3 - File size larger than expected
    * TODO: Add File size larger error
    * */

    useEffect(() => {
        setLoading(true);
        axios.get('private/event/fetch-all')
            .then((res) => {
                if (res.status === 200) {
                    setEventList(res.data.reverse());
                    setLoadEventsStatus(true);
                    setLoading(false);
                }
                else {
                    setLoadEventsStatus(false);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.log("get error")
                setNetworkStatus(false);
                setLoadEventsStatus(false);
                setLoading(false);
            })
    }, []);

    const formSubmitHandler = (e) => {
        e.preventDefault();
        setSendingCertsFlag(true);
        if (fileRef.current.files[0] === null) {
            setFileError(1);
            return;
        }
        setFileError(0)
        const formData = new FormData();
        formData.append('eventID', eventNameRef.current.value);
        formData.append('templateName', templateRef.current.value);
        formData.append('file', fileRef.current.files[0]);
        setResError(null);
        setResOkay(null);
        axios.post('/private/send', formData)
            .then((res) => {
                console.log(res.data)
                switch (res.status) {
                    case 200:
                        if (["CSV File Poorly Formatted", "Certificate Template Not Found"].includes(res.data)) {
                            setResError(res.data);
                            setSendingCertsFlag(false);
                            break;
                        }
                        setResError(null);
                        setResOkay(res.data);
                        setSendingCertsFlag(false);
                        break;
                    case 500:
                        setResError(res.data);
                        setResOkay(null);
                        setSendingCertsFlag(false);
                        break;
                    default:
                        setResOkay(null);
                        setResError("Some Unknown Issues Occurred");
                        setSendingCertsFlag(false);
                        break;
                }
            })
            .catch(err => {
                setSendingCertsFlag(false);
                setResError("Couldn't connect to server...");
            });
    }

    const fileChangeHandler = () => {
        setSubmitDisabled(false);
        setFileError(0);
        console.log(fileRef.current.files[0].type)
        if (!['text/csv', 'text/comma-separated-values', 'application/csv'].includes(fileRef.current.files[0].type)) {
            setSubmitDisabled(true);
            setFileError(2);
            fileRef.current.value = "";
        }
    }

    return (
        (loading) ? <div>Loading...</div>:
            (!networkStatus) ? <NetworkError setBodyState={setBodyState} />:
                (!loadEventsStatus) ? <div>Sorry, there was a problem while fetching events!!</div>:
                    (sendingCertsFlag) ? <SendingCerts socket={null} setSendingCertsFlag={setSendingCertsFlag} log={log} />:
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
                                <option value={"SB Template - Coordinators"}>SB Template - Coordinators</option>
                                <option value={"SB Template - Participants"}>SB Template - Participants</option>
                                <option value={"SB Template - Volunteers"}>SB Template - Volunteers</option>
                                <option value={"SB Template - Winners"}>SB Template - Winners</option>
                                <option value={"CS Template - Participants"}>CS Template - Participants</option>
                                <option value={"CS Template - Winners"}>CS Template - Winners</option>
                                <option value={"IAS Template - Participants"}>IAS Template - Participants</option>
                                <option value={"IAS Template - Winners"}>IAS Template - Winners</option>
                                <option value={"WIE Template - Participants"}>WIE Template - Participants</option>
                                <option value={"WIE Template - Winners"}>WIE Template - Winners</option>
                            </select>
                        </label>
                        <label>
                            <input type="file" name={"uploadedFile"} ref={fileRef} onChange={fileChangeHandler} />
                            <p>{fileError === 2 ? "Unsupported file format" : null}</p>
                        </label>
                        {<p>{resError}</p>}
                        {<p>{resOkay}</p>}
                        <input type="submit" name={"Send"} disabled={submitDisabled} />
                    </form>
                    <button onClick={() => setBodyState('root')}>Back</button>
                </div>
    );
};

export default SendCerts;
