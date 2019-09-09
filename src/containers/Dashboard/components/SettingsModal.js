import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from '../../../components/Modals'

const SettingsModal = ({
    show,
    onClose,
}) => {

    return (
        <Modal
            onClose={onClose}
            isVisible={show}
            className='charts-settings-modal'
        >
            <div className="charts-settings-header">Header</div>
            <div className="charts-settings-content">Content</div>
            <div className="charts-settings-footer">Footer</div>

        </Modal>
    )
}

SettingsModal.propTypes = {

}

export default SettingsModal
