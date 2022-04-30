import { Fragment, useEffect } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "./redux/userSlice/apiCalls";
import { getPlayLists } from "./redux/playListSlice/apiCalls";
import PrivateRoute from "./PrivateRoute";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Appchat from "./pages/Appchat";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import AudioPlayer from "./components/AudioPlayer";
import Playlist from "./pages/Playlist";
import Search from "./pages/Search";
import LikedSongs from "./pages/LikedSongs";
import FullVideo from "./pages/FullVideo";
import Profile from "./pages/Profile";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen";
import Lyrics from "./pages/Lyrics";
import Video from "./pages/video";
import LyricsSrch from "./components/Lyricsshearch/lyricssearch";
import { connectWithWebSocket } from "./utils/wssConnection/wssConnection"; 
import './App.css';
import EmotionCamera from "./pages/suggsetface";
const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const { currentSong } = useSelector((state) => state.audioPlayer);

  useEffect(() => {
    let token = null;
    const root = JSON.parse(window.localStorage.getItem("persist:root"));

    if (root) {
      const { auth } = root;
      const { user } = JSON.parse(auth);
      if (user) token = user.token;
    }

    if (user && token) {
      getUser(user._id, dispatch);
      getPlayLists(dispatch);
    }
    connectWithWebSocket();
  }, [dispatch, user]);

  return (
    <Fragment>
      {user &&
        location.pathname !== "/login" &&
        location.pathname !== "/" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/not-found" && (
          <Fragment>
            <Navbar />
            <Sidebar />
            {currentSong && <AudioPlayer />}
          </Fragment>
        )}
      <Switch>
        <Route exact path="/" component={Main} />
        
        <Route exact path="/forgotpassword" component={ForgotPasswordScreen} />
        <Route
          exact
          path="/passwordreset/:resetToken"
          component={ResetPasswordScreen}
        />
        <PrivateRoute exact user={user} path="/home" component={Home} />
        <PrivateRoute exact user={user} path="/Karaoke" component={FullVideo} />
        <PrivateRoute exact user={user} path="/face" component={EmotionCamera} />
        <PrivateRoute exact user={user} path="/video" component={Video} />
        <PrivateRoute
          exact
          user={user}
          path="/collection/tracks"
          component={LikedSongs}
        />
        <PrivateRoute exact user={user} path="/Lyrics" component={Lyrics} />
        <PrivateRoute exact user={user} path="/chatt" component={Appchat} />
        
        <PrivateRoute
          exact
          user={user}
          path="/collection/playlists"
          component={Library}
        />
        <PrivateRoute
          exact
          user={user}
          path="/searchlyrics"
          component={LyricsSrch}
        />
        <PrivateRoute exact user={user} path="/search" component={Search} />
        <PrivateRoute
          exact
          user={user}
          path="/playlist/:id"
          component={Playlist}
        />
        <PrivateRoute exact user={user} path="/me" component={Profile} />
        {user && <Redirect from="/signup" to="/home" />}
        {user && <Redirect from="/login" to="/home" />}
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </Fragment>
  );
};

export default App;
