import { RouteData } from "./Component/RouteData";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <RouteData />
      <ToastContainer/>
    </div>
  );
}

export default App;
