import AllRoutes from './components/Routes/AllRoutes';
import {BrowserRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { handleChange } from './redux/rest';
import { useEffect } from 'react';
function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(handleChange());
  },[dispatch])
  return (
    <BrowserRouter>
      <AllRoutes />
    </BrowserRouter>
  );
}

export default App;
