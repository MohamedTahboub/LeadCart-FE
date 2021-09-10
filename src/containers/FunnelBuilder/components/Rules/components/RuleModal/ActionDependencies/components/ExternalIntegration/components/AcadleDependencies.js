import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import * as IntegrationsActions from 'actions/integrations';
import common from 'components/common';
import { isFunction } from 'libs/checks';

const { FlexBox, Spinners, InputRow } = common;
const { Label, TextAreaInput } = InputRow;
const { Loader } = Spinners;

const allowedFields = ['groups', 'message'];
const getOptions = (values = [], options) => {
  if (!Array.isArray(values) || !Array.isArray(options))
    return [];
  return options.filter(({ value }) => values.includes(value));
};
const AcadleIntegration = ({ metaData = {}, integrationId, onChange, ...props }) => {

  const [fields, setValues] = useState({});
  const [loading, setLoading] = useState(false);

  const getTheDependencies = () => {
    const details = {
      integration: integrationId,
      requirement: 'groups'
    };
    if (integrationId) {
      setLoading(true);
      props.getIntegrationActionRequirement(details, {
        onSuccess: (data) => {

          setValues({
            ...data,
            options: Array.isArray(data.options) ? data.options.map(({ name: label, value }) => ({ label, value })) : []
          });
          setLoading(false);
        },
        onFailed: () => {
          setLoading(false);
        }
      });
    }
  };

  useEffect(() => {
    getTheDependencies();
    // eslint-disable-next-line
  }, []);

  const _onChange = ({ target: { value, name } }) => {
    setValues({ ...fields, [name]: value });

    if (isFunction(onChange) && allowedFields.includes(name)) {
      onChange({
        target: {
          value,
          name: `action.metaData.${name}`
        }
      });
    }
  };
  const onSelectGroups = (options) => {
    _onChange({
      target: {
        name: 'groups',
        value: options ? options.map(({ value }) => value) : []
      }
    });
  };
  const selectedGroups = getOptions(metaData.groups, fields.options);

  if (loading) {
    return (
      <FlexBox center='h-center'>
        <Loader
          loading={loading}
          size={20}
          color='gray'
          className='mt-3 mb-4'
        />
      </FlexBox>
    );
  }

  return (
    <FlexBox column flex>
      <FlexBox flex className='my-3' center='v-center'>
        <Label className='gray-text'>
          Groups
        </Label>
        <Select
          className='select-coupons'
          options={fields?.options || []}
          name='groups'
          onChange={onSelectGroups}
          value={selectedGroups}
          isMulti
        />
      </FlexBox>
      <FlexBox flex flexStart className='mb-3'>
        <Label notes='you can tag the customer first name or last name using {fieldName} in your message below, e.g. Hi {firstName} {lastName}.' className='gray-text'>
          Invite Message
        </Label>
        <TextAreaInput
          placeholder='E.g. Hi {firstName} {lastName}'
          name='message'
          onChange={_onChange}
          countable={false}
          value={metaData.message}
        />
      </FlexBox>
    </FlexBox>
  );
};

AcadleIntegration.propTypes = {};

export default connect(null, IntegrationsActions)(AcadleIntegration);
