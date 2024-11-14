import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { setLoggedIn, setToken } from './redux/slices/authSlice';
import Router from './routes';
import { Toaster } from 'react-hot-toast';


function App() {

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

  return (
    <div className="">
      <BrowserRouter>
        <Router isLoggedIn={isLoggedin} />
      </BrowserRouter>
      {/* <Toaster
        position="top-center"
        reverseOrder={false}
      /> */}

    </div>
  );
}

export default App;
