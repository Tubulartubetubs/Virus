class GameLayerES6 extends cc.Layer{
    constructor(){
        super();

        this.preX = -1;
        this.preY = -1;

        this.matchReq = 3;
        this.platform = 8;
        this.tileSize = 60;
        this.score = 0;
        this.time_left = 120;

        this.tileArray = [];
        this.tileTypes = 6;

        this.size = cc.winSize;
        this.xPosition = this.size.width/2 - this.tileSize*this.platform/2;
        this.yPosition = this.size.height/2 - this.tileSize*this.platform/2;

        //etc
        this.history = [];
        this.matchH = [];
        this.matchV = [];
        this.results = [];
        this.collisions = [];

        //space, where the foods at 
        this.space = cc.Layer.create();
        this.space.setPosition(this.xPosition, this.yPosition);
        this.addChild(this.space);
        
        //for tiles
        for(var i = 0; i < this.platform; i ++){
            this.tileArray[i] = [];
            for(var j = 0;j < this.platform; j ++){
                this.addTile(i, j);
            }
        }
        for(var i=0; i<this.platform; i++){
            this.collisions.push({
                row: 0,
                col: i,
                val: this.tileArray[0][i].val
            });
        }
        //for tiles

        //labels
        this.score_label = new cc.LabelTTF("Score: "+ this.score, "Arial", 50);
        this.score_label.x = this.size.width/4;
        this.score_label.y = this.size.height/2 + 200;
        this.space.addChild(this.score_label, 1);;
        this.time_left_label = new cc.LabelTTF("Time: "+ this.time_left, "Arial", 50);
        this.time_left_label.x = this.size.width/4;
        this.time_left_label.y = 0 - this.size.height/10;
        this.space.addChild(this.time_left_label, 1);;
        //labels

        this.scheduleUpdate();
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseUp: this.onMouseUp,
            onMouseDown: this.onMouseDown
        },this);

    }

    addTile(row, col){ //just adds tiles
        var tSize = this.tileSize;
        var randomTile = Math.floor(Math.random() * this.tileTypes);
        var sprite = null;

        switch(randomTile){
                case 0:
                    sprite = cc.Sprite.create(res.c1_png);
                    break;
                case 1:
                    sprite = cc.Sprite.create(res.c2_png);
                    break;
                case 2:
                    sprite = cc.Sprite.create(res.c3_png);
                    break;
                case 3:
                    sprite = cc.Sprite.create(res.c4_png);
                    break;
                case 4:
                    sprite = cc.Sprite.create(res.c5_png);
                    break;
                case 5:
                    sprite = cc.Sprite.create(res.c6_png);
                    break;
            }
        
        sprite.val = randomTile;
        sprite.power = 0;
        sprite.picked = false;
        sprite.setScale(0.55);
        this.space.addChild(sprite,1);
        sprite.setPosition(col*tSize+tSize/2,row*tSize+tSize/2);
        this.tileArray[row][col] = sprite;
    }

    onMouseUp(event){ //gets the one the initial will switch with

        var sprite = null;

        var x = Math.floor((event.getLocationX() - this._node.xPosition)/this._node.tileSize);
        var y = Math.floor((event.getLocationY() - this._node.yPosition)/this._node.tileSize);

        //these are just to make sure na x and y of switch will stay +1 of initial
        if(x > this._node.preX){ 
            x = this._node.preX+1;
            y = this._node.preY;
        } else if(x < this._node.preX){
            x = this._node.preX-1;
            y = this._node.preY;
        } else if(y > this._node.preY){
            x = this._node.preX;
            y = this._node.preY+1;
        } else if(y < this._node.preY){
            x = this._node.preX;
            y = this._node.preY-1;
        }
        if(x == this._node.preX && y == this._node.preY){
            //do nothing
        }else {
            //bascially remove then switch places initial first
            var prevFood = this._node.tileArray[this._node.preY][this._node.preX];
            var postFood = this._node.tileArray[y][x];

            this._node.space.removeChild(this._node.tileArray[this._node.preY][this._node.preX]);
            this._node.space.removeChild(this._node.tileArray[y][x]);

            this._node.tileArray[this._node.preY][this._node.preX] = null;
            this._node.tileArray[y][x] = null;
            
            switch(postFood.val){
                case 0:
                    sprite = cc.Sprite.create(res.c1_png);
                    break;
                case 1:
                    sprite = cc.Sprite.create(res.c2_png);
                    break;
                case 2:
                    sprite = cc.Sprite.create(res.c3_png);
                    break;
                case 3:
                    sprite = cc.Sprite.create(res.c4_png);
                    break;
                case 4:
                    sprite = cc.Sprite.create(res.c5_png);
                    break;
                case 5:
                    sprite = cc.Sprite.create(res.c6_png);
                    break;
            }
            sprite.val = postFood.val;
            sprite.power = 0;
            sprite.picked = false;
            sprite.setScale(0.55);
            this._node.space.addChild(sprite,1);
            sprite.setPosition(this._node.preX*60+60/2, this._node.preY*60+60/2);
            this._node.tileArray[this._node.preY][this._node.preX] = sprite;
            //bascially remove then switch places after initial
            switch(prevFood.val){
                case 0:
                    sprite = cc.Sprite.create(res.c1_png);
                    break;
                case 1:
                    sprite = cc.Sprite.create(res.c2_png);
                    break;
                case 2:
                    sprite = cc.Sprite.create(res.c3_png);
                    break;
                case 3:
                    sprite = cc.Sprite.create(res.c4_png);
                    break;
                case 4:
                    sprite = cc.Sprite.create(res.c5_png);
                    break;
                case 5:
                    sprite = cc.Sprite.create(res.c6_png);
                    break;
            }
            sprite.val = prevFood.val;
            sprite.power = 0;
            sprite.picked = false;
            sprite.setScale(0.55);
            this._node.space.addChild(sprite,1);
            sprite.setPosition(x*60+60/2, y*60+60/2);
            this._node.tileArray[y][x] = sprite;
        }
    }

    onMouseDown(event){ //gets initial tile to switch with
        var x = Math.floor((event.getLocationX() - this._node.xPosition)/this._node.tileSize);
        var y = Math.floor((event.getLocationY() - this._node.yPosition)/this._node.tileSize);
        this._node.preX = x;
        this._node.preY = y;
    }

    anyare(){ //just checks if tha matched na nakita is valid tapos lalagay sa results
        if(this.matchH.length >= this.matchReq && this.matchV.length >= this.matchReq){
            for(var i=0; i<this.matchH.length; i++){
                this.results.push(this.matchH[i]);
            }

            for(var i=1; i<this.matchV.length; i++){
                this.results.push(this.matchV[i]);
            }
        }

        else if(this.matchH.length >= this.matchReq){
            for(var i=0; i<this.matchH.length; i++){
                this.results.push(this.matchH[i]);
            }
        }

        else if(this.matchV.length >= this.matchReq){
            for(var i=0; i<this.matchV.length; i++){
                this.results.push(this.matchV[i]);
            }
        }
        return 0;
    }

    searcher(cRow, cCol){ //searches possible matches made already
        this.matchH = [];
        this.matchV = [];

        this.matchH.push({
            row: cRow,
            col: cCol,
            val: this.tileArray[cRow][cCol].val
        });
        //horizontal checks (col)
        for(var i=-1; (cCol+i<this.platform && cCol+i>=0) && this.tileArray[cRow][cCol+i].val == this.tileArray[cRow][cCol].val; i--){
            this.matchH.push({
                row: cRow,
                col: cCol+i,
                val: this.tileArray[cRow][cCol+i].val
            });
        }

        for(var i=1; (cCol+i<this.platform && cCol+i>=0) && this.tileArray[cRow][cCol+i].val == this.tileArray[cRow][cCol].val; i++){
            this.matchH.push({
                row: cRow,
                col: cCol+i,
                val: this.tileArray[cRow][cCol+i].val
            });
        }

        this.matchV.push({
            row: cRow,
            col: cCol,
            val: this.tileArray[cRow][cCol].val
        });
        //vertical checks (row)
        for(var i=1; (cRow+i<this.platform && cRow+i>=0) && this.tileArray[cRow+i][cCol].val == this.tileArray[cRow][cCol].val; i++){
            this.matchV.push({
                row: cRow+i,
                col: cCol,
                val: this.tileArray[cRow+i][cCol].val
            });
        }
        for(var i=-1; (cRow+i<this.platform && cRow+i>=0) && this.tileArray[cRow+i][cCol].val == this.tileArray[cRow][cCol].val; i--){
            this.matchV.push({
                row: cRow+i,
                col: cCol,
                val: this.tileArray[cRow+i][cCol].val
            });
        }
        return 0;
    }

    fallTile(row, col, height){ //generation lang na ihuhulog na tiles from the top
        var sprite = null;
        var randomTile = Math.floor(Math.random() * this.tileTypes);
        switch(randomTile){
            case 0:
                sprite = cc.Sprite.create(res.c1_png);
                break;
            case 1:
                sprite = cc.Sprite.create(res.c2_png);
                break;
            case 2:
                sprite = cc.Sprite.create(res.c3_png);
                break;
            case 3:
                sprite = cc.Sprite.create(res.c4_png);
                break;
            case 4:
                sprite = cc.Sprite.create(res.c5_png);
                break;
            case 5:
                sprite = cc.Sprite.create(res.c6_png);
                break;
        }

        sprite.val = randomTile;
        sprite.power = 0;
        sprite.picked = false;
        sprite.setScale(0.55);
        this.space.addChild(sprite,0);
        sprite.setPosition(col*60+60/2,(this.platform + height) *60);
        var moveAction = cc.MoveTo.create(0, new cc.Point(col * 60+60/2, row * 60+60/2));
        sprite.runAction(moveAction);
        this.tileArray[row][col] = sprite;

        return 0;
    }

    deleteMatchTile(){ //deletion lang ng tiles
        for(var i=0; i<this.results.length; i++){
            this.space.removeChild(this.tileArray[this.results[i].row][this.results[i].col]);
            this.tileArray[this.results[i].row][this.results[i].col]=null;
        }

        if(this.results.length >= 3){
            this.score += this.results.length*33; 
            this.score_label.setString("Score: "+ (this.score));
        }

        for(var i = 1; i < this.platform; i ++){
            for(var j = 0; j < this.platform; j ++){
                if(this.tileArray[i][j] != null){
                    var holesBelow = 0;
                    for(var k = i - 1; k >= 0; k --){
                        if(this.tileArray[k][j] == null){
                            holesBelow++;
                        }
                    }
                    if(holesBelow>0){
                        var moveAction = cc.MoveTo.create(0, new cc.Point(this.tileArray[i][j].x,this.tileArray[i][j].y-holesBelow*60));
                        this.tileArray[i][j].runAction(moveAction);
                        this.tileArray[i - holesBelow][j] = this.tileArray[i][j];
                        this.tileArray[i][j] = null;
                    }
                }
            }
        }
        return 0;
    }

    fallTileCreate(){ //gets tiles na wala laman ganern para malagyan at mahulugan
        for(var i = 0; i < this.platform; i ++){
            for(var j = this.platform-1; j>=0; j --){
                if(this.tileArray[j][i] != null){
                    break;
                }
            }
            var miss = this.platform-1-j;
            if(miss>0){
                for(var k = 0; k < miss; k++){
                    if(this.tileArray[this.platform-k-1][i] == null){
                    this.fallTile(this.platform-k-1, i, miss-k);   
                    }
                }
            }
        }
        return 0;
    }

    checkCollision(){ //checks lang positioning ng mga tiles and if may combinations made especially pag nag switch
        this.results = [];
        for(var i=0; i<this.collisions.length; i++){
            for(var j=this.collisions[i].row; j<this.platform; j++){
                this.matchH = [];
                this.matchV = [];
                this.searcher(j, this.collisions[i].col);
                this.anyare();
            }
        }
        if(this.results.length>=this.matchReq){
            return true;
        }
        return false;
    }

    update(dt){
        this.time_left -= dt;
        this.time_left_label.setString("Time: " + this.time_left.toFixed(2));
        if(this.time_left <= 0 ){
            //end game here
            cc.eventManager.removeAllListeners();
            var scene = new HelloWorldScene2(this.score);
            cc.director.pushScene(scene);
        }
        if(this.checkCollision()){
            this.deleteMatchTile();
            this.fallTileCreate();
            setTimeout(function(){
                return 0;
            }, 500);
        }
        return 0;
    }
}