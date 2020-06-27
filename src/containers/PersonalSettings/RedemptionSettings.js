import React from 'react';
import { connect } from 'react-redux';
import ids from 'shortid';

import Section from './Section';
import { Input } from 'components/Inputs';
import { Button } from 'components/Buttons';
import { Table } from 'components/Tables';
import { notification } from 'libs';
import * as redemptionActions from 'actions/redemption';
import './style.css';


const columns = [
  { title: 'Code', dataIndex: 'code', key: 'code' },
  { title: 'Type', dataIndex: 'type', key: 'type' },
  { title: 'Value', dataIndex: 'value', key: 'value' },
  { title: 'Redemption Date', dataIndex: 'redemptionDate', key: 'redemptionDate' }
];

const redemptionCodes = [
  { code: '', type: 'Stacking', value: 1, redemptionDate: (new Date()).toISOString() },
  { code: '', type: 'Stacking', value: 1, redemptionDate: (new Date()).toISOString() },
  { code: '', type: 'Stacking', value: 1, redemptionDate: (new Date()).toISOString() },
  { code: '', type: 'Stacking', value: 1, redemptionDate: (new Date()).toISOString() },
  { code: '', type: 'Stacking', value: 1, redemptionDate: (new Date()).toISOString() },
  { code: '', type: 'Stacking', value: 1, redemptionDate: (new Date()).toISOString() },
  { code: '', type: 'Stacking', value: 1, redemptionDate: (new Date()).toISOString() }]
  .map((code) => ({
    ...code,
    code: ids.generate()
  }));


const RedemptionSettings = ({ codes, redeemPromoCode }) => {
  const onRedeem = (e) => {
    e.preventDefault();
    const { target: { redeemCode: { value } } } = e;

    redeemPromoCode({ value }, {
      onSuccess: () => {
        notification.success('your code redeemed successfully');
      },

      onFailed: (message) => {
        notification.failed(message);
      }
    });

    if (e.target.reset) e.target.reset();
  };

  return (
    < Section title='Redemption' >
      <form form className='mb-3' onSubmit={onRedeem}>
        <div className='mb-2 redemption__form-title'>Redeem codes:</div>
        <div className='d-flex ml-2'>
          <Input placeholder='E.g. XpI3_13-3' className='mr-2' name='redeemCode' />
          <Button type='dashed' htmlType='submit' primary>Redeem</Button>
        </div>
      </form>

      <div>
        <div className='mb-2'><strong>Redeemed codes:</strong></div>
        <div>
          <Table dataSource={codes} columns={columns} pagination={false} />
        </div>
      </div>
    </Section >
  );
};

const mapStateToProps = ({ codes = redemptionCodes }) => ({ codes });
export default connect(mapStateToProps, redemptionActions)(RedemptionSettings);
