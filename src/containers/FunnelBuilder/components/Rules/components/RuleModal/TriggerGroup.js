import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { trimExtraText } from 'libs';
import ReactToolTip from 'react-tooltip';
import { FaLongArrowAltRight } from 'react-icons/fa';

const {
  FlexBox,
  Badge
} = common;

const ProductThumbnail = ({ thumbnail, name }) => (
  <img src={thumbnail} alt={name} className='small-image' />
);
const GroupAction = ({ integrationKey: serviceName, type: serviceAction }) => (
  <Badge className='margin-left-10'>
    {serviceAction ? `${serviceName} (${serviceAction})` : serviceName}
  </Badge>
);

const Label = ({ children, ...props }) => (
  <span className='mx-2 gray-text bold-text' {...props}>
    {children}
  </span>
);


const TriggerGroup = ({
  className,
  products,
  action
}) => (
  <FlexBox
    center='v-center'
    className={`margin-v-5 ${className}`}
  >
    <Label>The products:</Label>
    {products.map((product, index) => (
      <FlexBox center='v-center'>
        <Badge
          //   data-for={product.name}
          data-tip
          key={product._id}
          data-for={`rule-product-demo-${product._id}`}
          className='margin-h-5'
        >
          {product.name}
        </Badge>
        {product.thumbnail && (
          <ReactToolTip
            id={`rule-product-demo-${product._id}`}
            //   type='light'
            delayShow={300}
            className='soft-edges'
          >
            <ProductThumbnail {...product} />
          </ReactToolTip>
        )}
        {
          index !== (products.length - 1) && (
            <Label>&&</Label>
          )
        }
      </FlexBox>
    ))}
    <FlexBox className='gray-text' center='v-center'>
      <Label>Do</Label>
      <FaLongArrowAltRight />
      <GroupAction {...action} />
    </FlexBox>
  </FlexBox>
);

TriggerGroup.propTypes = {};
//

export default TriggerGroup;
