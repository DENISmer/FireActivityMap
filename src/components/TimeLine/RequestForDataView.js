import {URL_FOR_MARKS} from "../../config/config";
import axios from "axios";

export async function RequestForDataView(){
    let sendResp;
    await axios.get(URL_FOR_MARKS.URL_GET_INFO).then(response => {
        sendResp = response.data
        //console.log(sendResp)
        }
    )
    .catch(error => {
        // console.log(error.message)
    })
    return sendResp
}