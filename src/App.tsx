import { Routes, Route } from "react-router-dom";
import NoMatch from "./routes/nomatch";
import Home from "./routes/home";
import Dashboard from "./routes/dashboard";
import About from "./routes/about";
import Listing from "./routes/listings/[id]";
import Layout from "./layout";

function App() {
  return (
    <>
      <p>This is some test text</p>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="listings/:id" element={<Listing />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
