import "jquery";
import "latest-createjs";
export class AnimationController {
  constructor() { }
  initialize() {
    //const control = this;
  }
  createSpriteSheet(data, callback) {
    const control = this;
    control.sprite = [],
      control.stages = [],
      control.spriteSheets = [],

      control.data = data;
    control.callback = callback;
    control.index = null;
    for (var i = 0; i < data.length; i++) {
      control.createMultipleSprite(data[i], i);
    }
  }
  createMultipleSprite(obj, index) {
    const control = this;
    control.obj = obj;
    var canvas = null;
    const { elemId, canvasId, animations } = obj;
    const animationName = Object.getOwnPropertyNames(animations)[0];
    if (obj.reuse != undefined && obj.reuse == true) {
      canvas = `<canvas id=${canvasId} width=${obj.width} height=${obj.height}></canvas>`;
    } else {
      canvas = `<canvas id=${canvasId} width=${obj.frames.width} height=${obj.frames.height}></canvas>`;
    }

    $(`#${elemId}`).append(canvas);
    control.stages[index] = new createjs.Stage(canvasId);
    const stage = control.stages[index];
    control.spriteSheets[index] = new createjs.SpriteSheet(obj);
    control.sprite[index] = new createjs.Sprite(control.spriteSheets[index], animationName);
    const sprite = control.sprite[index];
    sprite.addEventListener("animationend", (e) => {
      control.eventCallback(e, index)
    }, false);
    stage.addChild(sprite);
    createjs.Ticker.addEventListener("tick", stage);
    sprite.stop();
  }
  play(animationName, index) {
    const control = this;
    const { sprite } = control;
    sprite[index].gotoAndPlay(animationName);
  }

  eventCallback(event, index) {
    event.preventDefault();
    event.stopPropagation();
    const control = this;
    control.callback(event.target.currentAnimation, index);
    // event.remove();
  }

  updateFrameRate(fps = 24) {
    createjs.Ticker._setFPS(fps);
  }

  pause(animationName, index) {
    const control = this;
    const { sprite } = control;
    sprite[index].stop();
  }

  resume(animationName, index) {
    const control = this;
    const { sprite } = control;
    sprite[index].play();
  }
  stop(animationName, index) {
    const control = this;
    const { sprite } = control;
    sprite[index].gotoAndStop(animationName);
  }

  goTo(frameNumberOrAnimation, index) {
    const control = this;
    const { sprite } = control;
    sprite[index]._goto(frameNumberOrAnimation);
  }
  goToAndPlay(frameNumberOrAnimation, index) {
    const control = this;
    const { sprite } = control;
    sprite[index].gotoAndPlay(frameNumberOrAnimation);
  }
  goToAndStop(frameNumberOrAnimation, index) {
    const control = this;
    const { sprite } = control;
    sprite[index].gotoAndStop(frameNumberOrAnimation);
  }
  stopAll() {
    const control = this;
    const { data, sprite } = control;
    for (var i = 0; i < data.length; i++) {
      sprite[i].gotoAndStop();
    }
  }
  killAll() {
    const control = this;
    let { stages, spriteSheets, sprite } = control;

    if (stages && stages.length) {
      // DESTROYING ALL ANIMATIONS
      stages.forEach((stage) => {
        if (typeof (stage) != "undefined" && stage != null) {
          stage.removeAllChildren();
          createjs.Ticker.removeAllEventListeners();
          stage.update();
          stage.enableDOMEvents(false);          
          stage.canvas = null;
          control.stage = null;
        }
      });

      control.stages = null;
    }

    if (spriteSheets && spriteSheets.length) {
      // DESTROYING ALL Spritesheet
      spriteSheets.forEach((spriteSheet) => {
        if (typeof (spriteSheet) != "undefined" && spriteSheet != null) {
          spriteSheet = null;
        }
      });

      control.spriteSheets = null;
    }

    if (sprite && sprite.length) {
      // DESTROYING ALL Sprite
      sprite.forEach(sp => {
        sp = null;
      });

      control.sprite = null;
    }
  }
}
