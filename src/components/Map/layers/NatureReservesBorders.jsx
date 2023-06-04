import  {URL_FOR_COORDS} from '../../../config/config'
import {Polygon, Polyline} from "react-leaflet";


export function NatureReserves(){

    let reply

    const request = () =>{

        try {
            return require(`../../../${URL_FOR_COORDS.NATURE_RESERVES_COORDS}`)
        }
        catch (e) {
            console.log(e)
        }
    }

    reply = request()

    return<>
        {reply.map((port => <Polygon positions={port} color={'yellowgreen'}/>))}
    </>


}