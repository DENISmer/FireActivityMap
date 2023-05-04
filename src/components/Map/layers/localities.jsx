import {URL_FOR_COORDS} from '../../../config/config'
import {Marker, Polyline, Popup} from "react-leaflet";
import L from 'leaflet';
import Icon from 'leaflet';
import {useEffect, useState} from "react";
import icon from '../../../icons/2x/outline_maps_home_work_black_24dp.png'

function GetIcon(_iconSize) {
    return L.icon({
        iconUrl: require("../../../icons/red_dot_marker.png"),
        iconSize: [_iconSize]
    })
}


export function SettLements(){

    let reply
    let localSettLementArray=[];
    const [settLementArray, setLementArray] = useState();
    const [active, setActive] = useState(false);


    const request = async() =>{

        try {
            return await require(`../../../${URL_FOR_COORDS.SETTLEMENTS}`)
        }
        catch (e) {
            console.log(e)
        }
    }

    reply = request()


    useEffect(() => {
        request().then(response =>{
            setActive(true)
            for (let index in response){
                if (response.hasOwnProperty(index)){
                    // console.log(reply[index].name + '\n', 'longitude: ' + reply[index].longitude + '\n', 'latitude: ' + reply[index].latitude)
                    localSettLementArray.push({name: response[index].name, longitude: response[index].longitude,latitude: response[index].latitude})
                }
            }
            setLementArray(localSettLementArray)
            // console.log('useEffect: ' + settLementArray)
            // console.log(localSettLementArray[0].name)
        })
    },[])

    // console.log(localSettLementArray)
    // console.log('NOT useEffect: ' + settLementArray)

    return<>
        {active && localSettLementArray.map((pnt, index) => (
            <Marker
                key={index}
                icon={GetIcon(10,10)}
                position={new L.LatLng(pnt.longitude, pnt.latitude)}>
                <Popup>{pnt.name}</Popup>
            </Marker>
        ))}
    </>
}