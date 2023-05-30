import modalStyle from './modalStyle.module.css';
import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../Map/Context";
import {URL_FOR_FILES, URL_FOR_USER} from "../../../config/config";
import axios from "axios";
import {subjectNames} from "../../../config/config";
import {disableMapDragging,enableMapDragging} from "../../Map/MapEvents/MapEvents";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import {SetModalTimeDecorator} from "./SetModalTimeDecorator";
import dayjs from "dayjs";

export function ModalReportPDF ({active, setActive,map}){

    const [refreshTokenCookies,setRefreshTokenCookie,removeRefreshTokenCookie] = useCookies(['refreshToken','accessToken']);

    const navigate = useNavigate()

    const [context, setContext] = useContext(Context)
    const [pdfDateTime,setPdfDateTime] = useState(dayjs().format("YYYY-MM-DDThh:mm"))
    const [pdfSubjectTag,setPdfSubjectTag] = useState()
    const [cloudShielding,setCloudShielding] = useState()
    const [operatorFullName,setOperatorFullName] = useState()
    const [readyToTheNextPage,setReadyToTheNextPage] = useState(false)
    const URL = `${URL_FOR_FILES.URL_PDF}?date_time=${pdfDateTime}&cloud_shielding=${cloudShielding}&operator_fio=${operatorFullName}&subject_tag=${pdfSubjectTag}`

    const setTimeFromContext = () => {
        if(context.min_datetime){
            setPdfDateTime(dayjs(context.min_datetime).format("YYYY-MM-DDThh:mm"))
        }
        else if(context.currentDate){
            setPdfDateTime(dayjs(context.currentDate  + 'T00:00').format("YYYY-MM-DDThh:mm"))
        }

        return null
    }
    useEffect(() => {
        setTimeFromContext()
    },[])

    useEffect(() => {
        setReadyToTheNextPage(false)
    },[operatorFullName,cloudShielding,pdfSubjectTag,pdfDateTime])

    const checkStates = async () => {//проверка на наличие пдф по введенным даннымsetPdfDateTime(context.currentDate + 'T00:00')
        if(!pdfDateTime || !pdfSubjectTag || !cloudShielding || !operatorFullName){
            alert("Проверьте введенные данные")
            return false
        }
        else{
            await axios.get(URL,{
                headers: {
                    Authorization : `Bearer ${refreshTokenCookies['accessToken']}`
                }
            })
                .then(response => {
                if(response.status === 200){
                    if(typeof response.data === 'object'){
                        if(response.data.file_info){
                            alert(`Error: ${response.data.file_info}\nОшибка: нет данных по вашему запросу`)//данные введены верно, но данных нет
                            setReadyToTheNextPage(false)
                        }
                        else if(response.data.fields_error){
                            console.log(`Error: ${response.data.fields_error}\nОшибка: данные введены неверно`)//данные введены верно
                            setReadyToTheNextPage(false)
                        }
                    }
                    else{//если данные введены правильно и создан/есть отчет за выбранный период
                        setReadyToTheNextPage(true)
                    }
                }
                else{
                    alert(`${response.status} network error`)
                    setReadyToTheNextPage(false)
                }
            })
                .catch(e => {
                console.log(e.response.data);
                if(e.request.status === 403 || e.request.status === 401){
                    axios(URL_FOR_USER.URL_REFRESH,
                        {
                            method : 'POST',
                            data : {
                                refresh_token: refreshTokenCookies['refreshToken']
                            }
                        })
                        .then(response => {
                            setRefreshTokenCookie('accessToken', response.data.access, 5 * 3600)
                            console.log(response.data)
                        })
                        .catch((e) => {
                            navigate('/')
                            removeRefreshTokenCookie('refreshToken')
                        })
                }
                else if(e.response.data.file_info === "1"){
                    alert(`Error: ${e.response.data.file_info}\nОшибка: нет данных по вашему запросу`)//данные введены верно, но данных нет
                }
                else if(e.response.data.fields_error) {
                    alert(`Error: ${e.response.data.fields_error}\nОшибка: не все поля заполнены`)
                }

                setReadyToTheNextPage(false)
            })
        }
    }

    const fioToGet = (e,value) => {//пробелы в ФИО заменяет на "+" работает при onChange
        let localArray = value.split('')
        for(let cell in localArray){
            if(localArray[cell] === ' '){
                localArray[cell] = `+`
            }
        }
        setOperatorFullName(localArray.join(''))
    }

    const toThePdf = () => {//открывает URL в новой вкладке, если проверка прошла успешна
        window.open(URL, "_blank")
    }

    return<>
        <div className={active ? `${modalStyle.modal} ${modalStyle.modal_active}` : modalStyle.modal}
             onClick={()=> setActive(false)}
             onMouseDown={()=> disableMapDragging(map)}
             onMouseUp={() => enableMapDragging(map)}
        >


            <div className={active ? `${modalStyle.modal_content} ${modalStyle.modal_content_active}` : modalStyle.modal_content}
                 onClick={e => e.stopPropagation()}>


                <div className={modalStyle.modal_div}>
                        <label className={modalStyle.modal_label}>Дата и время</label>

                        <input  type={"datetime-local"} id={'dateTime'} className={modalStyle.modal_input}

                                value={pdfDateTime}
                                onChange={(e) => {
                                    setPdfDateTime(e.target.value)
                                    setReadyToTheNextPage(false)
                                }}/>
                    </div>


                    <div className={modalStyle.modal_div}>

                        <label className={modalStyle.modal_label}>Район обнаружения ТВВ</label>

                        <input list={'browsers'} type={"text"} className={modalStyle.modal_input}
                               placeholder={'Введите название и выберите регион'}
                               value={pdfSubjectTag}
                               onClick={""}
                               onChange={(e) => {
                                   setPdfSubjectTag(e.target.value)
                                   setReadyToTheNextPage(false)
                               }}/>

                        <datalist id="browsers" >
                            {subjectNames.map((settlement,index)=>(<option key={index} value={settlement.tag}>{settlement.name}</option>)
                            )}
                        </datalist>
                    </div>


                    <div className={modalStyle.modal_div}>

                        <label className={modalStyle.modal_label}>Экранирование облачностью</label>

                        <input type={"number"} className={modalStyle.modal_input}
                               value={cloudShielding}
                               onChange={(e) => {
                                   setCloudShielding(e.target.value)
                                   setReadyToTheNextPage(false)
                               }}/>
                    </div>


                    <div className={modalStyle.modal_div}>

                        <label className={modalStyle.modal_label}>Ф.И.О Оператора</label>

                        <input type={"text"} className={modalStyle.modal_input}
                               value={operatorFullName}
                               onChange={(e) => {
                                   fioToGet(e, e.target.value)
                                   setReadyToTheNextPage(false)
                               }}/>
                    </div>

                {readyToTheNextPage ?
                    <button className={`${modalStyle.modal_button} ${modalStyle.modal_button_open}`} onClick={() => toThePdf()} >Открыть отчет</button>
                    :
                    <button className={modalStyle.modal_button} onClick={() => checkStates()}>Проверить наличие данных</button>}
            </div>
        </div>
    </>
}

