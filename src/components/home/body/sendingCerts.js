import {useEffect, useState} from "react";

const SendingCerts = ({socket, setSendingCertsFlag}) => {
    const [log, setLog] = useState("log log");

    // useEffect(() => {
    //     socket.on('log', (data) => {
    //        setLog(data);
    //     });
    // });
    return (
        <div>
            <div>Loading...</div>
            <div>
                {log}
            </div>
        </div>
    );
};

export default SendingCerts;
