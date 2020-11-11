import React from 'react';
import { connect } from 'react-redux';
import { BiNetworkChart } from 'react-icons/bi';

import common from 'components/common';
import { getPriceFormat, trimExtraText } from 'libs';
import { FlexBox } from '../../../components/common/boxes';
import CategoryIcon from './CategoryIcon';

const { Title } = common;


const ProductCard = ({
  category,
  currency,
  amount,
  format,
  thumbnail,
  funnels,
  productId,
  isThankyouPage,
  isCheckoutProduct,
  isUpsellProduct,
  isOptInProduct,
  hasPrice,
  name
}) => {
  const coverImageStyle = { backgroundImage: ` linear-gradient(to bottom,rgba(0, 0, 0, 0.14),rgba(0,0,0, .1)),url(${thumbnail})` };
  const price = getPriceFormat(amount, currency, format);

  const isFunnelHasProduct = ({ products }) => Boolean(products.filter((product) => productId === product.productId).length);
  const funnelConnectedNames = funnels.filter((funnel) => isFunnelHasProduct(funnel)).map(({ name }) => name);
  const isConnectedWithFunnels = Boolean(funnelConnectedNames.length);


  const tooltipFunnelNames = funnelConnectedNames.map((ele, index) => {
    if (index === funnelConnectedNames.length - 1)
      return ele;
    else if (index === funnelConnectedNames.length - 2)
      return ` ${ele} and `;
    else
      return `${ele}, `;
  }).join('');


  const connectedFunnelDataTip = `This Product is connected with ${tooltipFunnelNames} ${funnelConnectedNames.length === 1 ? 'funnel' : 'funnels'}`;


  const CategoryIconsProps = {
    isThankyouPage,
    isCheckoutProduct,
    isUpsellProduct,
    isOptInProduct,
    hasPrice,
    category
  };

  return (
    <FlexBox className='v-center p-2' column flex >
      <div style={coverImageStyle} className='product-image-container mt-2'/>

      <FlexBox className='product-card-name v-center h-center full-width my-2' flex>
        <Title className='product-card-name-text mr-1' data-tip={trimExtraText(name, 70)} data-type='info' data-multiline>
          {name}
        </Title>
        {isConnectedWithFunnels &&
          <BiNetworkChart
            className='product-card-name-icon'
            data-tip={connectedFunnelDataTip}
            data-type='info'
            data-multiline
          />
        }
      </FlexBox>

      <FlexBox className='v-center text-center'>
        {hasPrice &&
        <Title className='m-0 mr-2 p-0'>
          {price}
        </Title>
        }
        <CategoryIcon {...CategoryIconsProps} />
      </FlexBox>
    </FlexBox>
  );
};

ProductCard.propTypes = {};

const mapStateToProps = ({ funnels }) => ({ funnels });

export default connect(mapStateToProps)(ProductCard);
