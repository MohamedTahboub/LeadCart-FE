import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as fileUploadingActions from 'actions/files';
import { DeleteButton } from '../Buttons';
import { BlankLink } from '../Links';
import { TagsElements } from './Tags';

class AddFieldComponent extends Component {
  state = {
    showTageInput: false,
    image: '',
    tags: [
      { value: 'spcial', id: 0 },
      { value: 'So spcial', id: 1 },
      { value: 'kind of spcial', id: 2 },
    ],
    currentTag: {}
  }

  onAddNewElement = (e) => {
    if (this.props.type === 'file') this.refs.imageField.click();
    if (this.props.type === 'tags') this.showTageInput();
  }

  onImageDelete = (e) => {
    this.setState({ image: '' });
  }

  onImageUpload = (e) => {
    this.props.uploadFile({ file: e.target.files[0], type: 'profile' });

    this.setState({
      image: e.target.files[0].name
    });
  }

  showTageInput = () => this.setState({ showTageInput: true })

  onAddNewTag = () => this.setState({
    tags: [...this.state.tags, { value: this.state.currentTag.value, id: this.state.tags.length }]
  })

  onTagDelete = (id) => this.setState({ tags: this.state.tags.filter((t) => t.id !== id) })

  onCurrentTagChange = ({ target: { value = '' } }) => this.setState({ currentTag: { value, valid: value.length > 3 } })

  render () {
    const {
      color = 'primary-color', onClick, suffixIcon, children, notes, description, ...props
    } = this.props;
    return (
      <div>
        <div
          onClick={this.onAddNewElement}
          className='add-elements-container'
        >
          <span className={`add-element-circle ${color}`}>
            <i className='fas fa-plus' />
          </span>
          <span className='add-input-field'>{children}</span>
          <span className='add-element-notes'>{notes}</span>
          <span className='add-element-description'>{description}</span>
          {suffixIcon && <span className='add-element-suffix-element'>{suffixIcon}</span>}
        </div>
        <input
          onChange={this.onImageUpload}
          style={{ display: 'none' }} ref='imageField' type='file' name='myImage'
          accept='image/x-png,image/gif,image/jpeg'
        />

        {(this.props.uploadedFile && this.props.type === 'file')
          && (
            <div className='child-added-element'>
              <BlankLink to={this.props.uploadedFile}>
                <span className='child-added-element-name'>{this.state.image}</span>
              </BlankLink>
              <DeleteButton onClick={this.onImageDelete} />
            </div>
          )}

        {this.props.type === 'tags'
          && (
            <TagsElements
              onCurrentTagChange={this.onCurrentTagChange}
              isCurrentTagValid={this.state.currentTag.valid}
              onAddTag={this.onAddNewTag}
              onDelete={this.onTagDelete}
              showTageInput={this.state.showTageInput}
              tags={this.state.tags}
            />
          )
        }
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  uploadedFile: state.files.fileLink
});
export default connect(mapStateToProps, fileUploadingActions)(AddFieldComponent);
