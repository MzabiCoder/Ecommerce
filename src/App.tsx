import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { SideBard } from "./components/SideBar"
import { MainContent } from './components/MainContent.tsx'
import { Product } from "./components/Product.tsx"


const App = () => {
  return <Router>
    <div className="flex h-screen">
      <SideBard />
      <div className="rounded w-full flex justify-between flex-wrap">
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/products/:id" element={<Product />} />
        </Routes>
      </div>
    </div>
  </Router>
}

export default App