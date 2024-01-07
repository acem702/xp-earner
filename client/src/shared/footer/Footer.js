import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const AppFooter = () => {
    return (
        <footer className="footer mt-auto py-3 bg-dark text-white">
            <div className="container text-center">
                <span className="text-muted">
                    XP-EARNER &copy; {new Date().getFullYear()}
                </span>

                {/* owner website */}
                <span className="text-muted">
                    <Link to="https://mohamedshebl.me" target="_blank">
                        {' '}
                        Mohamed Shebl
                    </Link>
                </span>
            </div>
        </footer>
    );
};

export default AppFooter;
