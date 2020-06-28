import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import * as IntegrationsActions from 'actions/integrations';
import common from 'components/common';

const { FlexBox, Spinners } = common;
const { Loader } = Spinners;

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
    onFailed: () => {
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
          <Loader
            loading={loading}
            size={20}
            color='gray'
            className='mt-3 mb-4'
          />
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
