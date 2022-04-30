import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createPlayList } from "../../redux/playListSlice/apiCalls";
import { CircularProgress } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AddIcon from "@mui/icons-material/Add";
import likeImg from "../../images/like.jpg";
import styles from "./styles.module.scss";
import ChatIcon from "@mui/icons-material/Chat";
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
const Sidebar = () => {
  const { playlists, getPlayListProgress, createPlayListProgress } =
    useSelector((state) => state.playlists);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleCreatePlayList = () => {
    const data = {
      name: "My Playlist #" + (playlists.length + 1),
      user: user._id,
      desc: "By " + user.name,
      songs: [],
      img: "",
    };
    createPlayList(data, dispatch);
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <NavLink
        to="/home"
        className={styles.menu_link}
        activeClassName={styles.active_menu}
      >
        <HomeIcon />
        <span>Home</span>
      </NavLink>
      <NavLink
        to="/search"
        className={styles.menu_link}
        activeClassName={styles.active_menu}
      >
        <SearchIcon />
        <span>Search</span>
      </NavLink>
      <NavLink to="/face" 
      className={styles.menu_link}
      activeClassName={styles.active_menu}> <EmojiEmotionsIcon/> <span> Suggest B Emmotions</span></NavLink>
      <NavLink to="/Karaoke" 
      className={styles.menu_link}
      activeClassName={styles.active_menu}> <TheaterComedyIcon/> <span> Karaoke Room</span></NavLink>
      <NavLink
        to="/collection/playlists"
        className={styles.menu_link}
        activeClassName={styles.active_menu}
      >
        <LibraryMusicIcon />
        <span>Your Library</span>
      </NavLink>
      <NavLink
        to="/searchlyrics"
        className={styles.menu_link}
        activeClassName={styles.active_menu}
      >
        <img src="https://img.icons8.com/material/24/26e07f/micro--v1.png" />
        <span>search lyrics</span>
      </NavLink>
      <NavLink
        to="/chatt"
        className={styles.menu_link}
        activeClassName={styles.active_menu}
      >
        <ChatIcon />
        <span>Chat with others</span>
      </NavLink>

      <div
        className={styles.create_playlist_btn}
        onClick={handleCreatePlayList}
      >
        <AddIcon />
        <span>Create Playlist</span>
      </div>
      <NavLink
        to="/collection/tracks"
        className={styles.menu_link}
        activeClassName={styles.active_menu}
      >
        <img src={likeImg} alt="jfo" />
        <span>Liked Songs</span>
      </NavLink>
      <div className={styles.underline}></div>
      {getPlayListProgress || createPlayListProgress ? (
        <div className={styles.progress_container}>
          <CircularProgress style={{ color: "#1ed760" }} size="3rem" />
        </div>
      ) : (
        <Fragment>
          {playlists.map((playlist) => (
            <NavLink
              key={playlist._id}
              to={`/playlist/${playlist._id}`}
              activeClassName={styles.active_link}
              className={styles.playlist_link}
            >
              {playlist.name}
            </NavLink>
          ))}
        </Fragment>
      )}
    </div>
  );
};

export default Sidebar;
