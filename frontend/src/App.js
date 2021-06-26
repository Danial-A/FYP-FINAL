import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/homepage'
import {Route, Switch, Redirect} from 'react-router-dom'
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

    const loggedin = ()=>{
      if(localStorage.getItem('token') === null){
        return false;
      }
      else{
        return true
      }
     }
  
  return (
    <Switch>
   {/* <Route exact path = "/">
      {loggedin() ? <Redirect to = "/home"/> : <HomePage/>}
    </Route>
      <Route exact path = "/signin">
        {loggedin() ? <Redirect to = "/home"/> : <SignIn/> }
      </Route>
      <Route exact path = "/signup">
        {loggedin() ? <Redirect to = "/home"/> : <SignUp/> }
      </Route>
      <Route exact path = "/profile">
      {loggedin() ? <UserProfile/> : <Redirect to = "/signin"/> }
      </Route>
      <Route exact path = "/home">
      {loggedin() ? <UserHomePage/> : <Redirect to = "/signin"/> }
      </Route>
      <Route exact path = "/group/:id" >
      {loggedin() ? <GroupPage/> : <Redirect to = "/signin"/> }
      </Route>
      <Route exact path = "/user/post/:id">
      {loggedin() ? <PostPage/> : <Redirect to = "/signin"/> }
      </Route>
      <Route exact path = "/messenger">
      {loggedin() ? <NewMessenger/> : <Redirect to = "/signin"/> }
      </Route>

      <Route exact path = "/playground">
      {loggedin() ? <EditorPage/> : <Redirect to = "/signin"/> }
      </Route>
      <Route exact path = "/playground/:id">
      {loggedin() ? <EditorPage/> : <Redirect to = "/signin"/> }
      </Route>
      <Route exact path = "/whiteboard">
      {loggedin() ? <WhiteBoard/> : <Redirect to = "/signin"/> }
      </Route>
      <Route exact path = "/youtube" >
      {loggedin() ? <Youtube/> : <Redirect to = "/signin"/> }
      </Route>
      <Route exact path = "/room/:id" >
      {loggedin() ? <JitsiComponent/> : <Redirect to = "/signin"/> }
  </Route>*/}
  <Route exact path = "/" component = {HomePage}/>
  <Route exact path = "/signin" component = {SignIn}/>
  <Route exact path = "/signup" component = {SignUp}/>
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




