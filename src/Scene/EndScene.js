class HelloWorldScene2 extends cc.Scene{
    constructor(score){
        super();
        this.score = score;
    }
    onEnter() {
        super.onEnter();
        let gameOverLayer = new GameOverLayer(this.score);
        this.addChild(gameOverLayer)
    }   
}