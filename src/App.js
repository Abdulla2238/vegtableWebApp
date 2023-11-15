import LoginPage from "./Components/LoginPage";
import MainPage from "./Components/MainPage";
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import MapLocation from "./Components/MapLocation";

function App() {
  return (
    <div className="App">
   <BrowserRouter>
      <Routes>
          
            <Route index  element={<LoginPage/>}/>
            <Route path='/Main' element={<MainPage/>}/>
            <Route path='/Map' element={<MapLocation/>}/>

         
            
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
