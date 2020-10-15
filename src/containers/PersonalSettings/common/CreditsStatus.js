import React from 'react';
import PropTypes from 'prop-types';
import { GoInfo } from 'react-icons/go';
import ReactTooltip from 'react-tooltip';


const aboutCredits = 'you can use credits for brands or sub-accounts creation, each credit equals one Premium Brand or one Sub-Account.';
const CreditsStatus = ({ credits }) => {
  return (
    <div className='ml-2' >
            You have
      <span className='bold-text mx-1' >
        {credits}
      </span>
         credits left
      <GoInfo
        className='gray-text ml-2'
        data-tip={aboutCredits}
      />
      <ReactTooltip />
    </div>
  );
};

CreditsStatus.propTypes = { credits: PropTypes.number };
CreditsStatus.defaultProps = { credits: 0 };
export default CreditsStatus;
