import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:4000/api/v1/users/me', {
                withCredentials: true,
                credentials: 'include',
            })
            .then((res) => {
                console.log(res);
                setUser(res.data.data.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
                setError(err.response.data.message);
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
            <h2>Profile</h2>
            <Row>
                <Col lg={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title>User Information</Card.Title>
                            <Card.Text>Name: {user.name}</Card.Text>
                            <Card.Text>Email: {user.email}</Card.Text>
                            <Card.Text>XP Points: {user.xp_points}</Card.Text>
                        </Card.Body>
                    </Card>

                    <h3 className="mt-4">Finished Tasks</h3>

                    {user.completed_tasks &&
                        user.completed_tasks.length === 0 && (
                            <h6>You have not completed any tasks yet.</h6>
                        )}
                    <div className="row">
                        {user.completed_tasks &&
                            user.completed_tasks.length > 0 &&
                            user.completed_tasks.map((task, i) => (
                                <div key={i} className="col-lg-4 mb-3">
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>
                                                {task.task_id.name}
                                            </Card.Title>
                                            <Card.Text>
                                                {task.task_id.description}
                                            </Card.Text>
                                            <Card.Text>
                                                XP Points:{' '}
                                                {task.task_id.xp_points}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                            ))}
                    </div>
                </Col>
                <Col lg={4}>
                    {/* Displaying Avatar/Profile Image */}
                    {user.avatar && (
                        <img
                            src={`http://localhost:4000/${user.avatar}`}
                            alt="Profile Avatar"
                            className="mb-3"
                            style={{ maxWidth: '100%' }}
                        />
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default Profile;
