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
        return (
            <Modal onClose={onClose} isVisible={isVisible}>
                <MainTitle bottomLine>Share This Product</MainTitle>
                <div>Product Link:</div>
                <div>
                    <pre className='product-link-preview'>{`https://${subdomain}.leadcart.io/products/${productUrl}`}</pre>
                </div>
                <SubTabs
                    defaultTab='Full Page Embed Script'
                    tabs={{
                        'Full Page Embed Script': (
                            <Fragment>
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
                            <Fragment>
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
                        )
                        ,
                        'Buy Now Button Script': (
                            <Fragment>
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
