import React, { Fragment } from 'react';
import { TemplateCard } from 'components/common/Cards';


const firstTemplateImage = 'https://i.imgur.com/MTWlfAG.png';
const secondTemplateImage = 'https://i.imgur.com/9p6XdWM.png';
const thirdTemplateImage = 'https://i.imgur.com/bS3Xzde.png';
const fourthTemplateImage = 'https://i.imgur.com/qwROHQZ.png';

export const templates = [
  {
    name: 'First Template',
    image: firstTemplateImage,
    id: 'firstTemplate'
  },
  {
    name: 'Second Template',
    image: secondTemplateImage,
    id: 'secondTemplate'
  },
  {
    name: 'Third Template',
    image: thirdTemplateImage,
    id: 'thirdTemplate'
  },
  {
    name: 'Fourth Template',
    image: fourthTemplateImage,
    id: 'fourthTemplate'
  },
  {
    name: 'Fifth Template',
    image: firstTemplateImage,
    id: 'fifthTemplate'
  }
];

const PagesTemplates = ({ onSelect, selected }) => (
  <Fragment>
    {templates.map((template) => (
      <TemplateCard
        key={template.id}
        {...template}
        onClick={onSelect(template.id)}
        active={selected === template.id}
      />
    ))}
  </Fragment>
);

PagesTemplates.propTypes = {};

export default PagesTemplates;
