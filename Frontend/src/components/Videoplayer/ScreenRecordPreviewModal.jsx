import React from 'react';
import { Modal, ModalBody, ModalHeader, Button, Row } from 'reactstrap';
import RecordRTC from 'recordrtc';
import axios from 'axios';


import './ScreenRecordPreviewModal.scss';

var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export default class ScreenRecordPreviewModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
        }
    }
    // Download option for screen record
    downloadScreenRecordVideo = () => {
        let recorderBlob = this.props.recorder;
        if (!recorderBlob) {
            return;
        }
        if (isSafari) {
            if (recorderBlob && recorderBlob.getDataURL) {
                recorderBlob.getDataURL(function (dataURL) {
                    RecordRTC.SaveToDisk(dataURL, this.getfileName('mp4'));
                });
                return;
            }
        }
        if (recorderBlob) {
            var blob = recorderBlob;
            var file = new File([blob], this.getfileName('mp4'), {
                type: 'video/mp4'
            });
            RecordRTC.invokeSaveAsDialog(file);

        }
    };
    // Get file name
    getfileName = (fileExtension) => {
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth();
        var date = d.getDate();
        return 'karaoke' + year + month + date + '.' + fileExtension;
    }
    // Get random string for file name
    getRandomString = () => {
        if (window.crypto && window.crypto.getRandomValues && navigator.userAgent.indexOf('Safari') === -1) {
            var a = window.crypto.getRandomValues(new Uint32Array(3)),
                token = '';
            for (var i = 0, l = a.length; i < l; i++) {
                token += a[i].toString(36);
            }
            return token;
        } else {
            return (Math.random() * new Date().getTime()).toString(36).replace(/\./g, '');
        }
    }
    dismiss(){

    }


    render() {

        var element = document.getElementById("DownloadButtonT");



        if(element!==null) {
            element.addEventListener("click", (event) => {
                element.classList.add("loading");
                setTimeout(function () {
                    element.classList.remove("loading")
                }, 8000);

            })
        }
        var element2 = document.getElementById("DeleteButtonT");



        if(element2!==null) {
            element2.addEventListener("click", (event) => {
                element2.classList.add("loading");
                setTimeout(function () {
                    element2.classList.remove("loading");

                }, 8000);

            })
        }
        var element3 = document.getElementById("SaveButtonT");



        if(element3!==null) {
            element3.addEventListener("click", (event) => {
                element3.classList.add("loading");
                setTimeout(function () {
                    element3.classList.remove("loading");

                }, 8000);

            })
        }
        const onSub = (e) => {






           /* axios.get(`//localhost:5000/api/auth/check`)
                .then((response) => {
                    console.log(response.data);
                    console.log("response");
                })
                .catch((e) => {
                    console.log(e);
                    console.log("response");
                });
*/
        }
        const onSubmit = async () => {
            let userId;
            await axios.post(`//localhost:5000/api/auth/login`, {
                "email": "teymourdridiwars@gmail.com",
                "password": "21071995TeY"
            })
                .then((response) => {
                    userId = response.data.user._id;
                    console.log(userId);

                })
                .catch((e) => {
                    console.log(e);

                });
            console.log(userId);

            let recorderBlob = this.props.recorder;
            var blob = recorderBlob;


            const data = new FormData();

            var file = new File([blob], this.getfileName('mp4'), {
                type: 'video/mp4'
            });
            data.append('file', file);

            const urlUpload = '//localhost:5000/api/Karaoke/upload/' + userId +'/'+this.props.score


            axios.post(urlUpload, data)
                .then((response) => {

                })
                .catch((e) => {

                })
        };

        return (
            <div hidden={!this.props.isOpenVideoModal} style={{marginTop:'-70%',marginLeft:'-37%'}} >
                <div className="video__modal__header" hidden={!this.props.videoModalClose} >

                    < span className="bold-text">Preview </span >
                </div>
                <div>

                    <video id="videorecord"
                            controls
                        // controlsList="nodownload"
                            autoPlay={this.state.isLoaded}
                            playsInline

                            width={'25%'} height={'20%'}
                            src={this.props.recordedVideoUrl} />
                </div>

                <Row className='downloadButtonAlign' >

                   <div id="bod" >
                       <a id="DownloadButtonT" className="btn" onClick={this.downloadScreenRecordVideo} ><b>Download</b><div></div></a>
                    <a id="DeleteButtonT"  className="btn" type="button"
                            onClick={this.props.videoModalClose} ><b>Delete</b><div></div></a>

                           <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                        <defs>
                            <filter id="goo">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur"/>
                                <feColorMatrix in="blur" mode="matrix"
                                               values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo"/>
                                <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
                            </filter>
                        </defs>
                    </svg>
                    <svg className="svg" viewBox="0 0 400 400">
                        <defs>
                            <filter id="duotone-filter-post-one">
                                <feColorMatrix type="matrix"
                                               values="0.14453125 0 0 0 0.33203125 0.71875 0 0 0 0.27734375 -0.34765625 0 0 0 0.73046875 0 0 0 1 0"></feColorMatrix>
                            </filter>
                        </defs>
                    </svg>
                   </div>

                    <div id="bod" >

                       <a style={{marginLeft:'10%'}} id="SaveButtonT" className="btn" type="button" onClick={(e)=> onSubmit(e)}><b>Save</b><div></div></a>

                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                        <defs>
                            <filter id="goo">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur"/>
                                <feColorMatrix in="blur" mode="matrix"
                                               values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo"/>
                                <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
                            </filter>
                        </defs>
                    </svg>
                    <svg className="svg" viewBox="0 0 400 400">
                        <defs>
                            <filter id="duotone-filter-post-one">
                                <feColorMatrix type="matrix"
                                               values="0.14453125 0 0 0 0.33203125 0.71875 0 0 0 0.27734375 -0.34765625 0 0 0 0.73046875 0 0 0 1 0"></feColorMatrix>
                            </filter>
                        </defs>
                    </svg>
                   </div>






                </Row>
            </div>
        )
    }
}