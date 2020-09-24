import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { connect } from 'react-redux';

import common from 'components/common';
import { notification } from 'libs';
import * as brandsActions from 'actions/brands';
import { NewBrandModal } from './components';

const { FlexBox, Badge, Table, Button } = common;

const Brands = ({
  list: brandsList,
  user,
  ...props
}) => {
  const [openModal, setOpenModal] = useState(false);
  const onCreate = (brand, cb) => {
    const actions = {
      onSuccess: () => {
        notification.success(`${brand.name} Brand Created`);
        cb();
      },
      onFailed: (message) => {
        notification.failed(message);
        cb();
      }
    };
    props.createBrand(brand, actions);
  };

  const onDelete = (brandId) => () => {
  };

  const toggleCreateModal = () => {
    setOpenModal((open) => !open);
  };

  return (
    <FlexBox column className='white-bg soft-edges padding-20 margin-10'>
      <FlexBox spaceBetween center='v-center'>
        <div className='title-text'>Brands Management</div>
        <Button onClick={toggleCreateModal} className='primary-btn'>
          New Brand
        </Button>
      </FlexBox>
      <Table>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Package</Table.HeadCell>
          <Table.HeadCell>SubDomain</Table.HeadCell>
          <Table.HeadCell />
        </Table.Head>
        <Table.Body>
          {brandsList.map((brand) => {
            const {
              id,
              name,
              trial,
              subDomain,
              activePackage: { type: packageType = 'Basic' } = {}
            } = brand;

            return (
              <Table.Row>
                <Table.Cell mainContent={name} />
                <Table.Cell mainContent={(
                  <Badge type='primary' className='uppercase-text relative-element'>
                    {packageType}
                    {trial && <Badge type='secondary' className='trial-badge'>Trial</Badge>}
                  </Badge>
                )}
                />
                <Table.Cell mainContent={subDomain} />
                <Table.Cell mainContent={(
                  <FlexBox className='hide-element'>
                    <AiOutlineDelete
                      onClick={onDelete(id)}
                      className='margin-h-10 danger-color animate item-clickable '
                    />
                  </FlexBox>
                )}
                />
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      {openModal && (
        <NewBrandModal
          open
          onClose={toggleCreateModal}
          onCreate={onCreate}
          user={user}
        />)
      }
    </FlexBox>
  );
};

Brands.defaultProps = { list: [] };
const stateToProps = ({ user: { user = {} } }) => ({ user });
export default connect(stateToProps, brandsActions)(Brands);
