import React from 'react';
import { Modal } from '../Modals';
import common from '../common';
import PropTypes from 'prop-types'

import './style.css'
import { InputRow } from '../common/Inputs';
const {
    MainTitle,
    Button,
    SubTabs,
} = common;


const ProductsScripts = ({
    scripts = {},
    isVisible,
    onClose,
    onChange
}) => {


    return (
        <Modal
            onClose={onClose}
            isVisible={isVisible}
            affectIntercom={false}
            closeBtnClassName='scripts-modal-close-btn'
        >
            <MainTitle
                bottomLine
                className='scripts-modal-title'
            >
                Embed Scripts
            </MainTitle>
            <SubTabs
                defaultTab='Product Scripts'
                tabs={{
                    'Product Scripts': (
                        <div
                            key='productPage-Scripts'
                            className="scripts-container"
                        >
                            <div className='scripts-head-message'>
                                These Scripts will be injected in your product page
                            </div>
                            <InputRow>
                                <InputRow.Label className='scripts-labels'>
                                    Facebook Pixel Id :
                                </InputRow.Label>
                                <InputRow.NormalInput
                                    name='scripts.fbPixelId'
                                    value={scripts.fbPixelId}
                                    onBlur={onChange}
                                >
                                    25417913856****
                                </InputRow.NormalInput>
                            </InputRow>
                            <InputRow>
                                <InputRow.Label className='scripts-labels' >
                                    Google Tag Manager Id :
                                </InputRow.Label>
                                <InputRow.NormalInput
                                    name='scripts.googleTagManager'
                                    value={scripts.googleTagManager}
                                    onBlur={onChange}
                                >
                                    GTM-XXXX
                                </InputRow.NormalInput>
                            </InputRow>
                            <div className='separating-statement'>
                                <span>
                                    OR
                                </span>
                            </div>
                            <div>
                                Enter valid Script Tags so we can enable them on your product page
                            </div>
                            <InputRow.CodeInputArea
                                className='free-script-input-field'
                                name='scripts.scriptTag'
                                value={scripts.scriptTag}
                                onBlur={onChange}
                            >
                                {`<script>\n\t//your js code here (valid javascript)\n</script>`}
                            </InputRow.CodeInputArea>
                        </div>
                    ),
                    'Thank You Page Scripts': (
                        <div
                            key='thankYouPage-Scripts'
                            className="scripts-container"
                        >
                            <div className='scripts-head-message' >
                                These Scripts will be injected in your thank-you page after purchase
                                 complete or post access to the thank-you page resources(fulfillments resources)
                             </div>
                            <InputRow>
                                <InputRow.Label className='scripts-labels' >
                                    Facebook Pixel Id :
                                </InputRow.Label>
                                <InputRow.NormalInput
                                    name='scripts.t_fbPixelId'
                                    value={scripts.t_fbPixelId}
                                    onBlur={onChange}
                                >
                                    25417913856****
                                </InputRow.NormalInput>
                            </InputRow>
                            <InputRow>
                                <InputRow.Label className='scripts-labels' >
                                    Google Tag Manager Id :
                                </InputRow.Label>
                                <InputRow.NormalInput
                                    name='scripts.t_googleTagManager'
                                    value={scripts.t_googleTagManager}
                                    onBlur={onChange}
                                >
                                    GTM-XXXX
                                </InputRow.NormalInput>
                            </InputRow>
                            <div className='separating-statement'>
                                <span>
                                    OR
                                </span>
                            </div>
                            <div>
                                Enter a valid Scripts Tags so we can enable them in your thank-you page
                            </div>
                            <InputRow.CodeInputArea
                                className='free-script-input-field'
                                name='scripts.t_scriptTag'
                                value={scripts.t_scriptTag}
                                onBlur={onChange}
                            >
                                {`<script>\n\t//your js code here (valid javascript)\n</script>`}
                            </InputRow.CodeInputArea>
                        </div>
                    )
                }}
            />
            <Button
                onClick={onClose}
                className='primary-color script-save-btn'
            >
                Save
             </Button>
        </Modal>
    )
}

ProductsScripts.propTypes = {
    scripts: PropTypes.object.isRequired,
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
}

export default ProductsScripts
