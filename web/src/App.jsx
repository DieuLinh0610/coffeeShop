import AppRoutes from "./routes";
import Sidebar from "./layouts/Sidebar";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: 240, padding: 20 }}>
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
