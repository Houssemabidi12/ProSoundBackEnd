import React, {Component, useRef} from 'react';
import WaveSurfer from 'wavesurfer.js';

import { WaveformContianer, Wave, PlayButton } from './Waveform.styled';

class Waveform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false,
        }
    };

    componentDidMount() {
        const track = document.querySelector('#track');

        this.waveform = WaveSurfer.create({
            position: 100,
            barWidth: 1,
            cursorWidth: 1,
            container: '#waveform',
            backend: 'WebAudio',
            height: 60,
            progressColor: '#2D5BFF',
            responsive: true,
            waveColor: '#EFEFEF',
            cursorColor: 'transparent',
            hideScrollbar: true,
            normalize: true,
            fillParent: true,
            overflow:'hidden',
            //marginLeft: 4000,
        });

        this.waveform.load(track);
        //this.waveform.mozCaptureStream();
        //this.waveform.loaded(track).remove();

    };
    componentDidUpdate(prevProps, prevState, snapshot) {

        if(parseInt(this.props.audRef.current.waveform.getCurrentTime())!==parseInt(this.props.audRef.current.waveform.mediaContainer.children[0].currentTime)){this.slider();}

        if (this.props.play) {
            if(prevProps.play!==this.props.play){
                console.log("sqdfqsd");
                this.setState({ playing: !this.state.playing });
          //  this.waveform.play();
                this.slider();
                this.props.audRef.current.waveform.play();
                this.props.audRef.current.waveform.mediaContainer.children[0].play();



            }
            /*this.handlePlay();*/
        }else{
            if(prevProps.play!==this.props.play) {
                console.log("kkkkkkkk");
                this.setState({ playing: !this.state.playing });

                this.waveform.pause();
                this.props.audRef.current.waveform.pause();
                this.props.audRef.current.waveform.mediaContainer.children[0].pause();
                this.slider();
            }
        }
        if(prevProps.songup!== this.props.songup){
            const track = document.querySelector('#track');
            this.props.redo(false);
        /*    console.log("wfsgfqdsdgfqdf");

            var stream = track.mozCaptureStream();
            this.props.audRef.current.waveform.mediaContainer.firstChild.srcObject = stream;*/
            this.waveform.load(track);
        }
       /* if (this.props.audRef.current!==null) {
            const track = document.querySelector('#track');
            console.log("wfsgfqdsdgfqdf");

                var stream = track.captureStream();
                this.props.audRef.current.waveform.mediaContainer.firstChild.srcObject = stream;

        }*/
    }
componentWillUnmount() {
        console.log("TTTTTTTTTTTTTTTTTTTT");

    this.waveform.stop();
}

    handlePlay = () => {

        this.setState({ playing: !this.state.playing });
        this.waveform.playPause();

    };
    slider=()=>{
        this.props.audRef.current.waveform.mediaContainer.children[0].currentTime=this.props.audRef.current.waveform.getCurrentTime();

    }


    render() {
      //  const url = 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3';


        return (

        <div id="waveform" >
            {/* <WaveformContianer width="683">
            <PlayButton onClick={this.handlePlay} >
                    {!this.state.playing ? 'Play' : 'Pause'}
                </PlayButton>
                <Wave id="waveform" width="683" />*/}

                <audio id="track"  src={this.props.songup} muted={this.props.recState} />


            {/*</WaveformContianer>*/}
        </div>

        );
    }
};

export default Waveform;
