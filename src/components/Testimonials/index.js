import React, { Component } from 'react';
import common from 'components/common';
import authorAvatar from 'assets/images/avatar.jpg';
import './style.css';

const { InputRow } = common;

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


class TestimonialElement extends Component {
  state = {
    changed: false,
    editAuthor: false,
    editContent: false,
    body: {
      author: 'EDIT AUTHOR NAME',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi adipisci ut quo? Beatae '
    }
  }

  editAuthor = ''

  editContent = ''

  updateState = (data) => {
    this.setState({
      body: data
    });
  }

  componentDidMount () {
    const { author, content, image } = this.props;
    this.updateState({ author, content, image });
  }

  componentDidUpdate (prev) {
    const { author, content, image } = this.props;
    if (prev.author !== author) this.updateState({ author, content, image });
  }

  onEnterKey = (fieldName, e) => {
    if (e.key === 'Enter') this.onToggleEditField(fieldName);
  }

  onToggleEditField = (fieldName) => {
    const fieldValue = this.state[fieldName];
    console.log('Toggled', fieldName, fieldValue);
    this.setState({
      [fieldName]: !fieldValue
    });
    // if (fieldValue && this[fieldName]) this[fieldName].focus();
    // if (fieldValue) {
    //   console.log('The parent Compoentn should updated by now!!\n');
    //   this.updateParent(this.state.body);
    // }
  }

  onImageChange

  onAuthorNameChange = ({ target: { value: author } }) => {
    const { body } = this.state;
    this.setState({
      body: {
        ...body,
        author
      }
    });
  }

  onContentChange

  updateParent = (testamonial) => {
    this.props.onChange && this.props.onChange({ target: { value: testamonial } });
  }

  render () {
    const {
      body: { image, author, content }, editAuthor, editContent
    } = this.state;

    return (
      <div className='testimonial-item'>
        <div className='testamonial-author'>
          <img src={image || authorAvatar} alt='testimonial author photo' className='testimonial-image' />
          <div className='testimonial-image-edit-mask'>
            <i className='fas fa-image' />
          </div>
        </div>
        <div className='testimonial-author'>
          {editAuthor
            ? (
              <input
                ref={(ref) => ref && ref.focus()}
                onBlur={(e) => this.onToggleEditField.bind(this, 'editAuthor')}
                onKeyDown={this.onEnterKey.bind(this, 'editAuthor')}
                onChange={this.onAuthorNameChange}
                type='text'
                value={author}
                className='light-input'
              />
            )
            : <span onClick={this.onToggleEditField.bind(this, 'editAuthor')} className='t-author-name'>{author}</span>
          }
        </div>
        {editContent
          ? (
            <textarea
              onBlur={this.onToggleEditField.bind(this, 'editContent')}
              onKeyDown={this.onEnterKey.bind(this, 'editContent')}
              name='testimonial-input'
              width='auto'
              className='testimonial-content-input'
            />
          )
          : (
            <div
              onClick={this.onToggleEditField.bind(this, 'editContent')}
              className='testamonial-content'
            >
              {content}
            </div>
          )}
      </div>
    );
  }
}

export const Testi = TestimonialElement;
