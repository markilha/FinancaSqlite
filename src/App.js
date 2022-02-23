import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './contexts/auth';
import Routes from './routes';
import Sidebar from './components/sidebar'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter> 
        <Routes/>
        <Sidebar/>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
