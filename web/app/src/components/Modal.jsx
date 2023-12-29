import React from 'react'

function Modal(props) {
    let modalSize = "modal-dialog";

    if (props.modalSize) {
        modalSize += ' ' + props.modalSize;
    }

    return (
        <div>
            <div className="modal fade" id={props.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className={modalSize} role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{props.title}</h5>
                            <button id="btnModalClose" type="button" className="close btnClose" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal