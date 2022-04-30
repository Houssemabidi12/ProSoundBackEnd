// import React, {useState, useRef, useEffect, useLayoutEffect,forwardRef} from "react";
// //import Webcam from "react-webcam";
// import Typography from "@material-ui/core/Typography";
// import Container from "@material-ui/core/Container";
// import { makeStyles, withStyles } from "@material-ui/core/styles";
// //import Slider from "@material-ui/core/Slider";
// import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";
// import screenful from "screenfull";
// import Controls from "./Controls";
// import Peer from "simple-peer"
// import io from "socket.io-client"
// import Button from "@material-ui/core/Button"
// import IconButton from "@material-ui/core/IconButton"
// import TextField from "@material-ui/core/TextField"
// import AssignmentIcon from "@material-ui/icons/Assignment"
// import PhoneIcon from "@material-ui/icons/Phone"
// import { CopyToClipboard } from "react-copy-to-clipboard"
// import Audiolect from "./Audiolect";
// import Lyrics from "./Lyrics";
// import UploadLyrics from "./UploadLyrics";
// import ScreenRecordPreviewModal from "./ScreenRecordPreviewModal";
// //import Waveform from "./Waveform";
// import './FullVideo.scss';



// let respwidth="100%"
// var peer2= null;
// let bb=null;
// const socket = io.connect('http://localhost:5000')
// const useStyles = makeStyles((theme) => ({
//     playerWrapper: {
//         width: "100%",

//         position: "relative",
//          "&:hover": {
//            "& $controlsWrapper": {
//              visibility: "visible",
//            },
//          },
//     },

//     controlsWrapper: {
//         visibility: "hidden",
//         position: "absolute",
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         background: "rgba(0,0,0,0.4)",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//     },
//     topControls: {
//         display: "flex",
//         justifyContent: "flex-end",
//         padding: theme.spacing(2),
//     },
//     middleControls: {
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     bottomWrapper: {
//         display: "flex",
//         flexDirection: "column",

//         // background: "rgba(0,0,0,0.6)",
//         // height: 60,
//         padding: theme.spacing(2),
//     },

//     bottomControls: {
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//         // height:40,
//     },

//     button: {
//         margin: theme.spacing(1),
//     },
//     controlIcons: {
//         color: "#777",

//         fontSize: 50,
//         transform: "scale(0.9)",
//         "&:hover": {
//             color: "#fff",
//             transform: "scale(1)",
//         },
//     },

//     bottomIcons: {
//         color: "#999",
//         "&:hover": {
//             color: "#fff",
//         },
//     },

//     volumeSlider: {
//         width: 100,
//     },
// }));



// const format = (seconds) => {
//     if (isNaN(seconds)) {
//         return `00:01`;
//     }
//     const date = new Date(seconds * 1000);
//     const hh = date.getUTCHours();
//     const mm = date.getUTCMinutes();
//     const ss = date.getUTCSeconds().toString().padStart(2, "0");
//     if (hh) {
//         return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
//     }
//     return `${mm}:${ss}`;
// };


// let uss;
// const FullVideo= (props) =>{




//     const classes = useStyles();
//     const [showControls, setShowControls] = useState(false);
//     const [count, setCount] = useState(0);
//     const [counter, setCounter] = useState(0);
//     const [anchorEl, setAnchorEl] = React.useState(null);
//     const [timeDisplayFormat, setTimeDisplayFormat] = React.useState("normal");
//     const [bookmarks, setBookmarks] = useState([]);
//     const [state, setState] = useState({
//         pip: false,
//         playing: true,
//         controls: false,
//         light: false,

//         muted: true,
//         played: 0,
//         duration: 0,
//         playbackrate: 1.0,
//         volume: 1,
//         loop: false,
//         seeking: false,
//     });

//     const playerRef = useRef(null);
//     const playerContainerRef = useRef(null);
//     const controlsRef = useRef(null);
//     const canvasRef = useRef(null);
//     const audRef=useRef(null);
//     const [song,setSong]=useState(null);
//     const [song2,setSong2]=useState(null);
//     const [songName,setSongName]=useState("");
//     const [ lyric, setLyric] = useState(null);
//     useEffect(()=>{
//         if(song2!=null) {
//             setSong(song2);
//            // console.log(song2.preview);
//         }
//     },[song2])
//     const {
//         playing,
//         controls,
//         light,

//         muted,
//         loop,
//         playbackrate,
//         pip,
//         played,
//         seeking,
//         volume,
//     } = state;



//     const handlePlayPause = () => {
//         setState({ ...state, playing: !state.playing });
//     };

//     /*const handleRewind = () => {
//       playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
//     };*/

//     /*const handleFastForward = () => {
//       playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
//     };*/

//     const handleProgress = (changeState) => {

//         if (count > 4) {
//             controlsRef.current.style.visibility = "hidden";
//             setCount(0);
//         }
//         if (controlsRef.current.style.visibility == "visible") {
//             setCount(count+1);
//         }
//         if (!state.seeking) {
//             setState({ ...state, ...changeState });
//         }
//     };

//     const handleSeekChange = (e, newValue) => {
//         console.log({ newValue });
//         setState({ ...state, played: parseFloat(newValue / 100) });
//     };

//     const handleSeekMouseDown = (e) => {
//         setState({ ...state, seeking: true });
//     };

//     const handleSeekMouseUp = (e, newValue) => {
//         console.log({ value: e.target });
//         setState({ ...state, seeking: false });
//         // console.log(sliderRef.current.value)

//         audRef.current.waveform.mediaContainer.children[0].seekTo(newValue / 100, "fraction");
//         audRef.current.waveform.seekTo(newValue / 100, "fraction");

//     };

//     const handleDuration = (duration) => {
//         setState({ ...state, duration });
//     };

//     const handleVolumeSeekDown = (e, newValue) => {
//         setState({ ...state, seeking: false, volume: parseFloat(newValue / 100) });
//     };
//     const handleVolumeChange = (e, newValue) => {
//         // console.log(newValue);
//        if(audRef && audRef.current)
//            {
//                audRef.current.waveform.setVolume(parseFloat(newValue / 100));
//                audRef.current.waveform.mediaContainer.children[0].volume=parseFloat(newValue / 100);

//            };
//         setState({
//             ...state,
//             volume: parseFloat(newValue / 100),
//             muted: newValue === 0 ? true : false,
//         });
//     };
//     /*const handleVolumeChange = (e, newValue) => {
//         // console.log(newValue);
//         setState({
//             ...state,
//             volume: parseFloat(newValue / 100),
//             muted: newValue === 0 ? true : false,
//         });
//     };*/

//     const toggleFullScreen = () => {
//         screenful.toggle(playerContainerRef.current);
//     };

//     const handleMouseMove = () => {

//         controlsRef.current.style.visibility = "visible";
//         setCount(0);

//     };

//     const hanldeMouseLeave = () => {
//         controlsRef.current.style.visibility = "hidden";
//         setCount(0);
//     };

//     const handleDisplayFormat = () => {
//         setTimeDisplayFormat(
//             timeDisplayFormat == "normal" ? "remaining" : "normal"
//         );
//     };

//     const handleplaybackrate = (rate) => {
//         setState({ ...state, playbackrate: rate });
//     };

//     const hanldeMute = () => {
//         if(audRef && audRef.current)
//         {
//             audRef.current.waveform.setMute(!state.muted);
//             audRef.current.waveform.mediaContainer.children[0].muted=!state.muted;

//         };
//         setState({ ...state, muted: !state.muted });
//     };

//     const addBookmark = () => {
//         const canvas = canvasRef.current;
//         canvas.width = 160;
//         canvas.height = 90;
//         const ctx = canvas.getContext("2d");

//         ctx.drawImage(
//             audRef.current.waveform.getInternalPlayer(),
//             0,
//             0,
//             canvas.width,
//             canvas.height
//         );
//         const dataUri = canvas.toDataURL();
//         canvas.width = 0;
//         canvas.height = 0;
//         const bookmarksCopy = [...bookmarks];
//         bookmarksCopy.push({
//             time: audRef.current.waveform.getCurrentTime(),
//             display: format(audRef.current.waveform.getCurrentTime()),
//             image: dataUri,
//         });
//         setBookmarks(bookmarksCopy);
//     };

//     React.useEffect(() => {
//         setTimeout(() => setCounter(counter + 1), 1000);
//     }, [counter]);

//     const currentTime =

//         audRef && audRef.current
//             ? audRef.current.waveform.getCurrentTime()
//             : "00:00";

//     const duration =
//         audRef && audRef.current ? audRef.current.waveform.getDuration() : "00:00" //selon song duration a revoir
//     const elapsedTime =
//         timeDisplayFormat == "normal"
//             ? format(currentTime)
//             : `-${format(duration - currentTime)}`;

//     const totalDuration = format(duration);


//     //live + save



//    /* const mediaRecorderRef = React.useRef(null);
//     const [capturing, setCapturing] = React.useState(false);
//     const [recordedChunks, setRecordedChunks] = React.useState([]);





//     const handleStopCaptureClick = React.useCallback(() => {*/
// /*        mediaRecorderRef.current.stop();
//         // bb=mediaRecorderRef.current.stream;
//         setCapturing(false);
//     }, [mediaRecorderRef, playerRef, setCapturing]);

//     const handleDownload = React.useCallback(() => {
//         if (recordedChunks.length) {

//             console.log(recordedChunks.length)
//             const blob = new Blob(recordedChunks, {
//                 type: "video/webm"
//             });
//             const url = URL.createObjectURL(blob);
//             console.log(url);
//             const a = document.createElement("a");
//             document.body.appendChild(a);
//             a.style = "display: none";
//             a.href = url;
//             a.download = "react-webcam-stream-capture.webm";
//             a.click();
//             //bb=blob;
//             //window.URL.revokeObjectURL(url); //kill recorded video url
//             // setRecordedChunks([]);
//         }
//     }, [recordedChunks]);*/

//     const expandScreen = (e) => {
//         const elem = e.target;

//         if (elem.requestFullscreen) {
//             elem.requestFullscreen();
//         } else if (elem.mozRequestFullScreen) {
//             /* Firefox */
//             elem.mozRequestFullScreen();
//         } else if (elem.webkitRequestFullscreen) {
//             /* Chrome, Safari & Opera */
//             elem.webkitRequestFullscreen();
//         } else if (elem.msRequestFullscreen) {
//             /* IE/Edge */
//             elem.msRequestFullscreen();
//         }
//     };
// //new live way

//     const [videoDevices, setVideoDevices] = useState([]);


//     const peersRef = useRef([]);


//     const userStream = useRef();


//     /*useEffect(() => {
//         // Get Video Devices
//         navigator.mediaDevices.enumerateDevices().then((devices) => {
//             const filtered = devices.filter((device) => device.kind === "videoinput");
//             setVideoDevices(filtered);
//         });

//         // Set Back Button Event
//         // window.addEventListener("popstate", goToBack);

//         // Connect Camera & Mic
//         navigator.mediaDevices
//             .getUserMedia({ video: true, audio: true })
//             .then((stream) => {
//                 playerRef.current.srcObject = stream;bb=stream;
//                 userStream.current = stream;

//             });

//         return () => {

//         };
//         // eslint-disable-next-line
//     }, []);*/


// //Socket

//     const [ me, setMe ] = useState("")
//     const [ stream, setStream ] = useState()
//     const [ receivingCall, setReceivingCall ] = useState(false)
//     const [ caller, setCaller ] = useState("")
//     const [ callerSignal, setCallerSignal ] = useState()
//     const [ callAccepted, setCallAccepted ] = useState(false)
//     const [ idToCall, setIdToCall ] = useState("")
//     const [ callEnded, setCallEnded] = useState(false)
//     const [ name, setName ] = useState("")
//     const [ hiddenvid2, sethiddenvid2] = useState(true)
//     const [ videoOnOff, setVideoOnOff] = useState(true)
//     const [ audioOnOff, setAudioOnOff] = useState(true)

//     const myVideo = useRef()
//     const userVideo = useRef()
//     const connectionRef= useRef()
//     const tab1= useRef([])
//     useEffect(()=>{
//     navigator.mediaDevices.getUserMedia({ video: videoOnOff, audio: audioOnOff }).then((stream) => {
//         setStream(stream);
//         playerRef.current.srcObject = stream;


//     })},[videoOnOff])
//     useEffect(() => {
//         /*navigator.mediaDevices.getUserMedia({ video: videoOnOff, audio: audioOnOff }).then((stream) => {
//             setStream(stream);
//             playerRef.current.srcObject = stream;


//         })*/

//         socket.on("me", (id) => {
//             setMe(id)
//         })

//         socket.on("callUser", (data) => {
//             setReceivingCall(true)
//             setCaller(data.from)
//             setName(data.name)
//             setCallerSignal(data.signal)
//         })
//     }, [])

//     const callUser = (id) => {
//         const peer = new Peer({
//             initiator: true,
//             trickle: false,
//             stream: stream
//         })

//         peer.on("signal", (data) => {
//             socket.emit("callUser", {
//                 userToCall: id,
//                 signalData: data,
//                 from: me,
//                 name: name
//             })
//         })
//         peer.on("stream", (stream) => {

//             userVideo.current.srcObject = stream;
//             peer2=stream;

//         })
//         socket.on("callAccepted", (signal) => {
//             respwidth="50%";
//             sethiddenvid2(false);
//             setCallAccepted(true)
//             peer.signal(signal)
//         })

//         connectionRef.current = peer
//     }

//     const answerCall =() =>  {
//         respwidth="50%"
//         sethiddenvid2(false);
//         setCallAccepted(true)
//         const peer = new Peer({
//             initiator: false,
//             trickle: false,
//             stream: stream
//         })
//         peer.on("signal", (data) => {
//             socket.emit("answerCall", { signal: data, to: caller })
//         })
//         peer.on("stream", (stream) => {
//             userVideo.current.srcObject = stream
//             peer2=peer;
//         })

//         peer.signal(callerSignal)
//         connectionRef.current = peer
//     }

//     const leaveCall = () => {
//         respwidth="100%";
//         sethiddenvid2(true);
//         setCallEnded(true);
//         connectionRef.current.destroy();


//     }


// tab1.current.push(playerRef);
// tab1.current.push(userVideo);
// /*



// d

// //wave

//  */

//     /*const thumbs = /*file2.map(file => (
//         <div /*key={file.name}>

//             {song ? <Waveform songup={song}/> : null}
//         </div>
//     //);*/
//     //score
//     const [score, setScore] = useState(0)
// const lyricsfunc=lyric ? <Lyrics lyric={lyric} audRef={audRef} score2={(e)=>setScore(e)} /> :null
// //RecordPreview 
// console.log("wallah kalb w makch rajel", lyric);
//     const[isOpenVideoModal,setIsOpenVideoModal]=useState(false);
//     const[recordedVideoUrl,setRecordedVideoUrl]=useState(null);
//     const[ downloadScreenRecordVideo,setDownloadScreenRecordVideo]=useState(null);
//     const[recorder,setRecorder]=useState(null);
//     const videoModalClose = () => {
//         setTimeout(function () {
//             setIsOpenVideoModal(false);
//         }, 8000);


//     }


//     return (
//         <div>

//             {[...Array(1000)].map((e, i) =>
//                 <div key={i} className="circle-container">
//                     <div className="circle"></div>
//                 </div>)
//             }


//             <h1 id="dareToSingT">Dare to Sing</h1>

//             <Audiolect song={(e)=>{setSong2(e)}}  songName={(e)=>{setSongName(e)}}/>

//             <UploadLyrics lyric={(e)=>{setLyric(e)}}  />



//             <Container style={{width:'60%',marginTop:'-35%'}} >


//                 <div className="container" >
//                     <div className="video-container">
//                         {  <audio autoPlay src='../../../public/KaraokeSong/Fergie.mp3'/>}

//                 <div
//                     onMouseMove={handleMouseMove}
//                     onMouseLeave={hanldeMouseLeave}
//                     ref={playerContainerRef}
//                     className={classes.playerWrapper}

//                 >
//                     {lyricsfunc}

//                     <video
//                         audio={true}
//                         ref={playerRef}
//                         style={{borderRadius: '10%'}}
//                         autoPlay
//                         playsInline
//                         width={respwidth}
//                         height="100%"
//                         //url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
//                         pip={pip}
//                         playing={playing}
//                         controls={false}
//                         light={light}
//                         loop={loop}
//                         playbackrate={playbackrate}
//                         volume={volume}
//                         muted={true}
//                         onTimeUpdate={handleProgress}
//                         //onProgress={handleProgress}
//                         config={{
//                             file1: {
//                                 attributes: {
//                                     crossorigin: "anonymous",
//                                 },
//                             },
//                         }}
//                     >

//                     </video>

//                     <audio autoPlay src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"/>
//                     <video
//                         hidden={hiddenvid2}
//                         style={{borderRadius: '10%'}}
//                         audio={true}
//                         ref={userVideo}
//                         autoPlay
//                         playsInline
//                         width="50%"
//                         height="100%"
//                         //url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
//                         pip={pip}
//                         playing={playing}
//                         controls={false}
//                         light={light}
//                         loop={loop}
//                         playbackrate={playbackrate}
//                         volume={volume}
//                         muted={muted}
//                         onTimeUpdate={handleProgress}
//                         //onProgress={handleProgress}
//                         config={{
//                             file1: {
//                                 attributes: {
//                                     crossorigin: "anonymous",
//                                 },
//                             },
//                         }}
//                     >

//                     </video>



//                     <Controls
//                         style={{borderRadius: '40%'}}
//                         ref={controlsRef}
//                         onSeek={handleSeekChange}
//                         onSeekMouseDown={handleSeekMouseDown}
//                         onSeekMouseUp={handleSeekMouseUp}
//                         onDuration={handleDuration}
//                         //onRewind={handleRewind}
//                         onPlayPause={handlePlayPause}
//                         //onFastForward={handleFastForward}
//                         playing={playing}
//                         played={played}
//                         elapsedTime={elapsedTime}
//                         totalDuration={totalDuration}
//                         onMute={hanldeMute}
//                         muted={muted}
//                         onVolumeChange={handleVolumeChange}
//                         onVolumeSeekDown={handleVolumeSeekDown}
//                         onChangeDispayFormat={handleDisplayFormat}
//                         playbackrate={playbackrate}
//                         onplaybackrateChange={handleplaybackrate}
//                         onToggleFullScreen={toggleFullScreen}
//                         volume={volume}
//                         myVideo={playerRef}
//                         userVideo={userVideo}
//                         song={song}
//                         songName={songName}
//                         audRef={audRef}
//                         vidOnOff={videoOnOff}
//                         audOnOff={audioOnOff}
//                         videoOnOff={(e)=>{setVideoOnOff(e)}}
//                         audioOnOff={(e)=>setAudioOnOff(e)}
//                         isOpenVideoModal2={(e)=>setIsOpenVideoModal(e)}

//                         recordedVideoUrl2={(e)=>setRecordedVideoUrl(e)}
//                         downloadScreenRecordVideo={(e)=>setDownloadScreenRecordVideo(e)}
//                         recorder2={(e)=>setRecorder(e)}


//                     />
//                 </div>


//                 {/*<Grid container style={{ marginTop: 20 }} spacing={3}>
//                     {bookmarks.map((bookmark, index) => (
//                         <Grid key={index} item>
//                             <Paper
//                                 onClick={() => {
//                                     playerRef.current.seekTo(bookmark.time);
//                                     controlsRef.current.style.visibility = "visible";

//                                     setTimeout(() => {
//                                         controlsRef.current.style.visibility = "hidden";
//                                     }, 1000);
//                                 }}
//                                 elevation={3}
//                             >
//                                 <img crossOrigin="anonymous" src={bookmark.image} />
//                                 <Typography variant="body2" align="center">
//                                     bookmark at {bookmark.display}
//                                 </Typography>
//                             </Paper>

//                         </Grid>
//                     ))}
//                 </Grid>*/}
//                 <canvas ref={canvasRef} />



//                     </div>
//                     <div>inviter ami
//                         {isOpenVideoModal}
//                         { isOpenVideoModal ?
//                             <ScreenRecordPreviewModal
//                             isOpenVideoModal={isOpenVideoModal}

//                             recordedVideoUrl={recordedVideoUrl}
//                             videoModalClose={videoModalClose}
//                             recorder={recorder}
//                             score={score}

//                         />:null}
//                     </div>
//                     <div className="myId">
//                         <TextField
//                             id="filled-basic"
//                             label="Name"
//                             variant="filled"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             style={{ marginBottom: "20px" }}
//                         />
//                         <CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
//                             <Button variant="contained" color="primary" startIcon={<AssignmentIcon fontSize="large" />}>
//                                 Copy ID
//                             </Button>
//                         </CopyToClipboard>

//                         <TextField
//                             id="filled-basic"
//                             label="ID to call"
//                             variant="filled"
//                             value={idToCall}
//                             onChange={(e) => setIdToCall(e.target.value)}
//                         />
//                         <div className="call-button">
//                             {callAccepted && !callEnded ? (
//                                 <Button variant="contained" color="secondary" onClick={leaveCall}>
//                                     End Call
//                                 </Button>
//                             ) : (
//                                 <IconButton color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
//                                     <PhoneIcon fontSize="large" />
//                                 </IconButton>
//                             )}
//                             {idToCall}
//                         </div>
//                     </div>
//                     <div>
//                         {receivingCall && !callAccepted ? (
//                             <div className="caller">
//                                 <h1 >{name} is calling...</h1>
//                                 <Button variant="contained" color="primary" onClick={answerCall}>
//                                     Answer
//                                 </Button>
//                             </div>
//                         ) : null}
//                     </div>
//                 </div>



//             </Container>

// </div>
//         /*</div>*/
//     );
// }

// export default FullVideo;
