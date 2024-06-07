import { Routes, Route } from "react-router-dom";
import NoMatch from "./routes/nomatch";
import Home from "./routes/home";
import CreateListing from "./routes/create-listing";
import EditListing from "./routes/edit-listing";
import Listings from "./routes/listings";
import Listing from "./routes/listings/[id]";
import Layout from "./layout";
import { ThemeProvider } from "./components/theme-provider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="create-listing" element={<CreateListing />} />
            <Route path="edit-listing/:id" element={<EditListing />} />
            <Route path="listings" element={<Listings />} />
            <Route path="listings/:id" element={<Listing />} />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
