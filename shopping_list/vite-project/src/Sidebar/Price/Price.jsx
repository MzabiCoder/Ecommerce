import React from 'react'
import "./Price.css"
import Input from '../../components/Input'
const Price = () => {
    return <div className="ml">
        <h2 className="sidebar-title price-title">Price</h2>
        {/* <label className="sidebar-label-container">
            <input type="radio" value="" name="test2" />
            <span className="checkmark"></span>ALL
        </label>

        <label className="sidebar-label-container">
            <input type="radio" value="" name="test2" />
            <span className="checkmark"></span>$0-50$
        </label>
        <label className="sidebar-label-container">
            <input type="radio" value="" name="test2" />
            <span className="checkmark"></span>$50-100$
        </label>
        <label className="sidebar-label-container">
            <input type="radio" value="" name="test2" />
            <span className="checkmark"></span>$100-150$
        </label>
        <label className="sidebar-label-container">
            <input type="radio" value="" name="test2" />
            <span className="checkmark"></span>over 150$
        </label> */}
        <Input />
        <Input />
        <Input />
    </div>
}

export default Price