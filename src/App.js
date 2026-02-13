//import logo from './logo.svg';

import LoginSignin from './components/loginSignin/loginSignin';
import MainLayout from './components/pages/mainLayout';
import Header from './components/pages/header';
import Sidebar from './components/pages/sidebar';

function App() {
  return (
    <div>
      <MainLayout/>
      <Header/>
      <Sidebar/>
    </div>
     
   
  );
}

export default App;
