import React, { Fragment, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Modal } from '../Modals';
import common from '../common';

import './style.css';

const defaultWhiteLogo = 'https://s3.us-west-2.amazonaws.com/assets.leadcart.io/5e70880c81f85530d0ecd553/products/leadcart_light_logo.png';

const {
  // ShareButton,
  MainTitle,
  Button,
  EmbeddedScripContainer,
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

const formatEmbedScript = ({ funnelUrl }) => `<script>
    function prepareFrame() {
    var iframeUrl = "${funnelUrl}";
    var ifrm = document.createElement("iframe");
    ifrm.setAttribute("id", "leadcart-iframe-container");
    ifrm.setAttribute("src", iframeUrl);
    ifrm.style.width = "100%";
    ifrm.style.height = "100vh";
    ifrm.style.border = "none";
    document.body.appendChild(ifrm);
    }
    prepareFrame();
</script>`;

const ButtonFormatEmbedScript = ({ funnelUrl, brandLogo = defaultWhiteLogo }) => `
<a
    href="${funnelUrl}"
    target='_blank'
    style="border-radius:3px;font-size:17px;font-weight:bold;color:white;padding:10px 25px;text-decoration:none;box-shadow:0px 0px 3px 2px rgba(0,0,0,.08);margin:20px;background-color:#03A9F4;font-family:arial;display:flex;
    align-items:center;justify-content:center;"
>
    <img style="margin:auto 10px;height:30px;width:auto;object-fit:contain;" src="${brandLogo}" alt="brand" />
   <span>
     Buy Now  
   </span>
</a>
    
`;


const ShareProductModal = ({
  onClose,
  subdomain,
  isVisible,
  funnelUrl,
  logo
}) => {
  const script = formatEmbedScript({ funnelUrl, subdomain });
  const buttonScript = ButtonFormatEmbedScript({ funnelUrl, brandLogo: logo });

  return (
    <Modal onClose={onClose} isVisible={isVisible} affectIntercom={false}>
      <MainTitle bottomLine>Share This Product</MainTitle>
      <div>Product Link:</div>
      <div className=''>
        <pre className='product-link-preview'>
          <span>
            {funnelUrl}
          </span>
          <CopyScriptButton embeddedText={funnelUrl} />
        </pre>
      </div>
      <SubTabs
        defaultTab='Full Page Embed Script'
        tabs={{
          'Full Page Embed Script': (
            <Fragment key='Full Page Embed Script'>
              <EmbeddedScripContainer
                headNote="Include this code wherever you want to embed link to this product's Leadcart checkout page"
                script={script}
              />
              <CopyScriptButton embeddedText={script} />
            </Fragment>
          ),
          'Buy Now Button Script': (
            <Fragment key='Buy Now Button Script'>
              <EmbeddedScripContainer
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
