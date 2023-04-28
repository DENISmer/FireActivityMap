import '../../../data/coordinateFiles/NatureReservesCoords.json'
import {Polyline} from "react-leaflet";


export function NatureReserves(){

    let reply

    const request = () =>{

        try {
            return require(`../../../data/coordinateFiles/NatureReservesCoords.json`)
        }
        catch (e) {
            console.log(e)
        }
    }

    reply = request()

    return<>
        {reply.map((port => <Polyline positions={port} color={'red'}/>))}
    </>
}