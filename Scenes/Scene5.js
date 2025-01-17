class Scene5 extends Phaser.Scene{
    constructor(){
        super("Level5");
    }

    preload(){
       this.load.image("money", "assets/img/money.png");
       this.load.image("ClickBonus", "assets/img/clickBonus.png");
       this.load.image('worker', 'assets/img/worker.png');
    }

    create(){
        var h = this.game.config.height;
        var w = this.game.config.width;

        this.cameras.main.setBackgroundColor(0xbababa);

        this.aim = this.add.text(w * 0.2, h * 0.2, "Collect 500 coins!", {font:"30px Arial", fill:"yellow"}).setInteractive();

        this.cost = 10;
        this.costText = this.add.text(w*0.73, h*0.3, `Cost: ${this.cost}`, {font: "20px Arial", fill: "Black"});
        this.costText.visible = false;

        this.money = this.add.image(w * 0.45, h * 0.5, 'money').setInteractive();
        this.clickBonusImg = this.add.image(w * 0.8, h * 0.16, 'ClickBonus').setInteractive();
        this.clickBonusImg.visible = false;

        this.clickBonus = 1;
        this.score = 0; 
        this.scoreText = this.add.text(w * 0.30, h * 0.05, `Score: ${this.score}`, {font: "30px Arial", fill: "Black"});

        this.money.on('pointerdown', function(){
            this.money.setTint(0x808080);
            this.aim.visible = false;
            this.score += this.clickBonus;
            this.scoreText.setText(`Score: ${this.score}`);
        }, this);

        this.money.on('pointerup', function(pointer){
            this.money.clearTint();
        }, this);

        this.clickBonusImg.on('pointerdown', this.addBonus, this);
        

        this.activeWorker = false;
        this.workerCost = 10;
        this.workerBonus = 0;
        //this.firstWorker = this.add.text(w*0.73, h*0.5, `Slava`, {font: "20px Arial", fill: "Black"}).setInteractive();
        this.firstWorker = this.add.image(w*0.80, h*0.55, "worker").setInteractive();
        this.firstWCostText = this.add.text(w*0.73, h*0.65, `Cost: ${this.workerCost}`, {font: "20px Arial", fill: "Black"});
        
        this.firstWorker.on('pointerdown', this.active, this);
        this.firstWorker.on('pointerup', function(){
           this.firstWorker.clearTint();
           this.textNoMoney.visible = false; 
        }, this);

        this.textNoMoney = this.add.text(w * 0.15, h * 0.8, "You need more money!", {font:"30px Arial", fill:"yellow"});
        this.textNoMoney.visible = false;

        this.nextLvl = this.add.text(w * 0.8, h * 0.8, "Next", {font:"30px Arial", fill:"yellow"}).setInteractive();
        this.nextLvl.visible = false;
      
        this.nextLvl.on('pointerdown', this.nextLVL, this);
        
    }

    active(){
        this.firstWorker.setTint(0x808080);
        if(this.score >= this.workerCost){
            this.workerBonus += 1;
            this.score -= this.workerCost;
            this.workerCost *= 3;
            this.activeWorker = true;
            this.firstWCostText.setText(`Cost: ${this.workerCost}`);
        }else{
            this.textNoMoney.visible = true;   
        }
        
        if(this.workerBonus == 1){
            this.time.addEvent({
                delay: 1000,
                callback: this.addWorker.bind(this),
                loop: true
            });
        }
    }

    addWorker(){
        this.score += this.workerBonus;
        this.scoreText.setText(`Score: ${this.score}`);
    }

    update(){
        if(this.score >= this.cost){
            this.clickBonusImg.visible = true;
            this.costText.visible = true;
        }

        if(this.score >= 500){
            this.nextLvl.visible = true;
        }
    }
    
    addBonus(){
        this.score -= this.cost;
        this.scoreText.setText(`Score: ${this.score}`);
        this.clickBonus *= 2;
        this.clickBonusImg.visible = false;
        this.costText.visible = false;
        
        if(this.money.scale < 3){
            this.money.setScale(this.money.scale + 1);
        }
        this.cost *= 3;
        
        this.costText.setText(`Cost:${this.cost}`);
    }

    nextLVL(){
        this.scene.start('Level6');
    }
}
