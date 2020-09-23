class TitleLayer extends cc.Layer{
    constructor(){
        super();

        let size = cc.winSize;
        let titleLabel = new cc.LabelTTF("Break the Game", 'Pixel', 50);
        titleLabel.x = size.width / 2 ;
        titleLabel.y = size.height / 2 + 100;
        this.addChild(titleLabel);

        let startLabel = new cc.LabelTTF("press any key to start", 'Pixel', 50);
        startLabel.x = size.width / 2;
        startLabel.y = size.height / 2 -100;
        this.addChild(startLabel);

        let toMainScene = new ToMainScene();
        this.addComponent(toMainScene);
    }
}