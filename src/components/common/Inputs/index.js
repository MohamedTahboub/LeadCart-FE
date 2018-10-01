import React, { Component } from 'react'
import './style.css'

export class InputRow extends Component {
    static Label = props => (
        <span className='input-label'>{props.children}</span>
    )
    static NormalInput = props => (
        <input className='input-field' placeholder={props.children} />
    )
    static UrlSuffixInput = props => (
        <div className='url-suffix-input'>
            <span className='suffix-value'>http://tonyhack.leadcart.com/products/</span>
            <input className='url-suffix-input-field' placeholder={props.children} />
        </div>
    )
    static TextAreaInput = props => (
        <div className='text-area-container'>
            <textarea className='textarea-input-field' placeholder='NormalInput' />
            <span className='text-area-small-note'>27/260</span>
        </div>
    )
    static AddComponentField = ({ children, notes , description, ...props }) => (
        <div onClick={alert}
         className='add-elements-container'>
            <span className='add-element-circle primary-color'>
                <i class="fas fa-plus"></i>
            </span>
            <span className='add-input-field' >{children}</span>
            <span className='add-element-notes'>{notes}</span>
            <span className='add-element-description'>{description}</span>
        </div>
    )
    static SelectOption = props => (
        <select className='select-input-field'>
            {/*<span className='select-arrow-down'>1</span>*/}
            <option className='select-option' value='1'>One Time Price</option>
            <option className='select-option' value='2'>Monthly subscription</option>
            <option className='select-option' value='3'>Yearly subscription</option>
        </select>
    )
    static PriceField = props => (
        <div className='price-input-holder'>
            <span className='currancy-type'>$</span>
            <input className='price-input-field' placeholder='NormalInput' />
        </div>
    )
    static UrlInput = props => (
        <input className='input-field' placeholder='http://' />
    )
    static CheckBox = ({ children, description, ...props }) => (
        <label class="check-box-container">
            {description &&
                <span className='check-box-description'>{description}</span>}
            <input class='check-box' type="radio" name='product-type' />
            <div class="check-box-indicator">{children}</div>
        </label>
    )


    render() {
        return (
            <div className='input-row'>
                {this.props.children}
            </div>
        )
    }
}

