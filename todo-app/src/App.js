import './App.css';
import { TodoWindow } from './components/TodoWindow';
function App() {
  return (
    <div className="App">
      <h3 style={{fontFamily:'cursive',color:'Highlight'}}>Monday <span><sub>20th May</sub></span></h3>
      <TodoWindow />
    </div>
  );
}

export default App;
