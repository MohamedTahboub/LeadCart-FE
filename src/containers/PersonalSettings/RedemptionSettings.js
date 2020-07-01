import React, { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Section from './Section';
import Badge from 'components/common/Badge';
import { Input } from 'components/Inputs';
import { Button } from 'components/Buttons';
import { Table } from 'components/Tables';
import { notification } from 'libs';
import * as redemptionActions from 'actions/redemption';
import './style.css';


const columns = [
  { title: 'Code', dataIndex: 'code', key: 'code' },
  { title: 'Type', dataIndex: 'type', key: 'type' },
  { title: 'Value', dataIndex: 'credits', key: 'credits' },
  { title: 'Status', dataIndex: 'state', key: 'state', render: (state) => <Badge className='redemption-text-center'>{state === 'Used' ? 'Redeemed' : state}</Badge> },
  { title: 'Redemption Date', dataIndex: 'updatedAt', key: 'createdAt', render: (updatedAt) => moment(updatedAt).format('MMM DD YYYY') }
];


const RedemptionSettings = ({ codes, redeemPromoCode }) => {
  const [redeeming, setRedeeming] = useState(false);

  const onRedeem = (e) => {
    e.preventDefault();
    const { target: { redeemCode: { value } } } = e;
    setRedeeming(true);
    redeemPromoCode({ code: value }, {
      onSuccess: () => {
        notification.success('your code redeemed successfully');
        setRedeeming(false);
      },

      onFailed: (message) => {
        notification.failed(message);
        setRedeeming(false);

      }
    });

    if (e.target.reset) e.target.reset();
  };

  return (
    < Section title='Redemption' className='redemption' >
      <form form className='mb-3' onSubmit={onRedeem}>
        <div className='mb-2 redemption__form-title'>Redeem codes:</div>
        <div className='d-flex ml-2'>
          <Input placeholder='E.g. XpI3_13-3' className='mr-2' name='redeemCode' />
          <Button type='dashed' htmlType='submit' loading={redeeming} primary>Redeem</Button>
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

const mapStateToProps = ({ redemption }) => ({ ...redemption });
export default connect(mapStateToProps, redemptionActions)(RedemptionSettings);
