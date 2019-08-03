/* eslint-disable linebreak-style */
import player_config_1 from "../player/data/player_config_1";
//import player_config_2 from "../player/data/player_config_2";
import {PlayerWrapper} from "../player/playerWrapper";
import {PlayerResize} from "../player/js/controller/playerResizer";
export const myPlayer_1 = new PlayerWrapper();
//export const myPlayer_2 = new PlayerWrapper();
export const playerResize = new PlayerResize();
myPlayer_1.initialize(player_config_1);
//myPlayer_2.initialize(player_config_2);
playerResize.initialize();