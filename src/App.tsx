import { BrowserRouter as Router } from "react-router-dom"
import { SideBard } from "./components/SideBar"
type Props = {}

const App = (props: Props) => {
  return <Router>
    <div className="flex h-screen">
      <SideBard />
    </div>
  </Router>
}

export default App