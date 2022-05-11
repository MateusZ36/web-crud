import RoutesApp from "./routes";

import DepartamentProvider from "./context/DepartamentContext";

function App() {
  return (
    <DepartamentProvider>
      <RoutesApp />
    </DepartamentProvider>
  );
}

export default App;
