class GameScene extends cc.Scene{    
    constructor(){
        super();
    }
    onEnter(){
        super.onEnter();
        
        let gameLayer = new GameLayerES6();
        this.addChild(gameLayer);
    }
}