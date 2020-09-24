class TitleLayer extends cc.Layer{
    constructor(){
        super();

        let size = cc.winSize;
        let titleLabel = new cc.LabelTTF("Invaderz", 'Pixel', 150);
        titleLabel.setFontFillColor(cc.color(255, 0, 0, 30));
        titleLabel.x = size.width / 2 ;
        titleLabel.y = size.height / 2 + 200;
        this.addChild(titleLabel);
        
        let instructionlabel = new cc.LabelTTF("Match 3 to eliminate invaderz", 'Pixel', 30);
        instructionlabel.setFontFillColor(cc.color(255, 255, 0, 30));
        instructionlabel.x = size.width / 2 ;
        instructionlabel.y = size.height / 2 + 50;
        this.addChild(instructionlabel);
        let instructionlabel2 = new cc.LabelTTF("No possible moves?", 'Pixel', 30);
        instructionlabel2.setFontFillColor(cc.color(0, 255, 0, 30));
        instructionlabel2.x = size.width / 2 ;
        instructionlabel2.y = size.height / 2;
        this.addChild(instructionlabel2);
        let instructionlabel3 = new cc.LabelTTF("don't worry, line them up for a combo", 'Pixel', 30);
        instructionlabel3.setFontFillColor(cc.color(255, 0, 255, 30));
        instructionlabel3.x = size.width / 2 ;
        instructionlabel3.y = size.height / 2 - 50;
        this.addChild(instructionlabel3);
        let instructionlabel4 = new cc.LabelTTF("itz all about speed!", 'Pixel', 30);
        instructionlabel4.setFontFillColor(cc.color(0, 255, 255, 30));
        instructionlabel4.x = size.width / 2 ;
        instructionlabel4.y = size.height / 2 - 100;
        this.addChild(instructionlabel4);

        let startLabel = new cc.LabelTTF("press any key to start", 'Pixel', 30);
        startLabel.x = size.width / 2;
        startLabel.y = size.height / 2 - 200;
        this.addChild(startLabel);

        let toMainScene = new ToMainScene();
        this.addComponent(toMainScene);
    }
}