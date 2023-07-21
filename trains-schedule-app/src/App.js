import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import TrainListPage from "./TrainListPage";
import SingleTrainPage from "./SingleTrainPage";
import "./App.css";

const BASE_URL = "http://20.244.56.144:80/train";

function App() {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/trains`)
      .then((response) => setTrains(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Trains Schedule</h1>
          <nav>
            <Link to="/">All Trains</Link>
          </nav>
        </header>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <TrainListPage trains={trains} />}
          />
          <Route path="/train/:trainNumber" component={SingleTrainPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
