import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Repositorio from './pages/Repository/index';

export default function RoutesApp() {
    return (
        <Router>
        <Routes>
            <Route path='/' Component={Main}  />
            <Route path='/repositorio/:owner/:repo' Component={Repositorio}/>
        </Routes>
        </Router>
    )
}