import React, { useEffect, useState } from 'react';
import clx from 'classnames';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import ReactTooltip from 'rc-tooltip';


import common from 'components/common';
import CancelModal from './CancelModal';
import ShippingRates from './ShippingRates';

const { FlexBox, InputRow, Title } = common;
const { TextField, Toggle } = InputRow;


const InfoIcon = ({ description, placement = 'top', className }) => {
  return (
    <ReactTooltip className={clx(`${className} mx-2`)} overlay={description} placement={placement}>
      <BsFillInfoCircleFill color='#808292'/>
    </ReactTooltip>
  );
};


const Expandable = ({ open, onSave, saveLoading, fields, onChange, onCloseCancelModal, cancelModalOpened, onCancelEdits, shippingRuleId, setHasInvalidRate, hasInvalidRate }) => {
  const [currentHeight, setCurrentHeight] = useState(0);
  const { enabled, name, shippingRates } = fields;

  useEffect(() => {
    const selectedElement = document?.getElementById(`costs-per-zone-${shippingRuleId}`);

    if (open && selectedElement)
      setCurrentHeight(selectedElement?.getBoundingClientRect()?.height);
  }, [open, shippingRates]);


  const shippingRatesProps = {
    shippingRates,
    onChange,
    setHasInvalidRate
  };

  return (
    <FlexBox
      className={clx('expandable px-5 ', { open, 'py-4': open })}
      style={{ height: open ? `${currentHeight + 600}px` : 0, overflow: open ? 'unset' : 'hidden' }}
      id={`expandable-${shippingRuleId}`}
      column
    >
      <FlexBox className='pr-2 mb-2' flexEnd>
        <Toggle
          onToggle={() => onChange({ target: { name: 'enabled', value: !enabled } })}
          value={enabled}
          beforeLabel='Enabled'
          afterLabel='Disabled'
          className='mx-5 my-0'
        />
      </FlexBox>

      <InputRow className=' flex-box v-center'>
        <Title className='m-0 mr-3'>Shipping Rule Name:</Title>
        <TextField
          onChange={onChange}
          value={name}
          name='name'
          inputClassName='min-width-250'
        />
      </InputRow>


      <InputRow className='flex-box column'>
        <FlexBox className='v-center mb-2'>
          <Title className='m-0'>Add Description For Customers:</Title>
          <InfoIcon description='What should customers know when choosing this shipping method for their order? Specify the time it usually takes for orders to arrive, the way in which the shipment will be handed over to the buyer, or anything else you feel is important for customers to know about this shipping option. This information will be displayed at checkout.'/>
        </FlexBox>
        <textarea
          onChange={onChange}
          value={name}
          name='name'
          className='shipping-expandable-textarea'
          cols='25'
        />
      </InputRow>

      <ShippingRates {...shippingRatesProps} />


      <CancelModal
        onSave={onSave}
        onClose={onCloseCancelModal}
        isVisible={cancelModalOpened}
        onCancelEdits={onCancelEdits}
        saveLoading={saveLoading}
        hasInvalidRate={hasInvalidRate}
      />
    </FlexBox>
  );
};

export default Expandable;
