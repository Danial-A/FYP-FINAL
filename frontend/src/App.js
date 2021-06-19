import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/homepage'
import {Route, Switch} from 'react-router-dom'
import SignIn from './components/sign-in/signin'
import SignUp from './components/sign-up/signup';
import UserProfile from './pages/UserProfile';
import UserHomePage from './pages/UserHomePage';
import GroupPage from './components/groupComponent/GroupPage'
import PostPage from './pages/postPage'
import EditorPage from './pages/editorPage';
import WhiteBoard from './pages/WhiteBoard'
import Youtube from './components/youtube/Youtube'
import NewMessenger from './components/NewMessenger/Messenger';
import JitsiComponent from './components/video-chat-room/JitsiComponent';


function App() {
  return (
    <Switch>
      <Route exact path = "/" component = {HomePage}/>
      <Route exact path = "/sign-in" component = {SignIn}/>
      <Route exact path = "/users/sign-up" component = {SignUp}/>
      <Route exact path = "/profile" component = {UserProfile}/>
      <Route exact path = "/home" component = {UserHomePage}/>
      <Route exact path = "/group/:id" component = {GroupPage}/>
      <Route exact path = "/user/post/:id" component = {PostPage}/>
      <Route exact path = "/messenger" component = {NewMessenger}/>
      <Route exact path = "/playground" component = {EditorPage}/>
      <Route exact path = "/playground/:id" component = {EditorPage}/>
      <Route exact path = "/whiteboard" component = {WhiteBoard}/>
      <Route exact path = "/youtube" component = {Youtube}/>
      <Route exact path = "/room/:id" component = {JitsiComponent}/>

    </Switch>
  );
}

export default App;




