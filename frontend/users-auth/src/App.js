import './App.css';
import{Routes,Route} from "react-router-dom"
import Account from './pages/Account';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import SignUp from "./pages/SignUp"

function App() {

  const isUserSignedIn=!!localStorage.getItem("token")
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        {isUserSignedIn && <Route path="/account" element={<Account/>}/>}
      </Routes>
    </div>
  );
}

export default App;
