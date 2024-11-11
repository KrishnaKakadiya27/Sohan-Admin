import { useEffect, useState } from 'react';
import './App.css';
import AppRoute from './routes';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedIn, setToken } from './redux/slices/authSlice';
import Router from './routes';
import { BrowserRouter } from 'react-router-dom';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const token = localStorage.getItem("token");
  console.log("token", token, isAuthenticated)



  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(setToken(JSON.parse(localStorage.getItem('token'))));
    }
    if (localStorage.getItem('isLoggedIn')) {
      dispatch(setLoggedIn(JSON.parse(localStorage.getItem('isLoggedIn'))));
    }
    // eslint-disable-next-line
  }, []);

  const { isLoggedIn } = useSelector((state) => state.auth);

  const isLoggedin = isLoggedIn || !!JSON.parse(localStorage.getItem('token'));


  // useEffect(() => {
  //   if (token) {
  //     setIsAuthenticated(true)
  //   } else {
  //     setIsAuthenticated(false)
  //   }
  // }, [token])



  return (
    <div className="">
      <BrowserRouter>
        <Router isLoggedIn={isLoggedin} />
      </BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
}

export default App;
