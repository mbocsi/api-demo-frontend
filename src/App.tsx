import { Routes, Route } from "react-router-dom";
import NoMatch from "./routes/nomatch";
import Home from "./routes/home";
import Dashboard from "./routes/dashboard";
import About from "./routes/about";
import Listings from "./routes/listings";
import Listing from "./routes/listings/[id]";
import Layout from "./layout";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="listings" element={<Listings />} />
          <Route path="listings/:id" element={<Listing />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
