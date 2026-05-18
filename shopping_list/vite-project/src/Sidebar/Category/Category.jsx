import React from 'react'
import "./Category.css"
import Input from "../../components/Input";

const Category = () => {
    return (
        <div>
            <h2 className="sidebar-title">Category</h2>
            <div>

                {/* <label className="sidebar-label-container color-title">
                    <input type="radio" value="" name="test2" />
                    <span className="checkmark"></span>ALL
                </label>

                <label className="sidebar-label-container">
                    <input type="radio" value="" name="test2" />
                    <span className="checkmark"></span>Sneakers
                </label>
                <label className="sidebar-label-container">
                    <input type="radio" value="" name="test2" />
                    <span className="checkmark"></span>Flats
                </label>
                <label className="sidebar-label-container">
                    <input type="radio" value="" name="test2" />
                    <span className="checkmark"></span>Sandals
                </label>
                <label className="sidebar-label-container">
                    <input type="radio" value="" name="test2" />
                    <span className="checkmark"></span>Heels
                </label> */}
                <Input />
                <Input />
                <Input />
                <Input />
                <Input />
            </div>
        </div>
    )
}

export default Category