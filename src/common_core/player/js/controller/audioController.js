/* eslint-disable linebreak-style */
import $ from 'jquery';
import 'jplayer';
let audioHolder;
export class AudioController {
    constructor() {
  
    }
    initialize(ShellRef,whichContainer) {
        $("#"+ShellRef.targetContainer).append("<div id='"+whichContainer+"'></div>");
        audioHolder=whichContainer;
        this.createAudioPlayer(ShellRef,audioHolder);
    }
    createAudioPlayer(ShellRef,audioHolder) {
        $('#'+ShellRef.targetContainer+' #'+audioHolder).jPlayer({
            errorAlerts: false,
            muted: false,
            ready() {
                $("#"+ShellRef.targetContainer+' #'+audioHolder).jPlayer('setMedia', {
                    mp3: ShellRef.defaultAudio,
                }).jPlayer('play');
            },
            solution: 'html',
            supplied: 'mp3',
            timeupdate() {
   
            },
            loadedmetadata() {
                console.log("loadedmetadata");
            },
            play() {
               
            },
            pause() {
            },
            ended() {
              
            },
        });
        
    }
    loadAudioPath(ShellRef, path, audioHolder) {
        $("#"+ShellRef.targetContainer+' #'+audioHolder).jPlayer('setMedia', { mp3: path }).jPlayer('play');
    }
    stopAudio(ShellRef) {
        $("#"+ShellRef.targetContainer+' #'+audioHolder).jPlayer('stop');
    }
    playAudio(ShellRef) {
        $("#"+ShellRef.targetContainer+' #'+audioHolder).jPlayer('play');
    }
}