import './App.css';
import { BrowserRouter} from 'react-router-dom'
import MainRouter from './containers/MainRouter/MainRouter'

function App() {
  return (
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
  );
}

export default App;
