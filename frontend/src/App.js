import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/homepage'
import {Route, Switch} from 'react-router-dom'
import SignIn from './components/sign-in/signin'
import SignUp from './components/sign-up/signup';
import UserProfile from './pages/UserProfile';
import UserHomePage from './pages/UserHomePage';
import GroupPage from './components/groupComponent/GroupPage'
import YoutubeSearchPage from './pages/YoutubeSearchPage'
import PostPage from './pages/postPage'
import Messenger from './pages/messenger'
import EditorPage from './pages/editorPage';
import WhiteBoard from './pages/WhiteBoard'



function App() {
  return (
    <Switch>
      <Route exact path = "/" component = {HomePage}/>
      <Route exact path = "/sign-in" component = {SignIn}/>
      <Route exact path = "/users/sign-up" component = {SignUp}/>
      <Route exact path = "/profile" component = {UserProfile}/>
      <Route exact path = "/home" component = {UserHomePage}/>
      <Route exact path = "/group/:id" component = {GroupPage}/>
      <Route exact path = "/yt/search" component = {YoutubeSearchPage}/>
      <Route exact path = "/user/post/:id" component = {PostPage}/>
      <Route exact path = "/messenger" component = {Messenger}/>
      <Route exact path = "/messenger/:id" component = {Messenger}/>
      <Route exact path = "/playground" component = {EditorPage}/>
      <Route exact path = "/whiteboard" component = {WhiteBoard}/>
    </Switch>
  );
}

export default App;




