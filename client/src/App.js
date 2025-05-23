import './App.css';
import {Route, Routes} from "react-router-dom";
import  Layout from "./Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import {UserContextProvider} from "./UserContext";
import ShareStory from "./pages/ShareStory";

function App() {
  return (
    <UserContextProvider>
      <Routes>
      <Route path = "/" element = {< Layout />}>
        <Route index element={<HomePage/>} />

        <Route path="/login" element={<LoginPage/>} /> 
        <Route path="/register" element={<RegisterPage/>} /> 
        <Route path="/share" element = {<ShareStory/>}/>
      </Route>
      
    </Routes>

    </UserContextProvider>
    

    
    
    
  );
}

export default App;
