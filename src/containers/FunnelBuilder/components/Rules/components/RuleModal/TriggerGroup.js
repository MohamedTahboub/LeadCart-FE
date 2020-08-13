import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
import common from 'components/common';
import ReactToolTip from 'react-tooltip';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';

const {
  FlexBox,
  Badge
} = common;

const ProductThumbnail = ({ thumbnail, name }) => (
  <img src={thumbnail} alt={name} className='small-image' />
);
const GroupAction = ({ integrationKey: serviceName, type: serviceAction }) => {


  let service = serviceAction ? `${serviceName} (${serviceAction})` : serviceName;

  if (serviceAction === 'WEBHOOKS')
    service = 'WEBHOOKS';

  return (
    <Badge className='margin-left-10 capitalized-text'>
      {service.toLowerCase().replace('_', ' ')}
    </Badge>
  );
};

const Label = ({ children, ...props }) => (
  <span className='mx-2 gray-text bold-text' {...props}>
    {children}
  </span>
);


const TriggerGroup = ({
  onEdit,
  onDelete,
  className,
  products,
  action
}) => (
  <FlexBox
    center='v-center'
    className={`margin-v-5 ${className} parent-hover relative-element`}
    wrappable
  >
    {!!products.length && (
      <Fragment>
        <Label>The products:</Label>
        {products.map((product, index) => (
          <FlexBox center='v-center'>
            <Badge
              data-tip='product.name'
              key={product._id}
              data-for={`rule-product-demo-${product._id}`}
              className='margin-h-5 my-1'
            >
              {product.name}
            </Badge>
            {product.thumbnail && (
              <ReactToolTip
                id={`rule-product-demo-${product._id}`}
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
      </Fragment>
    )}

    <FlexBox className='gray-text' center='v-center'>
      <Label>Do</Label>
      <FaLongArrowAltRight />
      <GroupAction {...action} />
    </FlexBox>
    {onEdit && (
      <FiEdit
        onClick={onEdit}
        className='show-on-parent-hover trigger-group-edit-btn'
      />
    )}
    {onDelete && (
      <MdDelete
        onClick={onDelete}
        className='show-on-parent-hover trigger-group-delete-btn warning-color'
      />
    )}
  </FlexBox>
);

TriggerGroup.propTypes = {};
//

export default TriggerGroup;
