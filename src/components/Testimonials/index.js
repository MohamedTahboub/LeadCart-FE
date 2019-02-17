import React, { Component } from 'react';
import common from 'components/common';
import authorAvatar from 'assets/images/avatar.jpg';
import './style.css';


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


  updateState = (data) => {
    this.setState({
      body: data
    });
  }

  componentDidMount() {
    const { author, content, image } = this.props;
    this.updateState({ author, content, image });
  }

  componentDidUpdate(prev) {
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

  render() {
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
