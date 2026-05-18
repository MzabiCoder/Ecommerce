import React from 'react'
import Category from "./Category/Category"
import Colors from "./Colors/Colors"
import Price from "./Price/Price"
import "./Sidebar.css"
const Sidebar = ({ handleChange }) => {
    console.log(handleChange)
    return <>
        <section className="sidebar">
            <div className="logo-container">
                <h1>🛒</h1>
            </div>
            <div class="cat">
                <Category />
                <Price />
                <Colors />
            </div>
        </section>
    </>
}

export default Sidebar