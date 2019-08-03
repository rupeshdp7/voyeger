/* eslint-disable linebreak-style */
import $ from 'jquery';
export class AssetsPreloader {
    constructor() {
        this.ctxL = document.getElementById('assetPreloaderAnim').getContext('2d'); 
        this.diffL = '';
        this.startL = 4.72;
        this.cwL = this.ctxL.canvas.width;
        this.chL = this.ctxL.canvas.height;
    }
    initialize(ShellRef) {
        console.log('Preloader Initialized');
        const self = this;
        ShellRef.progressBar = document.querySelector('.progress');
       
        ShellRef.shellController["preJS"].on('start', () => {
            console.log('Starting');
        });
        ShellRef.shellController["preJS"].on('complete', (e) => {
            console.log(e,'complete');
            $("#assetPreloader").hide();
            ShellRef.shellController["audioController"].initialize(ShellRef,ShellRef.audioContainer);
            ShellRef.shellController["bgAudioController"].initialize(ShellRef,ShellRef.bgAudioContainer);
            ShellRef.shellController["PopupView"].initialize("#"+ShellRef.targetContainer, ShellRef.attributeDiv.mainDiv, ShellRef);
        });
           
        ShellRef.shellController["preJS"].on('progress', progress => {
            self.createLoaderAnim(Math.round(progress * 100))

        });
        
        ShellRef.shellController["preJS"].load(ShellRef.Assets.bgAnimation);
    }
    preload (ShellRef) {
        ShellRef.progressBar.style.width ='0%';   
        ShellRef.shellController["preJS"].load(ShellRef.Assets.AudioVideo);
        
    }

    createLoaderAnim(percent){
        this.diffL = ((percent / 100) * Math.PI*2*10).toFixed(2);
        this.ctxL.clearRect(0, 0, this.cwL, this.chL);
        this.ctxL.lineWidth = 17;
        this.ctxL.fillStyle = '#00a88e';
        this.ctxL.strokeStyle = "#00a88e";
        this.ctxL.textAlign = "center";
        this.ctxL.font="28px Gotham-Light";
        this.ctxL.fillText(percent+'%', this.cwL*.45, this.chL*.5, this.cwL+12);
        this.ctxL.beginPath();
        this.ctxL.arc(90, 90, 50, this.startL, this.diffL/10+this.startL, false);
        this.ctxL.stroke();
    }

}