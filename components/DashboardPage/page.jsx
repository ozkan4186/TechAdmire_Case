import axios from "axios";
import { useEffect, useState } from "react";

const Dashboardpage = () => {
  const [users, setUsers] = useState([]);
  console.log(users);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <div>
      <ul>
        {users?.users?.map((user) => (
          <table class="table-fixed items-center justify-center ">
            <thead>
              <tr className="m-4">
                <th>FirstName</th>
                <th>University</th>
                <th>country</th>
                <th>duration</th>
                <th>cost</th>
                <th>application deadline date</th>
                <th>language</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> {user?.firstName} </td>
              </tr>
              <tr>
                <td> {user.university} </td>
              </tr>
              <tr>
                <td>{user.address.city} </td>
              </tr>
            </tbody>
          </table>
        ))}
      </ul>
    </div>
  );
};

export default Dashboardpage;
