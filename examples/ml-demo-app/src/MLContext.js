import { createContext, useState } from "react";
import axios from "axios";

const MLContext = createContext({
  searchResponse: "",
  getSearch: (query) => {}
});

export const MLProvider = (props) => {

  const [searchResponse, setSearchResponse] = useState("");

  const getSearch = async (query) => {
    const endpoint = props.scheme + "://" + props.host + ":" + props.port + '/v1/search?q=' + query + '&format=json';
    try {
      const response = await axios.get(endpoint);
      if (response && response.status === 200) {
        setSearchResponse(response.data);
      }
    } catch (error) {
      console.error("Error: getSearch", error);
    }
  }

  return <MLContext.Provider value={{
    searchResponse: searchResponse,
    getSearch: getSearch 
  }}>
    {props.children}
  </MLContext.Provider>
}

export default MLContext;
