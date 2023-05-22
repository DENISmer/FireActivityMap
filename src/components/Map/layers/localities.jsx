import {URL_FOR_COORDS, URL_FOR_FILES} from '../../../config/config'
import {Marker, Polygon, Polyline, Popup, useMapEvents} from "react-leaflet";
import L from 'leaflet';
import {settlements} from "../../../data/coordinateFiles/settlement_out";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Context} from "../Context";
import markerStyleForCities from './localities.module.css'

function GetIcon(_iconSize,name) {
    return L.divIcon({
        className: markerStyleForCities.pointName,
        html: name,
        iconSize: [_iconSize],
    })
}


export function SettLements(props){

    let localSettLementArray=[];
    const [settlementArray, setSettlementArray] = useState([]);
    const [context,setContext] = useContext(Context)
    const [zoomLevel,setZoomLevel] = useState(props.map.getZoom())

    const mapEvents = useMapEvents({
        zoomend: () => {
            console.log(props.map.getZoom())
            setZoomLevel(props.map.getZoom())

            return props.map.getZoom();
        },
    });

    const requestForSettlements = async () => {//запрос данных на массив id населенных пунктов
        let localSettlements;
        try{
            await axios.get(`${URL_FOR_FILES.URL_FOR_SETTLEMENTS}?date=${context.currentDate}&list_ids=${true}`).then(
                response =>{
                    console.log(response.data['settlement_ids'].length)
                    if(response.data['settlement_ids'].length > 0){
                        console.log(response.data)
                        localSettlements = response.data['settlement_ids']
                        return response.data
                    }
                }
            )
        }
        catch (e){
            console.log(e.message)
        }
        return await localSettlements
    }



    useEffect(() => {
        try{
            requestForSettlements().then((requestData) => {
                for(let i = 0;i < requestData.length;i++){
                    localSettLementArray.push(settlements[0][requestData[i]])
                }
                setSettlementArray(localSettLementArray)
                console.log(localSettLementArray)
            });
        }
        catch (e){
            console.log(e.message)
        }

    },[context])

    return<>
        {settlementArray.map((pnt, index) => (
            //{zoomLevel >}
            //console.log(pnt.poly[0])
            //pnt.poly !== null && <Polygon positions={[pnt.poly][0]} color={'red'}/>
            <Marker
                icon={GetIcon(40,pnt.name + pnt.population + pnt.type)}
                key={index}
                position={new L.LatLng(Number(pnt.latitude), Number(pnt.longitude))}>
            </Marker>
        ))}

    </>
}