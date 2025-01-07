import { Suspense, lazy } from "react";
import { createRoot } from 'react-dom/client'
import { MyContextProvider } from "./context/context.provider.tsx";
import Loader from "./components/Loader/Loader.tsx";
import './index.css'
import './css/scrollbar.css'

const App = lazy(() => import("./App.tsx"));

createRoot(document.getElementById('root')!).render(
  <MyContextProvider>
   <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  </MyContextProvider>,
)
