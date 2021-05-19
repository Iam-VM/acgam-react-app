import axios from "axios";
import FileDownload from 'js-file-download';



const Home = ({setBodyState}) => {

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
            <div>
                <button onClick={() => downloadCsvTemplate("coordinators")}>Download coordinators CSV Template</button>
                <button onClick={() => downloadCsvTemplate("participants")}>Download participants CSV Template</button>
                <button onClick={() => downloadCsvTemplate("winners")}>Download winners CSV Template</button>
            </div>
            <div>
                <button onClick={() => setBodyState("eventAdd")}>Add an Event</button>
            </div>
            <div>
                <button onClick={() => setBodyState("sendCerts")}>Mail Certificates</button>
            </div>
        </div>
    );
}


export default Home;
