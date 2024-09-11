import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Signin from './Components/Signin';
import Signout from './Components/Signout';
import Profile from './Components/Profile';
import Navbar from './Components/Navbar';
import Signup from './Components/Signup';
import ProtectedRoute from './Components/ProtectedRoute';
import Create_lisiting from './Components/Create_lisiting';
import { useEffect } from 'react';
import { updatecurrentuser } from './redux/userredux';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Update_listing from './Components/Update_listing';
import Listing from './Components/Listing';
import Search from './Components/Search';
import Footer from './Components/Footer';

function App() {
  const dispatch = useDispatch();
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ marginTop: '9vh' }}> {/* Add this div to create space for the navbar */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signout' element={<Signout />} />
          <Route path='/about' element={<About />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/creat-lisiting' element={<Create_lisiting />} />
          <Route path='/update-lisiting/:id' element={<Update_listing />} />
          <Route path='/search' element={<Search />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/listing/:id' element={<Listing />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
