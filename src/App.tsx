import {createHashRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import RootLayout from "./layouts/RootLayout.tsx";
import HomePage from "./pages/HomePage.tsx";
import CryptanalysisPage from "./pages/CryptanalysisPage.tsx";

const router = createHashRouter(createRoutesFromElements(
  <Route element={<RootLayout/>}>
    <Route index element={<HomePage/>}/>
    <Route path="/cryptanalysis" element={<CryptanalysisPage/>}/>
  </Route>
))

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
