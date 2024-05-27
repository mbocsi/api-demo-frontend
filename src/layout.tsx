import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <nav>
        <h1>Navmenu</h1>
      </nav>
      <Outlet />
    </div>
  );
}
