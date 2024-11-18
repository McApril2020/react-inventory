import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import List from '../assets/components/List.jsx';
import NotFound from '../assets/components/NotFound.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        
    },
    {
        path: '/list/:id',
        element: <List />,
    },
    {
        path: '*',
        element: <NotFound />,
    }
]);
 
export default router;