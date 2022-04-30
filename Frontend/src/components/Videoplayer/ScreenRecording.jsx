import React from 'react';
import RecordRTC from 'recordrtc';
import ScreenRecordPreviewModal from './ScreenRecordPreviewModal.jsx';
import { Row, Col, Container, Card, CardBody } from 'reactstrap';
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";

let a=200;
let recorder;
var tab=new Array();


export default class ScreenRecording extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recordedVideoUrl: null,
            isOpenVideoModal: false,
            screen: null,
            camera: null,
            cam2:null,
            recorder: null,
            startDisable: false,
            stopDisable: true,
            loadModal: false,
            rec:null,
            RecordedChunks:null,

        }
    }
    //to enable audio and video pass true to disable pass false
   /* componentDidMount() {
        this.startScreenRecord();
    }*/

    captureCamera = (cb) => {
        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,//make it true for video

        }).then(cb);
    }
   /* componentDidMount() {
        // getting access to webcam
        navigator.mediaDevices
            .getUserMedia({video: true})
            .then(stream => this.setState({ ll:stream }))
            .catch(console.log);
    };*/
   /* componentDidUpdate(prevProps, prevState, snapshot) {
        //this.setState( {ll:null,});
        navigator.mediaDevices
            .getUserMedia({video: true})
            .then(stream => this.setState({ ll:stream }))
            .catch(console.log);
    }*/

//access your screen width and height  using window object adjusting camera position ,height and width  //after that pass screen and camera to recordrtc/and call startrecording method using recorder object to //start screen recording
    startScreenRecord = async () => {
        await this.setState({ stopDisable: false, startDisable: true });
this.props.recState(this.state.stopDisable);

let camera =this.props.myVideo.current.srcObject;
        let cam2 =this.props.userVideo.current.srcObject;


                camera.width = window.screen.width;
                camera.height = window.screen.height;
                camera.fullcanvas = true;

        tab.push(camera);


                    a=500;
                    //cam2=this.props.peer2;
                //camera.top = screen.height - camera.height;
                //camera.left = screen.width - camera.width;
        if(cam2!==null){

            cam2.width=a;

            cam2.height = 320;
            cam2.top = camera.height - cam2.height;
            cam2.left = camera.width - cam2.width;
            tab.push(cam2);
        };
        if(this.props.audRef.current!==null) {
            let aud3;
            if(navigator.userAgent.indexOf('Firefox')>-1) {
                aud3 = this.props.audRef.current.waveform.mediaContainer.children[0].mozCaptureStream();

            }else{
                aud3 = this.props.audRef.current.waveform.mediaContainer.children[0].captureStream();
            };
            tab.push(aud3);
        }


                this.setState({
                   // screen: screen,
                    camera: camera,
                    cam2 :cam2
                });
                    a=a+500;
                console.log("nuuuuuuuuuuuuuuuuuull");

                recorder = RecordRTC( tab, {
                    type: 'video',
                    checkForInactiveTracks: false,
                });

                recorder.startRecording();



    };

    //to capture screen  we need to make sure that which media devices are captured and add listeners to // start and stop stream
   /* captureScreen = (callback) => {
        this.invokeGetDisplayMedia((screen) => {
            this.addStreamStopListener(screen, () => {
            });
            callback(screen);
        }, (error) => {
            console.error(error);
            alert('Unable to capture your screen. Please check console logs.\n' + error);
            this.setState({ stopDisable: true, startDisable: false })
        });
    }*/
    //tracks stop
    /*stopLocalVideo = async (kak7) => {
        console.log("hnééé2222222");
        [kak7].forEach(async (stream) => {
            stream.getTracks().forEach(async (track) => {
                track.stop();
            });
        });
    }*/
    //getting media items
    invokeGetDisplayMedia = (success, error) => {

        var displaymediastreamconstraints = {
            video: true,
            audio: true,
        };
        if (navigator.mediaDevices.getDisplayMedia) {
            navigator.mediaDevices.getDisplayMedia(displaymediastreamconstraints).then(success).catch(error);
        } else {
            navigator.getDisplayMedia(displaymediastreamconstraints).then(success).catch(error);
        }
    }
    //adding event listener
    addStreamStopListener = (stream, callback) => {
        stream.addEventListener('ended', () => {
            callback();
            callback = () => { };
        }, false);
        stream.addEventListener('inactive', () => {
            callback();
            callback = () => { };
        }, false);
        stream.getTracks().forEach((track) => {
            track.addEventListener('ended', () => {
                callback();
                callback = () => { };
            }, false);
           track.addEventListener('inactive', () => {
                callback();
                callback = () => { };
            }, false);
        });
        stream.getVideoTracks()[0].onended = () => {
            this.stop();
        };
    }
    // stop screen recording
    stop = async () => {
        await this.setState({ startDisable: true })
        recorder.stopRecording(this.stopRecordingCallback);

    }



    //destory screen recording
    stopRecordingCallback = async () => {


        let recordedVideoUrl;
        if (recorder.getBlob()) {
            this.setState({
                recordPreview: recorder.getBlob()
            })
            recordedVideoUrl = URL.createObjectURL(recorder.getBlob());
        }

        this.setState({
            recordedVideoUrl: recordedVideoUrl,
            screen: null,
            isOpenVideoModal: true,
            startDisable: false,
            stopDisable: true,
            camera: null,
            cam2:null,

        }) ;console.log("dfgksdpfqposdfk");
        recorder.screen.stop();
        recorder.destroy();
        recorder = null;

    }
    // stop audio recording
  /*  stopLocalVideo = async (camera,cam2) => {
        [camera,cam2].forEach(async (stream) => {
            stream.getTracks().forEach(async (track) => {
                track.stop();
            });
        });
    }*/
    //close video modal
    videoModalClose = () => {
        this.setState({
            isOpenVideoModal: false
        })
    }
    //open load alert
    openModal = async () => {
        await this.setState({ loadModal: false })
    }
    render() {
        window.onbeforeunload = this.openModal;
      this.props.isOpenVideoModal(this.state.isOpenVideoModal)
        this.props.recordedVideoUrl(this.state.recordedVideoUrl)
        this.props.downloadScreenRecordVideo(this.downloadScreenRecordVideo)
        this.props.recorder(this.state.recordPreview)

        return (
            <div>

                    <Container className="pt-3">
                        {this.state.stopDisable ? (
                            <Button

                                variant="contained"
                                    color="primary"
                                    startIcon={<SaveIcon />}
                                    onClick={() => {this.videoModalClose();this.startScreenRecord()}}

                            >Start Recording
                            </Button>
                        ) : (
                            <Button variant="contained"
                                    color="primary"
                                    startIcon={<SaveIcon />}
                                    onClick={() => this.stop()} >
                                Stop Recording
                            </Button>
                        )}



                    </Container>
                {/*<ScreenRecordPreviewModal
                    isOpenVideoModal={this.state.isOpenVideoModal}
                    videoModalClose={this.videoModalClose}
                    recordedVideoUrl={this.state.recordedVideoUrl}
                    downloadScreenRecordVideo={this.downloadScreenRecordVideo}
                    recorder={this.state.recordPreview}
                />*/}

            </div>
    )
    }
    }