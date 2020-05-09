import React, { useState } from 'react';
import { Avatar, Button, Col, Row, Tag } from 'antd';
import { Modal } from 'components/Modals/';
import config from '../../config';

import './style.css';

const ACTIVE_TAG_COLOR = '#2db7f5';
const INACTIVE_TAG_COLOR = '#108ee9';

const BrandsSection = ({ brands }) => {
  const FILTERS = ['All', 'Active', 'Disabled'];
  const [activeBrandSubEdit, setActiveBrandSubEdit] = useState(null);
  const [activeFilter, setActiveFilter] = useState(FILTERS[0]);
  const resetActiveBrandSubEdit = () => setActiveBrandSubEdit(null);
  return (
    <div>
      {
        FILTERS.map((filter) => (
          <Tag
            color={filter === activeFilter ? ACTIVE_TAG_COLOR : INACTIVE_TAG_COLOR}
            onClick={() => setActiveFilter(filter)}
          >{filter}</Tag>
        ))
      }
      {
        brands && brands.map((brand) => {
          const packagePlanPrice = config.packagesPlans[brand.activePackage.type.toLowerCase()].price[brand.activePackage.period];
          return (
            <Row className='d-flex align-center my-2'>
              <Col span={1}>
                <Avatar>B</Avatar>
              </Col>
              <Col span={14}>
                <span>{brand.activePackage.type}</span>
              </Col>
              <Col span={5}>
                <span>{packagePlanPrice}$/{brand.activePackage.period === 'Monthly' ? 'mo' : 'ye'}</span>
              </Col>
              <Col span={4}>
                <Button onClick={() => setActiveBrandSubEdit(brand)}>Edit subscription</Button>
              </Col>
            </Row>
          );
        })
      }
      <Modal isVisible={activeBrandSubEdit} onClose={resetActiveBrandSubEdit} />
    </div>
  );
};

export default BrandsSection;
