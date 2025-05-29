import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Login from "./component/Login";
import SignUp from "./component/SignUp";
import Dashboard from "./component/Dashboard";
import BlogApp from "./component/Blog";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/blog" element={<BlogApp />} />
          
        </Routes>
      </Router>
    </>
  );
};


export default App;