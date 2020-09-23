class GameOverLayer extends cc.Layer{
    constructor(score){
        super();
        var size = cc.winSize;

        var gameOverLabel = new cc.LabelTTF("Game Over!", 'Pixel', 50);
        gameOverLabel.x = size.width / 2;
        gameOverLabel.y = size.height / 2 + 200;
        this.addChild(gameOverLabel);

        var score_label = new cc.LabelTTF("Score: " + score, 'Pixel',50);
        score_label.x = size.width / 2;
        score_label.y = size.height / 2 ;
        this.addChild(score_label);

        var reStartLabel = new cc.LabelTTF("press any key to Restart", 'Pixel', 50);
        reStartLabel.x = size.width / 2;
        reStartLabel.y = size.height / 2 - 200;
        this.addChild(reStartLabel);
        
        let toTitleScene = new ToTitleScene();
        this.addComponent(toTitleScene);
    }
}