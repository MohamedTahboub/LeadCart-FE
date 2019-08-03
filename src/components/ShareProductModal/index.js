import React, { Component, Fragment } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Modal } from '../Modals';
import common from '../common';

import './style.css'
const {
    ShareButton,
    MainTitle,
    Button,
    EmbededScripContainer,
    ShareBtnContainer,
    SubTabs
} = common;

const CopyScriptButton = ({ onCopy, embededText }) => (
    <CopyToClipboard text={embededText}>
        <Button onClick={onCopy} className='primary-color'>Copy</Button>
    </CopyToClipboard>
);
const formatEmbedScript = ({ subdomain, productUrl }) =>
    `<script>
    function prepareFrame() {
    var iframeUrl = "https://${subdomain}.leadcart.io/products/${productUrl}";
    var ifrm = document.createElement("iframe");
    ifrm.setAttribute("id", "leadcart-iframe-container");
    ifrm.setAttribute("src", iframeUrl);
    ifrm.style.width = "100%";
    ifrm.style.height = "1000px";
    document.body.appendChild(ifrm);
    }
    prepareFrame();
</script>`;
const ButtonFormatEmbedScript = ({ subdomain, productUrl }) =>
    `<a
    href="https://${subdomain}.leadcart.io/products/${productUrl}"
    target='_blank'
    style="background:blue;border-radius:5px;
    font-size:16px;font-weight:bold;color:white;
    padding:10px 20px;text-decoration:none;
    box-shadow:2px 2px 5px 2px rgba(0,0,0,.2);margin:20px;"
>
    Buy Now
</a>
    `;


class ShareProductModal extends Component {
    state = {
        copied: false
    }
    onCopy = () => {
        this.toggleCopy()
        setTimeout(() => {
            this.toggleCopy()
        }, 2000);
    }
    toggleCopy = () => {
        const { copied } = this.state
        this.setState({
            copied: !copied
        })
    }

    render() {

        const { copied } = this.state
        const { onClose, subdomain, isVisible, productUrl, logo } = this.props
        const script = formatEmbedScript({ productUrl, subdomain })
        const buttonScript = ButtonFormatEmbedScript({ productUrl, subdomain })
        return (
            <Modal onClose={onClose} isVisible={isVisible} affectIntercom={false}>
                <MainTitle bottomLine>Share This Product</MainTitle>
                <div>Product Link:</div>
                <div>
                    <pre className='product-link-preview'>{`https://${subdomain}.leadcart.io/products/${productUrl}`}</pre>
                </div>
                <SubTabs
                    defaultTab='Full Page Embed Script'
                    tabs={{
                        'Full Page Embed Script': (
                            <Fragment key='Full Page Embed Script'>
                                <EmbededScripContainer
                                    headNote="Include this code wherever you want to embed link to this product's Leadcart checkout page"
                                    script={script}
                                    showCopied={copied}
                                />
                                <CopyScriptButton
                                    embededText={script}
                                    onCopy={this.onCopy}
                                />
                            </Fragment>
                        ),
                        'Buy Now Button Script': (
                            <Fragment key='Buy Now Button Script'>
                                <EmbededScripContainer
                                    headNote="This Element is basic and you are free to customize it the way it suits your requirement."
                                    script={buttonScript}
                                    showCopied={copied}
                                />
                                <CopyScriptButton
                                    embededText={buttonScript}
                                    onCopy={this.onCopy}
                                />
                            </Fragment>
                        )
                    }}
                />
            </Modal>
        )
    }
}


export default ShareProductModal
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
