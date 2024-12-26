import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="App">
                <NavBar />
                <h1>Journal App</h1>
            </div>
        </Router>
    );
}

export default App;
