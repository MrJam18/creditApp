import {useState} from "react";
import api from "../http";

export const useSearch = (serverAddress)=> {
    const [data, setData] = useState(false);
    const [results, setResults] = useState([]);
    const onSearch = async (val) => {
      const {data} = await api.get(serverAddress + `?value=${val}`);
      setResults(data);
    }
    const onChoose = (val) => {
        setData(val);
    }
    return {data, results, onSearch, onChoose};
}