import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import Section from './Section';
import Badge from 'components/common/Badge';
import common from 'components/common';
import { Button } from 'components/Buttons';
import { Table } from 'components/Tables';
import { notification } from 'libs';
import * as redemptionActions from 'actions/redemption';
import './style.css';

const { InputRow: { TextField } } = common;

const columns = [
  { title: 'Code', dataIndex: 'code', key: 'code' },
  { title: 'Type', dataIndex: 'type', key: 'type' },
  { title: 'Value', dataIndex: 'credits', key: 'credits' },
  { title: 'Status', dataIndex: 'state', key: 'state', render: () => <Badge>Redeemed</Badge> },
  { title: 'Redemption Date', dataIndex: 'updatedAt', key: 'createdAt', render: (updatedAt) => moment(updatedAt).format('MMM DD YYYY') }
];


const RedemptionSettings = ({ codes, credits, redeemPromoCode }) => {
  const [redeeming, setRedeeming] = useState(false);
  const formRef = useRef(null);

  const sortedCodes = [...codes].sort((a, b) => new Date(b.updatedAt).valueOf() - new Date(a.updatedAt).valueOf());

  const onRedeem = (e) => {
    e.preventDefault();
    e.persist();
    const { target: { redeemCode: { value } } } = e;
    setRedeeming(true);
    redeemPromoCode({ code: value }, {
      onSuccess: () => {
        notification.success('your code redeemed successfully');
        setRedeeming(false);
        if (formRef.current.reset)
          formRef.current.reset();
      },

      onFailed: (message) => {
        notification.failed(message);
        setRedeeming(false);
      }
    });
  };

  return (
    < Section title='Redemption' className='redemption' >
      <section className='redemption-cards' >
        <div className='card-style white-bg p-2'>
          <p>Credits/</p>
          <span>{credits}</span>
        </div>

        <div className='card-style white-bg p-2'>
          <p>Redeemed Codes/</p>
          <span>{codes.length}</span>
        </div>
      </section>

      <form className='mb-3' onSubmit={onRedeem} ref={formRef}>
        <div className='mb-2 redemption__form-title'>Redeem codes:</div>
        <div className='d-flex ml-2'>
          <TextField placeholder='E.g. XpI3_13-3' className='mr-2' name='redeemCode' uncontrolled />
          <Button type='dashed' htmlType='submit' loading={redeeming} primary>Redeem</Button>
        </div>
      </form>

      <div>
        <div className='mb-2'><strong>Redeemed codes:</strong></div>
        <div>
          <Table dataSource={sortedCodes} columns={columns} pagination={false} />
        </div>
      </div>
    </Section>
  );
};

const mapStateToProps = ({ redemption }) => ({ ...redemption });
export default connect(mapStateToProps, redemptionActions)(RedemptionSettings);
