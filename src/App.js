import logo from './logo.svg';
import './App.css';
import Newsapp from './Components/Newsapp';


function App() {
  const apikey=process.env.REACT_APP_API_KEY;
  return (
    <Newsapp apikey={apikey}/>
  );
} 

export default App;
