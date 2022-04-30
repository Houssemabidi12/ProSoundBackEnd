import React, {useCallback, useEffect, useRef, useState} from 'react';

import {
    Button, Icon, Paper, withStyles, Typography
} from '@material-ui/core';
// import Router from "../../Router/Router";

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

const UploadLyrics=(props)=> {

const [file2,setFile2]=useState([]);
    const [fileexist,setFileexist]=useState(false);
    const [file3,setFile3]=useState(null);



    const  showFile = async (e) => {
        //console.log("ffggfgh")
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => {
            const text = (e.target.result)
            props.lyric(text);
            /*console.log(text)
            alert(text)*/
        };
        reader.readAsText(e.target.files[0])
    }
    const onDrop = useCallback(acceptedFiles =>{


        setFile3(acceptedFiles[0]);
        showFile2(acceptedFiles[0]);
    },[] );
    const showFile2 =  useCallback(e => {
        console.log(e);
        //e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => {
            const text = (e)
            console.log(text.currentTarget.result)
            alert(text.currentTarget.result)
            props.lyric(text.currentTarget.result);
            console.log(props.lyric);
        };
        reader.readAsText(e)
    },[]);


    const {
        getRootProps,
        getInputProps
    } = useDropzone({
        onDrop,
        showFile2,

    });



    return (
    <div style={{marginLeft:'78%'}} >

      <div id="" >
         <div id="">
            <div {...getRootProps()}>
                <input {...getInputProps()} /*onChange={showFile.bind(this)}*/ /*onChange={(e) => showFile(e)}*//>
                {/* <div>Drag and drop your lyrics here.</div> */}
                {/* <a>Browse</a> */}
            </div>


         </div>
         {/* <ul>

                             {file3 ?
                                <li id="lyricsLI"><p>{file3.name}</p> </li>  :null}

               </ul> */}

      </div>



    </div>
    );
}


export default UploadLyrics;
