import $ from 'jquery';
import "latest-createjs";
import "../css/gameview.scss";
export class GameView {
    constructor() {
        this.gameBoy;
        this.correctCount = 0;
    }
    initialize(parentDiv, id, ShellRef) {
        this.buildDom(parentDiv, id,ShellRef);
    }
    buildDom(parentDiv, id, ShellRef) {
        let htmlStr = "";
        const plotIdentifier = parentDiv.substr(1) + "_gameView";
        const boyIdentifier = parentDiv.substr(1) + "_spriteCanvas";
        const answersArray = ShellRef.gameParams.answers;
        const distArray = ShellRef.gameParams.distractorArray;
        const TotalArray = this.shuffle(answersArray.concat(distArray));
        htmlStr += `<div class='gamePlot' id='${plotIdentifier}' data_attr='${plotIdentifier}' >
        <div id='testDiv_1'><canvas width = ' 256' height =' 256' id='${boyIdentifier}'></div>
        <div class='topSection'>
        ${Object.keys(TotalArray).map(function (key) {
        return "<div class='letters' data_attr='letter_" + TotalArray[key] + "'>" + TotalArray[key] + "</div>";}).join("")}
        </div>
        <div class='midSection'>
        </div>
        <div class='bottomSection'>
        ${Object.keys(answersArray).map(function (key) {
        return "<div class='letters_bottom' data_attr='letter_ans_" + answersArray[key] + "'>" + "</div>";}).join("")}
        </div>
        </div>`;
        $(parentDiv).append(htmlStr);
        this.events(plotIdentifier, ShellRef, boyIdentifier);
        this.animateBoy(ShellRef, boyIdentifier);
    }
    events(id, ShellRef, boyIdentifier) {
        let answersArray = ShellRef.gameParams.answers;
        const self = this;
        $("[data_attr=" + id + "]").on("click", function () {
            //alert($(this).attr("data_attr"));
        });
        $("#"+id+" .topSection [data_attr^='letter'").on("click", function(e){
            //alert($(this).attr("data_attr"));
            let selectedLetter = $(this).attr("data_attr").split("letter_")[1];
            if(answersArray.indexOf(selectedLetter)!=-1 && !$(this).hasClass("hide")){
                //alert("correctAnswer");
                self.gameBoy.gotoAndPlay("jump");
                ShellRef.shellController["audioController"].loadAudioPath(ShellRef, ShellRef.correctAudio,ShellRef.audioContainer);
                $(this).addClass("hide");
                var elSet =  document.querySelectorAll("#"+id+" [data_attr^='letter_ans'");
                elSet[self.correctCount].innerHTML=selectedLetter;
                self.correctCount++;
                self.moveBoy(ShellRef, boyIdentifier);
            }else{
                // self.correctCount=0;
                ShellRef.shellController["audioController"].loadAudioPath(ShellRef, ShellRef.wrongAudio,ShellRef.audioContainer);
                // self.reset(ShellRef);
                //alert("wrongAnswer");
            }
            /* self.gameBoy.gotoAndPlay("jump");
            ShellRef.shellController["audioController"].loadAudioPath(ShellRef, ShellRef.clickAuduio,ShellRef.audioContainer); */
        });
    }
    shuffle(array) {
        let tempArray = array.slice();
        var currentIndex = tempArray.length,
            temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = tempArray[currentIndex];
            tempArray[currentIndex] = tempArray[randomIndex];
            tempArray[randomIndex] = temporaryValue;
        }
        return tempArray;
    }

    animateBoy(ShellRef,boyIdentifier) {
        const stage = new createjs.Stage(boyIdentifier);
        const spriteSheet = new createjs.SpriteSheet(ShellRef.boyAnimData);
        const self = this;
        spriteSheet.on("complete", function(event) {
            console.log("Complete", event);
        });
        spriteSheet.on("error", function(event) {
            console.log("Error", event);
        });
        self.gameBoy = new createjs.Sprite(spriteSheet);
        self.gameBoy.x = stage.canvas.width / 2;
        self.gameBoy.y = 22;
        stage.addChild(self.gameBoy);
        self.gameBoy.gotoAndPlay("run");
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.addEventListener("tick", stage);
    }
    reset(ShellRef){
        let targetContainer = ShellRef.targetContainer;
        let mainDiv = ShellRef.attributeDiv.mainDiv;
        this.initialize(targetContainer, mainDiv, ShellRef);
    }
    moveBoy(ShellRef, boyIdentifier){
        //let parent=$("#"+ShellRef.targetContainer+".games #" + boyIdentifier)[0];
        //console.log('parent :', parent);
        //$("#"+ShellRef.targetContainer+".games #testDiv1")[0].animate({left:"+200px"});

    }
}
