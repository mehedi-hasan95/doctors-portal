import React from 'react';

const ConformationModal = ({title, message, closeModal, confirmDelete, doctorData, successModal}) => {
    return (
        <div>
            <input type="checkbox" id="conform-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{message}</p>
                    <div className="modal-action">
                        <label onClick={()=> confirmDelete(doctorData)} htmlFor="conform-modal" className="btn btn-warning">{successModal}</label>
                        <button onClick={closeModal} className="btn">Cancle</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConformationModal;