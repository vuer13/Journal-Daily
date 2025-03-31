import './App.css';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Entry from './components/Entry/Entry';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="App">
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/create" element={<Entry />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
