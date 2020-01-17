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
const GroupAction = ({ serviceName, serviceAction }) => (
  <Badge className='margin-left-10'>
    {`${serviceName} (${serviceAction})`}
  </Badge>
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
    {products.map((product) => (
      <FlexBox>
        <Badge
          //   data-for={product.name}
          data-tip
          key={product._id}
          data-for={`rule-product-demo-${product._id}`}
          className='margin-h-5'
        >
          {product.name}
        </Badge>
        <ReactToolTip
          id={`rule-product-demo-${product._id}`}
          //   type='light'
          delayShow={300}
          className='soft-edges'
        >
          <ProductThumbnail {...product} />
        </ReactToolTip>
      </FlexBox>
    ))}
    <FlexBox className='gray-text' center='v-center'>
      <span className='margin-h-10'>Do</span>
      <FaLongArrowAltRight />
      <GroupAction {...action} />
    </FlexBox>
  </FlexBox>
);

TriggerGroup.propTypes = {

};
//

export default TriggerGroup;
