import React, {useContext} from "react";

import { IoMdTimer } from "react-icons/io";

import "./stayle.css"
import MIjozlarList from "./list";
import { TbHandClick , TbNumber } from "react-icons/tb";
import {  FaHourglassEnd  } from "react-icons/fa";
import { GiTargetPrize } from "react-icons/gi";
import { MdOutlinePhonelink } from "react-icons/md";



const users =[
  {
    id: 1,
    name: "Murod",
    avatar: "https://i.pravatar.cc/40?img=1", // Rasm link
    category: "04", // Tasnifi yo‘q
    phone: "03",
    status: "14",
  },
  {
    id: 2,
    name: "Iroda",
    avatar: "https://i.pravatar.cc/40?img=2",
    category: "01",
    phone: "05",
    status: "23",
  },
];

const UserTable = ({props}) => {

  // const {appData , setAppData} = useContext(users)


  return (
    <div className="user-table-container ">
      <div className="user-table-wrapper">
        <table className="user-table">
          <thead>
         
            <tr>
               <th>
                 <p className="data-game_iconst">
                      <TbNumber  className="iconst"/>
                </p>
            </th>

            <th>
                 <p className="data-game_iconst">
                      <GiTargetPrize className="iconst"/>
                </p>
            </th>

              <th>
                 <p className="data-game_iconst">
                      <TbHandClick  className="iconst"/>
                </p>
            </th>
            <th>
                 <p className="data-game_iconst">
                      <FaHourglassEnd  className="iconst" />
                </p>
            </th>
              
            <th>
                 <p className="data-game_iconst">
                      <MdOutlinePhonelink className="iconst"/>
                </p>
            </th>


            </tr>
          </thead>
          <tbody> 
            {users.map((value, id,  ) => {
           
           const newValue = { ...value, tartib: id + 1 };
              
             return <MIjozlarList  props={newValue} key={id}/>
          })}
          </tbody>
        </table>
      </div>

        <div style={{margin:"100px"}}> d</div>
    </div>
  );
};

export default UserTable;
