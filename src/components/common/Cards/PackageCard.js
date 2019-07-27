import React, { useState } from 'react'
import PropTypes from 'prop-types'


const Feature = ({ children }) => (
    <div className="package-card-feature">{children}</div>
)

const PackageCard = ({
    name,
    prices,
    onSelect,
    active
}) => {
    const [interval, setInterval] = useState('monthly');


    return (
        <div
            onClick={onSelect}
            className={`package-card ${active ? 'active' : ''}`}
        >
            <div className="package-card-header">
                <div className="package-card-title">{name}</div>
                <div className="package-card-price">
                    <span className="amount">$ {prices[interval]}</span>
                    / {interval}
                </div>
            </div>
            <div className="package-card-features">
                <Feature>Feature 1</Feature>
                <Feature>Feature 1</Feature>
                <Feature>Feature 1</Feature>
                <Feature>Feature 1</Feature>
                <Feature>Feature 1</Feature>
                <Feature>Feature 1</Feature>
            </div>
        </div>
    )
}

PackageCard.propTypes = {

}

export default PackageCard
