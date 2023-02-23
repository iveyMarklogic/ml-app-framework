import { Button, SearchBox } from "ml-application-framework"
import { useState } from "react";
import './App.css';

function App() {
  const [text, setText] = useState("")
  const handleClick = (text) => {
    alert(text);
  }
  return (
    <div className="App">
      <Button label="Click Me" onClick={handleClick} variant="info" />
      <SearchBox
        value={text}
        placeholder="Enter text (🦾)"
        className="mt-3"
        onChange={(e) => setText(e.target.value)}
        onClick={() => handleClick(`This is search box Action button "${text}"`)}
        onEnter={() => handleClick(`This is search box Enter action "${text}"`)}
      />
    </div>
  );
}

export default App;
