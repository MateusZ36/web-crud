import RoutesApp from "./routes";

import DepartmentProvider from "./context/DepartmentContext";
import PatrimonyProvider from "./context/PatrimonyContext";
import CategoryProvider from "./context/CategoryContext";

function App() {
  return (
    <PatrimonyProvider>
      <CategoryProvider>
        <DepartmentProvider>
          <RoutesApp />
        </DepartmentProvider>
      </CategoryProvider>
    </PatrimonyProvider>
  );
}

export default App;
