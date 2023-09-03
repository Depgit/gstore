import './App.css';
import React from 'react';
import Navbar from './components/Navbar/Navbar.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Auth/login';
import Signup from './components/Auth/signup';
import AuthPage from './components/Auth/authPage';

const Routing = () => {
  // const history = useNavigate();
  // const { state, dispatch } = useContext(UserContext);
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (user?.username) {
  //     dispatch({ type: 'USER', payload: user });
  //   } else {
  //     history('/login');
  //   }
  // }, [])
  //     <Route exact path="/profile/:username" element={<Profile />} />
  //     <Route exact path="/contests" element={<Contest />} />
  //     <Route exact path="/rankers" element={<ShowToper />} />
  //     <Route exact path="/createpost" element={<Createpost />} />
  //     <Route exact path="/comment/:id" element={<Comment />} />
  //     <Route exact path='/chat' element={<Chat />} />
  return (
    <Routes>
       <Route exact path="/login" element={<Login />} />
       <Route exact path="/signup" element={<Signup />} />
       <Route exact path="/home" element={<Home />} />
       <Route path="/" element={<AuthPage />} />
    </Routes>
  )
}

function App() {
  // const [state, dispatch] = useReducer(reducer, initialState);
  // const [post, dispatchPost] = useReducer(postreducer, postinitialState);
  // const [contest, dispatchContest] = useReducer(contestreducer, contestinitialState);

  return (
    // <PostContext.Provider value={{ post, dispatchPost }}>
    //   <ContestContext.Provider value={{ contest, dispatchContest }}>
    //     <UserContext.Provider value={{ state, dispatch }}>
          <BrowserRouter>
            <Navbar />
            <Routing />
          </BrowserRouter>
    //     {/* </UserContext.Provider>
    //   </ContestContext.Provider>
    // </PostContext.Provider> */}
  );
}

export default App;
