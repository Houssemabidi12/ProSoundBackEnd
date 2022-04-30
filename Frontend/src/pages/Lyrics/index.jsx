import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.scss";
import "./lyrics.css";
const Lyrics = () => {
  const { currentSong } = useSelector((state) => state.audioPlayer);
  const [lyrics, setLyrics] = useState("");
  useEffect(() => {
    if (!currentSong) return;

    axios
      .get("http://localhost:5000/api/lyrics", {
        params: {
          title: currentSong.song.title,
          artist: currentSong.song.artist,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
        console.log(lyrics);
      });
  }, [currentSong]);
  return (
    <div>
      <img className={styles.imag} src={currentSong.song.img} alt="song_img" />
      <br></br>
      <div className={styles.title}> Artist : {currentSong.song.artist}</div>
      <div className={styles.title}> Track : {currentSong.song.title}</div>

      <br></br>

      <pre>{lyrics}</pre>
    </div>
  );
};

export default Lyrics;
