import React, { useEffect, useState } from "react";

import "./styles.css";
import Line from "./Line";
import './Lyrics.scss';
import { useTimer } from "use-timer";
let ii;
let n=0;
let tl
let ss=false;
let pp=""


const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

const mic = new SpeechRecognition();

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'

const Lyrics = (props) =>{
    const { time, start } = useTimer();
    const [line, setLine] = useState("");
    const [line0, setLine0] = useState("");
    const [line2, setLine2] = useState("");
    const [play, setPlay] = useState(true);
    const txt=props.lyric;
    useEffect(() => {


        if(props.audRef.current!=null) {
            if(props.audRef.current.state.playing!==isListening) {
                setIsListening(props.audRef.current.state.playing)
            }

            //start();
/*console.log(props.audRef.current.state.playing);
console.log(props.audRef.current);*/
            lyrics[timers.indexOf(new Date(props.audRef.current.waveform.getCurrentTime() * 1000).toISOString().substr(14, 5))] &&

            setLine(
                lyrics[
                    timers.indexOf(new Date(props.audRef.current.waveform.getCurrentTime() * 1000).toISOString().substr(14, 5))
                    ]
            );
            if(lyrics[
                timers.indexOf(new Date(props.audRef.current.waveform.getCurrentTime() * 1000).toISOString().substr(14, 5))
                -1]!==undefined){
                ii = 0;
                setLine0(
                    lyrics[
                        timers.indexOf(new Date(props.audRef.current.waveform.getCurrentTime() * 1000).toISOString().substr(14, 5))
                       -1 ]
                );
            }

            if(lyrics[
            timers.indexOf(new Date(props.audRef.current.waveform.getCurrentTime() * 1000).toISOString().substr(14, 5))
            +1]!==undefined){
                lyrics[timers.indexOf(new Date(props.audRef.current.waveform.getCurrentTime() * 1000).toISOString().substr(14, 5))] &&
                setLine2(
                    lyrics[
                    timers.indexOf(new Date(props.audRef.current.waveform.getCurrentTime() * 1000).toISOString().substr(14, 5))
                    +1 ]
                );
            }


        }

    }, [time]);
    useEffect(() => {

        if(line!=="") {

            if(timers[timers.indexOf(new Date(props.audRef.current.waveform.getCurrentTime() * 1000).toISOString().substr(14, 5))+1]!==undefined) {
                 /*tl=0;
                 tl = timers[timers.indexOf(new Date(props.audRef.current.waveform.getCurrentTime() * 1000).toISOString().substr(14, 5)) + 1].substr(3, 2) - timers[timers.indexOf(new Date(props.audRef.current.waveform.getCurrentTime() * 1000).toISOString().substr(14, 5))].substr(3, 2)


                 tl = 9 / tl ;*/
                 /*console.log(n);*/
setIsStart(!isstart)
                //handleListen();


            }
            n=timers.indexOf(new Date(props.audRef.current.waveform.getCurrentTime() * 1000).toISOString().substr(14, 5));
        }

    }, [line]);

    /*function lyricsTimer() {
        ii=ii+tl;

    }*/

    const removeMS = timing => {
        let clean = timing.substring(3);
        //console.log(clean);
        clean = clean.substring(0, clean.length - 8);
        return clean;
    };
    const removeMS2 = timing => {
        let clean = timing.substring(1);
        //console.log(clean);
        clean = clean.substring(0, clean.length - 4);
        return clean;
    };
    /*const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;*/


    let timers;
    let txt2 ;
    let lyrics;
    if( txt.match(/.* -->/g)!==null) {
        timers= txt.match(/.* -->/g).map(t => removeMS(t));
        txt2= txt.replace(/\n/g, "").replace(/WEBVTT/g, '');
        lyrics= txt2.replace(/.* -->(.*)/g, "").split(/\r\r\r/);//.splice(1,txt2.replace(/.* -->(.*)/g, "").split(/\r\r\r/).length);
        if (lyrics[0] === "") {
            lyrics = txt2.replace(/.* -->(.*)/g, "").split(/\r\r\r/).splice(1, txt2.replace(/.* -->(.*)/g, "").split(/\r\r\r/).length);
        }

    }else if(txt.match(/\[(.*)\]/g)!==null) {
         timers = txt.match(/\[(.*)\]/g).map(t => removeMS2(t));
         lyrics = txt.replace(/\[(.*)\]/g, "").split(/\n/);
    }

    //speech rec

   // this.props.recognition.lang = 'en-US'


    //scoor
    const [isListening, setIsListening] = useState(false)
    const [isstart, setIsStart] = useState(true)
    const [note, setNote] = useState("")
    const [score, setScore] = useState(0)
    const [savedNotes, setSavedNotes] = useState([])

   /* useEffect(() => {
        handleListen()
        }, [isListening])*/
    async function stoop(){ await mic.stop();mic.stop()}
    async function staart(){ await mic.stop();mic.stop();await mic.start();}

    /*useEffect( () => {
        console.log('before stop'+ss);
        if(ss){stoop();setIsStart(false);ss=false;console.log('stopped');}
        console.log('after stop'+ss);

            if (ss===false) {
                console.log('before start'+ss);
                staart();
                console.log('Mic On');
                setIsStart(true);
                ss=true;
                console.log('after start'+ss);
                /*mic.onend = () => {
                    console.log('continue..')
                    mic.start()
                }
            } else {
                mic.stop();
                setIsStart(false);
                ss=false;
                mic.onend = () => {
                    setIsStart(false);
                    ss=false;
                    console.log('Stopped Mic on Click')
                }
            }


        mic.onstart = () => {
            setIsStart(true);
            ss=true;
            console.log('Mics on')
        }
        console.log(line)

        mic.onresult = event => {
                let line7=line.split(' ');
            const transcript = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('')
            line7.map(l=>console.log(transcript.match(l)))
            console.log(line.match(transcript))
            console.log(transcript)
           // console.log(line7)
            console.log(line)
            setNote(transcript)
            mic.onerror = event => {
                console.log(event.error)
            }
        }
    },[line])*/

    useEffect(() => {
        stoop();
        handleListen(line)
        console.log('heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeerrrrrrreeeeeeeee'+isListening)
    }, [line])

    const handleListen = (linee) => {
//console.log(isListening)

        if (isListening) {

            staart();
            /*mic.onend = () => {
                console.log('continue..')
                mic.start()
            }*/
        }  /*else if(!isListening){
            mic.stop()
            console.log('blooooooooooooo')
            mic.onend = () => {
                console.log('Stopped Mic on Click')
            }
        }*/
        mic.onstart = () => {
            console.log('Mics on')
        }

        mic.onresult = event => {
            var transcript = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('')
           // console.log(transcript)
            var line7=linee;

            if(pp!=="") {
                console.log('pp1 : '+pp)
                if(pp.split(' ').length>1) {
                    console.log('spliter'+pp);
                    pp=pp.split(" ");

                    pp.map(k => {

                        line7 = line7.replace(k, "")

                    })
                    line7=line7.split(' ');
                    pp=pp.join(" ");
                }else{line7 = line7.replace(pp, "");line7=line7.split(' ');}
                console.log('pp2 in : '+pp)
            }else{line7=line7.split(' ');}

            line7.map(l=>{var savel =l;l=l.replace("(","");l=l.replace(")","");l=l.replace(",","");l=l.toLowerCase();transcript=transcript.toLowerCase();console.log('transcript : '+transcript);console.log('linee : '+l);if(l!==" " && l!==""){ if(transcript.match(l)!==null){ setScore(prevState => prevState+1);console.log(transcript.indexOf(l))/*;transcript=transcript.replace(l,"")*/;if(pp===""){pp=savel;}else{pp=pp+" "+savel}}}});
            //pp=transcript;
            setNote(transcript)
props.score2(score);
            //if(linee){}


            mic.onerror = event => {
                console.log(event.error)
            }
        }
    }


    return (
        <div className="Lir" >



            {/*console.log(txt)*/}


            {props.audRef.current && play ?   ((start()) || setPlay(false)):null}

            <div className="scoretitleT">
                <h1>score</h1>
            </div>
            <div className="scoreT">
                <h1>{score}</h1>
            </div>

            {/*<Line text={line0} percentage={100}  />*/}
            <Line text={line} percentage={0} />

            {/*<Line text={line2} percentage={0} />*/}

        </div>
    );

}



export default Lyrics;

