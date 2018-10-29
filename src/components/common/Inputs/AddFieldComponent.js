import React, { Component } from 'react';
import { DeleteButton } from '../Buttons';


class AddFieldComponent extends Component {
    state = {
      type: 'file',
      image: '',
      elements: [
        { name: 'prodcut image', value: '' }
      ]
    }

    onAddNewElement = (e) => {
      if (this.props.type !== 'tags') this.refs.imageField.click();
    }

    onImageDelete = (e) => {
      this.setState({ image: '' });
    }

    onImageUpload = (e) => {
      console.log(e.target.files);
      this.setState({
        image: e.target.files[0].name
      });
    }

    render () {
      const {
        color = 'primary-color', onClick, suffixIcon, children, notes, description, ...props
      } = this.props;
      return (<React.Fragment>
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
        {this.state.image
                && (
                  <div className='child-added-element'>
                    <span className='child-added-element-name'>{this.state.image}</span>
                    <DeleteButton onClick={this.onImageDelete} />
                  </div>
                )}
              </React.Fragment>
      );
    }
}

export default AddFieldComponent;
