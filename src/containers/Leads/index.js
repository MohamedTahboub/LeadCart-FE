import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mapListToObject, notification } from 'libs';
import Select from 'react-select';
import common from 'components/common';
import moment from 'moment';
import LeadsTable from './sub/Leads';
import './style.css';
import { BsArchive } from 'react-icons/bs';


const {
  MainTitle,
  Page,
  PageHeader,
  PageContent,
  SubTabs,
  Button,
  FlexBox
} = common;

const filterLeads = ({ value }) => ({ funnel }) => value ? funnel === value : true;
const Leads = ({ leads = [], funnelsOptions = [] }) => {
  const [downloading, setDownloading] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  const [searchOption, setSearch] = useState([]);

  const onToggleArchive = () => setShowArchived((a) => !a);

  const onSearch = (option) => {
    setSearch(option);
  };
  const leadsList = leads.filter(filterLeads(searchOption)).sort((a, b) => (new Date(b.createdAt) - new Date(a.createdAt)));

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


  return (
    <Page className='products-details-page'>
      <PageHeader className='custom-leads-page-header'>
        <FlexBox center='v-centers'>
          <MainTitle className='m-0 mr-3'>Leads</MainTitle>
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
            className='light-btn mr-2'
          >
            <FlexBox center='v-center'>
              <BsArchive color='currentColor' className='mr-1' />
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
          defaultTab='Leads'
          tabs={{ Leads: <LeadsTable list={leadsList} /> }}
        />
      </PageContent>
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
export default connect(mapStateToProps)(Leads);
