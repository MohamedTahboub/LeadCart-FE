import React, { useState } from 'react';

import { Modal } from 'components/Modals';
import common from 'components/common';
import moment from 'moment';

const { InputRow, FlexBox, Button } = common;
const { Label, TextField, SelectOption, Checkbox } = InputRow;

const packagesOptions = [
  { label: 'Premium', value: 'Premium' },
  { label: 'Pro', value: 'Pro' },
  { label: 'Basic', value: 'Basic' }
];
const CreateModal = ({ onClose, onCreate, credits, user }) => {

  const hasCredits = credits > 0;
  const [values, setValues] = useState({ packageType: 'Pro', period: 'Monthly', withCredits: hasCredits });
  const [errors, setErrors] = useState({});

  const andDigitalThinkLaunchUser = (user = {}) => moment(user.createdAt).isAfter('2020-09-22');

  const pkgOptions = packagesOptions.filter((pkg) => values.withCredits ?
    (
      andDigitalThinkLaunchUser(user) ?
        pkg.value === 'Premium'
        : pkg.value === 'Pro'
    )
    : true);

  const onChange = ({ target: { name, value } }) => {
    setValues({ ...values, [name]: value });
    setErrors({});
  };

  const onSubmit = () => {
    onCreate(values, () => {
      onClose();
      setValues({});
      setErrors({});
    });
  };
  const onBrandCreationOption = (withCredits) => () => {
    onChange({
      target: {
        name: 'withCredits',
        value: withCredits
      }
    });
  };

  return (
    <Modal isVisible onClose={onClose} key='brand-form'>
      <div className='title-text'>Create New Brand</div>
      <FlexBox column spaceBetween>
        <FlexBox className='margin-v-10'>
          <Label error={errors.name}>
            Brand Name
          </Label>
          <TextField
            name='name'
            value={values.name}
            onChange={onChange}
            error={errors.name}
          />
        </FlexBox>
        <FlexBox className='margin-v-10'>
          <Label error={errors.subdomain}>
            subdomain
          </Label>
          <TextField
            name='subDomain'
            value={values.subDomain}
            onChange={onChange}
            error={errors.subdomain}
          />
        </FlexBox>
        <FlexBox className='margin-v-10'>
          <Label error={errors.package}>
            Package
          </Label>
          <SelectOption
            name='packageType'
            className='flex-box flex'
            value={values.packageType}
            onChange={onChange}
            options={pkgOptions}
            error={errors.packageType}
          />
        </FlexBox>
        {hasCredits && (
          <FlexBox className='margin-v-10'>
            <Label error={errors.package}>
              Create Brand As/With:
            </Label>
            <Checkbox
              onClick={onBrandCreationOption(false)}
              checked={!values.withCredits}
            >
              Free Trial
            </Checkbox>
            <Checkbox
              className='ml-2'
              onClick={onBrandCreationOption(true)}
              value={values.withCredits}
              checked={values.withCredits}
            >
              My
              <span data-tip={`this will cost you 1 credit, and you will left with ${credits - 1}`} className='mx-1'>
                Credits
              </span>
            </Checkbox>
          </FlexBox>
        )}
      </FlexBox>
      <FlexBox flexEnd>
        <Button onClick={onSubmit} className='primary-btn px-2 bold-text'>
          Create
        </Button>
      </FlexBox>
    </Modal>
  );
};

export default CreateModal;
