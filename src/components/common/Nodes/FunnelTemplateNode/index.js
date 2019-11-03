import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import pageFunnelImage from 'assets/images/funnels/PageFunnel.png';
import checkoutPageImage from 'assets/images/funnels/checkoutPage.png';
import upsellPageImage from 'assets/images/funnels/upsellPage.png';
import thankyouPageImage from 'assets/images/funnels/thankyouPage.png';
import './style.css';


const categoriesImages = {
  onepagefunnel: pageFunnelImage,
  checkout: checkoutPageImage,
  upsell: upsellPageImage,
  thankyoupage: thankyouPageImage
};

const categoriesNames = {
  onepagefunnel: 'Page Funnel',
  checkout: 'Checkout page',
  upsell: 'Upsell Page',
  thankyoupage: 'Thankyou Page'
};


const FunnelNode = ({
  product,
  category,
  className = '',
  disabled,
  coordinates = {},
  active,
  onClick,
  id,
  children,
  ...props
}) => {
  const elementRef = useRef(null);

  const onDrag = (e) => {
    // e.preventDefault();
    // e.dataTransfer.setData("text/plain", "This sssss may be dragged");
    // console.log(`template-${id} have been draged`);
    e.dataTransfer.setData('dropedElement', JSON.stringify({ product, category, elementId: id }));
    const {
      left,
      top,
      width,
      height
    } = elementRef.current.getBoundingClientRect();

    const shiftX = e.clientX - left;
    const shiftY = e.clientY - top;
    e.dataTransfer.setData('shift', JSON.stringify({
      shiftX, shiftY, width, height
    }));
  };


  const bgImage = product.image ? product.image : categoriesImages[category.toLowerCase()];
  const name = product.name ? product.name : categoriesNames[category.toLowerCase()];

  const style = {
    backgroundImage: `url(${bgImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  };


  return (
    <div
      draggable={!disabled}
      // onDragStart="event.dataTransfer.setData('text/plain', 'This text may be dragged')"
      onClick={onClick}
      ref={elementRef}
      style={{
        left: coordinates.x,
        top: coordinates.y
      }}
      onDragStart={onDrag}
      className={`product-node ${className} ${disabled ? 'disabled' : ''}`}
    >
      <div className='product-node-title'>
        {name}
      </div>
      <div style={style} className='product-node-body'>
        {children && children}
      </div>
      {active && (
        <div className='active-mark'>
          <i className='fas fa-check-circle' />
        </div>
      )}
    </div>
  );
};

FunnelNode.propTypes = {

};
FunnelNode.defaultProps = {
  product: {},
  position: {},
  category: 'checkout'
};

export default FunnelNode;
