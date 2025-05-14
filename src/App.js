import './App.css';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Entry from './components/Entry/Entry';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Detail from './components/Detail';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from './hooks/useAuthContext';

function App() {

    const { user } = useAuthContext()

    return (
        <Router>
            <div className="App">
                <NavBar />
                <Routes>
                    <Route path="/" element={user ? <Home /> : <Navigate to="/login"/>} />
                    <Route path="/create" element={user ? <Entry /> : <Navigate to="/login"/>} />
                    <Route path="/login" element={!user ? <Login /> : <Navigate to="/"/>} />
                    <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/"/>} />
                    <Route path="/view/:id" element={user ? <Detail /> : <Navigate to="/login"/>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
