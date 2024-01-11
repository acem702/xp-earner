import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { tokenData } from '../../services/auth';
import { useParams, useNavigate } from 'react-router-dom';

const Task = () => {
    const [task, setTask] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [clickComplete, setClickComplete] = useState(false);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    // token data
    const token = tokenData();

    // task slug from url
    const { taskSlug } = useParams();

    // get task id from url

    useEffect(() => {
        setLoading(true);
        // get task data
        axios
            .get(`http://localhost:4000/api/v1/tasks/${taskSlug}`)
            .then((res) => {
                setTask(res.data.data.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                setError(err.response.data.message);
                console.log(err);
            });

        // get user data if exists
        if (token) {
            setLoading(true);

            axios
                .get('http://localhost:4000/api/v1/users/me', {
                    withCredentials: true,
                    credentials: 'include',
                })
                .then((res) => {
                    setUser(res.data.data.data);
                    setLoading(false);
                })
                .catch((err) => {
                    setLoading(false);
                    setError(err.response.data.message);
                    console.log(err);
                });
        }
    }, [clickComplete]);

    // check if user has already completed task
    const checkCompleted = () => {
        // check if user has completed task
        if (user) {
            const completedTasks = user.completed_tasks;
            let completed = false;
            completedTasks.forEach((completedTask) => {
                if (completedTask.task_id._id === task._id) {
                    completed = true;
                }
            });
            return completed;
        }
        return false;
    };

    const handleCompleteTask = async () => {
        // check if user is logged in
        if (token) {
            // check if user has already completed task
            if (!checkCompleted()) {
                // add task to user completed tasks
                const data = {
                    task_id: task._id,
                };
                await axios
                    .patch(
                        `http://localhost:4000/api/v1/users/complete-task/${task._id}`,
                        data,
                        {
                            withCredentials: true,
                            credentials: 'include',
                        },
                    )
                    .then((res) => {
                        alert('Task Completed Successfully 🎉');
                        console.log(res);
                        setClickComplete(!clickComplete);
                    })
                    .catch((err) => {
                        setError(err.response.data.message);
                        console.log(err);
                    });
            }
        } else {
            setError('You must be logged in to complete a task');
            setTimeout(() => {
                setError('');
                navigate('/login');
            }, 3000);
        }
    };

    // spinner while loading functionality
    if (loading) {
        return (
            <div className="container mt-5">
                <h2>Loading...</h2>
            </div>
        );
    }

    // error handling functionality
    if (error) {
        return (
            <div className="container mt-5">
                <h2>{error}</h2>
            </div>
        );
        //
    }
    return (
        <div className="container mt-5">
            <h2>Task Details</h2>
            <Card>
                <Card.Body>
                    <Card.Title>{task.name}</Card.Title>
                    <Card.Body>{task.description}</Card.Body>
                    <br />

                    <Card.Subtitle>XP Points: {task.xp_points}</Card.Subtitle>
                    <br />

                    {!checkCompleted() && (
                        <Button variant="success" onClick={handleCompleteTask}>
                            Complete Task
                        </Button>
                    )}
                    {checkCompleted() && (
                        <Button variant="success" disabled>
                            Task Completed
                        </Button>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default Task;
