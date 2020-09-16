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

const isPlural = (items = []) => items.length >= 1;

const GroupAction = ({ integrationKey: serviceName, type: serviceAction }) => {

  let service = serviceAction ? `${serviceName} (${serviceAction})` : serviceName;

  if (serviceAction === 'WEBHOOKS')
    service = 'WEBHOOKS';

  return (
    <Badge className='margin-left-10 capitalized-text'>
      {service.toLowerCase().replace(/_/ig, ' ')}
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
  pricingOptions,
  action
}) => {

  const hasProducts = !!products.length;
  const hasPricingOptions = !!pricingOptions.length;

  return (
    <FlexBox
      center='v-center'
      className={`margin-v-5 ${className} parent-hover relative-element`}
      wrappable
    >
      {hasProducts && (
        <Fragment>
          <Label>The Product{isPlural(products) ? 's' : ''}:</Label>
          {
            products.map((product, index) => {

              const isLastProduct = index === (products.length - 1);
              return (
                <FlexBox center='v-center'>
                  <Badge
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
                  )
                  }
                  {!isLastProduct && <Label>&&</Label>}
                </FlexBox>
              );
            })
          }
        </Fragment>
      )}
      {hasPricingOptions && (
        <Fragment>
          <Label>&& And The Pricing Option{isPlural(pricingOptions) ? 's' : ''}:</Label>
          {
            pricingOptions.map((priceOption, index) => {
              const isPriceOption = index === (pricingOptions.length - 1);

              return (
                <FlexBox center='v-center'>
                  <Badge
                    key={priceOption.value}
                    data-for={`rule-product-demo-${priceOption.value}`}
                    className='margin-h-5 my-1'
                  >
                    {priceOption.label}
                  </Badge>
                  {!isPriceOption && <Label>&&</Label>}
                </FlexBox>
              );
            })
          }
        </Fragment>
      )
      }

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
};

TriggerGroup.propTypes = {};
TriggerGroup.defaultProps = { pricingOptions: [] };
//

export default TriggerGroup;
