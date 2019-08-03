import $ from 'jquery';
import "../../css/gameview.scss";
export class GameView {
    constructor() {
        this.htmlStr = "";
        this.correctCount = 0;
    }
    initialize(parentDiv, id, ShellRef) {
        this.htmlStr = "";
        this.buildDom(parentDiv, id,ShellRef);
    }
    buildDom(parentDiv, id, ShellRef) {
        const attrName = parentDiv.substr(1) + "_gameView";
        let answersArray = ShellRef.gameParams.answers;
        let distArray = ShellRef.gameParams.distractorArray;
        let TotalArray = this.shuffle(answersArray.concat(distArray));
        this.htmlStr += `<div class='gamePlot' id='${attrName}' data_attr='${attrName}' >
        <div class='topSection'>
        ${Object.keys(TotalArray).map(function (key) {
        return "<div class='letters' data_attr='letter_" + TotalArray[key] + "'>" + TotalArray[key] + "</div>";}).join("")}
        </div>
        <div class='midSection'>
            <div data_attr='${ShellRef.gameParams.objectName}'></div>
        </div>
        <div class='bottomSection'>
        ${Object.keys(answersArray).map(function (key) {
            return "<div class='letters' data_attr='letter_ans_" + answersArray[key] + "'>" + "</div>";}).join("")}
        </div>
        </div>`;
        $(parentDiv).append(this.htmlStr);
        this.events(attrName, ShellRef);
    }
    events(id, ShellRef) {
        var self = this;
        let answersArray = ShellRef.gameParams.answers;
        $("#"+id+" .topSection [data_attr^='letter'").on("click", function(e){
            let selectedLetter = $(this).attr("data_attr").split("letter_")[1];
            if(answersArray.indexOf(selectedLetter)!=-1){
                alert("correctAnswer");
                self.correctCount++;
                $("#"+id+ " .midSection [data_attr='"+ShellRef.gameParams.objectName+"']").animate({left:"+=50"}, 2000);
            }else{
                alert("wrongAnswer");
                self.correctCount=0;
            }
        });
    }
    shuffle(array) {
        let tempArray = array.slice();
        var currentIndex = tempArray.length,
            temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = tempArray[currentIndex];
            tempArray[currentIndex] = tempArray[randomIndex];
            tempArray[randomIndex] = temporaryValue;
        }
        return tempArray;
    }
}
