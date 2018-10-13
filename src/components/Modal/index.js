import React from "react";

import './style.css'
export default ({ children, onClose, isVisable, ...props }) => (
    <div style={{ display: isVisable ? 'flex' : 'none' }} className="modal-container">
        <div className="modal-content">
            <span onClick={onClose} className="modal-close-btn">
                <i class="fas fa-times"></i>
            </span>
            {children}
        </div>
    </div>
)