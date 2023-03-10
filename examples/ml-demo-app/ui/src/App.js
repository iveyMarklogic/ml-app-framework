import { Button, SearchBox, JsonView } from "ml-application-framework"
import { useState, useContext } from "react";
import MLContext from "./MLContext";
import './App.css';

const items = [
  {
    value: ['person', 'organization'],
    label: 'All Entities'
  },
  {
    value: ['person'],
    label: 'Person'
  },
  {
    value: ['organization'],
    label: 'Organization'
  }
]

const App = () => {

  const mlContext = useContext(MLContext);

  const [text, setText] = useState("");
  const [menuIndex, setMenuIndex] = useState(0);

  const handleClick = (event) => {
    console.log(event);
    alert("Button '" + event.target.innerHTML + "' clicked!");
  }

  const handleSearch = () => {
    mlContext.getSearch(text, items[menuIndex].value);
  }
  const handleMenuClick = (index) => {
    setMenuIndex(index)
  }

  return (
    <div className="App">
      <Button label="Click Me" onClick={handleClick} variant="info" />
      <SearchBox
        menuVariant="info"
        rightButtonVariant="default"
        value={text}
        placeholder="Enter query (🦾)"
        className="mt-3"
        onChange={(e) => setText(e.target.value)}
        onClick={handleSearch}
        onEnter={handleSearch}
        menuItems={items}
        onChangeMenu={handleMenuClick}
      />
      <div>Number of results: {mlContext.searchResponse ? + JSON.stringify(mlContext.searchResponse.total) : 0}</div>
      <JsonView rootName={'results'}
        maxHeight={'480px'}
        enableClipboard={false}
        displayDataTypes={false}
        quotesOnKeys={false}
        displayObjectSize={false}
        indentWidth={5}
        groupArraysAfterLength={10}
        data={mlContext.searchResponse} />
    </div>
  );
}

export default App;
