/* eslint-disable linebreak-style */
import "../player/css/style.css";

export class PlayerWrapper {
    constructor() {
  
    }
    initialize(ShellRef) {
        console.log(ShellRef,'-----ShellRef-----');
        this.createDom(ShellRef);
       
    }
    createDom(ShellRef) {
        const gameDom = document.createElement("div");
        gameDom.setAttribute('class', 'games');
        gameDom.setAttribute('id', ShellRef.targetContainer);
        const targetContainer = document.getElementById("wrapper");
        targetContainer.appendChild(gameDom);
        ShellRef.shellController["assetsPreloader"].initialize(ShellRef);

    }
   
}