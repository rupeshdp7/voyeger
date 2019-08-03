/* eslint-disable linebreak-style */
import {PlayerResize} from "../../player/js/controller/playerResizer";
import {AudioController} from "../../player/js/controller/audioController";
export default {
    shellController: {
        "playerResize": new PlayerResize(),
        "audioController": new AudioController(),
    },
    defaultAduio: "src/common_core/player/assets/audio/blank.mp3",
    introAudio: "src/common_core/templates/assets/audio/streamsound_5.mp3",
    targetContainer: "game_2",
    scaleFactor: 1,
    playerMute: false,
};
