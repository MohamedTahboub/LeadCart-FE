import React, { Component, Fragment } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Modal } from '../Modals';
import common from '../common';
import PropTypes from 'prop-types'

import './style.css'
import { InputRow } from '../common/Inputs';
const {
    ShareButton,
    MainTitle,
    Button,
    EmbededScripContainer,
    ShareBtnContainer,
    SubTabs,
    CodeInputArea
} = common;


const ProductsScripts = ({
    scripts = {},
    isVisible,
    onClose,
    onChange
}) => {


    return (
        <Modal onClose={onClose} isVisible={isVisible} affectIntercom={false} closeBtnClassName='scripts-modal-close-btn'>
            <MainTitle bottomLine className='scripts-modal-title'>Embed Scripts</MainTitle>
            <SubTabs

                defaultTab='Product Scripts'
                tabs={{
                    'Product Scripts': (
                        <div className="scripts-container" key='productPage-Scripts' >
                            <div className='scripts-head-message'>These Scripts will be injected in your Product Page</div>
                            <InputRow>
                                <InputRow.Label className='scripts-labels'>Facebook Pixel Id :</InputRow.Label>
                                <InputRow.NormalInput
                                    name='scripts.fbPixelId'
                                    value={scripts.fbPixelId}
                                    onBlur={onChange}
                                >
                                    25417913856****
                                    </InputRow.NormalInput>
                            </InputRow>
                            <InputRow>
                                <InputRow.Label className='scripts-labels' >Google Tag Manager Id :</InputRow.Label>
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
                            <div>Enter a valid Scripts Tags so we can enable them in your Product page</div>
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
                    'Thankyou Page Scripts': (
                        <div className="scripts-container" key='thankYouPage-Scripts'>
                            <div className='scripts-head-message' >These Scripts will be injected in your thank-you page after purchase complete or post access to the thank-you page resources(fulfillments resources)</div>
                            <InputRow>
                                <InputRow.Label className='scripts-labels' >Facebook Pixel Id :</InputRow.Label>
                                <InputRow.NormalInput
                                    name='scripts.t_fbPixelId'
                                    value={scripts.t_fbPixelId}
                                    onBlur={onChange}
                                >
                                    25417913856****
                                    </InputRow.NormalInput>
                            </InputRow>
                            <InputRow>
                                <InputRow.Label className='scripts-labels' >Google Tag Manager Id :</InputRow.Label>
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
                            <div>Enter a valid Scripts Tags so we can enable them in your thank-you page</div>
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
            <Button onClick={onClose} className='primary-color script-save-btn'>Save</Button>
        </Modal>
    )
}
// <div className='scripts-footer-message' >Note: To save the changes here just edit them and save the product,if you close the product modal without saving you may lose your changes here</div>
ProductsScripts.propTypes = {
    scripts: PropTypes.object.isRequired,
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
}

export default ProductsScripts
    /*
<ShareBtnContainer
headNote='This is what the button you embed on your sales will look like'
>
<ShareButton
logo={logo}
btnText={'Buy Now'}
/>
</ShareBtnContainer>
*/
