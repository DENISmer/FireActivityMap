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
    let localSettLementArray=[];

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
            console.log(props.map.getZoom())
            setZoomLevel(props.map.getZoom())

            return props.map.getZoom();
        },
    });

    for(let key in settlements){
        setArr.push(settlements[key])
    }

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
                for(let i = 0;i < requestData.length;i++){
                    //localSettLementArray.push(settlements[0][requestData[i]])
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
        {/*{settlementArray.map((pnt, index) => (*/}
        {/*    //{zoomLevel >}*/}
        {/*    //console.log(pnt.poly[0])*/}
        {/*    //pnt.poly !== null && <Polygon positions={[pnt.poly][0]} color={'red'}/>*/}
        {/*    <Marker*/}
        {/*        icon={GetIcon(40,pnt.name)}*/}
        {/*        key={index}*/}
        {/*        position={new L.LatLng(Number(pnt.latitude), Number(pnt.longitude))}>*/}
        {/*    </Marker>*/}
        {/*))}*/}

        {/*{settlements.map((item, index) => {for(let key in item){*/}
        {/*    <Polyline color={'black'} positions={item[key].poly}><Popup></Popup></Polyline>*/}
        {/*    //item[key].poly && console.log(item[key].poly)*/}
        {/*}})}*/}
        {/*{setArr.map(((item,index) => ((zoomLevel <= 8 && item.poly && (item.type === "city")) ||*/}
        {/*    (zoomLevel >= 7 && zoomLevel <= 9 && item.poly && (item.type === "town")))*/}
        {/*    && <Polyline color={'black'} positions={item.poly}><Popup>{item.name}</Popup></Polyline>))}*/}

        {!zoomStart ? <div>{zoomLevel <= 8 && setArr.map(((item, index) => ((item.latitude && item.longitude && (item.type === "city"))
            && <Marker
                icon={GetIcon(40, item.name, true, item.type)}
                key={index}
                position={new L.LatLng(Number(item.latitude), Number(item.longitude))}>
            </Marker>)))}

        {zoomLevel >= 9  && setArr.map(((item,index) => (((item.latitude && item.longitude) && ((item.type === "town") || (item.type === "city")))
            && <Marker
            icon={GetIcon(40,item.name,true,item.type)}
            key={index}
            position={new L.LatLng(Number(item.latitude), Number(item.longitude))}>
            </Marker>)))}

        {zoomLevel >= 12  && setArr.map(((item,index) => (((item.poly || (item.latitude && item.longitude)) && ((item.type === "village") || (item.type === "town") || (item.type === "city")))
            && <div><Marker
            icon={GetIcon(40,item.name,true,item.type)}
            key={index}
            position={new L.LatLng(Number(item.latitude), Number(item.longitude))}>
            </Marker>
        {item.poly && <Polyline color={'yellowgreen'} positions={item.poly}/>}
            </div>
            )))} </div> : null}
    </>
}