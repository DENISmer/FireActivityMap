import modalStyle from './modalStyle.module.css';
import React, {useContext, useState} from 'react';
import {Context} from "../../Map/Context";
import {URL_FOR_FILES} from "../../../config/config";
import axios from "axios";
import {value} from "lodash/seq";
import {slidingWindow} from "react-horizontal-scrolling-menu";
import {isEmpty} from "lodash";
import {isRouteErrorResponse} from "react-router-dom";

async function checkStates(pdfDateTime,pdfSubjectTag,cloudShielding,operatorFullName, url) {
    if(!pdfDateTime || !pdfSubjectTag || !cloudShielding || !operatorFullName){
        console.log('undef: ', pdfDateTime,pdfSubjectTag,cloudShielding,operatorFullName)
        return false
    }
    else{
        await axios.get(url).then(response => {
            if(response.status === 200){
                if(typeof response.data === 'object'){
                    if(response.data.file_inf){
                        console.log(response.data.file_inf)//данные введены верно, но данных нет
                        return false
                    }
                    else if(response.data.fields_error){
                        console.log(response.data.fields_error)//данные введены верно
                        return false
                    }
                }
                else{//если данные введены правильно и создан/есть отчет за выбранный период
                    console.log("ready to next page", url)
                    return true;
                }
            }
            else{
                console.warn('network error')
                return false
            }
        }).catch(e => {
            console.log(e.message);
            return false
        })
    }
    //window.open(URL,"_blank")
}
export function ModalReport ({active, setActive}){

    const subjectNames = [
        {name: 'Алтайский край', tag: 'ALTAY'},
        {name: 'Республика Бурятия', tag: 'BUR'},
        {name: 'Республика Алтай', tag: 'GALTAY'},
        {name: 'Иркутская область', tag: 'IRK'},
        {name: 'Кемеровская область', tag: 'KEM'},
        {name: 'Республика Хакасия', tag: 'KHAK'},
        {name: 'Ханты-Мансийский автономный округ - Югра', tag: 'HMAO'},
        {name: 'Красноярский край', tag: 'KRSN'},
        {name: 'Новосибирская область', tag: 'NSK'},
        {name: 'Омская область', tag: 'OMSK'},
        {name: 'Республика Саха (Якутия)', tag: 'SAHA'},
        {name: 'Томская область', tag: 'TOMSK'},
        {name: 'Республика Тыва', tag: 'TUVA'},
        {name: 'Тюменская область', tag: 'TUM'},
        {name: 'Ямало-Ненецкий автоноиный округ', tag: 'YANAO'},
        {name: 'Забайкальский край', tag: 'ZAB'}
    ]

    const [context, setContext] = useContext(Context)
    const [pdfDateTime,setPdfDateTime] = useState(context.currentDate)
    const [pdfSubjectTag,setPdfSubjectTag] = useState()
    const [cloudShielding,setCloudShielding] = useState()
    const [operatorFullName,setOperatorFullName] = useState()
    const [settlementsArray,setSettlementsArray] = useState()
    const [settlementsIsActive,setsettlementsIsActive] = useState(false)
    const URL = `${URL_FOR_FILES.URL_PDF}?date_time=${pdfDateTime}&cloud_shielding=${cloudShielding}&operator_fio=${operatorFullName}&subject_tag=${pdfSubjectTag}`

    let requestReady = false
    const requestForSettlements = () => {//запрос данных на массив id населенных пунктов
        try{
            axios.get(`${URL_FOR_FILES.URL_FOR_SETTLEMENTS}?date=${context.currentDate}&list_ids=${true}`).then(
                async response =>{
                    console.log(response.data['settlement_ids'].length)
                    if(response.data['settlement_ids'].length > 0){
                        await setSettlementsArray(response.data['settlement_ids'])
                        await setsettlementsIsActive(true)
                    }
                }
            )
        }
        catch (e){
            console.log(e.message)
        }
    }

    const fioToGet = (e,value) => {
        let localArray = value.split('')
        let fioResult;
        for(let cell in localArray){
            if(localArray[cell] === ' '){
                localArray[cell] = `+`
            }
        }
        setOperatorFullName(localArray.join(''))
        console.log(localArray.join(''))
    }
    const checkStatess = async () => {
        if(!pdfDateTime || !pdfSubjectTag || !cloudShielding || !operatorFullName){
            console.log('undef: ', pdfDateTime,pdfSubjectTag,cloudShielding,operatorFullName)
            return false
        }
        else{
           await axios.get(URL).then(response => {
                if(response.status === 200){
                    if(typeof response.data === 'object'){
                        if(response.data.file_inf){
                            console.log(response.data.file_inf)//данные введены верно, но данных нет
                            return false
                        }
                        else if(response.data.fields_error){
                            console.log(response.data.fields_error)//данные введены верно
                            return false
                        }
                    }
                    else{//если данные введены правильно и создан/есть отчет за выбранный период
                        console.log("ready to next page", URL)
                        return true;
                    }
                }
                else{
                    console.warn('network error')
                    return false
                }
            }).catch(e => {
                console.log(e.message);
                return false
            })
        }
        //window.open(URL,"_blank")
    }
        //`${URL_FOR_FILES.URL_PDF}?date_time=${'2022-11-12T12:15'}&subject_tag=${pdfSubjectTag}&cloud_shielding=${cloudShielding}&operator_fio=${operatorFullName}`
    return<>
        <div className={active ? `${modalStyle.modal} ${modalStyle.modal_active}` : modalStyle.modal} onClick={()=> setActive(false)}>
            <div className={active ? `${modalStyle.modal_content} ${modalStyle.modal_content_active}` : modalStyle.modal_content} onClick={e => e.stopPropagation()}>
                    <div className={modalStyle.modal_div}>
                        <label className={modalStyle.modal_label}>date_time</label>

                        <input  type={"datetime-local"} className={modalStyle.modal_input}

                                value={pdfDateTime}
                                onChange={(e) => setPdfDateTime(e.target.value)}/>
                    </div>

                    <div className={modalStyle.modal_div}>
                        <label className={modalStyle.modal_label}>subject_tag</label>

                        <input list={'browsers'} type={"text"} className={modalStyle.modal_input}
                               placeholder={'Введите название и выберите регион'}
                               value={pdfSubjectTag}
                               onClick={""}
                               onChange={(e) => setPdfSubjectTag(e.target.value)}/>

                        <datalist id="browsers" >
                            {subjectNames.map((settlement,index)=>(<option key={index} value={settlement.tag}>{settlement.name}</option>)
                            )}
                        </datalist>
                    </div>

                    <div className={modalStyle.modal_div}>
                        <label className={modalStyle.modal_label}>cloud_shielding</label>

                        <input type={"number"} className={modalStyle.modal_input}
                               value={cloudShielding}
                               onChange={(e) => setCloudShielding(e.target.value)}/>
                    </div>

                    <div className={modalStyle.modal_div}>
                        <label className={modalStyle.modal_label}>operator_fio</label>

                        <input type={"text"} className={modalStyle.modal_input}
                               value={operatorFullName}
                               onChange={(e) => fioToGet(e,e.target.value)}/>
                    </div>
                <button onClick={() => checkStates(pdfDateTime,pdfSubjectTag,cloudShielding,operatorFullName,URL).then(response => {window.open(URL,"_blank")})}>check states</button>
                    <a className={modalStyle.modal_button} href={`${URL_FOR_FILES.URL_PDF}?date_time=${pdfDateTime}&cloud_shielding=${cloudShielding}&operator_fio=${operatorFullName}&subject_tag=${pdfSubjectTag}`} target={"_blank"} value={"Сохранить отчёт"}>сформировать</a>
            </div>
        </div>
    </>
}

