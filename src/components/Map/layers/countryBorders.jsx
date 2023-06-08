import {URL_FOR_COORDS} from '../../../config/config'
import {Polyline} from "react-leaflet";


export function CounrtyBorders(){

    let reply

    const request = () =>{

        try {
            return require(`../../../${URL_FOR_COORDS.COUNTRY_COORDS}`)
        }
        catch (e) {
            // console.log(e)
        }
    }

    reply = request()

    return<>
        {reply.map((port => <Polyline positions={port} color={'#ff00a8'}/>))}
    </>
}