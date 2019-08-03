/* eslint-disable linebreak-style */
import {AssetsPreloader} from "../../player/js/controller/assetsPreloader";
import {AudioController} from "../../player/js/controller/audioController";
import {PopupView} from "../../player/js/view/popupView";
import {GameView} from "../../templates/js/gameView";
import PreJS from 'prejs';
export default {
    shellController: {
        "assetsPreloader": new AssetsPreloader(),
        "audioController": new AudioController(),
        "bgAudioController": new AudioController(),
        "preJS": new PreJS(),
        "PopupView" :new PopupView(),
    },
    gameView:{
        "GameView": new GameView()
    },
    Assets : {
        bgAnimation: [
            'src/common_core/templates/assets/images/spritesheet_grant.png',
            'src/common_core/templates/assets/images/sky.png',
            'src/common_core/templates/assets/images/ground.png',
            'src/common_core/templates/assets/images/cloud2.png',
            'src/common_core/templates/assets/images/cloud3.png',
            'src/common_core/templates/assets/images/cloud4.png',
            'src/common_core/templates/assets/images/tree1.png',
            'src/common_core/templates/assets/images/tree2.png',
            'src/common_core/templates/assets/images/building2.png',
            'http://i.imgur.com/g5WtL7v.png',
        ],
        AudioVideo: [
            'src/common_core/templates/assets/audio/streamsound_4.mp3',
            'src/common_core/templates/assets/audio/streamsound_5.mp3',
            'src/common_core/templates/assets/video/1.mp4',
            'src/common_core/templates/assets/video/2.mp4',
            'src/common_core/templates/assets/video/3.mp4',
            'src/common_core/player/assets/audio/correct.mp3',
            'src/common_core/player/assets/audio/wrong.mp3'
        ],
    },
    progressBar:'.progressBar',
    defaultAudio: "src/common_core/player/assets/audio/blank.mp3",
    bgAudio: "src/common_core/player/assets/audio/sfx.mp3",
    correctAudio: 'src/common_core/player/assets/audio/correct.mp3',
    wrongAudio :'src/common_core/player/assets/audio/wrong.mp3',
    targetContainer: "game_1",
    audioContainer: "gameAudio",
    bgAudioContainer: "BgAudio",
    scaleFactor: 1,
    playerMute: false,
    attributeDiv:{
        "mainDiv": "startPopup_1",
    },
    gameParams:{
        "answers":["a","b","c","d","e"],
        "distractorArray":["r","t","y","u"],
    },
    boyAnimData : {
        framerate: 30,
        "images": ["src/common_core/templates/assets/images/spritesheet_grant.png"],
        "frames": {"regX": 82, "height": 292, "count": 64, "regY": 0, "width": 165},
        "animations": {
            "run": [0, 25, "run", 1.5],
            "jump": [41, 63, "run"],
        }
    }
};
