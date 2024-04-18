import "./App.css";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./pages/404";
import Dashboard from "./pages/Dashboard";
import RSODashboard from "./pages/RSODashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import EventDashboard from "./pages/EventDashboard";
import PublicEventDashboard from "./pages/PublicEventDashboard";
import PrivateEventDashboard from "./pages/PrivateEventDashboard";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoutes/>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/university/:id" element={<RSODashboard />} />
            <Route path="/dashboard/university/:id/public_events" element={<PublicEventDashboard />} />
            <Route path="/dashboard/university/:id/private_events" element={<PrivateEventDashboard />} />
            <Route path="/dashboard/university/:id/rso/:rso_id" element={<EventDashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
