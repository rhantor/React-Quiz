import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import "../styles/App.css";
import Layout from "./Layout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Quiz from "./Pages/Quiz";
import Result from "./Pages/Result";
import Signup from "./Pages/Signup";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/quiz/:id" element={<Quiz />} />
            </Route>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/result/:id" element={<Result />} />
            </Route>
            <Route path="/" element={<PublicRoute />}>
              <Route path="/signup" element={<Signup />} />
            </Route>
            <Route path="/" element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
            </Route>

            {/* <Route path="/signup" element={<Signup />} /> */}
            {/* <Route path="/login" element={<Login />} /> */}
            {/* <Route path="/quiz" element={<Quiz />} /> */}
            {/* <Route path="/result" element={<Result />} /> */}
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
