import React, { useEffect, useState } from "react";
import './App.css'; // Importing the App.css for theme styles
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import HomePage from "./pages/HomePage";
import ConsultationPage from "./pages/ConsultationPage";
import FindHospitals from "./components/FindHospitals";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="loader"></div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/consultation"
          element={user ? <ConsultationPage /> : <Navigate to="/" />}
        />
        <Route
          path="/find-hospitals"
          element={user ? <FindHospitals /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
