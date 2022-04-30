import React, {Component, useState} from "react";
import './Line.scss';

var jj=true
var txt=[];
export default class KaraokeLyric extends Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.text!==this.props.text){
            jj=false;
            txt=this.props.text.split(" ");

            if(txt.length>8){

                for(let i=0;i<txt.length;i++){
                    console.log(txt[i-1])
                    if(txt[i].length<=4 && txt[i-1]!==undefined){

                        txt[i]=txt[i-1]+" "+txt[i]

                        txt[i-1]="";



                    }
                }
            }
            if(txt.length>13){

                for(let i=0;i<txt.length;i++){
                    console.log(txt[i-1])
                    if(txt[i].length<=8 && txt[i-1]!==undefined){

                        txt[i]=txt[i-1]+" "+txt[i]

                        txt[i-1]="";



                    }
                }
            }

        }else{jj=true}
    }

    render() {
        const { percentage, text } = this.props;
        let { wrapperStyle, fontStyle, activeStyle } = this.props;
        const defaultWrapperStyle = {
            // position: "relative",
            display: "inline-block",

        };



        const defaultFontStyle = {
            position: "absolute",
            whiteSpace: "nowrap",
            fontSize: "30px",
            color: "white",
            textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
            left: 100,
            top: percentage==100 ? 250:percentage==0?350:300,

            //zIndex: 0,
        };

        const defaultActiveStyle = {
            ...defaultFontStyle,
            //position: "absolute",
            /*left: 300,
            top: 300,*/

            color: "blue",
            overflow: "hidden",

            textShadow: "-2px 0 white, 0 2px white, 2px 0 white, 0 -2px white",
            zIndex: 1,
        };

        wrapperStyle = wrapperStyle
            ? {
                ...defaultWrapperStyle,
                ...wrapperStyle
            }
            : defaultWrapperStyle;
        fontStyle = fontStyle
            ? {
                ...defaultFontStyle,
                ...fontStyle
            }
            : defaultFontStyle;
        activeStyle = activeStyle
            ? {
                ...defaultActiveStyle,
                ...activeStyle,
                width: `${percentage}%`
            }
            : {
                ...defaultActiveStyle,

                width: `${percentage}%`
            };

        return (
            <div /*style={wrapperStyle}*/ id="boo">
                {jj ?   <section className="con">
                    <h1 className="tit">
                        {txt.map(x=>  <span >{x}</span>) }

                    </h1>


                </section> :null}
                {/*<div id ="ui" style={fontStyle}>{text}</div>*/}
                {/*<div style={activeStyle}>{text}</div>*/}

            </div>
        );
    }
}