import { useEffect ,useState} from "react";
import axios from "axios"; 


const Bakend =()=>{

        const [data, setData] = useState(null); // Serverdan kelgan ma'lumotni saqlash
        const [loading, setLoading] = useState(true); // Yuklanish holatini kuzatish
        const [error, setError] = useState(null); //

useEffect(() => {
        
        const fetchData = async () => {
          try {
            const response = await axios.get("https://your-backend-api.com/data");
            setData(response.data); 
            setLoading(false); 
          } catch (err) {
            setError(err.message); 
            setLoading(false); 
          }
        };
    
        fetchData(); 
    
      }, []); 
}