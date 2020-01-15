import React, { useState, Fragment } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Modal } from '../Modals';
import common from '../common';

import './style.css';
const {
  // ShareButton,
  MainTitle,
  Button,
  EmbededScripContainer,
  // ShareBtnContainer,
  SubTabs
} = common;

const CopyScriptButton = ({ embeddedText }) => {
  const [showCopied, setShowCopied] = useState(false);

  const onCopy = () => {
    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
    }, 4000);
  };

  return (
    <CopyToClipboard text={embeddedText}>
      <Button
        onClick={onCopy}
        className={`primary-color ${showCopied ? 'gray-bg' : ''}`}
        disabled={showCopied}
      >
        {`${showCopied ? 'Copied!' : 'Copy'}`}
      </Button>
    </CopyToClipboard>
  );
};

const formatEmbedScript = ({ subdomain, productUrl }) => `<script>
    function prepareFrame() {
    var iframeUrl = "https://${subdomain}.leadcart.io/${productUrl}";
    var ifrm = document.createElement("iframe");
    ifrm.setAttribute("id", "leadcart-iframe-container");
    ifrm.setAttribute("src", iframeUrl);
    ifrm.style.width = "100%";
    ifrm.style.height = "1000px";
    document.body.appendChild(ifrm);
    }
    prepareFrame();
</script>`;

const ButtonFormatEmbedScript = ({ subdomain, productUrl }) => `<a
    href="https://${subdomain}.leadcart.io/${productUrl}"
    target='_blank'
    style="background:blue;border-radius:5px;
    font-size:16px;font-weight:bold;color:white;
    padding:10px 20px;text-decoration:none;
    box-shadow:2px 2px 5px 2px rgba(0,0,0,.2);margin:20px;"
>
    Buy Now
</a>
    `;


const ShareProductModal = ({
  onClose,
  subdomain,
  isVisible,
  productUrl,
  logo
}) => {
  const script = formatEmbedScript({ productUrl, subdomain });
  const buttonScript = ButtonFormatEmbedScript({ productUrl, subdomain });
  const productExternalLink = `https://${subdomain}.leadcart.io/${productUrl}`;

  return (
    <Modal onClose={onClose} isVisible={isVisible} affectIntercom={false}>
      <MainTitle bottomLine>Share This Product</MainTitle>
      <div>Product Link:</div>
      <div className=''>
        <pre className='product-link-preview'>
          <span>
            {productExternalLink}
          </span>
          <CopyScriptButton embeddedText={productExternalLink} />
        </pre>
      </div>
      <SubTabs
        defaultTab='Full Page Embed Script'
        tabs={{
          'Full Page Embed Script': (
            <Fragment key='Full Page Embed Script'>
              <EmbededScripContainer
                headNote="Include this code wherever you want to embed link to this product's Leadcart checkout page"
                script={script}
              />
              <CopyScriptButton embeddedText={script} />
            </Fragment>
          ),
          'Buy Now Button Script': (
            <Fragment key='Buy Now Button Script'>
              <EmbededScripContainer
                headNote='This Element is basic and you are free to customize it the way it suits your requirement.'
                script={buttonScript}
              />
              <CopyScriptButton embeddedText={buttonScript} />
            </Fragment>
          )
        }}
      />
    </Modal>
  );
};


export default ShareProductModal;
