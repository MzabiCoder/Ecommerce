import React from 'react'
import "./Colors.css"
import Input from '../../components/Input'
const Colors = () => {
    return (
        <div>
            <h2 class="sidebar-title color-title">Colors</h2>

            {/* <label className="sidebar-label-container color-title">
                <input type="radio" value="" name="test2" />
                <span className="checkmark"></span>ALL
            </label>

            <label className="sidebar-label-container">
                <input type="radio" value="" name="test2" />
                <span className="checkmark"></span>Black
            </label>
            <label className="sidebar-label-container">
                <input type="radio" value="" name="test2" />
                <span className="checkmark"></span>Bleu
            </label>
            <label className="sidebar-label-container">
                <input type="radio" value="" name="test2" />
                <span className="checkmark"></span>Red
            </label>
            <label className="sidebar-label-container">
                <input type="radio" value="" name="test2" />
                <span className="checkmark"></span>Green
            </label>
            <label className="sidebar-label-container">
                <input type="radio" value="" name="test2" />
                <span className="checkmark"></span>white
            </label> */}

            <Input />
            <Input />
            <Input />
            <Input />


        </div>
    )
}

export default Colors