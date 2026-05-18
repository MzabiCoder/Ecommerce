import Sidebar from "./Sidebar/Sidebar"
import Navigation from "./Navigation/Nav"
import Product from "./products/Product"
import Recomended from "./recomended/Recomended"
import { useState } from "react"
import products from "./db"
import { preview } from "vite"
import Card from "./components/Card"

const App = () => {

  const [selectCategory, setselectCategory] = useState(null)

  const [query, setQuery] = useState("")


  // input filter
  const handleInputChange = e => {
    setQuery(e.target.value)
  }

  const filteredItems = products.filter(product => product.title.toLocaleLowerCase().indexOf(query.toLocaleLowerCase() == -1));

  // ---- Radio FIlter
  const handleChange = e => {
    setselectCategory(e.target.value)
  }

  // button filter
  const handleClick = e => {
    setselectCategory(e.target.value)
  }

  function filterdata(products, selected, quey) {
    let filteredProduct = products;

    if (query) {
      filteredProduct = filteredItems
    }

    if (selected) {
      filteredProduct = filteredProduct.filter(({ title, company, prevPrice, newPrice, color, category }) => category === selected || title === selected || company === selected === newPrice === selected ||
        prevPrice === selected || color === selected);
    }
    return filteredProduct.map(({ img, title, star, newPrice, prevPrice }) => {
      return <Card key={Math.random()} img={img} title={title} star={star} newPrice={newPrice} prevPrice={prevPrice} />
    })
  }
  const result = filterdata(products, selectCategory, query)
  return <>

    <Navigation />
    <Sidebar handleChange={handleChange} />
    <Recomended />
    <Product />

  </>
}

export default App