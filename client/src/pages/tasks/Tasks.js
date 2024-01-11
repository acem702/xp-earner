import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
const { useNavigate } = require('react-router-dom');

const Tasks = () => {
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:4000/api/v1/tasks', {
                withCredentials: true,
                credentials: 'include',
            })
            .then((res) => {
                console.log('data', res);
                setTasks(res.data.data.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                setError(err.response.data.message);
                console.log(err);
            });
    }, []);

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
    }

    return (
        <div className="container mt-5">
            <h2>Complete Tasks to Earn XP</h2>
            <div className="row">
                {tasks &&
                    tasks.length > 0 &&
                    tasks.map((task, i) => (
                        <div key={task.id} className="col-lg-4 mb-3">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{task.name}</Card.Title>
                                    <Card.Text>{task.description}</Card.Text>
                                    <Card.Text>
                                        XP Points: {task.xp_points}
                                    </Card.Text>
                                    <Button
                                        onClick={() => {
                                            navigate(`/task/${task.slug}`);
                                        }}
                                        variant="primary"
                                    >
                                        View Task
                                    </Button>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Tasks;
