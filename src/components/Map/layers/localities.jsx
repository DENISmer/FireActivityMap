import {URL_FOR_COORDS, URL_FOR_FILES, URL_FOR_USER} from '../../../config/config'
import {Marker, Polygon, Polyline, Popup, useMapEvents} from "react-leaflet";
import L from 'leaflet';
import {settlements} from "../../../data/coordinateFiles/settlement_out2";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Context} from "../Context";
import markerStyleForCities from './localities.module.css'
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import MarkerClusterGroup from "react-leaflet-cluster";

function GetIcon(_iconSize,name,isOrdinary,type) {
    const locationStyle ={
        DESIGNATED: markerStyleForCities.designatedLocalityName,
        ORDINARY_CITY: markerStyleForCities.ordinaryLocalityCityName,
        ORDINARY_TOWN: markerStyleForCities.ordinaryLocalityTownName,
        ORDINARY_VILLAGE: markerStyleForCities.ordinaryLocalityVillageName,
        ORDINARY_HAMLET: markerStyleForCities.ordinaryLocalityHamletName
        
    }
    return L.divIcon({
        className: !isOrdinary ? locationStyle.DESIGNATED :
            (type === 'city') ? locationStyle.ORDINARY_CITY :
            (type === 'town') ? locationStyle.ORDINARY_TOWN :
            (type === 'village') ? locationStyle.ORDINARY_VILLAGE : locationStyle.ORDINARY_HAMLET,

        html: name,

        iconSize: [_iconSize],
    })
}


export function Settlements(props){

    const localNamesArray = []
    const [refreshTokenCookies,setRefreshTokenCookie,removeRefreshTokenCookie] = useCookies(['refreshToken','accessToken']);

    const navigate = useNavigate();

    const [settlementArray, setSettlementArray] = useState([]);
    const [context,setContext] = useContext(Context)
    const [zoomLevel,setZoomLevel] = useState(props.map.getZoom())
    const [zoomStart,setZoomStart] = useState(false)

    let setArr = [];




    const mapEvents = useMapEvents({
        zoomstart: () =>{
            setZoomStart(true)
        },
        zoomend: () => {
            setZoomStart(false)
            setZoomLevel(props.map.getZoom())

            return props.map.getZoom();
        },
    });


    const requestForSettlements = async () => {//запрос данных на массив id населенных пунктов
        let localSettlements;
        try{
            await axios.get(`${URL_FOR_FILES.URL_FOR_SETTLEMENTS}?date=${context.currentDate}&list_ids=${true}`,
                {
                    headers: {
                        Authorization: `Bearer ${refreshTokenCookies['accessToken']}`
                    }
                })
                .then(
                response =>{
                    console.log(response.data['settlement_ids'].length)
                    if(response.data['settlement_ids'].length > 0){
                        console.log(response.data)
                        localSettlements = response.data['settlement_ids']
                        return response.data
                    }
                    else setSettlementArray([])
                }
            )
                .catch(error =>{
                    if(error.request.status === 403 || error.request.status === 401){
                        axios(URL_FOR_USER.URL_REFRESH,
                            {
                                method : 'POST',
                                data : {
                                    refresh_token: refreshTokenCookies['refreshToken']
                                }
                            })
                            .then(async response => {
                                await setRefreshTokenCookie('accessToken', response.data.access, 5 * 3600)
                                console.log(response.data)
                            })
                            .catch((e) => {
                                navigate('/')
                                removeRefreshTokenCookie('refreshToken')
                            })
                    }
                    else if(error.request.status >= 500){
                        console.log(error.message)
                    }
                })
        }
        catch (e){
            console.log(e.message)
        }
        return await localSettlements
    }



    useEffect(() => {
        try{
            requestForSettlements().then((requestData) => {
                if(!requestData){
                    setSettlementArray([])
                }
                else{
                    for(let i = 0;i < requestData.length;i++) {
                        //localSettLementArray.push(settlements[requestData[i].toString()])
                        localNamesArray.push(requestData[i].toString())
                    }
                }
            }).then(()=>{
                setArr = [];
                for(let key in settlements){
                if(localNamesArray.includes(key)) {
                    setArr.push({base: settlements[key], isOrdinary: false})
                    console.log(settlements[key].name)
                }
                else {
                    setArr.push({base: settlements[key], isOrdinary: true})
                }
            }
                setSettlementArray(setArr)
            })
        }
        catch (e){
            console.log(e.message)
        }

    },[context])




    return<>
        {settlementArray.map((pnt, index) => (!pnt.isOrdinary &&
            <Marker
            icon={GetIcon(40,pnt.base.name,false,pnt.base.type)}
            key={index}
            position={new L.LatLng(Number(pnt.base.latitude), Number(pnt.base.longitude))}>
            </Marker>
        ))}

        {!zoomStart ? <div>{zoomLevel <= 8 && settlementArray.map(((item, index) => ( item.isOrdinary &&(item.base.latitude && item.base.longitude && (item.base.type === "city"))
            && <Marker
                icon={GetIcon(40, item.base.name, item.isOrdinary, item.base.type)}
                key={index}
                position={new L.LatLng(Number(item.base.latitude), Number(item.base.longitude))}>
            </Marker>)))}

        {zoomLevel >= 9 && settlementArray.map(((item,index) => (item.isOrdinary && ((item.base.latitude && item.base.longitude) && (item.isOrdinary) && ((item.base.type === "town") || (item.base.type === "city")))
            && <Marker
            icon={GetIcon(40,item.base.name,item.isOrdinary,item.base.type)}
            key={index}
            position={new L.LatLng(Number(item.base.latitude), Number(item.base.longitude))}>
            </Marker>)))}


        {zoomLevel >= 12  && settlementArray.map(((item,index) => ((((item.base.latitude && item.base.longitude)) && (item.isOrdinary) && ((item.base.type === "village") || (item.base.type === "town") || (item.base.type === "city")))
                && <div>{
                item.base.poly && <Polyline color={'cyan'} positions={item.base.poly}/>}
                <MarkerClusterGroup
                    key={Date.now()}
                    singleMarkerMode={false}

                >
                    <Marker
                    icon={GetIcon(40,item.base.name,item.isOrdinary,item.base.type)}
                    key={index}
                    position={new L.LatLng(Number(item.base.latitude), Number(item.base.longitude))}>
                </Marker>
                </MarkerClusterGroup>
        </div>
            )))}
            {zoomLevel >= 15  && settlementArray.map(((item,index) => ((((item.base.latitude && item.base.longitude)) && (item.isOrdinary) && (item.base.type === "hamlet"))
                && <div>{
                    item.base.poly && <Polyline color={'cyan'} positions={item.base.poly}/>}
                    <MarkerClusterGroup
                        key={Date.now()}
                        singleMarkerMode={false}

                    >
                        <Marker
                            icon={GetIcon(40,item.base.name,item.isOrdinary,item.base.type)}
                            key={index}
                            position={new L.LatLng(Number(item.base.latitude), Number(item.base.longitude))}>
                        </Marker>
                    </MarkerClusterGroup>
                </div>
            )))}
    </div> : null}
    </>
}
//