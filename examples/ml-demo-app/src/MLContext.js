import { createContext, useCallback, useMemo, useState } from "react";
import axios from "axios";

const MLContext = createContext({
  searchResponse: "",
  getSearch: (query) => { }
});

export const MLProvider = (props) => {

  const [searchResponse, setSearchResponse] = useState("");

  const getSearch = useCallback(async (query) => {
    const endpoint = props.scheme + "://" + props.host + ":" + props.port + '/v1/search?q=' + query + '&format=json';
    try {
      const options = {
        auth: props.auth
      }
      const response = await axios.get(endpoint, options);
      if (response && response.status === 200) {
        setSearchResponse(response.data);
      }
    } catch (error) {
      console.error("Error: getSearch", error);
    }
  }, [props.scheme, props.host, props.port, props.auth])

  const value = useMemo(() => ({
    searchResponse: searchResponse,
    getSearch: getSearch
  }), [searchResponse, getSearch]);

  return <MLContext.Provider value={value}>
    {props.children}
  </MLContext.Provider>
}

export default MLContext;
