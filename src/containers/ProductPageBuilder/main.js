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
import * as immutable from 'object-path-immutable';

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
const WARNING_INTERVAL = 5;

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

const updateProductWithTemplateBody = (originalProduct = {}, newTemplate) => {
  const { pageStyles: oldPageStyles, sections: oldSections, ...oldProductRemains } = originalProduct;

  const {
    sections = [],
    internalName = '',
    shippingDetails = {},
    pageStyles = {},
    custom = {},
    thumbnail = ''
  } = newTemplate;
  let newPageStyles;

  const oldHasBackgroundImage = immutable.get(oldPageStyles, 'pageBackgroundSettings.firstSectionBackground.backgroundType') === 'image';
  const newHasBackgroundImage = immutable.get(pageStyles, 'pageBackgroundSettings.firstSectionBackground.backgroundType') === 'image';

  if (oldHasBackgroundImage && !newHasBackgroundImage)
    newPageStyles = immutable.set(pageStyles, 'pageBackgroundSettings.firstSectionBackground.backgroundType', 'color');
  else newPageStyles = { ...pageStyles };


  return {
    ...oldProductRemains,
    thumbnail,
    shippingDetails: { ...shippingDetails },
    custom,
    sections: [...sections],
    internalName,
    pageStyles: newPageStyles
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
  const [secondsToSaveTemplate, setSecondsToSaveTemplate] = useState(WARNING_INTERVAL);

  const onToggleTemplateWidget = (status) => {
    const show = status ? status : !showTemplateWidget;
    setShowTemplateWidget(show);
  };

  const [state, dispatch] = useReducer(reducers, { product: sampleProductData });
  const actions = connectActions(productActions, { state, dispatch });

  useEffect(() => {
    let intervalFunc;
    if (showTemplateWidget) {
      intervalFunc = setInterval(() => {
        setSecondsToSaveTemplate((seconds) => {
          if (seconds > 0)
            return seconds - 1;

          setShowTemplateWidget(false);
          return 0;
        });
      }, 1000);
    }
    return () => clearInterval(intervalFunc);
  }, [showTemplateWidget]);


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
    setShowTemplateWidget(false);
    setSecondsToSaveTemplate(WARNING_INTERVAL);
  };

  const onUpdateTemplate = (templateBody) => {
    // const oldProductDetails = state.product;
    const isValid = typeof templateBody === 'object' && Object.keys(templateBody).length;
    if (isValid) {
      const { product } = state;

      const newProductData = updateProductWithTemplateBody({ ...product }, { ...templateBody });
      if (showTemplateWidget) {
        actions.updateState({ product: matchProductSectionsIds(newProductData) });
      } else {
        actions.updateState({
          originalProductDetails: matchProductSectionsIds(state.product),
          product: matchProductSectionsIds(newProductData)
        });
      }
      setShowTemplateWidget(true);
      setSecondsToSaveTemplate(WARNING_INTERVAL);
    }

    // showResetTemplateWidget(oldProductDetails)
  };


  useEffect(() => {
    if (secondsToSaveTemplate === 0) {
      setShowTemplateWidget(false);
      onSaveProduct();
      setSecondsToSaveTemplate(WARNING_INTERVAL);
    }
  }, [secondsToSaveTemplate]);


  const onResetToOriginalProduct = () => {
    const { originalProductDetails } = state;
    actions.updateState({ product: matchProductSectionsIds(originalProductDetails) });
    setShowTemplateWidget(false);
  };


  if (loading) return <LoadingPage message='Setting up ...' />;

  const { funnel: { currency = defaultBrandCurrency } = {}, product: { pageStyles = {} } = {} } = state;


  return (
    <ProductContext.Provider value={{ state, actions }}>
      <Page fullSize className='flex-container flex-column'>
        <Header history={history} onSave={onSaveProduct} saving={saving} savingStatus={state.savingStatus} />
        <FlexBox id='blocks' flex className='relative-element'>
          <ScreenBackgroundSetup backgrounds={pageStyles} />
          <DndProvider backend={Backend}>
            <SideBar
              isCheckoutProduct={state.product?.category === 'checkout'}
              onUpdateTemplate={onUpdateTemplate}
              internalName={state.product?.internalName}
            />
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
          show={showTemplateWidget}
          onReset={onResetToOriginalProduct}
          onSave={() => onSaveProduct()}
          saving={saving}
          // internalName={state.product?.internalName}
          // previousInternalName={state.originalProductDetails?.internalName}
          secondsToSaveTemplate={secondsToSaveTemplate}
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
