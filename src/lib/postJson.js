import axios from "axios";

export const postJson = (url, data) => {
    const headerConfig = {
        'Content-Type': 'application/JSON'
    };

    axios.post(url,
        JSON.stringify(data), {headers: headerConfig})
        .then(() => {
            console.log('POST JSON request sent')
        })
        .catch((err) => {
            console.log('POST JSON unable to send request');
        });
};

