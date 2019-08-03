import $ from 'jquery';
import "../../css/popup.scss";
export class PopupView {
    constructor() {
        this.htmlStr = "";
    }
    initialize(parentDiv, id, ShellRef) {
        this.htmlStr = "";
        this.buildDom(parentDiv, id,  ShellRef);
    }
    buildDom(parentDiv, id, ShellRef){
        const attrName = parentDiv.substr(1) + "_startPopup";
        this.htmlStr += `<div class='startPopup' id='${attrName}' data_attr='${id}'>
            <span class='header' data_attr='header'>Cross over the Bridge</span><br>
            <span>LETTER MATCH-I</span>
            <button class='playBtn' data_attr='playBtn' id="playBtn" >Start Game</button>
        </div>`;
        $(parentDiv).append(this.htmlStr);
        this.events(id, ShellRef);
    }
    events(id,  ShellRef){
        $("[data_attr="+id+"] .playBtn").on("click", function(){
            console.log(ShellRef);
            ShellRef.gameView["GameView"].initialize("#"+ShellRef.targetContainer, id, ShellRef);
            ShellRef.shellController["bgAudioController"].loadAudioPath(ShellRef,ShellRef.bgAudio, ShellRef.bgAudioContainer);
            $("[data_attr="+id+"]").hide();
        });
    }
}