import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import axios from 'axios';

const Profile = () => {
    
    const [user, setUser] = useState({});
  

    useEffect(() => {

        axios.get('http://localhost:4000/api/v1/users/me', {
            withCredentials: true,
            credentials: 'include'
        }).then((res) => {
            console.log(res);
            setUser(res.data.data.data);
        }).catch((err) => {
            console.log(err);
            alert(err.response.data.message);
        });
    }, []);
//     const user = {
//     name: 'John Doe',
//     email: 'john@example.com',
//     xpPoints: 100,
//     finishedTasks: [
//       {
//         id: 1,
//         name: 'Task 1',
//         description: 'Description for Task 1',
//         xpPoints: 10,
//       },
//       {
//         id: 2,
//         name: 'Task 2',
//         description: 'Description for Task 2',
//         xpPoints: 15,
//       },
//       // Add more finished tasks as needed
//     ],
//   };

  return (
    <div className="container mt-5">
      <h2>Profile</h2>
      <Card>
        <Card.Body>
          <Card.Title>User Information</Card.Title>
          <Card.Text>Name: {user.name}</Card.Text>
          <Card.Text>Email: {user.email}</Card.Text>
          <Card.Text>XP Points: {user.xp_points}</Card.Text>
        </Card.Body>
      </Card>

      <h3 className="mt-4">Finished Tasks</h3>

      {user.completed_tasks && user.completed_tasks.length === 0 && (

        <h6>You have not completed any tasks yet.</h6>
        )

      }
      <div className="row">
        
        {user.completed_tasks && user.completed_tasks.length > 0  && (
          user.completed_tasks.map((task, i) => (
            <div key={i} className="col-lg-4 mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>{task.task_id.name}</Card.Title>
                  <Card.Text>{task.task_id.description}</Card.Text>
                  <Card.Text>XP Points: {task.task_id.xp_points}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))
        ) }
      </div>
    </div>
  );
};

export default Profile;
