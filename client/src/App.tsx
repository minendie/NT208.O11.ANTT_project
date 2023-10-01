import Layout from "./layout/Layout";
import "./App.css"
import Home  from "./page/Home";
import  Aboutus  from "./page/Aboutus";
import  LogIn  from "./page/LogIn";
import  Signup from "./page/Signup";
import ErrorPage from "./ErrorPage";
import  AITool  from "./page/AITool";
import  DetailOrganizer  from "./page/DetailOrganizer";
import  DetailProfile  from "./page/DetailProfile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="app px-2 text-base w-full">
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<Aboutus />} />
            <Route path="/tool" element={<AITool />} />
            <Route path="/profile" element={<DetailProfile />} />
            <Route path="/organizer" element={<DetailOrganizer />} />

            <Route path="login" element={<LogIn />} />
            <Route path="signup" element={<Signup />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;