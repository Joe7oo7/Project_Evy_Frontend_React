
import NavPage from "./components/navbar/NavPage";

import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JS bundle (includes Popper.js)
import $ from "jquery";
import SA from "./components/senti_analyzer/SA";
import Todo from "./components/todo/Todo";
import Chatbot from "./components/chatbot/Chatbot";

function App() {
  return (
    <Router>
      <div>
        <NavPage></NavPage>
        <Routes>
            <Route path="/" element={<Chatbot />}></Route>

            <Route path="/senti_analyzer" element={<SA />}></Route>

            <Route path="*" element={<Navigate to="/" />} />

            <Route path="/todo" element={<Todo />}></Route>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
