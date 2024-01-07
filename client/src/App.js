import AppFooter from './shared/footer/Footer';
import AppHeader from './shared/header/Header';
import { Outlet } from 'react-router-dom';

function App() {
    return (
        <div className="App d-flex flex-column" style={{ minHeight: '100vh' }}>
            <AppHeader />
            <div className="flex-grow-1">
                <Outlet />
            </div>
            <AppFooter />
        </div>
    );
}

export default App;
