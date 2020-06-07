import React from 'react';
import classNames from 'classnames';
import Section from './Section';
import { Input } from 'components/Inputs';
import { Button } from 'components/Buttons';
import { Table } from 'components/Tables';

import './style.css';

const NumberHighlighter = ({ title, number, className }) => (
  <div className={classNames('number-highlighter', className)}>
    <span className='number-highlighter-title'>{title}/</span>
    <span className='number-highlighter-number'>{number}</span>
  </div>
);

const columns = [
  { title: 'Code', dataIndex: 'code', key: 'code' },
  { title: 'Type', dataIndex: 'type', key: 'type' },
  { title: 'Value', dataIndex: 'value', key: 'value' },
  { title: 'Redemption Date', dataIndex: 'redemptionDate', key: 'redemptionDate' }
];

const RedemptionSettings = ({ credits, redemptionCodes }) => (
  <Section title='Redemption'>
    <div className='d-flex mb-3'>
      <NumberHighlighter title='Credits' number={credits} className='mr-2'/>
      <NumberHighlighter title='Stacked codes' number={redemptionCodes.length}/>
    </div>
    <div className='mb-3'>
      <div className='mb-2'><strong>Redeem codes:</strong></div>
      <div className='d-flex ml-2'>
        <Input placeholder='E.g. XpI3_13-3' className='mr-2'/>
        <Button type='dashed' primary>Redeem</Button>
      </div>
    </div>
    <div>
      <div className='mb-2'><strong>Redeemed codes:</strong></div>
      <div>
        <Table dataSource={redemptionCodes} columns={columns} pagination={false}/>
      </div>
    </div>
  </Section>
);

export default RedemptionSettings;
