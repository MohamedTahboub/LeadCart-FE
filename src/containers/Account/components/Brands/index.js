import React, { useState } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
// import sampleBrandsList from 'data/brandsList';
import { AiOutlineDelete } from 'react-icons/ai';

import { connect } from 'react-redux';
import * as brandsActions from 'actions/brands';
import {
  CreateModal
} from './components';

const {

  //   InputRow,
  FlexBox,
  Badge,
  Table,
  Button,
  //   FlexBoxesContainer
} = common;

const Brands = ({ list: brandsList, ...props }) => {
  const [openModal, setOpenModal] = useState(false);
  const onCreate = (brand, cb) => {
    // console.log('Create New');

    //     name
    // packageType
    // subDomain
    props.createBrand(brand);
    // setOpenModal(true);
    cb();
  };

  const onDelete = (brandId) => () => {
    // console.log(brandId);
  };

  const toggleCreateModal = () => {
    setOpenModal((open) => !open);
  };

  return (
    <FlexBox column className='white-bg soft-edges padding-20 margin-10'>
      <FlexBox spaceBetween center='v-center'>
        <div className='title-text'>Brands Management</div>
        <Button onClick={onCreate} className='primary-btn'>
          New Brand
        </Button>
      </FlexBox>
      <Table>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Support Email</Table.HeadCell>
          <Table.HeadCell />
        </Table.Head>
        <Table.Body>
          {brandsList.map((brand) => (

            <Table.Row>
              <Table.Cell mainContent={brand.name} />
              <Table.Cell mainContent={(
                <Badge type='primary' className='uppercase-text relative-element'>
                  {(brand.package || 'Basic')}
                  {brand.trail && <Badge type='secondary' className='trial-badge'>Trail</Badge>}
                  {typeof brand.trail === 'undefined' && <Badge type='secondary' className='trial-badge'>Trail</Badge>}
                </Badge>
              )}
              />
              <Table.Cell mainContent={brand.supportEmail} />
              <Table.Cell mainContent={(
                <FlexBox>
                  <AiOutlineDelete
                    onClick={onDelete(brand.id)}
                    className='margin-h-10 danger-color animate item-clickable '
                  />
                </FlexBox>
              )}
              />
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {openModal && (
        <CreateModal
          open
          onClose={toggleCreateModal}
          onCreate={onCreate}
        />)
      }
    </FlexBox>
  );
};

Brands.propTypes = {

};
Brands.defaultProps = {
  list: []
};

// const propifyState = ({ brands }) => ({ brands });
export default connect(null, brandsActions)(Brands);
