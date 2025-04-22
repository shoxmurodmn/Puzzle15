import React, {useState , useEffect } from 'react'

import { FaEye } from "react-icons/fa";
import "./stayle.css"

const MIjozlarList =(value)=> {

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const randomUrl = `https://source.unsplash.com/random/20x20?sig=${Math.random(1)}`;
    setImageUrl(randomUrl);
  }, []);

  const users = value.props

  
  return (
  
 <tr key={users.id} className="tr_stayle">
                <td className="Tabel_nuber">
                  <span>{users.tartib}</span>
                </td>
                <td>{users.status}</td>
                <td>{users.phone}</td>
                <td>
                  <span> {users.status}</span>
                </td>
               <td>{users.name}</td>
               </tr>
    
  )
}

export default MIjozlarList