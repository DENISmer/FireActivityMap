import {URL_FOR_MARKS} from "../../config/config";
import axios from "axios";

export async function RequestForDataView(){
    return await axios.get(URL_FOR_MARKS.URL_GET_INFO)
    .catch(error => {
        console.log(error.message)
    })
}