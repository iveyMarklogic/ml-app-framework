import { Button, SearchBox } from "ml-application-framework"
import { useState, useContext, useEffect } from "react";
import MLContext from "./MLContext";
import './App.css';

const App = () => {

  const mlContext = useContext(MLContext);

  const [text, setText] = useState("")
  const handleClick = (text) => {
    alert(text);
  }

  useEffect(() => {
    mlContext.getSearch("");
  }, []);

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
      <div>Number of results: {mlContext.searchResponse ?  + JSON.stringify(mlContext.searchResponse.total) : 0}</div>
    </div>
  );
}

export default App;
