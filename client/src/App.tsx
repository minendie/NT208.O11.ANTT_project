import Layout from "./layout/Layout";
import "./App.css"
import Home  from "./page/Home";
import  Aboutus  from "./page/Aboutus/Aboutus";
import  LogIn  from "./page/LogIn";
import  Signup from "./page/Signup";
import ErrorPage from "./ErrorPage";
import  AITool  from "./page/AITool";
import  DetailOrganizer  from "./page/DetailOrganizer";
import  DetailProfile  from "./page/DetailProfile";
import CampaignStatistic from "./component/CampaignStatistic/CampaignStatistic";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import CampaignStatistic from "./component/CampaignStatistic/CampaignStatistic";

function App() {
  return (
    <div className="app px-2 text-base w-full">
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<Aboutus />} />
            {/* <Route path="/campaign" element={<DetailCampaign />} /> */}
            <Route path="/tool" element={<AITool />} />
            <Route path="/profile/:targetUsername" element={<DetailProfile />} />
            <Route path="/organizer/:organizerID" element={<DetailOrganizer />} />
            <Route path="/campaign-statistic/:organizerID" element={<CampaignStatistic />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
