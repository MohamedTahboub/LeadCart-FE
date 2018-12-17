import React from 'react';

// Bumpe Offers templates
import bumpImage1 from 'assets/images/bumpOffers_templates/bump1.png';
import bumpImage2 from 'assets/images/bumpOffers_templates/bump2.png';
import bumpImage3 from 'assets/images/bumpOffers_templates/bump3.png';
import bumpImage4 from 'assets/images/bumpOffers_templates/bump4.png';
import bumpImage5 from 'assets/images/bumpOffers_templates/bump5.png';


import common from 'components/common';
import './style.css';

const { BumpOfferTemplateCard } = common;
export const BumpOfferTemplates = (props) => (
  <div className='bump-offer-templates-container'>
    <BumpOfferTemplateCard image={bumpImage1} />
    <BumpOfferTemplateCard image={bumpImage2} />
    <BumpOfferTemplateCard image={bumpImage3} />
    <BumpOfferTemplateCard active image={bumpImage4} />
    <BumpOfferTemplateCard image={bumpImage5} />
  </div>
);

export default BumpOfferTemplates;
