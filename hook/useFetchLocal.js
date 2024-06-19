import { useState, useEffect } from "react";
import myData from '../assets/data/mydata.json';
//this custom hook contain methodes that fetchs  jobs from ../assets/data.json 
const useFetchLocal = (endpoint, query, id) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLocalDatabyId =  () => {
    setIsLoading(true);
    try {
      // Filter the data based on the provided ID
      const item =  myData.data.find(item => item.job_id === id);
      const itemArray = item !== null && item !== undefined ? [item] : [];//this statement is the better cuz it handel the null and undefinde posibilities 

      setData(itemArray)
 
      setIsLoading(false);
    } catch (error) {
      console.log("errorali");
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };



//this function on (nearby and popilar jobs components )
  const fetchLocalData =  () => {
    setIsLoading(true);
  
    try {
      // Use the imported JSON data directly
      const data = myData;
      setData(data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.error(error)
    } finally {
      setIsLoading(false);
    }
  };


  const fetchLocalProfile=  () => {
// console.log("in"+endpoint);

    setIsLoading(true);
    try {
  
 
      const itemsArray = myData.data
      .filter(item => id.includes(item.job_id))
      .map(item => ({ ...item, extended_publisher_details: 'false' }));

    

      setData(itemsArray)
      setIsLoading(false);


        } catch (error) {
          console.log("errorali");
          setError(error);
        } finally {
          setIsLoading(false);
        }
      };



  useEffect(() => {
      switch (endpoint) {
        case 'profile':
          fetchLocalProfile();
          break;
        case "detail":
          fetchLocalDatabyId();
          break;
        case "all":
          fetchLocalData();
          break;

        default:
          break;
      }


  }, [endpoint]); // Dependency array includes 'id' to refetch when 'id' changes

  const refetch = () => {
    fetchLocalData();
  };

  return { data, isLoading, error };
};

export default useFetchLocal;
