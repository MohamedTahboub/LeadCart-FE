import React from 'react';

import { useContext } from '../../../../actions';
import './templateCard.css';

const TemplateCard = (props) => {
  const { actions, state } = useContext();
  const { img = '' } = props;

  const onClick = () => {
    actions.updateState({
      ...state,
      product: {
        ...state.product,
        sections: props.sections
      }
    });
  };

  return (
    <section className='templateCard' onClick={onClick}>
      <div className='templateCard-img'>
        <img src={img} alt='' />
      </div>
    </section>
  );
};

export default TemplateCard;
