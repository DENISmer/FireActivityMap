import modalStyle from './modalStyle.module.css';
import React, {useContext, useState} from 'react';
import {Context} from "../../Map/Context";
import {URL_FOR_FILES} from "../../../config/config";
import axios from "axios";

export function ModalReport ({active, setActive}){

    const [context, setContext] = useContext(Context)
    const [pdfDateTime,setPdfDateTime] = useState(context.currentDate)
    const [pdfSubjectTag,setPdfSubjectTag] = useState()
    const [cloudShielding,setCloudShielding] = useState()
    const [operatorFullName,setOperatorFullName] = useState()
    const [settlementsArray,setSettlementsArray] = useState()
    const [settlementsIsActive,setsettlementsIsActive] = useState(false)
    const requestForSettlements = () => {
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
    const checkStates = () => {
        console.log(pdfDateTime,pdfSubjectTag,cloudShielding,operatorFullName)
        console.log(`${URL_FOR_FILES.URL_PDF}?date_time=${'2022-11-12T12:15'}&cloud_shielding=${cloudShielding}&operator_fio=${operatorFullName}&subject_tag=${pdfSubjectTag}`)
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
                               value={pdfSubjectTag}
                               onClick={() =>requestForSettlements()}
                               onChange={(e) => setPdfSubjectTag(e.target.value)}/>
                        <datalist id="browsers" >
                            {settlementsIsActive && settlementsArray.map((settlement,index)=>(<option>{settlement}</option>)

                            )}
                        </datalist>
                    </div>

                    <div className={modalStyle.modal_div}>
                        <label className={modalStyle.modal_label}>cloud_shielding</label>

                        <input type={"text"} className={modalStyle.modal_input}
                               value={cloudShielding}
                               onChange={(e) => setCloudShielding(e.target.value)}/>
                    </div>

                    <div className={modalStyle.modal_div}>
                        <label className={modalStyle.modal_label}>operator_fio</label>

                        <input type={"text"} className={modalStyle.modal_input}
                               value={operatorFullName}
                               onChange={(e) => setOperatorFullName(e.target.value)}/>
                    </div>
                <button onClick={() => checkStates()}>check states</button>
                    <a className={modalStyle.modal_button} href={`${URL_FOR_FILES.URL_PDF}?date_time=${pdfDateTime}&cloud_shielding=${cloudShielding}&operator_fio=${operatorFullName}&subject_tag=${pdfSubjectTag}`} target={"_blank"} value={"Сохранить отчёт"}>сформировать</a>
            </div>
        </div>
    </>
}

