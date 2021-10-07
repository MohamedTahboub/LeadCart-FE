import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mapListToObject, notification } from 'libs';
import Select from 'react-select';
import common from 'components/common';
import moment from 'moment';
import LeadsTable from './sub/Leads';
import AbandonmentsTable from './sub/Abandonments';
import './style.css';
import clx from 'classnames';
import { BiArchiveIn, BiArchiveOut } from 'react-icons/bi';
import Dialog from 'components/common/Dialog';
import { HiOutlineArchive } from 'react-icons/hi';
import * as leadActions from 'actions/leads';

const {
  MainTitle,
  Page,
  PageHeader,
  PageContent,
  SubTabs,
  Button,
  FlexBox,
  Tooltip
} = common;

const filterLeads = ({ value }) => ({ funnel }) => value ? funnel === value : true;

const Leads = ({ leads = [], prospects = [], funnelsOptions = [], archiveLeads, unarchiveLeads }) => {

  const [downloading, setDownloading] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);

  const [searchOption, setSearch] = useState([]);

  const onToggleArchive = () => setShowArchived((a) => !a);

  const onSearch = (option) => {
    setSearch(option);
  };

  const leadsList = leads
    .filter((lead) => showArchived ? lead.archived : !lead.archived)
    .filter(filterLeads(searchOption)).sort((a, b) => (new Date(b.createdAt) - new Date(a.createdAt)));

  const prospectsList = prospects
    .filter(filterLeads(searchOption)).sort((a, b) => (new Date(b.createdAt) - new Date(a.createdAt)));


  const onExportToCSV = () => {
    const title = 'Full Name,Email Address, Capture Times, Capture Date';
    const csvRows = leadsList.reduce((rows, { fullName, updatedAt, captureCount, email }) => {
      const row = `${fullName},${email},${captureCount},${moment(updatedAt).format()}`;
      return `${rows}\n${row}`;
    }, title);

    const fileName = `leads-${moment().format('MMM DD YYYY')}.csv`;

    const download = document.createElement('a');
    const fileHref = `data:text/csv;charset=utf-8,${encodeURIComponent(csvRows)}`;
    download.setAttribute('href', fileHref);
    download.setAttribute('download', fileName);
    download.click();
  };

  const onDownloadReport = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      if (leadsList.length) {
        onExportToCSV();
        return notification.success('CSV report for your leads records has been downloaded');
      }
      notification.failed('There are not enough records to be downloaded');
    }, 1200);
  };

  const onArchiveLead = (leadId) => {
    archiveLeads({ ids: [leadId], all: false }, {
      onSuccess: () => {
        setShowArchiveModal();
        notification.success('Lead has been successfully archived');
      },
      onFailed: (error) => {
        notification.failed(error);
      }
    });
  };
  const onUnArchivedLead = (lead = {}) => {
    const { _id: leadId } = lead;
    unarchiveLeads({ ids: [leadId], all: false }, {
      onSuccess: () => {
        notification.success('Lead has been restored successfully');
      },
      onFailed: (error) => {
        notification.failed(error);
      }
    });
  };

  const onShowArchivingModal = (lead = {}) => {
    const { _id: leadId } = lead;
    setShowArchiveModal(leadId);
  };


  return (
    <Page className='products-details-page'>
      <PageHeader className='custom-leads-page-header'>
        <FlexBox center='v-centers'>
          <MainTitle className='m-0 mr-3'>
            <span>
              Leads & Cart Abandonments
            </span>
            {showArchived && (
              <Tooltip text={'Archived leads list'} placement='bottom'>
                <span>
                  (Archived)
                </span>
              </Tooltip>
            )}
          </MainTitle>
          <Select
            className='leads-search-select'
            options={funnelsOptions}
            target='name'
            name='productId'
            onChange={onSearch}
            value={searchOption}
            placeholder='Filter By Funnel'
          />
        </FlexBox>
        <FlexBox>
          <Button
            onClick={onToggleArchive}
            className={clx('light-btn mr-2', { archived: showArchived })}
          >
            <FlexBox center='v-center'>
              {showArchived ? (
                <BiArchiveOut color='currentColor' className='mr-1' size={18} />
              ) : (
                <BiArchiveIn color='currentColor' className='mr-1' size={18} />
              )}
              <span>
                Archived Leads
              </span>
            </FlexBox>
          </Button>
          <Button
            onprogress={downloading}
            disabled={downloading}
            onClick={onDownloadReport}
            className='primary-color'
          >
            Export csv
          </Button>
        </FlexBox>
      </PageHeader>
      <PageContent>
        <SubTabs
          defaultTab={`${showArchived ? 'Archived Leads' : 'Leads'}`}
          tabs={{
            'Leads': (
              <LeadsTable
                list={leadsList}
                onShowArchivingModal={onShowArchivingModal}
                onUnArchivedLead={onUnArchivedLead}
                isArchived={showArchived}
              />
            ),
            'Cart Abandonments': (
              <AbandonmentsTable
                list={prospectsList}
              // onShowArchivingModal={onShowArchivingModal}
              // onUnArchivedLead={onUnArchivedLead}
              // isArchived={showArchived}
              />
            )
          }}
        />
      </PageContent>
      {showArchiveModal && (
        <Dialog
          title='Lead Archiving'
          description='Are you sure, you want archive this lead?'
          show={showArchiveModal}
          confirmBtnIcon={<HiOutlineArchive color='currentColor' size={16} className='mr-2' />}
          onClose={() => setShowArchiveModal('')}
          confirmBtnText='Archive'
          onConfirm={() => onArchiveLead(showArchiveModal)}
          className='delete-modal-width'
        />
      )}
    </Page>
  );
};

const mapStateToProps = ({ leads = [], funnels = [] }) => {
  const optInFunnels = funnels.filter(({ type }) => type === 'OPT-IN');
  const funnelsOptions = [{ label: 'All' }, ...Object.values(mapListToObject(optInFunnels, '_id', { name: 'label', _id: 'value' }))];
  return ({
    leads,
    funnelsOptions: funnelsOptions
  });
};
Leads.propTypes = { leads: PropTypes.array };
Leads.defaultProps = { leads: [] };
export default connect(mapStateToProps, leadActions)(Leads);
