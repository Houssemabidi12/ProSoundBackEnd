import React, {useCallback, useEffect, useRef, useState} from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
//import WaveSurfer from 'react-wavesurfer';
import {
    Button, Icon, Paper, withStyles, Typography
} from '@material-ui/core';

//import Dropzone from 'react-dropzone';
//import { uploadRequest, uploadReject } from '../../upload/actions';
import { useDropzone } from 'react-dropzone';
//import Waveform from "./Waveform";
let file1;



const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%'
    },
    player: {
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        width: '100%'
    },
    playController: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        backgroundPosition: 'center',
        backgroundRepeat: 'center',
        backgroundSize: 'center',
        width: '250px'
    },
    img: {
        background: 'yellow'
    },
    info: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'left',
        marginLeft: theme.spacing.unit
    },
    button: {},
    title: {
        fontSize: '1rem'
    },
    input: {
        margin: theme.spacing.unit
    },
    iconBox: {
        border: '2px solid #ccc',
        borderStyle: 'dashed',
        width: '100%',
        borderRadius: '10px',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        margin: theme.spacing.unit * 2

    },
    waveform: {
        marginLeft: theme.spacing.unit
    }
});
let ff=null;
const Audiolect=(props)=> {

const [file2,setFile2]=useState([]);
    const [fileexist,setFileexist]=useState(false);
    const [file3,setFile3]=useState(null);
    /*function chromeWeirdExist() {
    setFileexist(true);
    console.log("exiiiistence  "+fileexist);
    }*/

    const onDrop = useCallback(acceptedFiles =>{

        setFileexist(true);
        setFile3(acceptedFiles[0]);
        setFile2(acceptedFiles.map(file =>
            Object.assign(file, {preview: URL.createObjectURL(file)}


            )));
            },[] );
    const onSend=useEffect(() =>{


      if(fileexist){

        file2.map(file => {

                props.song(null);
                props.song(file.preview);
                props.songName(file.path)
                //setFile2([]);

                console.log(file);
            setFileexist(false);
            }
        )
        }}, [file2]);


    const {
        getRootProps,
        getInputProps
    } = useDropzone({
        onDrop,
        onSend,
    });

    const doTranscode = async () => {

        console.log(file3)
        const ffmpeg = createFFmpeg({corePath: 'https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js',
    log: true, });
        await ffmpeg.load();      
        ffmpeg.FS('writeFile', 'test', await fetchFile(file3));
  
        await ffmpeg.run('-i', 'test','-af','pan=stereo|c0=c0|c1=-1*c1','-ac','1', 'test2.mp3');
        //-i song.mp3 -af pan="stereo|c0=c0|c1=-1*c1" -ac 1 karaoke.mp3
        
        const data = ffmpeg.FS('readFile', 'test2.mp3');
       
        props.song(URL.createObjectURL(new Blob([data.buffer], { type: 'audio/mp3' })));
        //setVideoSrc(URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' })));
        props.songName(file3.path);
   
    };
    return (
        <div style={{marginLeft:'68%'}}>


            <div id="upload" >
                <div id="drop">
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div>Add Your Song.</div>
                        <a>Browse</a>
                    </div>

                </div>
{/* 
                <ul>
                    {file3 ?
                       <li><p >{file3.name}</p> <button onClick={doTranscode}>Convert</button> </li>  :null}

                </ul> */}

            </div>

        </div>
    );
}


export default Audiolect;