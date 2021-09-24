import React from 'react';
import common from 'components/common';

import { connect } from 'react-redux';
import * as settingsActions from 'actions/settings';
import { FlexBox } from 'components/common/boxes';
import { mapListToObject } from 'libs';
import Select from 'react-select';
const { InputRow } = common;
const getOptionValue = (list = [], matchedValue) => list.find(({ value }) => matchedValue === value);


const DomainRedirectSettings = ({ funnelsOptions, marketPlace, onChange }) => {
  const { enabled, destinationType, destinationLink, destinationFunnelId } = marketPlace?.redirects || {};


  const isExternalDestination = destinationType === 'link';

  return (
    <FlexBox className='mt-4' column>
      <strong className='title '>Domain/Subdomain redirect control</strong>
      <FlexBox className='pl-3' column flexStart>
        <InputRow margin='10'>
          <InputRow.Label note='If enabled, your marketplace will no longer be shown instead it will redirect to the destination you define below' >
            Enable redirect:
          </InputRow.Label>
          <InputRow.Toggle
            value={enabled}
            onToggle={() => onChange({ target: { name: 'redirects.enabled', value: !enabled } })}
          />
        </InputRow>
        {enabled && (
          <>
            <InputRow margin='10'>
              <InputRow.Label>
                Redirect Destinations:
              </InputRow.Label>
              <InputRow.SelectOption
                value={destinationType}
                name='redirects.destinationType'
                onChange={onChange}
                options={[
                  { label: 'External Link', value: 'link' },
                  { label: 'Internal Funnel', value: 'funnel' }
                ]}
                className='select-period'
              />
            </InputRow>
            {isExternalDestination ? (
              <InputRow margin='10'>
                <InputRow.Label>
                  Redirect Link:
                </InputRow.Label>
                <InputRow.UrlInput
                  name='redirects.destinationLink'
                  value={destinationLink}
                  onChange={onChange}
                />
              </InputRow>
            ) : (
              <InputRow margin='10'>
                <InputRow.Label note='Select one of your funnel to redirect your marketplace to.'>
                  Redirect Funnel:
                </InputRow.Label>
                <Select
                  // target='appliesTo'
                  onChange={({ value }) => onChange({ target: { value, name: 'redirects.destinationFunnelId' } })}
                  className='flex-item min-width-250'
                  value={getOptionValue(funnelsOptions, destinationFunnelId)}
                  options={funnelsOptions}
                />
              </InputRow>
            )}
          </>
        )}
      </FlexBox>
    </FlexBox>
  );
};

DomainRedirectSettings.propTypes = {};

const mapStateToProps = ({ funnels = [] }) => {
  const funnelsOptions = [...Object.values(mapListToObject(funnels, '_id', { name: 'label', _id: 'value' }))];
  return ({ funnelsOptions: funnelsOptions });
};
export default connect(mapStateToProps, settingsActions)(DomainRedirectSettings);
