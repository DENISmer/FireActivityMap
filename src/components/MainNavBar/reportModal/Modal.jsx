import modalStyle from './modalStyle.module.css';
import React from 'react';

export function ModalReport ({active, setActive}){




    return<>
        <div className={active ? `${modalStyle.modal} ${modalStyle.modal_active}` : modalStyle.modal} onClick={()=> setActive(false)}>
            <div className={active ? `${modalStyle.modal_content} ${modalStyle.modal_content_active}` : modalStyle.modal_content} onClick={e => e.stopPropagation()}>
                <form action={''}>
                    <div className={modalStyle.modal_div}>
                        <label className={modalStyle.modal_label}>date_time</label>
                        <input type={"date"} className={modalStyle.modal_input}/>
                    </div>
                    <div className={modalStyle.modal_div}>
                        <label className={modalStyle.modal_label}>subject_tag</label>
                        <input type={"text"} className={modalStyle.modal_input}/>
                    </div>
                    <div className={modalStyle.modal_div}>
                        <label className={modalStyle.modal_label}>cloud_shielding</label>
                        <input type={"text"} className={modalStyle.modal_input}/>
                    </div>
                    <div className={modalStyle.modal_div}>
                        <label className={modalStyle.modal_label}>operator_fio</label>
                        <input type={"text"} className={modalStyle.modal_input}/>
                    </div>
                    <input className={modalStyle.modal_button} type={"submit"} value={"Сохранить отчёт"}/>
                </form>
            </div>
        </div>
    </>
}

