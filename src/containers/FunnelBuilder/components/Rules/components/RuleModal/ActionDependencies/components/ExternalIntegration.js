import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import * as IntegrationsActions from 'actions/integrations';
import { connect } from 'react-redux';
import { notification } from 'antd';
import Select from 'react-select';

const { FlexBox, Spinner } = common;

const ExternalIntegration = ({ type, integrationId, onChange, ...props }) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);

  const postActions = {
    onSuccess: (data) => {

      if (Array.isArray(data)) {
        const options = data.map(({ listId: value, listName: label }) => ({ value, label }));
        setState({ type: 'select', options });
      }
      setLoading(false);
    },
    onFailed: (arg) => {
      console.log(arg);
      setLoading(false);
    }
  };

  useEffect(() => {
    const details = {
      integration: integrationId,
      name: type
    };
    if (integrationId && type) {
      setLoading(true);
      props.getIntegrationActionRequirement(details, postActions);
    }
  }, [integrationId, type]);

  const _onChange = ({ value }) => onChange({
    target: {
      value,
      name: 'action.metaData.listId'
    }
  });

  return (
    <FlexBox column flex>
      <FlexBox center='h-center'>
        <Spinner show={loading} size='large' color='gray' className='mt-3 mb-4' />
      </FlexBox>
      {state.type && (
        <Select
          className='flex-item margin-h-10 min-width-400'
          defaultValue='IntegrationsService'
          options={state.options || []}
          onChange={_onChange}
        />
      )}
    </FlexBox>
  );
};

ExternalIntegration.propTypes = {};

export default connect(null, IntegrationsActions)(ExternalIntegration);
