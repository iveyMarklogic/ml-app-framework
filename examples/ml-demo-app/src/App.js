import {Button} from "ml-application-framework"
import './App.css';

function App() {
  const handleClick = () => {
    alert("Button clicked");
  }
  return (
    <div className="App">
      <Button label="Click Me" onClick={handleClick}/>
    </div>
  );
}

export default App;
