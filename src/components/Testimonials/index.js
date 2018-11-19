import React, { Component } from 'react';
import common from 'components/common';
import './style.css';

const { InputRow, MainBlock } = common;

const Testimonial = ({ data: { text, image }, onDelete }) => {
  if (typeof text === 'string' && text.length > 20) text = `${text.slice(0, 20)} ....`;

  return (
    <div className='testimonial-item-container'>
      <img src={image} alt={text} className='testamonial-img' />
      <span className='testamonial-content'>{text}</span>
      <span onClick={onDelete} className='testamonial-delete-btn'>Del</span>
    </div>
  );
};

export default class Testimonials extends Component {
  state = {
    id: 0,
    text: '',
    image: '',
    list: []
  }

  updateCurrentTestText = ({ target: { value: text } }) => this.setState({ text })

  updateCurrentTestImage = (image) => this.setState({ image })

  addNewTestimonial = () => {
    const { text, image, list } = this.state;
    if (text.trim().length === 0 || image.trim().length === 0) return;

    if (list.length === 6) return;
    // if (list.find((i) => i.image === image)) return;

    const testamonials = [...list, { text, image, id: list.length }];

    this.setState({ list: testamonials });

  
    this.props.onChange(testamonials);
  }

  onDeleteTestimonial = (id) => {
    const testamonials = this.state.list.filter((t) => t.id !== id);

    this.setState({ list: testamonials });

    this.props.onChange(testamonials);
  }

  render () {
    return (
      <React.Fragment>
        <InputRow>
          <InputRow.Label>Testimonial</InputRow.Label>
          <InputRow.SmallInput name='text' onChange={this.updateCurrentTestText}></InputRow.SmallInput>
        </InputRow>
        <InputRow>
          <InputRow.Label>Testimonial Iamge</InputRow.Label>
          <InputRow.AddImage
            name='image'
            onUploaded={this.updateCurrentTestImage}
            source='testamonials_image'
          >
            Add image

          </InputRow.AddImage>
        </InputRow>
        <InputRow.AddComponentField color='green-color' name='testimonials' onClick={this.addNewTestimonial} type='click'>New testimonial</InputRow.AddComponentField>
        {this.state.list.map((testi, id) => <Testimonial key={id} data={testi} onDelete={() => this.onDeleteTestimonial(testi.id)} />)}
      </React.Fragment>
    );
  }
}

