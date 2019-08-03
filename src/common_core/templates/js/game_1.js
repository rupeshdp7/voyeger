/* eslint-disable linebreak-style */
import $ from "jquery";
import "latest-createjs";
import "jplayer";
// import "../../templates/assets/images/."



export class GameStart {
    initialize(ShellRef) {
        console.log('GameStart initialize');
        this.createDomElements(ShellRef);
    }
    createDomElements(ShellRef) {
        var content = "";
        content += "<div class='" + ShellRef.targetContainer + "_content'>";
        //content += "<div class='wrapper " + self.templateData.integration_temp_name + "' id='anim_clk_m'>";
        content += "<canvas id='" + ShellRef.targetContainer + "_testCanvas' width='960' height='450'></canvas>";
        content += "</div>";
        //<img src="src/common_core/templates/assets/images/ground.png" />
        $("#" + ShellRef.targetContainer).append(content);
        this.createGame(ShellRef.targetContainer +"_testCanvas");
    }
    createGame(targetContainer) {
        let stage = new createjs.Stage(targetContainer);
        let loader;
        let canvasWidth;
        let canvasHeight;
        canvasWidth = stage.canvas.width;
        canvasHeight = stage.canvas.height;

        const manifest = [{
            src: "spritesheet_grant.png",
            id: "grant"
        },
        {
            src: "sky.png",
            id: "sky"
        },
        {
            src: "ground.png",
            id: "ground"
        },
        {
            src: "cloud2.png",
            id: "cloud2"
        },
        {
            src: "cloud3.png",
            id: "cloud3"
        },
        {
            src: "cloud4.png",
            id: "cloud4"
        },
        {
            src: "tree1.png",
            id: "tree1"
        },
        {
            src: "tree2.png",
            id: "tree2"
        },
        {
            src: "building2.png",
            id: "building2"
        },
        ];

        loader = new createjs.LoadQueue(false);
        loader.loadManifest(manifest, true, "src/common_core/templates/assets/images/");
        var self = this;
        setTimeout(function () {

            loader.addEventListener("complete", self.handleComplete(stage, loader, canvasWidth, canvasHeight));
        }, 500);
    }
    handleComplete(stage, loader, canvasWidth, canvasHeight) {
        let sky = new createjs.Shape();
        sky.graphics.beginBitmapFill(loader.getResult("sky")).drawRect(0, 0, canvasWidth, canvasHeight);
        //By default swapping between Stage for StageGL will not allow for vector drawing operation such as BitmapFill, useless you cache your shape.
        sky.cache(0, 0, canvasWidth, canvasHeight);

        let groundImg = loader.getResult("ground");
        let ground = new createjs.Shape();
        ground.graphics.beginBitmapFill(groundImg).drawRect(0, 0, canvasWidth + groundImg.width, groundImg.height);
        ground.tileW = groundImg.width;
        ground.y = canvasHeight - groundImg.height;
        //By default swapping between Stage for StageGL will not allow for vector drawing operation such as BitmapFill, useless you cache your shape.
        ground.cache(0, 0, canvasWidth + groundImg.width, groundImg.height);

        let hill = new createjs.Bitmap(loader.getResult("cloud2"));
        hill.setTransform(100, -30, 0.5, 0.5);
        hill.alpha = 0.5;

        let cloud3 = new createjs.Bitmap(loader.getResult("cloud3"));
        cloud3.setTransform(hill.x + 200, -20, 0.2, 0.1);
        cloud3.alpha = 0.5;

        let cloud4 = new createjs.Bitmap(loader.getResult("cloud4"));
        cloud4.setTransform(cloud3.x + 500, -80, 0.2, 0.1);
        cloud4.alpha = 0.5;

        let tree1 = new createjs.Bitmap(loader.getResult("tree1"));
        tree1.setTransform(0, 295, 0.13, 0.13);

        let building2 = new createjs.Bitmap(loader.getResult("building2"));
        building2.setTransform(tree1.x + 200, 165, 0.3, 0.3);

        let tree2 = new createjs.Bitmap(loader.getResult("tree2"));
        tree2.setTransform(building2.x + 400, 200, 0.1, 0.1);

        stage.addChild(sky, hill, cloud3, cloud4, tree1, tree2, building2, ground);

        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.stage = stage;
        createjs.Ticker.sky = sky;
        createjs.Ticker.hill = hill;
        createjs.Ticker.cloud3 = cloud3;
        createjs.Ticker.cloud4 = cloud4;
        createjs.Ticker.tree1 = tree1;
        createjs.Ticker.tree2 = tree2;
        createjs.Ticker.building2 = building2;
        createjs.Ticker.ground = ground;
        createjs.Ticker.w = canvasWidth;
        createjs.Ticker.on("tick", this.tick);
        // createjs.Ticker.addEventListener("tick", stage);
        console.log(createjs + ">>>>>createjs");

    }
    tick(event) {

        var deltaS = event.delta / 1000;
        event.target.ground.x = (event.target.ground.x - deltaS * 100) % event.target.ground.tileW;
        event.target.hill.x = (event.target.hill.x - deltaS * 10);
        if (event.target.hill.x + event.target.hill.image.width * event.target.hill.scaleX <= 0) {
            event.target.hill.x = event.target.w;
        }
        event.target.cloud3.x = (event.target.cloud3.x - deltaS * 12);
        if (event.target.cloud3.x + event.target.cloud3.image.width * event.target.cloud3.scaleX <= 0) {
            event.target.cloud3.x = event.target.w;
        }
        event.target.cloud4.x = (event.target.cloud4.x - deltaS * 15);
        if (event.target.cloud4.x + event.target.cloud4.image.width * event.target.cloud4.scaleX <= 0) {
            event.target.cloud4.x = event.target.w;
        }
        event.target.tree1.x = (event.target.tree1.x - deltaS * 25);
        if (event.target.tree1.x + event.target.tree1.image.width * event.target.tree1.scaleX <= 0) {
            event.target.tree1.x = event.target.w;
        }
        event.target.tree2.x = (event.target.tree2.x - deltaS * 25);
        if (event.target.tree2.x + event.target.tree2.image.width * event.target.tree2.scaleX <= 0) {
            event.target.tree2.x = event.target.w;
        }
        event.target.building2.x = (event.target.building2.x - deltaS * 25);
        if (event.target.building2.x + event.target.building2.image.width * event.target.building2.scaleX <= 0) {
            event.target.building2.x = event.target.w;
        }
        event.target.stage.update(event);
    }
}
