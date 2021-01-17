import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';


const PageDependencies = ({
  brandFonts,
  productName
}) => {
  console.log({ brandFonts });
  const fontLinks = brandFonts
    .filter((font) => font.type === 'googleFont')
    .map((font) => {
      return (
        <link rel='stylesheet' type='text/css' href={font.url} />
      );
    });

  return (
    <>
      <Helmet>
        <title>{productName}</title>
        {fontLinks}
      </Helmet>
    </>
  );
};

PageDependencies.propTypes = {
  productName: PropTypes.string,
  brandFonts: PropTypes.array
};

PageDependencies.defaultProps = {
  productName: 'LeadCart',
  brandFonts: []
};

export default PageDependencies;
