import React from 'react';
import Temp1 from './Temp1';
import Temp2 from './Temp2';
import Temp3 from './Temp3';
import Temp4 from './Temp4';
import Temp5 from './Temp5';
import Temp6 from './Temp6';

import './style.css'

export default ({ ...props }) => {
    const { product: { pagePreferences: { template } = {} } = {} } = props

    switch (template) {
        case 'temp1': return <Temp1 {...props} />;
        case 'temp2': return <Temp2 {...props} />;
        case 'temp3': return <Temp3 {...props} />;
        case 'temp4': return <Temp4 {...props} />;
        case 'temp5': return <Temp5 {...props} />;
        case 'temp6': return <Temp6 {...props} />;
        default: return <Temp3 {...props} />;
    }
};
