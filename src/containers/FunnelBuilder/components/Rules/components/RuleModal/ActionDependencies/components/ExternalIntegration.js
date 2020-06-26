import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import common from 'components/common';
import * as IntegrationsActions from 'actions/integrations';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Label } from 'semantic-ui-react';

const { FlexBox, Spinner } = common;

const ExternalIntegration = ({ integrationId, metaData = {}, onChange, requirement, ...props }) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);

  const postActions = {
    onSuccess: (data) => {

      setState({
        ...data,
        options: Array.isArray(data.options) ? data.options.map(({ name: label, value }) => ({ label, value })) : []
      });
      setLoading(false);
    },
    onFailed: (arg) => {
      console.log(arg);
      setLoading(false);
    }
  };

  const getTheDependencies = () => {
    const details = {
      integration: integrationId,
      requirement
    };
    if (integrationId && requirement) {
      setLoading(true);
      props.getIntegrationActionRequirement(details, postActions);
    }
  };

  useEffect(getTheDependencies, [integrationId, requirement]);

  const _onChange = ({ value }) => onChange({
    target: {
      value,
      name: `action.metaData.${state.name}`
    }
  });

  return (
    <FlexBox column flex>
      {loading ? (
        <FlexBox center='h-center'>
          <Spinner show={loading} size='large' color='gray' className='mt-3 mb-4' />
        </FlexBox>
      ) : (
        <FlexBox flexStart flex>
          <span className='large-text gray-text bold-text capitalized-text ml-2'>
            {requirement}
          </span>
        </FlexBox>
      )}
      {state.type && (
        <Select
          className='flex-item margin-h-10 min-width-400'
          // defaultValue='IntegrationsService'
          options={state.options || []}
          defaultValue={metaData[state.name]}
          onChange={_onChange}
        />
      )}
    </FlexBox>
  );
};

ExternalIntegration.propTypes = {};

export default connect(null, IntegrationsActions)(ExternalIntegration);
