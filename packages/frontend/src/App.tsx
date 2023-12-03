/* eslint-disable jsx-a11y/anchor-is-valid */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './components/main';
import SignIn from './components/signIn';
import SignUp from './components/signUp';
import Welcome from './components/welcome';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signIn" Component={SignIn} />
        <Route path="/signUp" Component={SignUp} />
        <Route path="/" Component={Main} />
        <Route path="/welcome" Component={Welcome} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
