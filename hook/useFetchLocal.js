import { useState, useEffect } from "react";
import myData from '../assets/data/mydata.json';

const useFetchLocal = (endpoint, query, id) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLocalData = async () => {
    setIsLoading(true);
    try {
      // Filter the data based on the provided ID
      const item = myData.data.find(item => item.job_id === id);
      const itemArray = item !== null && item !== undefined ? [item] : [];//this statement is the better cuz it handel the null and undefinde posibilities 

      setData(itemArray)
      // // console.log(typeof(data));
      // // data.push(item);
      // console.log("1",item.job_id);
      // console.log("2",data.length);
      setIsLoading(false);
    } catch (error) {
      console.log("errorali");
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLocalData();
  }, []); // Dependency array includes 'id' to refetch when 'id' changes

  const refetch = () => {
    fetchLocalData();
  };

  return { data, isLoading, error };
};

export default useFetchLocal;
