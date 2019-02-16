import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as fileUploadingActions from 'actions/files';
import { DeleteButton } from '../Buttons';
import { BlankLink } from '../Links';
import { TagsElements } from './Tags';

class AddFieldComponent extends Component {
  state = {
    showTageInput: false,
    imageChangesSaved: false,
    image: '',
    files: [],
    tags: [
    ],
    currentTag: {}
  }

  onAddNewElement = (e) => {
    if (this.props.type === 'file' && !this.state.image) this.refs.imageField.click();
    if (this.props.type === 'tags') this.showTageInput();
    if (this.props.type === 'files') this.refs.fileInput.click();
    if (this.props.type === 'click') this.props.onClick();
  }

  onImageDelete = (e) => {
    this.setState({ image: '' });
  }

  onImageUpload = (e) => {
    this.props.uploadFile({ file: e.target.files[0], type: 'profile' });

    this.setState({
      imageChangesSaved: false,
      image: e.target.files[0].name
    });
  }

  componentDidUpdate = () => {
    const { image, imageChangesSaved } = this.state;
    if (!imageChangesSaved && image && this.props.uploadedFile) {
      this.setState({ imageChangesSaved: true });
      this.props.onUploaded(this.props.uploadedFile);
    }
  }

  onFileUpload = (e) => {
    this.props.uploadFile({ file: e.target.files[0], type: 'products' });

    this.setState({
      files: [...this.state.files, { linke: this.props.uploadedFile, name: e.target.files[0].name }]
    });
    this.onFilesChange();
  }

  showTageInput = () => this.setState({ showTageInput: true })

  onAddNewTag = () => {
    this.setState({
      tags: [...this.state.tags, { value: this.state.currentTag.value, id: this.state.tags.length }]
    });
    setTimeout(() => {
      this.props.type === 'tags' && this.props.onTagsChange(this.state.tags);
    }, 200);
  }

  onFilesChange = () => {
    setTimeout(() => {
      this.props.onProductFilesAdd(this.state.files);
    }, 200);
  }

  onTagDelete = (id) => this.setState({ tags: this.state.tags.filter((t) => t.id !== id) })

  onCurrentTagChange = ({ target: { value = '' } }) => this.setState({ currentTag: { value, valid: value.length > 3 } })

  onFileDeleted = (link) => {
    this.setState({ files: this.state.files.filter((f) => f.link !== link) });
    this.onFilesChange();
  }

  render () {
    const {
      color = 'primary-color', onClick, suffixIcon, children, notes, description, ...props
    } = this.props;
    return (
      <div>
        <div
          ref='addElementContainer'
          onClick={this.onAddNewElement}
          className='add-elements-container'
        >
          <span className={`add-element-circle ${color}`}>
            <i className='fas fa-plus' />
          </span>
          <span className='add-input-field'>{children}</span>
          <span className='add-element-notes'>{notes}</span>
          {(this.props.type === 'files' && this.state.files.length === 0) && <span className='add-element-description'>{description}</span>}
          {suffixIcon && <span className='add-element-suffix-element'>{suffixIcon}</span>}
        </div>
        <input
          onChange={this.onImageUpload}
          style={{ display: 'none' }} ref='imageField' type='file' name='myImage'
          accept='image/x-png,image/gif,image/jpeg'
        />
        <input
          onChange={this.onFileUpload}
          style={{ display: 'none' }} ref='fileInput' type='file' name='myFiles'
        />

        {(this.props.uploadedFile && this.props.type === 'file')
          && (
            <div className='child-added-element'>
              <BlankLink to={this.props.uploadedFile}>
                <img src={this.props.uploadedFile} alt={this.state.image} className='uploaded-thumbnil' />
                <span className='child-added-element-name'>{this.state.image}</span>
              </BlankLink>
              <DeleteButton onClick={this.onImageDelete} />
            </div>
          )}

        {this.props.type === 'tags'
          && (
            <TagsElements
              placeholder={this.props.placeholder}
              onCurrentTagChange={this.onCurrentTagChange}
              isCurrentTagValid={this.state.currentTag.valid}
              onAddTag={this.onAddNewTag}
              onDelete={this.onTagDelete}
              showTageInput={this.state.showTageInput}
              tags={this.state.tags}
            />
          )
        }

        {(this.props.type === 'files')
          && this.state.files.map((file) => (
            <div className='child-added-element'>
              <BlankLink to={file.link}>
                <span className='child-added-element-name'>{file.name}</span>
              </BlankLink>
              <DeleteButton onClick={() => this.onFileDeleted(file.link)} />
            </div>
          ))}

      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  uploadedFile: state.files.fileLink
});
export default connect(mapStateToProps, fileUploadingActions)(AddFieldComponent);
