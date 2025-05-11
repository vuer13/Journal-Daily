import './App.css';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Entry from './components/Entry/Entry';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="App">
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/create" element={<Entry />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
