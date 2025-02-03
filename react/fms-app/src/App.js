import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchTrucks } from "./redux/truckSlice";
import Home from "./pages/Home";
import AddTruck from "./pages/AddTruck";
import EditTruck from "./pages/EditTruck";
import ViewTruck from "./pages/ViewTruck";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrucks());
  }, [dispatch]);

  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">Truck Management</Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/add">Add Truck</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddTruck />} />
          <Route path="/edit/:id" element={<EditTruck />} />
          <Route path="/view/:id" element={<ViewTruck />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
