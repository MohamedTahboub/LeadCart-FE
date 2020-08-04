import React from 'react';
import clx from 'classnames';


import { useContext } from '../../../../actions';
import './templateCard.css';

const TemplateCard = (props) => {
  const { actions, state } = useContext();
  const { active, setActive, title, img = '', sections } = props;

  const onClick = () => {
    actions.updateState({
      ...state,
      product: {
        ...state.product,
        sections
      }
    });

    setActive(title);
  };

  const classNames = clx('templateCard', { activeTemplate: active === title });

  return (
    <section className={classNames} onClick={onClick}>
      <div className='templateCard-img'>
        <img src={img} alt='' />
      </div>
    </section>
  );
};

export default TemplateCard;
