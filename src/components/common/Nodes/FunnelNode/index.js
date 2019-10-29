import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
// import pageFunnelImage from 'assets/images/funnels/page-funnel.png';
// import checkoutPageImage from 'assets/images/funnels/checkout-page.png';
// import upsellPageImage from 'assets/images/funnels/upsell_downsell.png';
// import thankyouPageImage from 'assets/images/funnels/thank-you-page.png';
import './style.css';



import FunnelTemplateNode from '../FunnelTemplateNode'

// const categoriesImages = {
//   onepagefunnel: pageFunnelImage,
//   checkout: checkoutPageImage,
//   upsell: upsellPageImage,
//   thankyoupage: thankyouPageImage
// };

const FunnelNode = ({
  onShowNodeOptions,
  activeNodeOptions,
  activeSetting,
  connectingMode,
  ...props
}) => {
  const [connecting, setConnecting] = useState(false);
  // const [showOptions, setShowOptions] = useState(false)
  const [connectingStarted, setConnectingStarted] = useState(false)

  const toggleShowOptions = (e) => {
    e.stopPropagation()
    if (activeNodeOptions === props.id)
      onShowNodeOptions(false);
    else
      onShowNodeOptions(props.id);

    // setShowOptions(show => !show)
    // setConnectingStarted(false)
  }

  const onConnectingToggle = e => {
    e.stopPropagation()
    setConnectingStarted(show => !show)
  }



  const onConnect = (e) => {
    e.preventDefault()
    e.stopPropagation()
    props.onConnect(props.id,e)
  }

  const onConnected = (e) => {
    // let targetId = e.target.id
    stopPropagation(e)

    props.onConnected(props.id,e)
  }


  const stopPropagation = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }
  const onSetting = (e) => {
    stopPropagation(e)
    if (activeSetting === props.id)
      props.onNodeSetting()
    else
      props.onNodeSetting(props.id)
  }
  const onDelete = (e) => {
    stopPropagation(e)
    props.onNodeDelete(props.id)
  }


  useEffect(() => {
    setConnectingStarted(false)
  }, [activeNodeOptions , activeSetting]);

  const showNodeOptions = activeNodeOptions === props.id

  const showSocketOnConnect = connectingMode && activeNodeOptions !== props.id
  return (
    <FunnelTemplateNode
      {...props}
      onClick={toggleShowOptions}
    >
      <Fragment>

        <div className={`setting-btn-container ${showNodeOptions ? '' : 'hide'}`}>
          {connectingStarted && (
            <div onClick={stopPropagation} className="node-forks">
              <span
                onClick={onConnect}
                className="yes-fork"
              >
                <span>
                  Yes
              </span>
                <i class="fas fa-long-arrow-alt-right"></i>
              </span>
              <span
                onClick={onConnect}
                className="no-fork"
              >
                <span>
                  No
              </span>
                <i class="fas fa-long-arrow-alt-right"></i>
              </span>
            </div>
          )}
          <div className="btns-container">
            <span onClick={onSetting} className={`node-setting-btn ${activeSetting === props.id ? 'active' : ''}`}>
              <i className='fas fa-cog' />
            </span>
            <span onClick={onDelete} className='node-setting-btn delete'>
              <i className='fas fa-trash' />
            </span>
            <span
              onClick={onConnectingToggle}
              className={`node-setting-btn ${connectingStarted ? 'active' : ''}`}
            >
              <i className="fas fa-code-branch" />
            </span>
          </div>
        </div>
        {showSocketOnConnect &&
          (
            <div className={`setting-btn-container clean-border`}>
              <div onClick={onConnected} className="node-connect-socket connecting-mode">
                <span>
                  <i className="fas fa-code-branch" />
                </span>
              </div>
            </div>
          )
        }
      </Fragment>
    </FunnelTemplateNode>
  );
};



// <span
// onClick={onConnected}
// id={`node-socket-${props.id}`}
// className='node-setting-btn node-socket-btn'
// >
// <i class="fas fa-link" />
// </span>
FunnelNode.propTypes = {

};
FunnelNode.defaultProps = {
  product: {},
  category: 'checkout'
};

export default FunnelNode;
