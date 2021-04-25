import {useFirebase} from "react-redux-firebase";
import axios from "axios";
import {Link} from "react-router-dom";
import FileDownload from 'js-file-download';


const Root = ({setBodyState}) => {

    const downloadCsvTemplate = (templateName) => {
        axios({
            method: 'get',
            url: `/private/csv-template/${templateName}`,
            responseType: 'blob',
        })
            .then((response) => {
                FileDownload(response.data, `${templateName}.csv`);
            });
    };


    return (
        <div>
            <button onClick={() => setBodyState("eventAdd")}>Add an Event</button>
            <button onClick={() => downloadCsvTemplate("coordinators")}>Download coordinators CSV Template</button>
            <button onClick={() => downloadCsvTemplate("participants")}>Download participants CSV Template</button>
            <button onClick={() => downloadCsvTemplate("winners")}>Download winners CSV Template</button>
            <div>
            </div>
        </div>
    );
}


export default Root;
