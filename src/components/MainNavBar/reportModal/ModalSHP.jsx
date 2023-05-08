import modalStyle from './modalStyle.module.css';
import React, {useContext, useState} from 'react';
import {Context} from "../../Map/Context";
import {URL_FOR_FILES} from "../../../config/config";
import axios from "axios";
import {subjectNames} from "../../../config/config";


export function ModalReportSHP ({active, setActive}){


    const [context, setContext] = useContext(Context)
    const [pdfDateTime,setPdfDateTime] = useState(context.currentDate)
    const [pdfSubjectTag,setPdfSubjectTag] = useState()
    const [cloudShielding,setCloudShielding] = useState()
    const [operatorFullName,setOperatorFullName] = useState()
    const [readyToTheNextPage,setReadyToTheNextPage] = useState(false)
    const URL = `${URL_FOR_FILES.URL_PDF}?date_time=${pdfDateTime}&cloud_shielding=${cloudShielding}&operator_fio=${operatorFullName}&subject_tag=${pdfSubjectTag}`


    const checkStates = async () => {//проверка на наличие пдф по введенным данным
        if(!pdfDateTime || !pdfSubjectTag || !cloudShielding || !operatorFullName){
            alert("Проверьте введенные данные")
            return false
        }
        else{
            await axios.get(URL).then(response => {
                if(response.status === 200){
                    if(typeof response.data === 'object'){
                        if(response.data.file_inf){
                            alert(`Error: ${response.data.file_inf}\nОшибка: нет данных по вашему запросу`)//данные введены верно, но данных нет
                            setReadyToTheNextPage(false)
                        }
                        else if(response.data.fields_error){
                            console.log(`Error: ${response.data.fields_error}\nОшибка: данные введены неверно`)//данные введены верно
                            setReadyToTheNextPage(false)
                        }
                    }
                    else{//если данные введены правильно и создан/есть отчет за выбранный период
                        console.log("ready to next page", URL)
                        setReadyToTheNextPage(true)
                    }
                }
                else{
                    alert(`${response.status} network error`)
                    setReadyToTheNextPage(false)
                }
            }).catch(e => {
                console.log(e.message);
                setReadyToTheNextPage(false)
            })
        }
    }


    const toThePdf = () => {//открывает URL в новой вкладке, если проверка прошла успешна
        window.open(URL, "_blank")
    }

    return<>
        <div className={active ? `${modalStyle.modal} ${modalStyle.modal_active}` : modalStyle.modal} onClick={()=> setActive(false)}>
            <div className={active ? `${modalStyle.modal_content} ${modalStyle.modal_content_active}` : modalStyle.modal_content} onClick={e => e.stopPropagation()}>


                <div className={modalStyle.modal_div}>
                    <label className={modalStyle.modal_label}>Дата и время</label>

                    <input  type={"datetime-local"} className={modalStyle.modal_input}

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


                {readyToTheNextPage ?
                    <button className={`${modalStyle.modal_button} ${modalStyle.modal_button_open}`} onClick={() => toThePdf()} >Открыть отчет</button>
                    :
                    <button className={modalStyle.modal_button} onClick={() => checkStates()}>Проверить наличие данных</button>}
            </div>
        </div>
    </>
}

