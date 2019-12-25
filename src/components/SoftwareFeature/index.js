import React from 'react';
import SmallCheck from 'assets/images/Small-Check.png';

const SoftwareFeature = ({text}) => (
    <div>
        <img src={SmallCheck} className="small-check" />
        {text}
    </div>
);

export default SoftwareFeature;