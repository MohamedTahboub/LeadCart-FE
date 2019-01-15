import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as fileUploadingActions from 'actions/files';
import { DeleteButton } from '../Buttons';
import { BlankLink } from '../Links';

class AddImage extends Component {
  state = {
    image: { name: 'product Image', link: this.props.value } || {},
    imageChangesSaved: !!this.props.value
  }

  onAddImage = () => {
    if (!this.state.image.link) this.refs.imageField.click();
  }

  onImageDelete = (e) => {
    this.setState({ image: {}, imageChangesSaved: false });
    this.props.deleteFile({ source: this.props.source, imageChangesSaved: false });
  }

  onImageUpload = (e) => {
    this.props.uploadFile({ file: e.target.files[0], type: 'products', source: this.props.source });
    this.setState({
      image: { name: e.target.files[0].name },
      imageChangesSaved: false
    });
  }

  componentDidUpdate = () => {
    const { imageChangesSaved } = this.state;
    if (!imageChangesSaved && this.props.files[this.props.source]) {
      this.setState({
        imageChangesSaved: true,
        image: { name: this.state.image.name, link: this.props.files[this.props.source] }
      });
      this.props.onUploaded(this.props.files[this.props.source]);
    }
  }

  render () {
    const {
      color = 'primary-color', onClick, classes = [], suffixIcon, children, notes, description, ...props
    } = this.props;
    const { image: { link, name }, imageChangesSaved } = this.state;
    return (
      <div className='add-input-field-holder'>
        <div
          ref='addElementContainer'
          onClick={this.onAddImage}
          className={`add-elements-container ${classes.join(' ') || ''}`}
        >
          <span className={`add-element-circle ${color}`}>
            <i className='fas fa-plus' />
          </span>
          <span className='add-input-field'>{children}</span>
          <span className='add-element-notes'>{notes}</span>
          {suffixIcon && <span className='add-element-suffix-element'>{suffixIcon}</span>}
        </div>
        <input
          onChange={this.onImageUpload}
          style={{ display: 'none' }} ref='imageField' type='file' name='myImage'
          accept='image/x-png,image/gif,image/jpeg'
        />


        {(link && imageChangesSaved) && (
          <div className='child-added-element '>
            <BlankLink className='display-flex' to={link}>
              <img src={link} alt={name} className='uploaded-thumbnil' />
              <span className='child-added-element-name'>{name}</span>
            </BlankLink>
            <DeleteButton onClick={this.onImageDelete} />
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = ({ files }) => ({
  files
});
export default connect(mapStateToProps, fileUploadingActions)(AddImage);
