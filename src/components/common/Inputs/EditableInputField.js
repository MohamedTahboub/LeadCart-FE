import React, { Component, Fragment } from 'react';


class EditableInputField extends Component {
  state = { editable: false, content: '' }

  componentDidMount () {
    const { content } = this.props;
    this.setState({ content });
  }

  onChange = ({ target: { value: content } }) => this.setState({ content })

  onEdit = () => this.setState({ editable: true })


  onSave = () => {
    this.setState({ editable: false });
    this.props.onSave(this.state.content);
  }

  componentDidUpdate (prevProps) {
    const { content } = this.props;
    if (prevProps.content !== content) this.setState({ content });
  }


  render () {
    const { editable, content } = this.state;
    const { onDelete, countable, number } = this.props;
    return (
      <div className='editable-field-container'>
        {countable && (
          <span className='field-count'>
            {`${number}-`}
          </span>
        )}
        <input
          type='text'
          style={{ width: `${content ? `${content.length + 2}ch` : 'inherit'}` }}
          className='editable-input-field'
          onChange={this.onChange} value={content}
          disabled={!editable}
        />
        <div className='editable-field-controls'>
          {editable ? (
            <span onClick={this.onSave} className='add-field-btn editable-save-btn'>
              <i className='fas fa-save' />
            </span>
          )
            : (
              <Fragment>
                <span onClick={this.onEdit} className='add-field-btn editable-edit-btn'>
                  <i className='fas fa-pencil-alt' />
                </span>
                <span onClick={onDelete} className='add-field-btn editable-delete-btn'>
                  <i className='fas fa-trash-alt' />
                </span>
              </Fragment>
            )}
        </div>
      </div>
    );
  }
}


export default EditableInputField;
