
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

function App() {
  
  const apiKey = process.env.REACT_APP_NEWS_API;
  console.log(process.env.REACT_APP_NEWS_API);
  const pageSize = 5;
  return (
    <Router>
    <div className="App">
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<News  key="genral" pageSize={pageSize} apiKey={apiKey} country="in" category="general"/> }/>
        
        <Route exact path="/science" element={<News  key="science" pageSize={pageSize} apiKey={apiKey} country="in" category="science"/> }/>
        <Route exact path="/general" element={<News  key="general" pageSize={pageSize} apiKey={apiKey} country="in" category="general"/> }/>
        <Route exact path="/business" element={<News  key="business" pageSize={pageSize} apiKey={apiKey} country="in" category="business"/> }/>
        <Route exact path="/technology" element={<News  key="technology" pageSize={pageSize} apiKey={apiKey} country="in" category="technology"/> }/>
        <Route exact path="/entertainment" element={<News  key="entertainment" pageSize={pageSize} apiKey={apiKey} country="in" category="entertainment"/> }/>
        <Route exact path="/sports" element={<News  key="sports" pageSize={pageSize} apiKey={apiKey} country="in" category="sports"/> }/>
        <Route exact path="/health" element={<News  key="health" pageSize={pageSize} apiKey={apiKey} country="in" category="health"/> }/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
