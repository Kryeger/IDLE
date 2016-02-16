(function (window, $) { //FUNC Ver. 3
    
    "use strict";
    
    //VARIABLES
    
        //VARIABLES//MAIN
    
    var gold = 0;
    
    var clickCount = 0;
    var upgrade1 = 0; //count of up1 
    var upgrade2 = 0;

    var up1Price = 5;
    var up1PriceFactor = 1;
    var up2Price = 5;
    
    var i, j, k, x;

    var unseenItems = 0;
    
    
        //VARIABLES//INVENTORY
    
    var invCount = 0; //items in inv atm

    var inventory = [];
    
    var itemNameGen = ['Broken', 'Broken', 'Broken', 'Broken', 'Broken', 'Broken', 'Broken', 'Broken', 'Broken', 'Old', 'Old', 'Old', 'Old', 'Old', 'Old', 'Old', 'Old', 'Tattered', 'Tattered', 'Tattered', 'Tattered', 'Tattered', 'Tattered', 'Tattered', 'Cheap', 'Cheap', 'Cheap', 'Cheap', 'Cheap', 'Cheap', 'New', 'New', 'New', 'New', 'New', 'Well Made', 'Well Made', 'Well Made', 'Rare', 'Rare', 'Legendary']; //use index to decide quality
    var types = ['Sword', 'Axe', 'Spear', 'Bow', 'Helmet', 'Boots', 'Pants', 'Armor'];
    var slots = ['headItem', 'lefthandItem', 'righthandItem', 'chestItem', 'legsItem', 'bootItem'];
    var cheapQ = ['Broken', 'Old', 'Tattered', 'Cheap'];
    var normalQ = ['New', 'Well Made'];
    var highQ = ['Rare', 'Legendary'];
    var page = 0;
    
    var TYPE;
    var selectedItem;

    var equipLeft = 0;
    var equipRight = 0;
    
    var selectedPage = 0;
    
        //VARIABLES//HEROSYS
    
    var heroCount = 0; //first hero id = 0

    var hero = [];
    
    var selectedHero;
    
    var heroNames = [];
        
        //VARIABLES//CRAFTING
    
    var iron = 0;
    var steel = 0;
    var jewels = 0;
    var wood = 0;
    
    var miner = [];
    var minerCount = 0;
    
    var craftType;
    var craftQuality;
    
    var craftFailed;
    
    var craftGoldPrice, craftWoodPrice, craftIronPrice, craftSteelPrice, craftJewelsPrice;
    var qualityFactor;
    var qualityName;
    
        //VARIABLES//MAP
    
    var map = [];
	var mapSize = 64;
    for (i = 0; i <= mapSize + 1; i ++) {
        map[i] = [];
    }
    
    var lastMapPosX, lastMapPosY;
    
    var mapOpen = 0; //checks if the map is open
       
	var mapScrollSpeed = 5;
	
		//VARIABLES//COMBAT
    
	var enemy = [];
	var enemyCount = 0;
	var playerPwr = 0;
	var enemyPwr = 0;
	var enemyFat = 0;
	var inCombat = 1;
	var attackTurn;
	var time_ = 100000;
	
		//VARIABLES//SAVESYS
	
	var saveInterval = 15000;
	
    //FUNCTIONS
    
function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    var factor = getRandomInt(1, 5);
    
function maybe() {
        var x = getRandomInt(0, 1);
        return x;
    }
    
    /*function myCallback() {
    if(upgrade2 == 1){
         clickCount = clickCount + 1;
         addHelp= addHelp + 1;
         $(".clickz").text(clickCount);
    }
}*/
    
        //FUNCTIONS//MAIN

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}	
	
function refreshPrices(){
    if(gold >= up1Price){
            $("#buyu1").text("Buy");
         }
        else{
            $("#buyu1").text("No Funds");
         }
    
    if(gold >= up2Price){
            $("#buyu2").text("Buy");
         }
        else{
            $("#buyu2").text("No Funds");
         }
}    
    
        //FUNCTIONS//INVENTORY
    
function drawItem(i, pos){ //i - itemID; pos - positions
    $(".invItem.pos" + pos).text(inventory[i].name + "\n" + inventory[i].expItem + " | " + inventory[i].goldItem + "\n" + inventory[i].requiredLevel).toggleClass("item_" + inventory[i].image);
    $(".invItem.pos" + pos).attr("id", i);
}

function drawEmpty(pos){
    $(".invItem.".concat("pos", pos)).text("");
}

function drawInvPage(x){
    $(".curpag").text(x + 1);
    var firstPos = x * 36;
    var lastPos = ((x + 1) * 36); //last pos of the x page
    for(i = firstPos ; i < lastPos; i++){
        drawItem(i + 2, i - (x * 36));
        for (j = (i - ((x * 36) - 1)) + 1; j < lastPos; j++){
            drawEmpty(j);
        }
    }
}
    
function selectType(TYPE_) {
    if (TYPE_ == "Sword" || TYPE_ == "Axe" || TYPE_ == "Spear" || TYPE_ == "Bow"){
        return 1;
    }
    if(TYPE_ == "Helmet"){
        return 0;
    }
    if(TYPE_ == "Armor"){
        return 3;
    }
    if(TYPE_ == "Pants"){
        return 4;
    }
    if(TYPE_ == "Boots"){
        return 5;
    }
}
    
function selectHand() {
    if(equipLeft){return 1;}
    if(equipRight){return 2;}
}

function addRandomItemToInv(rarity_){
    var TYPE = types[Math.floor(Math.random() * types.length)];
    var ADDTYPE = itemNameGen[Math.floor(Math.random() * itemNameGen.length)];
    var item_slot;
    
    item_slot = selectType(TYPE);
    
    addItemToInv(ADDTYPE + ' ' + TYPE, "", TYPE + "_1", Math.floor(((itemNameGen.indexOf(ADDTYPE) + 1) * (Math.random() + 1) * (hero[selectedHero].level + hero[selectedHero].expBonus))/2), Math.floor(((itemNameGen.indexOf(ADDTYPE) + 1) * (Math.random()+1) * (hero[selectedHero].level + hero[selectedHero].goldBonus))/3), item_slot, hero[selectedHero].level);
}  
    
function addItemToInv(name_, type_, image_, expItem_, goldItem_, slot_, requiredLevel_){
    inventory[invCount] = 
        {
        name : name_,
        type : type_,
        image : image_,
        equiped : 0,
        expItem : expItem_,
        goldItem : goldItem_,
        equiped : "X", //which hero is equipped with it; "X" for NoOne
        slot : slot_,
        requiredLevel : requiredLevel_   
    };
    invCount ++;
}

function refreshInv(){
    $(".invItemWrap").empty();
    $(".invItemWrap").append('<div id = "x" class="invItem pos0"></div><div id = "x" class="invItem pos1"></div><div id = "x" class="invItem pos2"></div><div id = "x" class="invItem pos3"></div><div id = "x" class="invItem pos4"></div><div id = "x" class="invItem pos5"></div><div id = "x" class="invItem pos6"></div><div id = "x" class="invItem pos7"></div><div id = "x" class="invItem pos8"></div><div id = "x" class="invItem pos9"></div><div id = "x" class="invItem pos10"></div><div id = "x" class="invItem pos11"></div><div id = "x" class="invItem pos12"></div><div id = "x" class="invItem pos13"></div><div id = "x" class="invItem pos14"></div><div id = "x" class="invItem pos15"></div><div id = "x" class="invItem pos16"></div><div id = "x" class="invItem pos17"></div><div id = "x" class="invItem pos18"></div><div id = "x" class="invItem pos19"></div><div id = "x" class="invItem pos20"></div><div id = "x" class="invItem pos21"></div><div id = "x" class="invItem pos22"></div><div id = "x" class="invItem pos23"></div><div id = "x" class="invItem pos24"></div><div id = "x" class="invItem pos25"></div><div id = "x" class="invItem pos26"></div><div id = "x" class="invItem pos27"></div><div id = "x" class="invItem pos28"></div><div id = "x" class="invItem pos29"></div><div id = "x" class="invItem pos30"></div><div id = "x" class="invItem pos31"></div><div id = "x" class="invItem pos32"></div><div id = "x" class="invItem pos33"></div><div id = "x" class="invItem pos34"></div><div id = "x" class="invItem pos35"></div>');
    }
    
function refreshEq(){
    $(".eqp").empty();
    $(".eqp").append('<center><div id = "eqidlh" class="eqlh leftH item_' + hero[selectedHero].lefthandItem.image + '"> ' + hero[selectedHero].lefthandItem.name + "\n" + hero[selectedHero].lefthandItem.expItem + " | " + hero[selectedHero].lefthandItem.goldItem + ' </div><div id = "eqidrh" class="eqrh rightH item_' + hero[selectedHero].righthandItem.image + '"> ' + hero[selectedHero].righthandItem.name + "\n" + hero[selectedHero].righthandItem.expItem + " | " + hero[selectedHero].righthandItem.goldItem + '</div> <div id = "eqidface" class="eq face item_' + hero[selectedHero].headItem.image + '"> ' + hero[selectedHero].headItem.name + "\n" + hero[selectedHero].headItem.expItem + " | " + hero[selectedHero].headItem.goldItem + ' </div> <div id = "eqidchest" class="eq chest item_' + hero[selectedHero].chestItem.image + '"> ' + hero[selectedHero].chestItem.name + "\n" + hero[selectedHero].chestItem.expItem + " | " + hero[selectedHero].chestItem.goldItem + ' </div> <div id = "eqidleg" class="eq legging item_' + hero[selectedHero].legsItem.image + '"> ' + hero[selectedHero].legsItem.name + "\n" + hero[selectedHero].legsItem.expItem + " | " + hero[selectedHero].legsItem.goldItem + ' </div> <div id = "eqidboot" class="eq boots item_' + hero[selectedHero].bootItem.image + '"> ' + hero[selectedHero].bootItem.name + "\n" + hero[selectedHero].bootItem.expItem + " | " + hero[selectedHero].bootItem.goldItem + ' </div></center>');
}
    
function refreshStats(){
    $(".ws-name").text("");
    $(".ws-gold").text("");
    $(".ws-exp").text("");
    $(".ws-level").text("");
	$(".goldCoin").text(numberWithCommas(gold));
}
    
function equip(item){
    if(inventory[item].requiredLevel <= hero[selectedHero].level){
        if(inventory[item].slot == 1){
            inventory[item].slot = selectHand();
        }

        switch (inventory[item].slot){
            case 0: Object.assign(inventory[0], hero[selectedHero].headItem);
                    Object.assign(hero[selectedHero].headItem, inventory[item]);
                    if(inventory[0].name !== "NOITEM"){
                    Object.assign(inventory[item], inventory[0]);
                    }
                    if(inventory[0].name == "NOITEM"){
                        inventory.splice(item, 1);
                        invCount --;
                    }refreshStats();
                    break;
            case 1: Object.assign(inventory[0], hero[selectedHero].lefthandItem);
                    Object.assign(hero[selectedHero].lefthandItem, inventory[item]);
                    if(inventory[0].name !== "NOITEM"){
                    Object.assign(inventory[item], inventory[0]);
                    }
                    if(inventory[0].name == "NOITEM"){
                        inventory.splice(item, 1);
                        invCount --;
                    }refreshStats();
                    break;
            case 2: Object.assign(inventory[0], hero[selectedHero].righthandItem); //lowercase 'h' for some reason
                    Object.assign(hero[selectedHero].righthandItem, inventory[item]);
                    if(inventory[0].name !== "NOITEM"){
                    Object.assign(inventory[item], inventory[0]);
                    }
                    if(inventory[0].name == "NOITEM"){
                        inventory.splice(item, 1);
                        invCount --;
                    }refreshStats();
                    break;
            case 3: Object.assign(inventory[0], hero[selectedHero].chestItem);
                    Object.assign(hero[selectedHero].chestItem, inventory[item]);
                    if(inventory[0].name !== "NOITEM"){
                    Object.assign(inventory[item], inventory[0]);
                    }
                    if(inventory[0].name == "NOITEM"){
                        inventory.splice(item, 1);
                        invCount --;
                    }refreshStats();
                    break;
            case 4: Object.assign(inventory[0], hero[selectedHero].legsItem);
                    Object.assign(hero[selectedHero].legsItem, inventory[item]);
                    if(inventory[0].name !== "NOITEM"){
                    Object.assign(inventory[item], inventory[0]);
                    }
                    if(inventory[0].name == "NOITEM"){
                        inventory.splice(item, 1);
                        invCount --;
                    }refreshStats();
                    break;
            case 5: Object.assign(inventory[0], hero[selectedHero].bootItem);
                    Object.assign(hero[selectedHero].bootItem, inventory[item]);
                    if(inventory[0].name !== "NOITEM"){
                    Object.assign(inventory[item], inventory[0]);
                    }
                    if(inventory[0].name == "NOITEM"){
                        inventory.splice(item, 1);
                        invCount --;
                    }refreshStats();
                    break;
            default: console.log("unhandled equip() case"); break;
        }

        equipLeft = 0;
        equipRight = 0;
        $(".wsEqhands").fadeOut(100);
        $(".wsEq").fadeOut(100);

        refreshEq();
        refreshInv();
        drawInvPage(selectedPage);
    }else{alert("Your current hero's level is too small to equip this item!");}
    refreshPlayerInfo(selectedHero);
}
    
function equipMan(x){
    
    $(".ws-name").text(inventory[selectedItem].name);
    $(".ws-gold").text(inventory[selectedItem].goldItem);
    $(".ws-exp").text(inventory[selectedItem].expItem);
    $(".ws-level").text(inventory[selectedItem].requiredLevel);
    
    if(inventory[selectedItem].slot == 1 || inventory[selectedItem].slot == 2){
                $(".wsEqov").empty();
                $(".wsEqov").append('<div class="wsEqhands" style="display: none;"><div class="wsEqL"> Equip Left Hand</div><div class="wsEqR"> Equip Right Hand</div></div>');
				$(".wsEqov").append('<div class="wsEq" id = "wsSell">SELL FOR ' + inventory[selectedItem].goldItem * 10 + ' GOLD</div>');
		
                $(".wsEqhands").fadeIn(100);
                $(".wsEqL").click(function(){
                    equipLeft = 1;
                    equip(selectedItem);
                    refreshStats();
                    refreshInv();
                    drawInvPage(selectedPage);
                });
                $(".wsEqR").click(function(){
                    equipRight = 1;
                    equip(selectedItem);
                    refreshStats();
                    refreshInv();
                    drawInvPage(selectedPage);
                });
				$("#wsSell").click(function(){
					$(this).fadeOut(100);
					sell(selectedItem);
					refreshStats();
					refreshInv();
					drawInvPage(selectedPage);
				});
            }
            else{
                $(".wsEqov").empty();
                $(".wsEqov").append('<div class="wsEq" style="display: none;">EQUIP</div>');
				$(".wsEqov").append('<div class="wsEq" id = "wsSell">SELL FOR ' + inventory[selectedItem].goldItem * 10 + ' GOLD</div>');
                $(".wsEq").fadeIn(100); 
				$("#wsSell").click(function(){
					$(this).fadeOut(100);
					sell(selectedItem);
					refreshStats();
					refreshInv();
					drawInvPage(selectedPage);
				});
                $(".wsEq").click(function(){
                    equip(selectedItem);
                    refreshInv();
                    refreshStats();
                    drawInvPage(selectedPage);
                });
            }
}
	
function sell(item){
	gold += inventory[item].goldItem * 10;
	$("goldCoin").text(numberWithCommas(gold));
	inventory.splice(item, 1);
	invCount --;
}
    
        //FUNCTIONS//HEROSYS

function addHeroWithAtt(headItem_, lefthandItem_, righthandItem_, chestItem_, legsItem_, bootItem_, hair_, eyes_, nose_, mouth_, beard_, sex_, name_, race_, level_, goldBonus_, clickIBonus_, goldIBonus_, chanceIBonus_, attack_, fat_){
    hero[heroCount] = 
        {
        headItem : {
            name : headItem_.name,
            type : headItem_.type,
            image : headItem_.image,
            equiped : headItem_.equiped,
            expItem : headItem_.expItem,
            goldItem : headItem_.goldItem,
            slot : headItem_.slot
        },
        lefthandItem : {
            name : lefthandItem_.name,
            type : lefthandItem_.type,
            image : lefthandItem_.image,
            equiped : lefthandItem_.equiped,
            expItem : lefthandItem_.expItem,
            goldItem : lefthandItem_.goldItem,
            slot : lefthandItem_.slot
        },
        righthandItem : {
            name : righthandItem_.name,
            type : righthandItem_.type,
            image : righthandItem_.image,
            equiped : righthandItem_.equiped,
            expItem : righthandItem_.expItem,
            goldItem : righthandItem_.goldItem,
            slot : righthandItem_.slot
        },
        chestItem : {
            name : chestItem_.name,
            type : chestItem_.type,
            image : chestItem_.image,
            equiped : chestItem_.equiped,
            expItem : chestItem_.expItem,
            goldItem : chestItem_.goldItem,
            slot : chestItem_.slot
        },
        legsItem : {
            name : legsItem_.name,
            type : legsItem_.type,
            image : legsItem_.image,
            equiped : legsItem_.equiped,
            expItem : legsItem_.expItem,
            goldItem : legsItem_.goldItem,
            slot : legsItem_.slot
        },
        bootItem : {
            name : bootItem_.name,
            type : bootItem_.type,
            image : bootItem_.image,
            equiped : bootItem_.equiped,
            expItem : bootItem_.expItem,
            goldItem : bootItem_.goldItem,
            slot : bootItem_.slot
        },
        face : {
            hair : hair_,
            eyes : eyes_,
            nose : nose_,
            mouth : mouth_,
            beard : beard_
        },
        level : level_,
        //active
        expBonus : 1,
        goldBonus : goldBonus_,
        chanceABonus : ((Math.random() * 100) + 1),
        //atts
        name : name_,
		race : race_,
        growthFactor : ((Math.random() + 1)/6 + 1),
        rarity : 1,
        //stat
        points : 0,
        //prod
        expPer : 0, //exp percentage
        nextLevel : 10, //exp needed to next level
        exp : 1, // current exp, resets each level
        expPerClick : 1,
		//combat
		hp : 50,
		currentHp : 50,
		attack : attack_,
		fat : fat_,
		currentFat : fat_,
		lowAtt : Math.ceil(attack_ / 10),
		medAtt : Math.ceil(attack_ / 5),
		heavyAtt : Math.ceil(attack_ /2),
		lowAttFat : Math.ceil(fat_/10),
		medAttFat : Math.ceil(fat_/5),
		heavyAttFat : Math.ceil(fat_/2),
		blkFat : Math.ceil(fat_/3),
		sex : sex_
    };
    
    heroNames[heroCount] = name_;
    
    heroCount ++;
    
    $('.otherherospace').append("<div class='heroline heroId" + (heroCount - 1) + "' id = '" + (heroCount - 1) + "'><span class='heroname heroId" + (heroCount - 1) + "' id = '" + (heroCount - 1) + "' > " + hero[heroCount - 1].name + "</span> <span class='herolevel'> <strong class='herolvl heroId" + (heroCount - 1) + "'>" + hero[heroCount - 1].level + "</strong></span></div>"); 
}
    
function refreshFace(hero__){
    $(".ch_pp_hair").attr("class", "ch_pp_hair");
    $(".ch_pp_eyes").attr("class", "ch_pp_eyes");
    $(".ch_pp_nose").attr("class", "ch_pp_nose");
    $(".ch_pp_mouth").attr("class", "ch_pp_mouth");
    $(".ch_pp_beard").attr("class", "ch_pp_beard");
    
	$(".bodylayout_s").css("background-image", "url('../imgs/charcreate/character/male/a/body_layout.png')");
    $(".ch_pp_hair").css("background-image", "url('../imgs/charcreate/character/male/a/hair_" + hero[hero__].face.hair +".png')");
    $(".ch_pp_eyes").css("background-image", "url('../imgs/charcreate/character/male/a/eyes_" + hero[hero__].face.eyes+".png')");
    $(".ch_pp_nose").css("background-image", "url('../imgs/charcreate/character/male/a/nose_" + hero[hero__].face.nose+".png')");
    $(".ch_pp_mouth").css("background-image", "url('../imgs/charcreate/character/male/a/mouth_" + hero[hero__].face.mouth+".png')");
    $(".ch_pp_beard").css("background-image", "url('../imgs/charcreate/character/male/a/beard_" + hero[hero__].face.beard+".png')");
}   
function refreshPlayerInfo(hero_){
    $("#player_info_name").text(hero[hero_].name);
    $("#player_info_level").text(hero[hero_].level);
    $("#player_info_growth").text(hero[hero_].growthFactor.toFixed(3));
    $("#player_info_attack_gold").text(hero[selectedHero].expPerClick + Math.floor(hero[selectedHero].expBonus) + hero[selectedHero].headItem.expItem + hero[selectedHero].lefthandItem.expItem + hero[selectedHero].righthandItem.expItem + hero[selectedHero].chestItem.expItem + hero[selectedHero].legsItem.expItem + hero[selectedHero].bootItem.expItem + " | " + Math.floor(1 + hero[selectedHero].headItem.goldItem + hero[selectedHero].lefthandItem.goldItem + hero[selectedHero].righthandItem.goldItem + hero[selectedHero].chestItem.goldItem + hero[selectedHero].legsItem.goldItem + hero[selectedHero].bootItem.goldItem));
    refreshFace(hero_);
}

function selectHero(hero_){
    $(".eqp").empty;
    $(".eqp").append('<center><div id = "eqidlh" class="eqlh leftH"> lefTH </div><div id = "eqidrh" class="eqrh rightH"> rightH</div> <div id = "eqidface" class="eq face"> Face </div> <div id = "eqidchest" class="eq chest"> Chest </div> <div id = "eqidleg" class="eq legging"> Legging </div> <div id = "eqidboot" class="eq boots"> Boots </div></center>');
    $(".eq.face").toggleClass("item_" + hero[hero_].headItem.image); hero[hero_].headItem.equipped = hero_;
    $(".eqlh.leftH").toggleClass("item_" + hero[hero_].lefthandItem.image); hero[hero_].lefthandItem.equipped = hero_;
    $(".eqrh.rightH").toggleClass("item_" + hero[hero_].righthandItem.image); hero[hero_].righthandItem.equipped = hero_;
    $(".eq.chest").toggleClass("item_" + hero[hero_].chestItem.image); hero[hero_].chestItem.equipped = hero_;
    $(".eq.legging").toggleClass("item_" + hero[hero_].legsItem.image); hero[hero_].legsItem.equipped = hero_;
    $(".eq.boots").toggleClass("item_" + hero[hero_].bootItem.image); hero[hero_].bootItem.equipped = hero_;
    $(".mheroname").text(hero[hero_].name);
    $(".mherolvl").text(hero[hero_].level);
    selectedHero = hero_;
    $(".level").text(hero[hero_].level);
    $(".expperc").text(numberWithCommas(hero[hero_].exp));
    $(".nextLevel").text(numberWithCommas(hero[hero_].nextLevel));
    $(".exp").width(hero[hero_].expPer + '%');
    //set bonuses to active bonuses
    refreshPlayerInfo(hero_);
}
    
        //FUNCTIONS//CRAFTING
    
function addMiner(){
    miner[minerCount] = {
        iron : Math.floor(((Math.random() + 1) * 1.5)),
        steel : Math.floor(((Math.random() + 1) * 1.1)),
        jewels : Math.floor(((Math.random() + 1) * 1)),
        wood : Math.floor(((Math.random() + 2) * 2))
    }
    minerCount ++;
}
    
function findRes(){
    var i;
    var iron_ = 0;
    var steel_ = 0;
    var jewels_ = 0;
    var wood_ = 0;
    for (i = 0; i < minerCount; i++){
        iron_ += miner[0].iron;
        steel_ += miner[0].steel;
        jewels_ += miner[0].jewels;
        wood_ += miner[0].wood;
    }
    
    var chance_ = [1, 2, 3, 4];
    var chance__ = chance_[Math.floor(Math.random() * chance_.length)];
    switch(chance__){
        case 1: iron += Math.floor((Math.random() + 1) * (iron_));break;
        case 2: steel += Math.floor((Math.random() + 1) * (steel_));break;
        case 3: jewels += Math.floor((Math.random() + 1) * (jewels_));break;
        case 4: wood += Math.floor((Math.random() + 1) * (wood_));break;
        default: console.log("unhandled chance case"); break;
    }
}

function craftRenderPrice(){
    if(craftType !== 0 && craftQuality !== 0){
    switch(craftQuality){
        case "Cheap": qualityFactor = Math.floor(Math.random() * cheapQ.length);
            qualityName = cheapQ[qualityFactor];
            break;
        case "Normal": qualityFactor = Math.floor(Math.random() * normalQ.length);
            qualityName = normalQ[qualityFactor];
            break;
        case "Expensive": qualityFactor = Math.floor(Math.random() * highQ.length);
            qualityName = highQ[qualityFactor];
            break;
        default: console.log("unhandled craftItem case"); break;
    }
    

        
    var basePrice = Math.floor(((itemNameGen.indexOf(qualityName)+1) * (Math.random()+1) * (hero[selectedHero].level + hero[selectedHero].expBonus))/2);
        
    switch(craftType){
        case "Sword": craftGoldPrice = basePrice;
                    craftWoodPrice = basePrice /3;
                    craftIronPrice = basePrice /1.2;
                    craftSteelPrice = basePrice /1.4;
                    craftJewelsPrice = basePrice / 1.3;
                    break;
        case "Bow": craftGoldPrice = basePrice;
                    craftWoodPrice = basePrice /1.2;
                    craftIronPrice = basePrice /1.3;
                    craftSteelPrice = basePrice /3;
                    craftJewelsPrice = basePrice /1.4;
                    break;
        case "Axe": craftGoldPrice = basePrice;
                    craftWoodPrice = basePrice /1.4;
                    craftIronPrice = basePrice /1.2;
                    craftSteelPrice = basePrice /1.3;
                    craftJewelsPrice = basePrice /3;
                    break;
        case "Spear": craftGoldPrice = basePrice;
                    craftWoodPrice = basePrice /1.3;
                    craftIronPrice = basePrice /3;
                    craftSteelPrice = basePrice /1.3;
                    craftJewelsPrice = basePrice /1.2;
                    break;
        case "Helmet": craftGoldPrice = basePrice;
                    craftWoodPrice = basePrice /1.5;
                    craftIronPrice = basePrice /1.6;
                    craftSteelPrice = basePrice /2;
                    craftJewelsPrice = basePrice /1.4;
                    break;
        case "Armor": craftGoldPrice = basePrice;
                    craftWoodPrice = basePrice /3;
                    craftIronPrice = basePrice /1.2;
                    craftSteelPrice = basePrice /1.3;
                    craftJewelsPrice = basePrice /1.4;
                    break;
        case "Pants": craftGoldPrice = basePrice;
                    craftWoodPrice = basePrice /4;
                    craftIronPrice = basePrice /1.3;
                    craftSteelPrice = basePrice /1.5;
                    craftJewelsPrice = basePrice /3;
                    break;
        case "Boots": craftGoldPrice = basePrice;
                    craftWoodPrice = basePrice /2;
                    craftIronPrice = basePrice /1.3;
                    craftSteelPrice = basePrice /1.2;
                    craftJewelsPrice = basePrice /4;
                    break;
    }
        
    craftGoldPrice = Math.floor(craftGoldPrice);
    craftWoodPrice = Math.floor(craftWoodPrice);
    craftIronPrice = Math.floor(craftIronPrice);
    craftSteelPrice = Math.floor(craftSteelPrice);
    craftJewelsPrice = Math.floor(craftJewelsPrice);
        
    $(".goldCrafPrice").text(numberWithCommas(craftGoldPrice));
    $(".woodCrafPrice").text(numberWithCommas(craftWoodPrice));   
    $(".ironCrafPrice").text(numberWithCommas(craftIronPrice));   
    $(".steelCrafPrice").text(numberWithCommas(craftSteelPrice));    
    $(".jewelCrafPrice").text(numberWithCommas(craftJewelsPrice));
    
    }
}

function craftItem(){
    if(craftType !== 0 && craftQuality !== 0){
        if(gold >= craftGoldPrice && wood >= craftWoodPrice && iron >= craftIronPrice && steel >= craftSteelPrice && jewels >= craftJewelsPrice){
            addItemToInv(qualityName + " " + craftType, craftType, craftType + "_1", Math.floor(((itemNameGen.indexOf(qualityName)+1)* (Math.random()+1) * (hero[selectedHero].level + hero[selectedHero].expBonus))/2), Math.floor(((itemNameGen.indexOf(qualityName)+1)* (Math.random()+1) * (hero[selectedHero].level + hero[selectedHero].goldBonus))/3), selectType(craftType), hero[selectedHero].level);
            
            gold -= craftGoldPrice;
            wood -= craftWoodPrice;
            iron -= craftIronPrice;
            steel -= craftSteelPrice;
            jewels -= craftJewelsPrice;
            
            $(".goldCoin").text(numberWithCommas(gold));
            $(".woodNum").text(numberWithCommas(wood));
            $(".ironNum").text(numberWithCommas(iron));
            $(".steelNum").text(numberWithCommas(steel));
            $(".jewelNum").text(numberWithCommas(jewels));
        } else {craftFailed = 1;}
    }
    $(".goldCrafPrice").text(0);
    $(".woodCrafPrice").text(0);   
    $(".ironCrafPrice").text(0);   
    $(".steelCrafPrice").text(0);    
    $(".jewelCrafPrice").text(0);
}
    
		//FUNCTIONS//MAP
    
function constructMapWindow(size){
    for(i = 1; i <= size; i++){
        $(".mapTilesWrap").append('<div class="mapTile pos' + i + '"></div>');
    }
}
    
function genMap(){
    constructMapWindow(961);
    
    for(i = 0; i <= mapSize + 1; i++){
        for(j = 0; j <= mapSize + 1; j++){
            map[i][j] = {
                h : 0
            };
        }
    }
    
    addContinentsToMap();
}
    
function disq(x1, y1, x2, y2, x3, y3, x4, y4, root, factor){
    if(root <= 1){return;}

    var midPointX = Math.ceil((x1 + x2 + x3 + x4) / 4);
    var midPointY = Math.ceil((y1 + y2 + y3 + y4) / 4);

    var median = Math.ceil((map[x1][y1].h + map[x2][y2].h + map[x3][y3].h + map[x4][y4].h) / 4 + getRandomInt(1, factor));
	map[midPointX][midPointY].h = median;
	
    map[Math.ceil((x1 + x2)/2)][Math.ceil((y1 + y2)/2)].h = Math.floor((map[x1][y1].h + map[x2][y2].h + median)/3 + getRandomInt(1,factor));
    map[Math.ceil((x2 + x3)/2)][Math.ceil((y2 + y3)/2)].h = Math.floor((map[x2][y2].h + map[x3][y3].h + median)/3 + getRandomInt(1,factor));
    map[Math.ceil((x3 + x4)/2)][Math.ceil((y3 + y4)/2)].h = Math.floor((map[x3][y3].h + map[x4][y4].h + median)/3 + getRandomInt(1,factor));
    map[Math.ceil((x4 + x1)/2)][Math.ceil((y4 + y1)/2)].h = Math.floor((map[x4][y4].h + map[x1][y1].h + median)/3 + getRandomInt(1,factor));

    map[midPointX][midPointY].h = median;

    disq (x1, y1, Math.ceil((x1 + x2)/2), Math.ceil((y1 + y2)/2), midPointX, midPointY, Math.ceil((x1 + x4)/2), Math.ceil((y1 + y4)/2), root/2, Math.floor(factor/1.8));
    disq (Math.ceil((x1 + x2)/2), Math.ceil((y1 + y2)/2), x2, y2, Math.ceil((x2 + x3)/2), Math.ceil((y2 + y3)/2), midPointX, midPointY, root/2, Math.floor(factor/1.8));
    disq (midPointX, midPointY, Math.ceil((x2 + x3)/2), Math.ceil((y2 + y3)/2), x3, y3, Math.ceil((x3 + x4)/2), Math.ceil((y3 + y4)/2), root/2, Math.floor(factor/1.8));
    disq (Math.ceil((x1 + x4)/2), Math.ceil((y1 + y4)/2), midPointX, midPointY, Math.ceil((x3 + x4)/2), Math.ceil((y3 + y4)/2), x4, y4, root/2, Math.floor(factor/1.8));
}

function addContinentsToMap(){
    map[1][1].h = 10;
    map[1][mapSize].h = 10;
    map[mapSize][1].h = 10;
    map[mapSize][mapSize].h = 10;
    
    disq(1, 1, 1, mapSize, mapSize, mapSize, mapSize, 1, mapSize, 52);
}    
    
    
function drawMap(x, y){
    var pos = 1;
    while(pos <= 961){
        for (i = x - 15; i <= x + 15; i++){
            for (j = y - 15; j <= y + 15; j++){
                if(map[i][j].h <= 30){
                    $(".mapTile.pos" + pos).css("background-color", "hsl(213,60%,55%)"); // sea
                }else if(map[i][j].h > 30 && map[i][j].h <= 35){
                    $(".mapTile.pos" + pos).css("background-color", "hsl(199,60%,75%)"); // river
                }else if(map[i][j].h > 35 && map[i][j].h <= 50){
                    $(".mapTile.pos" + pos).css("background-color", "hsl(40,60%,75%)"); // sand
                }else if(map[i][j].h > 50 && map[i][j].h <= 65){
                    $(".mapTile.pos" + pos).css("background-color", "hsl(114,50%,50%)"); // grass
                }else if(map[i][j].h > 65 && map[i][j].h <= 80){
                    $(".mapTile.pos" + pos).css("background-color", "hsl(28, 36%, 48%)"); // hill
                }else if(map[i][j].h > 80 && map[i][j].h <= 95){
                    $(".mapTile.pos" + pos).css("background-color", "hsl(18, 7%, 37%)"); // mountain
                }else if(map[i][j].h > 95){
                    $(".mapTile.pos" + pos).css("background-color", "hsl(213, 52%, 87%)"); // snow
                }
				//$(".mapTile.pos" + pos).text(map[i][j].h); //show height values
            pos++;
            }
        }
    }
    
    lastMapPosX = x;
    lastMapPosY = y;
	
	//console.log(map[1][2].h);
}
	
	//FUNCTIONS//COMBAT

function addEnemy(name_, race_, level_, hp_, attack_, image_){
	enemy[enemyCount] = {
    	name : name_,
		race : race_,
		level : level_,
		hp : hp_,
		currentHp : hp_,
		attack : attack_,
		image : image_,
		
		lowAtt : Math.ceil(attack_ / 10),
		medAtt : Math.ceil(attack_ / 5),
		heavyAtt : Math.ceil(attack_ / 2)
	};
	
	enemyCount ++;
}


function combatEvent(enemy_) { //enemy id
	holdKeys();
	
	$(".combat-you-title").text(hero[selectedHero].name);
	$(".your-level").text(hero[selectedHero].level);
	$(".combat-you-race").text(hero[selectedHero].race);

	$(".combat-enemy-title").text(enemy[enemy_].name);
	$(".enemy-level").text(enemy[enemy_].level);
	$(".combat-enemy-race").text(enemy[enemy_].race);
	$(".combat-window-top").css("background-image", "url('" + enemy[enemy_].image + "')");
	combatAttack(0);
	//$("#attack" + attButton[Math.floor(Math.random() * attButton.length)]).addClass("attack");
}
	
function holdKeys() {
	$(document).keydown(function (event) {
		// if(event.keyCode == 66)
		$("#prop-butt-" + event.keyCode).addClass("tgld");
	});
	$(document).keyup(function (event) {
		$("#prop-butt-" + event.keyCode).removeClass("tgld");
	});
}

function timerCombat() {
	var timerPerc = (440 * 50) / 500;
	var timerVal = 0;
	var timerInterval = setInterval(function () {
		timerVal += timerPerc;
		$(".combat-timer-bar-on").css("width", timerVal + "px");
		if (timerVal >= 440) {
			clearInterval(timerInterval);
		}
	}, 50);
}
function combatAttack(enemy__){
     $(document).keydown(function(event){
        switch(event.keyCode){
            case 81: playerPwr = 1; console.log("Attack 1");
						enemyPwr = Math.ceil(Math.random() * 4);console.log(enemyPwr);
						if(hero[selectedHero].currentFat >= hero[selectedHero].lowAttFat){
							hero[selectedHero].currentFat -= hero[selectedHero].lowAttFat;
							switch(enemyPwr){
								case 1:break;
								case 2:hero[selectedHero].currentHp -= enemy[enemy__].lowAtt; break;
								case 3:hero[selectedHero].currentHp -= enemy[enemy__].medAtt; break;
								case 4:break;
								}
							}
						break;
					case 87: playerPwr = 2; console.log("Attack 2");
						enemyPwr = Math.ceil(Math.random() * 4);console.log(enemyPwr);
						if(hero[selectedHero].currentFat >= hero[selectedHero].medAttFat){
							hero[selectedHero].currentFat -= hero[selectedHero].medAttFat;
							switch(enemyPwr){
								case 1:enemy[enemy__].currentHp -= hero[selectedHero].lowAtt; break;
								case 2:break;
								case 3:hero[selectedHero].currentHp -= enemy[enemy__].lowAtt; break;
								case 4:break;
							}
						}
						break;
					case 69: playerPwr = 3; console.log("Attack 3");
						enemyPwr = Math.ceil(Math.random() * 4);console.log(enemyPwr);
						if(hero[selectedHero].currentFat >= hero[selectedHero].heavyAttFat){
							hero[selectedHero].currentFat -= hero[selectedHero].heavyAttFat;
							switch(enemyPwr){
								case 1:enemy[enemy__].currentHp -= hero[selectedHero].medAtt; break;
								case 2:enemy[enemy__].currentHp -= hero[selectedHero].lowAtt; break;
								case 3:break;
								case 4:break;
							}
						}
						break;
					case 82: playerPwr = 4; console.log("Block");
						enemyPwr = Math.ceil(Math.random() * 4);console.log(enemyPwr);
						if(hero[selectedHero].currentFat >= hero[selectedHero].blkFat){
						hero[selectedHero].currentFat -= hero[selectedHero].blkFat;
						switch(enemyPwr){
							case 1:break;
							case 2:break;
							case 3:break;
							case 4:break;
						}}
						break;
			default: break;
        }
		 hero[selectedHero].currentFat = ((Math.random() * 50)/100) * hero[selectedHero].fat;
         $(".combat-you-hp").css("width", ((hero[selectedHero].currentHp * 100) / hero[selectedHero].hp) + "%");
         $(".combat-enemy-hp").css("width", ((enemy[enemy__].currentHp * 100) / enemy[enemy__].hp) + "%");
		 $(".combat-you-en").css("width", ((hero[selectedHero].currentFat * 100) / hero[selectedHero].fat) + "%");
		 
		 $(".combat-log-container").prepend("<div class='combat-log-line'> <div class='combat-log-left friendly-side'> You </div> <div class='combat-log-center attack-low'></div> <div class='combat-log-right enemy-side'> enemy</div></div>");
    });
}
	
		//FUNCTIONS//SAVESYS
	
function save(){
	//vars
	$.jStorage.set("_gold", gold);
	$.jStorage.set("_up1Price", up1Price);
	$.jStorage.set("_up2Price", up2Price);
	$.jStorage.set("_invCount", invCount);
	$.jStorage.set("_heroCount", heroCount);
	$.jStorage.set("_iron", iron);
	$.jStorage.set("_steel", steel);
	$.jStorage.set("_jewels", jewels);
	$.jStorage.set("_wood", wood);
	$.jStorage.set("_minerCount", minerCount);
	$.jStorage.set("_mapSize", mapSize);
	$.jStorage.set("_saveInterval", saveInterval);
	//inventory
	for(i = 0; i < invCount; i++){
		$.jStorage.set("item" + i, inventory[i]);
	}
	console.log("inventory saved");
	//herosys
	for(i = 0; i < heroCount; i++){
		$.jStorage.set("hero" + i, hero[i]);
	}
	for(i = 0; i < heroCount; i++){
		$.jStorage.set("heroNames" + i, heroNames[i]);
	}
	console.log("heros saved");
	//miners
	for(i = 0; i < minerCount; i++){
		$.jStorage.set("miner" + i, miner[i]);
	}
	console.log("miners saved");
	$.jStorage.set("_newUser", 0);
	//map
	/*for(i = 0; i < mapSize; i++){
		for(j = 0; j < mapSize; j++){
			$.jStorage.set("tilex" + i + "y" + j, map[i][j].h);
		}
	}
	console.log("map saved");*/
}
	
function load(){
	if($.jStorage.get("_newUser") == 0){
		//vars
		gold = $.jStorage.get("_gold");
			$(".goldCoin").text(numberWithCommas(gold));
		up1Price = $.jStorage.get("_up1Price");
		up2Price = $.jStorage.get("_up2Price");
		invCount = $.jStorage.get("_invCount");
		heroCount = $.jStorage.get("_heroCount");
		iron = $.jStorage.get("_iron");
		steel = $.jStorage.get("_steel");
		jewels = $.jStorage.get("_jewels");
		wood = $.jStorage.get("_wood");
			$(".woodNum").text(numberWithCommas(wood));
        	$(".ironNum").text(numberWithCommas(iron));
        	$(".steelNum").text(numberWithCommas(steel));
        	$(".jewelNum").text(numberWithCommas(jewels));
		minerCount = $.jStorage.get("_minerCount");
		mapSize = $.jStorage.get("_mapSize");
		saveInterval = $.jStorage.get("_saveInterval");
		//inventory
		for(i = 0; i < invCount; i++){
			inventory[i] = $.jStorage.get("item" + i);
		}
		console.log("inventory loaded");
		//herosys
		for(i = 0; i < heroCount; i++){
			hero[i] = $.jStorage.get("hero" + i);
		}
		for(i = 0; i < heroCount; i++){
			heroNames[i] = $.jStorage.get("heroNames" + i);
		}
		console.log("heros loaded");
		//miners
		for(i = 0; i < minerCount; i++){
			miner[i] = $.jStorage.get("miner" + i);
		}
		console.log("miners loaded");
		//herolines
		$('.otherherospace').empty();
		for(i = 0; i < heroCount; i ++){
			$('.otherherospace').append("<div class='heroline heroId" + i + "' id = '" + i + "'><span class='heroname heroId" + (heroCount - 1) + "' id = '" + i + "' > " + hero[i].name + "</span> <span class='herolevel'> <strong class='herolvl heroId" + i + "'>" + hero[i].level + "</strong></span></div>"); 
		}
	}
}
    //JQUERY

   $(document).ready(function(){
       $(document).keydown(function(event){
                    if(event.keyCode == 66) {
                    event.preventDefault();
                    $(".combat-ov").fadeIn(100);
                    $(".combat-window").fadeIn(100);
                    $(".combat-butts-info").fadeIn(100);
                    $(".combat-log-box").fadeIn(100);
                    
		$.jStorage.flush();
					holdKeys();
					combatEvent(0);
                    return false;
                }
            if(event.keyCode == 78) {
                    event.preventDefault();
                    $(".combat-ov").fadeOut(100);
                        $(".combat-window").fadeOut(100);
                        $(".combat-butts-info").fadeOut(100);
                        $(".combat-log-box").fadeOut(100);
                    return false;
                }
            });
       
       // KeyCode Check //
           //document.onkeydown = function(e){
           //    console.log(e.keyCode);
           //}

        //JQUERY//MAIN
	   
	   load();
	   load();
	   
	   setInterval(function(){
		   save();console.log(saveInterval);
	   }, saveInterval);
	   
    $("button").click(function(){
        gold += Math.floor(1 + hero[selectedHero].headItem.goldItem + hero[selectedHero].lefthandItem.goldItem + hero[selectedHero].righthandItem.goldItem + hero[selectedHero].chestItem.goldItem + hero[selectedHero].legsItem.goldItem + hero[selectedHero].bootItem.goldItem);

        $(".goldCoin").text(numberWithCommas(gold));
        
        if(minerCount > 0){findRes();}

        if(hero[selectedHero].exp < hero[selectedHero].nextLevel){
            hero[selectedHero].expPer = ((hero[selectedHero].exp*100)/hero[selectedHero].nextLevel).toFixed(2);
            hero[selectedHero].exp += hero[selectedHero].expPerClick + Math.floor(hero[selectedHero].expBonus) + hero[selectedHero].headItem.expItem + hero[selectedHero].lefthandItem.expItem + hero[selectedHero].righthandItem.expItem + hero[selectedHero].chestItem.expItem + hero[selectedHero].legsItem.expItem + hero[selectedHero].bootItem.expItem; //TEMP!
            $(".exp").width(hero[selectedHero].expPer+'%');
            $(".expperc").text(numberWithCommas(hero[selectedHero].exp));
        }
        if(hero[selectedHero].exp >= hero[selectedHero].nextLevel){ //levelup
            hero[selectedHero].exp = 1;
            hero[selectedHero].nextLevel = Math.floor(Math.pow(hero[selectedHero].nextLevel, 2)/((30 * hero[selectedHero].nextLevel * hero[selectedHero].growthFactor) / 100)); 
            hero[selectedHero].expPer = 0;
            $(".exp").width(hero[selectedHero].expPer+'%');
            hero[selectedHero].level++;
            hero[selectedHero].expBonus += (hero[selectedHero].expBonus)/2;
            hero[selectedHero].points += 5; //TO DO: ADD LEVEL UP WINDOW
			hero[selectedHero].chanceABonus += ((2 * hero[selectedHero].chanceABonus)/100);
			
			hero[selectedHero].hp *= 1.05;
			
            $(".level").text(hero[selectedHero].level);
            $(".nextLevel").text(numberWithCommas(hero[selectedHero].nextLevel));
            $(".expperc").text(numberWithCommas(hero[selectedHero].exp));
            $(".herolvl.heroId" + selectedHero).text(hero[selectedHero].level);
            $(".mherolvl").text(hero[selectedHero].level);
        }
        refreshPlayerInfo(selectedHero);
        //needs update

        //ITEM CHANCES

        var chance = getRandomInt(1, 100);
		var chancee = getRandomInt(1, 20);
        if(chance < chancee){
            addRandomItemToInv(hero[selectedHero].rarity);
            unseenItems ++;
            $(".notify").addClass("visible");
            $(".notify").text(unseenItems);
            chance = 0;
        }
        
        $(".woodNum").text(numberWithCommas(wood));
        $(".ironNum").text(numberWithCommas(iron));
        $(".steelNum").text(numberWithCommas(steel));
        $(".jewelNum").text(numberWithCommas(jewels));
    });
        
    $(".shop").click(function(){
        $(".up1PriceGold").text(up1Price);
        if((gold >= up1Price)){
            $("#buyu1").text("Buy");
        }else{
            $("#buyu1").text("No Funds");
        }
        if((gold >= up2Price)){
            $("#buyu2").text("Buy");
        }else if(gold < up2Price){
            $("#buyu2").text("No Funds");
        }
    });
    
    $("#buyu1").click(function(){
        if(gold >= up1Price){
            $("body").append("<div class='nameov'></div><div class='nameBox'><div class='nameboxtitle'> Hero Name </div><div class='nameboxcontainer'><div class='nameboxdet'>Please enter your new hero's name below. Hit <b>Done</b> when you're ready.</div><form class='nameForm' name='addName'><input class='nameName' type='text' placeholder='Type here your hero's name'><input class='nameSubmit' type='button' value='Done'></form></div></div>");
                $(window).keydown(function(event){
                    if(event.keyCode == 13) {
                    event.preventDefault();
                    $(".nameSubmit").trigger("click");
                    return false;
                }
            });
                //$(document).on("click", ".nameSubmit", function(){
            $(".nameSubmit").click(function(){
                    var newHeroName;// = "  ";
                    newHeroName = $('.nameName').val();
                    console.log(newHeroName);
                    //if($('.nameName').val().charAt(1) !== " "){
                    
                    var alreadyUsed = 1;
                
                    for(var i = 1; i <= heroCount; i++){
                        newHeroName = $('.nameName').val();
                        if (heroNames[i - 1].toUpperCase() == newHeroName.toUpperCase()){
                            alreadyUsed = 0;
                        }
                    }
                
                    if($('.nameName').val() !== "" && $('.nameName').val() !== null && $('.nameName').val() !== undefined && $('.nameName').val().charAt(0) !== " " && alreadyUsed){
                    
                        //alert("Invalid Name");
                        addHeroWithAtt(inventory[1], inventory[1], inventory[1], inventory[1], inventory[1], inventory[1], getRandomInt(1, chHairCount), getRandomInt(1, chEyesCount), getRandomInt(1, chNoseCount), getRandomInt(1, chMouthCount), getRandomInt(1, chBeardCount), newHeroSex, newHeroName, "Human", 1, 1, 1, 1, 0, 10, 10);
            
                        gold -= up1Price;
                        $(".goldCoin").text(numberWithCommas(gold));
                        upgrade1 ++;
                        up1PriceFactor *= 1.15;
                        up1Price += Math.floor(up1PriceFactor);

                        hero[selectedHero].expPerClick ++;

                        $(".up1PriceGold").text(numberWithCommas(up1Price));
                        $(".plusOne").text(upgrade1);
                    }
                    $(".nameov").remove();
                    $(".namebox").remove();
                    
                    refreshPrices();
                });
        }
        refreshPrices();
    });
    
    $("#buyu2").click(function(){
        addMiner();
        
        if(gold >= up2Price){
            $("#buyu2").text("Buy");
         }
        else{
            $("#buyu2").text("No Funds");
         }
        if(gold >= up2Price){
            gold -= up2Price;
            $(".goldCoin").text(numberWithCommas(gold));
            up2Price = Math.floor(up2Price * 1.6);
            $(".up2PriceGold").text(numberWithCommas(up2Price));
            
            refreshPrices();
        }
    });
       
    $(".type").click(function(){
        $(".type").removeClass("typeSelect");
        $(this).addClass("typeSelect");
        craftType = $(this).attr("id");
        $(".cQ").addClass("on");
        craftRenderPrice();
    });
        
    $(".cQ").click(function(){
        $(".cQ").removeClass("cqsel"); 
        $(this).addClass("cqsel");
        craftQuality = $(this).attr("id");
        console.log(craftQuality);
        craftRenderPrice();
    });
       
    $(".craftSubmit").click(function(){
        craftItem();
        if(craftFailed == 1){alert("You don't have enough resources"); craftFailed = 0;}
        $(".cQ").removeClass("on");
        $(".cQ").removeClass("cqsel"); 
        $(".type").removeClass("typeSelect");
        craftType = 0;
        craftQuality = 0;
    });
       
            //JQUERY//MAIN//WINDOWS
       $(".mainheroline-wrap").hover(
            function(){
                $(this).children(".infoWindow").fadeIn(100);
        }, function(){
                $(this).children(".infoWindow").fadeOut(400);
        }
       );
    
        $(".fa.fa-bars.options").click(function(){
          $(".options-overlay").fadeIn(100);
          $(".options-window").fadeIn(100);                             
       });
       $(".options-overlay").click(function(){
           $(".options-overlay").fadeOut(100);
          $(".options-window").fadeOut(100);   
       })
       $(".auto-save-swticher").click(function(){
          $(this).toggleClass("tgld");
           $(".auto-save-input").toggleClass("tgld");
       });
       //$(".infoWindow").mouseenter(function(){
       //    $(this).fadeIn(100);
       //});
       //$(".infoWindow").mouseleave(function(){
       //    $(this).fadeOut(400);
       //});
        
    $(".inventory").click(function(){
        unseenItems = 0;
        $(".notify").removeClass("visible");
    });
        
    $(".changetrigger").click(function(){
        $( "div.changetrigger" ).toggleClass("tgld");
        $( "div.changes" ).toggleClass("tgld");
    });
    $(".shop").click(function(){
        $(".marketov").fadeIn(100);
        $(".market").toggleClass("mtgld");
    });
    $("#closem").click(function(){
        $(".market").toggleClass("mtgld");
        $(".marketov").fadeOut(200);
    });
    $(".marketov").click(function(){
        $(".market").toggleClass("mtgld");
        $(".marketov").fadeOut(200);
    });
    $(document).on("click", ".invItem", function(){
            selectedItem = $(this).attr("id");
            equipMan(0);
        });
    $(".inventory").click(function(){
        refreshInv();
        refreshEq();

        $(".equipmentov").fadeIn(100);
        if(invCount - 2 > 36){
            $(".allpag").text(Math.floor((invCount - 3) / 36) + 1);
        }else   {$(".allpag").text(1)}
        $(".eiov").fadeIn(100);
        $(".equipment").toggleClass("tgld");
        $(".weaponstats").toggleClass("tgld");
        $(".invWindowOv").fadeIn(100);
        $(".invWindow").toggleClass("invtgld");
    });
    $(".charCreateToggle").click(function(){
        $(".charCreateOv").fadeIn(100);
        $(".charCreate").toggleClass("charctgld");
    });
    $("#closecc").click(function(){
        $(".charCreateOv").fadeOut(200);
        $(".charCreate").toggleClass("charctgld");
    });
    $(".charCreateOv").click(function(){
        $(".charCreateOv").fadeOut(200);
        $(".charCreate").toggleClass("charctgld");
    });
    $(".equipmentov").click(function(){
        $(".invItemWrap").empty();
        $(".eiov").fadeOut(200);
        $(".equipmentov").fadeOut(200);
        $(".equipment").toggleClass("tgld");
        $(".weaponstats").toggleClass("tgld");
        $(".invWindowOv").fadeOut(200);
        $(".invWindow").toggleClass("invtgld");
        $(".curpag").text("1");
        page = 0;
    });
    
        //JQUERY//INVENTORY
    
    $(".inventory").click(function(){
        drawInvPage(0);
        selectedPage = 0;
    });
    
    $("#invNextPage").click(function(){
        if(invCount - 2 > (page + 1) * 36){
        refreshInv();
        page ++; ++selectedPage;
        drawInvPage(page);
        }
    });
    $("#invPrevPage").click(function(){
        if(page + 1 > 1){
        refreshInv();
        --page; --selectedPage;
        drawInvPage(page);``
        }
    });
       
	   if($.jStorage.get("_newUser") != 0){
       addItemToInv("SWAP", "Sword", "noitem", 1, 0, 1, 0);
       addItemToInv("NOITEM", "Sword", "noitem", 1, 0, 1, 0);
	   }
       
        //JQUERY//HEROSYS
    
	   if($.jStorage.get("_newUser") != 0){
    addHeroWithAtt(inventory[1], inventory[1], inventory[1], inventory[1], inventory[1], inventory[1], 7, 2, 3, 1, 4, 1, "Ragnarok", "Human", 1, 1, 1, 1, 1, 10, 10);
	   }
    
    $(".eqp").empty();
        selectHero(0);
    $(".heroline.heroId0").removeClass("selected");
    $(".heroline.heroId0").toggleClass("selected");
        
   $(document).on("click", ".heroline", function() {
       $(".eqp").empty();
       selectHero($(this).attr("id"));
       $(".heroline").removeClass("selected");
       $(this).toggleClass("selected");
        });
       
        //JQUERY//CRAFTING
       
    $(".craftToggle").click(function(){
        $(".craftov").fadeIn(100);
        $(".craftWindow").toggleClass("tgld");
    });
    $(".craftClose").click(function(){
        $(".craftov").fadeOut(100);
        $(".craftWindow").toggleClass("tgld");
        $(".cQ").removeClass("on");
        $(".cQ").removeClass("cqsel"); 
        $(".type").removeClass("typeSelect");
        craftType = 0;
        craftQuality = 0;
    });
    $(".craftov").click(function(){
        $(".craftov").fadeOut(100);
        $(".craftWindow").toggleClass("tgld");
        $(".cQ").removeClass("on");
        $(".cQ").removeClass("cqsel"); 
        $(".type").removeClass("typeSelect");
    });
      $(document).on("click", ".invItem", function() { 
          $(".invItem").removeClass("invItemSelect");
          $(this).addClass("invItemSelect");
           });
       
       //JQUERY//MAP
       
       $(".mapToggle").click(function(){
          $(".mapov").fadeIn(100);
           $(".mapWindow").toggleClass("tgld");
           mapOpen = 1;
       });
       $(".mapClose").click(function(){
          $(".mapov").fadeOut(100);
           $(".mapWindow").toggleClass("tgld");
           mapOpen = 0;
       });
       $(".mapov").click(function(){
          $(".mapov").fadeOut(100);
           $(".mapWindow").toggleClass("tgld");
           mapOpen = 0;
       });
       
        genMap(); drawMap(16, 16);
	   
       $(".mpu").click(function(){
           if(lastMapPosX - 1 >= 16){drawMap(lastMapPosX - mapScrollSpeed, lastMapPosY);}
       });
       $(".mpd").click(function(){
           if(lastMapPosX + 1 < 384){drawMap(lastMapPosX + mapScrollSpeed, lastMapPosY);}
       });
       $(".mpl").click(function(){
           if(lastMapPosY - 1 >= 16){drawMap(lastMapPosX, lastMapPosY - mapScrollSpeed);}
       });
       $(".mpr").click(function(){
          if(lastMapPosY + 1 < 384){drawMap(lastMapPosX, lastMapPosY + mapScrollSpeed);}
       });
       $(".mzIn").click(function(){
           $(".mapTilesWrap").addClass("zoomed");
       });
       $(".mzOut").click(function(){
           $(".mapTilesWrap").removeClass("zoomed");
       });
       
       document.onkeydown = function(e) {   //move with the arrow-keys
        if(mapOpen == 1){
    switch (e.keyCode) {
        case 37:
            event.preventDefault();
            $(".mpl").trigger("click");
            return false;
        case 38:
            event.preventDefault();
            $(".mpu").trigger("click");
            return false;
        case 39:
            event.preventDefault();
            $(".mpr").trigger("click");
            return false;
        case 40:
            event.preventDefault();
            $(".mpd").trigger("click");
            return false;
        case 109:
            event.preventDefault();
            $(".mzOut").trigger("click");
            return false;
        case 107:
            event.preventDefault();
            $(".mzIn").trigger("click");
            return false;
    }
        }
        
           
};
	   		//JQUERY//COMBAT
	   
	   addEnemy("ORC", "ORC", 1, 25, 2, "../imgs/enemies/enemy-orc.png");
	   
	   		//JQUERY//SAVESYS
	   
	   $(".options-button.save").click(function(){
	   	   var input = document.getElementById("auto-save-id").value;
		   saveInterval = input;
		   
	   });
	   $(".options-button.save-now").click(function(){
		   save();
	   });
   });
})(window, window.jQuery);