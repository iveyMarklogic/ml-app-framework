import { Button, SearchBox } from "ml-application-framework"
import { useState, useContext, useEffect } from "react";
import MLContext from "./MLContext";
import './App.css';

const App = () => {

  const mlContext = useContext(MLContext);

  const [text, setText] = useState("")
  const handleClick = () => {
    mlContext.getSearch(text);
  }

  return (
    <div className="App">
      <Button label="Click Me" onClick={handleClick} variant="info" />
      <SearchBox
        value={text}
        placeholder="Enter query (🦾)"
        className="mt-3"
        onChange={(e) => setText(e.target.value)}
        onClick={handleClick}
        onEnter={handleClick}
      />
      <div>Number of results: {mlContext.searchResponse ?  + JSON.stringify(mlContext.searchResponse.total) : 0}</div>
      
    </div>
  );
}

export default App;
