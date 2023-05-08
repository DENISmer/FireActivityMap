import {URL_FOR_COORDS, URL_FOR_FILES} from '../../../config/config'
import {Marker, Polyline, Popup} from "react-leaflet";
import L from 'leaflet';
import {settlements} from "../../../data/coordinateFiles/settLements";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Context} from "../Context";

function GetIcon(_iconSize) {
    return L.icon({
        iconUrl: require("../../../icons/locality/black-24dp/1x/outline_location_city_black_24dp.png"),
        iconSize: [_iconSize]
    })
}


export function SettLements(){

    let localSettLementArray=[];
    const [settlementArray, setSettlementArray] = useState([]);
    const [context,setContext] = useContext(Context)


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
            <Marker
                icon={GetIcon(20,20,pnt.name)}
                key={index}
                position={new L.LatLng(Number(pnt.latitude), Number(pnt.longitude))}>
                <Popup>{pnt.name}</Popup>
            </Marker>
        ))}

    </>
}