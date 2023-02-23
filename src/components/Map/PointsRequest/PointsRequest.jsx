import 'axios'
import axios from "axios";

export async function PointsRequest(date){
    const url = `http://192.168.56.1:8080/api/fires/points/?date=`;
    const promise = await axios.get(`${url}${date}`)
        return await promise.then((data)=>{
            return data.data.points
        })
}