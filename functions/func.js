(function (window, $) { //FUNC Ver. 3
    
    //VARIABLES
    
        //VARIABLES//MAIN
    
    var gold = 0;
    
    var clickCount = 0;
    var upgrade1 = 0; //count of up1 
    var upgrade2 = 0; 

    var up1Price= 5;
    var up1PriceFactor = 1;
    var up2Price= 10;
    
    //var intervalID = window.setInterval(myCallback, 2000);
    
    var balance = 0;

    var unseenItems = 0;
    
        //VARIABLES//INVENTORY
    
    var invCount = 0; //items in inv atm

    var inventory = new Array();
    
    var itemNameGen = ['Broken', 'Old', 'Tattered', 'Cheap', 'New', 'Well Made', 'Rare', 'Legendary']; //use index to decide quality
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
    
    var line = new Array ();

    var hero = new Array ();
    
    var selectedHero;
        
        //VARIABLES//CRAFTING
    
    var iron = 0;
    var steel = 0;
    var jewels = 0;
    var wood = 0;
    
    var miner = new Array();
    minerCount = 0;
    
    var craftType;
    var craftQuality;
    
    var craftFailed;
    
    var craftGoldPrice, craftWoodPrice, craftIronPrice, craftSteelPrice, craftJewelsPrice;
    var qualityFactor;
    var qualityName;
    
        //VARIABLES//MAP
    
    var map = new Array();
    for (var i = 0; i < 400; i++) {
        map[i] = new Array(400);
    }
    var mapTiles = ['grass', 'mountain'];
    
    var lastMapPosX, lastMapPosY;
    
    //FUNCTIONS
    
    function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
    function maybe(){
        var x = getRandomInt(0,1);
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

        //FUNCTIONS//INVENTORY
    
function drawItem(i, pos){ //i - itemID; pos - positions
    $(".invItem.".concat("pos", pos)).text((inventory[i].name).concat("\n", inventory[i].expItem + " | " + inventory[i].goldItem + "\n" + inventory[i].requiredLevel)).toggleClass("item_" + inventory[i].image);
    $(".invItem.".concat("pos", pos)).attr("id", i);
}

function drawEmpty(pos){
    $(".invItem.".concat("pos", pos)).text("");
}

function drawInvPage(x){
    $(".curpag").text(x + 1);
    firstPos = x * 36;
    lastPos = ((x + 1) * 36); //last pos of the x page
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
    
    addItemToInv(ADDTYPE + ' ' + TYPE, "", TYPE + "_1", Math.floor(((itemNameGen.indexOf(ADDTYPE)+1)* (Math.random()+1) * (hero[selectedHero].level + hero[selectedHero].expBonus))/2), Math.floor(((itemNameGen.indexOf(ADDTYPE)+1)* (Math.random()+1) * (hero[selectedHero].level + hero[selectedHero].goldBonus))/3), item_slot, hero[selectedHero].level);
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
                    }
                    break;
            case 1: Object.assign(inventory[0], hero[selectedHero].lefthandItem);
                    Object.assign(hero[selectedHero].lefthandItem, inventory[item]);
                    if(inventory[0].name !== "NOITEM"){
                    Object.assign(inventory[item], inventory[0]);
                    }
                    if(inventory[0].name == "NOITEM"){
                        inventory.splice(item, 1);
                        invCount --;
                    }
                    break;
            case 2: Object.assign(inventory[0], hero[selectedHero].righthandItem); //lowercase 'h' for some reason
                    Object.assign(hero[selectedHero].righthandItem, inventory[item]);
                    if(inventory[0].name !== "NOITEM"){
                    Object.assign(inventory[item], inventory[0]);
                    }
                    if(inventory[0].name == "NOITEM"){
                        inventory.splice(item, 1);
                        invCount --;
                    }
                    break;
            case 3: Object.assign(inventory[0], hero[selectedHero].chestItem);
                    Object.assign(hero[selectedHero].chestItem, inventory[item]);
                    if(inventory[0].name !== "NOITEM"){
                    Object.assign(inventory[item], inventory[0]);
                    }
                    if(inventory[0].name == "NOITEM"){
                        inventory.splice(item, 1);
                        invCount --;
                    }
                    break;
            case 4: Object.assign(inventory[0], hero[selectedHero].legsItem);
                    Object.assign(hero[selectedHero].legsItem, inventory[item]);
                    if(inventory[0].name !== "NOITEM"){
                    Object.assign(inventory[item], inventory[0]);
                    }
                    if(inventory[0].name == "NOITEM"){
                        inventory.splice(item, 1);
                        invCount --;
                    }
                    break;
            case 5: Object.assign(inventory[0], hero[selectedHero].bootItem);
                    Object.assign(hero[selectedHero].bootItem, inventory[item]);
                    if(inventory[0].name !== "NOITEM"){
                    Object.assign(inventory[item], inventory[0]);
                    }
                    if(inventory[0].name == "NOITEM"){
                        inventory.splice(item, 1);
                        invCount --;
                    }
                    break;
            default: console.log("unhandled equip() case"); break;
        }

        equipLeft = 0;
        equipRight = 0;
        $(".wsEqhands").fadeOut(100);

        refreshEq();
        refreshInv();
        drawInvPage(selectedPage);
    }else{alert("The your current hero's level is too small to equip this item!");}
}
    
function equipMan(x){
    if(inventory[selectedItem].slot == 1 || inventory[selectedItem].slot == 2){
                $(".wsEqov").empty();
                $(".wsEqov").append('<div class="wsEqhands" style="display: none;"><div class="wsEqL"> Equip Left Hand</div><div class="wsEqR"> Equip Right Hand</div></div>');
                $(".wsEqhands").fadeIn(100);
                $(".wsEqL").click(function(){
                    equipLeft = 1;
                    equip(selectedItem);
                    refreshInv();
                    drawInvPage(selectedPage);
                });
                $(".wsEqR").click(function(){
                    equipRight = 1;
                    equip(selectedItem);
                    refreshInv();
                    drawInvPage(selectedPage);
                });
            }
            else{
                $(".wsEqov").empty();
                $(".wsEqov").append('<div class="wsEq" style="display: none;">EQUIP</div>');
                $(".wsEq").fadeIn(100); 
                $(".wsEq").click(function(){
                    equip(selectedItem);
                    refreshInv();
                    drawInvPage(selectedPage);
                });
            }
}
    
        //FUNCTIONS//HEROSYS

function addHeroWithAtt(headItem_, lefthandItem_, righthandItem_, chestItem_, legsItem_, bootItem_, name_, level_, goldBonus_, clickIBonus_, goldIBonus_, chanceIBonus_, active_){
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
        active : active_,
        level : level_,
        //active
        expBonus : 1,
        goldBonus : goldBonus_,
        chanceABonus : ((Math.random() * 100) + 1),
        //atts
        name : name_,
        growthFactor : ((Math.random() + 1)/6 + 1),
        rarity : 1,
        //statp
        points : 0,
        //prod
        expPer : 0, //exp percentage
        nextLevel : 10, //exp needed to next level
        exp : 1, // current exp, resets each level
        expPerClick : 1
    };
    heroCount ++;
    
    $('.otherherospace').append("<div class='heroline heroId" + (heroCount - 1) + "' id = '" + (heroCount - 1) + "'><span class='heroname heroId" + (heroCount - 1) + "' id = '" + (heroCount - 1) + "' > " + hero[heroCount - 1].name + "</span> <span class='herolevel'> Lvl <strong class='herolvl heroId" + (heroCount - 1) + "'>" + hero[heroCount - 1].level + "</strong></span></div>"); 
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
    $(".expperc").text(hero[hero_].exp);
    $(".nextLevel").text(hero[hero_].nextLevel);
    $(".exp").width(hero[hero_].expPer+'%');
    //set bonuses to active bonuses
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
    
    chance_ = [1, 2, 3, 4];
    chance__ = chance_[Math.floor(Math.random() * chance_.length)];
    switch(chance__){
        case 1:iron += Math.floor((Math.random() + 1) * (iron_));break;
        case 2:steel += Math.floor((Math.random() + 1) * (steel_));break;
        case 3:jewels += Math.floor((Math.random() + 1) * (jewels_));break;
        case 4:wood += Math.floor((Math.random() + 1) * (wood_));break;
        default:console.log("unhandled chance case"); break;
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
    

        
    var basePrice = Math.floor(((itemNameGen.indexOf(qualityName)+1)* (Math.random()+1) * (hero[selectedHero].level + hero[selectedHero].expBonus))/2);
        
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
        
    $(".goldCrafPrice").text(craftGoldPrice);
    $(".woodCrafPrice").text(craftWoodPrice);   
    $(".ironCrafPrice").text(craftIronPrice);   
    $(".steelCrafPrice").text(craftSteelPrice);    
    $(".jewelCrafPrice").text(craftJewelsPrice);
    
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
            
            $(".goldCoin").text(gold);
            $(".woodNum").text(wood);
            $(".ironNum").text(iron);
            $(".steelNum").text(steel);
            $(".jewelNum").text(jewels);
        }else{craftFailed = 1;}
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
        $(".mapTilesWrap").append('<div class="mapTile pos' + i +'"></div>');
    }
}
    
function genTile(x, y){
    map[x][y] = {
        tile : "grass"
    };
}
    
function genMap(){
    constructMapWindow(961);
    
    for(i = 0; i < 400; i++){
        for(j = 0; j < 400; j++){
        genTile(i, j);
        }
    }
    
    addMountainsToMap();
    addRiversToMap();
}
    
function mapAround(x, y){
    var around = [];
}
    
function addMountainsToMap(){
    for(i = 1; i <= 140; i++){
        var randomPosX = getRandomInt(0,399);
        var randomPosY = getRandomInt(0,399);
        var intensity = getRandomInt(1, 40);
        while(intensity > 0){
            for(j = randomPosX; j < randomPosX + intensity; j ++){
                for(k = randomPosY; k < randomPosY + intensity; k++){
                    if(j >= 0 && j < 100 && k >= 0 && k < 100) {map[j][k].tile = "mountain";}
                    intensity --;
                }
            }
        }
    }
}
    
function addRiversToMap(){
    for(i = 1; i <= 20; i++){
        var length = 0;
        var startPosX = getRandomInt(0,399);
        var startPosY = getRandomInt(0,399);
        
        var endPosX = getRandomInt(0, 399);
        var endPosY = getRandomInt(0, 399);
        
        var currentX = startPosX;
        var currentY = startPosY;
        
        while (currentX !== endPosX && currentY !== endPosY){
            map[currentX][currentY].tile = "river";
            if(currentX < endPosX){if(maybe()){currentX ++;}} else {if(maybe()){currentX --;}}
            if(currentY < endPosY){if(maybe()){currentY ++;}} else {if(maybe()){currentY --;}}
            length ++;
            if(length >= 30){var forceCont = 1; continue;}
        }
        if(forceCont){continue; forceCont = 0;}
    }
}
    
function drawMap(x, y){
    var pos = 1;
    while(pos <= 961){
        for (i = x - 15; i <= x + 15; i++){
            for (j = y - 15; j <= y + 15; j++){
            $(".mapTile.pos" + pos).css("background", "url('../imgs/mapTiles/tile_" + map[i][j].tile + ".png')");
            pos++;
            }
        }
    }
    
    lastMapPosX = x;
    lastMapPosY = y;
}
    
    //JQUERY

   $(document).ready(function(){

        //JQUERY//MAIN
       
    $("button").click(function(){
        gold += Math.floor(1 + hero[selectedHero].headItem.goldItem + hero[selectedHero].lefthandItem.goldItem + hero[selectedHero].righthandItem.goldItem + hero[selectedHero].chestItem.goldItem + hero[selectedHero].legsItem.goldItem + hero[selectedHero].bootItem.goldItem);

        $(".goldCoin").text(gold);
        
        if(minerCount > 0){findRes();}

        if(hero[selectedHero].exp < hero[selectedHero].nextLevel){
            hero[selectedHero].expPer = ((hero[selectedHero].exp*100)/hero[selectedHero].nextLevel).toFixed(2);
            hero[selectedHero].exp += hero[selectedHero].expPerClick + Math.floor(hero[selectedHero].expBonus) + hero[selectedHero].headItem.expItem + hero[selectedHero].lefthandItem.expItem + hero[selectedHero].righthandItem.expItem + hero[selectedHero].chestItem.expItem + hero[selectedHero].legsItem.expItem + hero[selectedHero].bootItem.expItem; //TEMP!
            $(".exp").width(hero[selectedHero].expPer+'%');
            $(".expperc").text(hero[selectedHero].exp);
        }
        if(hero[selectedHero].exp >= hero[selectedHero].nextLevel){ //levelup
            hero[selectedHero].exp = 1;
            hero[selectedHero].nextLevel = Math.floor(Math.pow(hero[selectedHero].nextLevel, 2)/((30 * hero[selectedHero].nextLevel * hero[selectedHero].growthFactor) / 100)); 
            $(".nextLevel").text(hero[selectedHero].nextLevel);
            hero[selectedHero].expPer = 0;
            $(".exp").width(hero[selectedHero].expPer+'%');
            hero[selectedHero].level++;
            hero[selectedHero].expBonus += (hero[selectedHero].expBonus)/2;
            hero[selectedHero].points += 5; //TO DO: ADD LEVEL UP WINDOW
            $(".level").text(hero[selectedHero].level);
            $(".expperc").text(hero[selectedHero].exp);
            $(".herolvl.heroId" + selectedHero).text(hero[selectedHero].level);
            $(".mherolvl").text(hero[selectedHero].level);
        }
        //needs update

        //ITEM CHANCES

        chance = Math.floor((Math.random() * 100) + 1);

        if(chance < hero[selectedHero].chanceABonus / 2){
            addRandomItemToInv(hero[selectedHero].rarity);
            unseenItems ++;
            $(".notify").addClass("visible");
            $(".notify").text(unseenItems);
            chance = 0;
        }
        
        $(".woodNum").text(wood);
        $(".ironNum").text(iron);
        $(".steelNum").text(steel);
        $(".jewelNum").text(jewels);
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
                    var newHeroName = $('.nameName').val();
                    console.log(newHeroName);
                    if(newHeroName !== null || newHeroName !== ''){
                        addHeroWithAtt(inventory[1], inventory[1], inventory[1], inventory[1], inventory[1], inventory[1], newHeroName, 1, 1, 1, 1, 1, 0);
            
                        gold -= up1Price;
                        $(".goldCoin").text(gold);
                        upgrade1 ++;
                        up1PriceFactor *= 1.15;
                        up1Price += Math.floor(up1PriceFactor);

                        hero[selectedHero].expPerClick ++;

                        $(".up1PriceGold").text(up1Price);
                        $(".plusOne").text(upgrade1);
                    }
                    $(".nameov").remove();
                    $(".namebox").remove();
                });
        }
        if(gold >= up1Price){
            $("#buyu1").text("Buy");
         }else{
            $("#buyu1").text("No Funds");
}
        

    });
       
    $("#buyu2").click(function(){
        addMiner();
        
        if(gold >= up2Price){
            $("#buyu2").text("Buy");
         }
        if(gold < up2Price){
            $("#buyu2").text("No Funds");
         }
        if(gold >= up2Price){
            gold -= up2Price;
            $(".goldCoin").text(gold);
            up2Price = Math.floor(up2Price * 1.6);
            $(".up2PriceGold").text(up2Price);
            //$(".autoClick").html('<i class="fa fa-check"></i>');
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
       
       addItemToInv("SWAP", "Sword", "noitem", 1, 0, 1, 0);
       addItemToInv("NOITEM", "Sword", "noitem", 1, 0, 1, 0);
       
        //JQUERY//HEROSYS
    
    addHeroWithAtt(inventory[1], inventory[1], inventory[1], inventory[1], inventory[1], inventory[1], "XENA", 1, 1, 1, 1, 1, 1);
    
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
       });
       $(".mapClose").click(function(){
          $(".mapov").fadeOut(100);
           $(".mapWindow").toggleClass("tgld");
       });
       $(".mapov").click(function(){
          $(".mapov").fadeOut(100);
           $(".mapWindow").toggleClass("tgld");
       });
       
        genMap(); drawMap(40, 40);
       
       $(".mpu").click(function(){
           if(lastMapPosX - 1 >= 16){drawMap(lastMapPosX - 1, lastMapPosY);}
       });
       $(".mpd").click(function(){
           if(lastMapPosX + 1 < 384){drawMap(lastMapPosX + 1, lastMapPosY);}
       });
       $(".mpl").click(function(){
           if(lastMapPosY - 1 >= 16){drawMap(lastMapPosX, lastMapPosY - 1);}
       });
       $(".mpr").click(function(){
          if(lastMapPosY + 1 < 384){drawMap(lastMapPosX, lastMapPosY + 1);}
       });
       
   });
})(window, window.jQuery);