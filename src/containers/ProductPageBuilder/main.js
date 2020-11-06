import React, { useEffect, useReducer, useState } from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import ReactToolTip from 'react-tooltip';
import { connect } from 'react-redux';
import common from 'components/common';
import { LoadingPage } from 'components/Loaders';
import sampleProductData from 'data/product';
import { htmlToImage as generateImageFromHtmlElement, mapListToObject, notification } from 'libs';
import { ProductSchema } from 'libs/validation';
import * as productGeneralActions from 'actions/product';
import * as filesActions from 'actions/files';
import ids from 'shortid';

import {
  ProductContext,
  connectActions,
  productActions,
  reducers
} from './actions';


import {
  Header,
  NewPricingOptionModal,
  PageBackgroundModal,
  PageSetupModal,
  ScreenBackgroundSetup,
  SettingSideBar,
  SideBar,
  TemplateResetWidget,
  Workspace
} from './components';

const {
  Page,
  FlexBox
} = common;

const checkoutSectionDetails = {
  id: 'checkoutSection',
  hidden: false,
  type: 'checkoutSection',
  content: { value: '' }
};
const matchProductSectionsIds = (product) => {
  const sections = Array.isArray(product.sections) ?
    product.sections.map(({ id, _id = id, ...section }) => ({ ...section, id: _id }))
    : [];

  return {
    ...product,
    sections
  };
};
const hasCheckoutSection = ({ sections = [] } = {}) =>
  sections.find(({ type }) => type === 'checkoutSection');

const injectProductSection = (product = {}) => ({
  ...product,
  sections: [...product.sections, checkoutSectionDetails]
});
const ProductBuilder = ({
  funnelsMap,
  productsMap,
  // uploadFile,
  defaultBrandCurrency,
  match,
  history,
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showTemplateWidget, setShowTemplateWidget] = useState(false);

  const onToggleTemplateWidget = () => {
    setShowTemplateWidget((show) => !show);
  };

  const [state, dispatch] = useReducer(reducers, { product: sampleProductData });
  const actions = connectActions(productActions, { state, dispatch });


  useEffect(() => {
    const { params: { productId, funnelUrl } = {} } = match;

    const product = productsMap[productId];
    const funnel = funnelsMap[funnelUrl];

    if (!funnelUrl && product) {
      if (state.product._id !== productId) {
        const updatedProductSection = hasCheckoutSection(product) ? product : injectProductSection(product);
        actions.updateState({
          standAlone: true,
          product: matchProductSectionsIds(updatedProductSection)
        });
        return setLoading(false);
      }
    }


    if (funnel && product) {
      const localProductId = state.product._id;
      if (localProductId !== productId) {

        const updatedProductSection = hasCheckoutSection(product) ? product : injectProductSection(product);
        actions.updateState({
          standAlone: false,
          product: matchProductSectionsIds(updatedProductSection),
          funnel: funnel
        });
      }
      return setLoading(false);
    }
    //eslint-disable-next-line
  }, [funnelsMap, productsMap]);


  const generateNewThumbnailFrom = (fileName = '') => {
    const [, , attempts, id] = fileName.split('_');
    const currentId = id ? id : ids.generate();
    const currentAttempts = isNaN(attempts) ? 0 : (+attempts >= 2 ? +attempts : +attempts + 1);
    return `${(new Date().getDay())}_${(new Date().getHours())}_${currentAttempts}_${currentId.replace(/_/ig, '')}`;
  };


  const evaluateCurrentThumbnail = (filePathName = '') => {
    const [fileName = ''] = filePathName.split('/').reverse();
    const [, nameWithoutTheExtension] = fileName.split('.').reverse();
    const newNameIfDifferent = generateNewThumbnailFrom(nameWithoutTheExtension);
    return {
      shouldTakeThumbnail: nameWithoutTheExtension !== newNameIfDifferent,
      newThumbnailName: newNameIfDifferent
    };
  };

  const uploadProductThumbnail = (file) => new Promise((res) => {
    props.uploadFile({
      file: file,
      type: 'products'
    }, { onSuccess: res });
  });

  const onSaveProduct = async () => {

    const { product: productData } = state;
    setSaving(true);
    const {
      isValid,
      value: product
    } = await ProductSchema(productData);

    const { shouldTakeThumbnail, newThumbnailName } = evaluateCurrentThumbnail(product.thumbnail);
    let productThumbnailUrl = product.thumbnail;

    if (shouldTakeThumbnail) {
      actions.updateSavingStatusText(true, 'Generating New Screenshot for the product page');
      const productThumbnailFile = await generateImageFromHtmlElement('layouts-container', { fileName: newThumbnailName });
      productThumbnailUrl = await uploadProductThumbnail(productThumbnailFile);

      actions.onProductFieldChange({
        name: 'thumbnail',
        value: productThumbnailUrl
      });
      actions.updateSavingStatusText(false);
    }

    if (!isValid)
      return notification.failed('Can\'t save, validation Error');

    props.updateProduct(
      {
        productId: productData._id,
        details: {
          ...product,
          thumbnail: productThumbnailUrl
        }
      },
      {
        onSuccess: () => {
          setSaving(false);
          notification.success('Changes Saved');
        },
        onFailed: (message) => {
          setSaving(false);
          notification.failed(message);
        }
      }
    );
    if (showTemplateWidget)
      onToggleTemplateWidget();
  };

  const onUpdateTemplate = (templateBody) => {
    // const oldProductDetails = state.product;
    const isValid = typeof templateBody === 'object' && Object.keys(templateBody).length;
    if (isValid) {
      const newProductData = {
        ...state.product,
        ...templateBody
      };
      actions.updateState({
        originalProductDetails: state.product,
        product: matchProductSectionsIds(newProductData)
      });
      onToggleTemplateWidget();
    }

    // showResetTemplateWidget(oldProductDetails)
  };
  const onResetToOriginalProduct = () => {
    const { originalProductDetails } = state;
    actions.updateState({ product: matchProductSectionsIds(originalProductDetails) });
    onToggleTemplateWidget();
  };
  // const showResetTemplateWidget = (product)=>{
  //   s
  // }
  if (loading) return <LoadingPage message='Setting up ...' />;

  const { funnel: { currency = defaultBrandCurrency } = {}, product: { pageStyles = {} } = {} } = state;


  return (
    <ProductContext.Provider value={{ state, actions }}>
      <Page fullSize className='flex-container flex-column'>
        <Header history={history} onSave={onSaveProduct} saving={saving} savingStatus={state.savingStatus} />
        <FlexBox id='blocks' flex className='relative-element'>
          <ScreenBackgroundSetup backgrounds={pageStyles} />
          <DndProvider backend={Backend}>
            <SideBar canOffer={state.product?.category === 'checkout'} onUpdateTemplate={onUpdateTemplate} />
            <Workspace />
            <SettingSideBar />
          </DndProvider>
        </FlexBox>
        <NewPricingOptionModal
          isVisible
          onClose={actions.onTogglePricingOptionModal}
          currency={currency}
        />
        <PageBackgroundModal />
        <PageSetupModal history={history} onUpdateTemplate={onUpdateTemplate} />
        <TemplateResetWidget
          internalName={state.product?.internalName}
          show={showTemplateWidget}
          onClose={onToggleTemplateWidget}
          onReset={onResetToOriginalProduct}
          onSave={onSaveProduct}
          saving={saving}
        />
      </Page>
      <ReactToolTip delayShow={400} />
    </ProductContext.Provider>
  );
};

ProductBuilder.propTypes = {};

const propifyState = ({
  funnels = [],
  products: { products = [] } = {},
  settings: { generalModel: { currency: defaultBrandCurrency = 'USD' } = {} } = {}
}) => ({
  funnelsMap: mapListToObject(funnels, 'url'),
  productsMap: mapListToObject(products, '_id'),
  defaultBrandCurrency
});
export default connect(propifyState, { ...productGeneralActions, ...filesActions })(ProductBuilder);
