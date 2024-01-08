import { useEffect, useState } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';

const Tasks = () => {


    useEffect(() => {

        axios.get('http://localhost:4000/api/v1/tasks',
        {
            withCredentials: true,
            credentials: 'include'
        }
        ).then((res) => {
            console.log('data', res);
            // get user from locals user
        }).catch((err) => {
            console.log(err);
        });
    },[])
    return (
        <div>
            <h1>Tasks</h1>
        </div>
    );
};

export default Tasks;
