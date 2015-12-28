(function (window, $) {
    
        //INIT & OTHER
    
        //VARIABLES
    
    //func specific
    
var goldCoinCount = 0;
var silverCoinCount = 0;
var copperCoinCount = 0;
    
var clickCount = 0;
var addHelp = 0; //each 15, +1Copper
var upgrade1 = 0; //count of up1 
var upgrade2 = 0; 

var up1Price= 5;
var up1PriceFactor = 1;
var up2Price= 50;
    
var intervalID = window.setInterval(myCallback, 2000);
    
var balance = 0;

var unseenItems = 0;
    //inventory specific
    
var invCapacity = 5; //total capacity of player's inventory
var invCount = 0; //items in inv atm

var inventory = new Array();
    
var itemNameGen = ['Broken', 'Old', 'Tattered', 'Cheap', 'New', 'Well Made', 'Rare', 'Legendary']; //use index to decide quality
var types = ['Sword', 'Axe', 'Spear', 'Bow'];
var slots = ['headItem', 'lefthandItem', 'righthandItem', 'chestItem', 'legsItem', 'bootItem'];
var equipedItems = ['empty', 'empty', 'empty', 'empty', 'empty', 'empty'];
var page = 1;
    
var TYPE;
var selectedItem;

var equipLeft = 0;
var equipRight = 0;
    //hero sys specific
    
var heroCount = 0; //first hero id = 0
    
var line = new Array ();

var hero = new Array ();
    
var selectedHero;
        //FUNCTIONS
    //func specific
    
    function myCallback() {
    if(upgrade2 == 1){
         clickCount = clickCount + 1;
         addHelp= addHelp + 1;
         $(".clickz").text(clickCount);
    }
}

function getBalance(g, s, c){
    return (g * 100 + s * 10 + c);
}
    
function sepGold(total){
    var g;
    g = Math.floor(total/100);
    return g;
}

function sepSilver(total){
    var g;
    g = Math.floor(total/100);
    total -= g*100;
    var s;
    s = Math.floor(total/10);
    total -= s*10;
    return s;
}

function sepCopper(total){
    var g;
    g = Math.floor(total/100);
    total -= g*100;
    var s;
    s = Math.floor(total/10);
    total -= s*10;
    return total;
}
    
    //inventory specific
    
function drawItem(i, pos){ //i - itemID; pos - positions
    $(".invItem.".concat("pos", pos)).text((inventory[i].name).concat("\n", inventory[i].expItem + " | " + inventory[i].goldItem)).toggleClass("item_" + inventory[i].imageClass);
    $(".invItem.".concat("pos", pos)).attr("id", i);
}

function drawEmpty(pos){
    $(".invItem.".concat("pos", pos)).text("");
}

function drawInvPage(x){
    firstPos = x * 36;
    lastPos = ((x + 1) * 36); //last pos of the x page
    for(i = firstPos ; i < lastPos; i++){
         drawItem(i, i - (x * 36));
        for (j = (i - ((x * 36) - 1)); j < lastPos; j++){
            drawEmpty(j);
        }
    }
    
    selectedPage = x;
}
    
function selectType(TYPE_) {
    console.log(TYPE_);
    if (TYPE_ == "Sword" || TYPE_ == "Axe" || TYPE_ == "Spear" || TYPE_ == "Bow"){
        return 1;
    }
}
function selectHand() {
    if(equipLeft){inventory[selectedItem].slot = 1;}
    if(equipRight){inventory[selectedItem].slot = 2;}
}

function addRandomItemToInv(rarity_){
    var TYPE = types[Math.floor(Math.random() * types.length)];
    var ADDTYPE = itemNameGen[Math.floor(Math.random() * itemNameGen.length)];
    var item_slot;
    
    item_slot = selectType(TYPE);
    console.log(item_slot);
    
    addItemToInv(ADDTYPE + ' ' + TYPE, "", TYPE + "_1", (((itemNameGen.indexOf(ADDTYPE)+1)* (Math.random()+1) * (hero[selectedHero].lvlnum + hero[selectedHero].clickABonus))/2).toFixed(0), (((itemNameGen.indexOf(ADDTYPE)+1)* (Math.random()+1) * (hero[selectedHero].lvlnum + hero[selectedHero].goldABonus))/3).toFixed(0), item_slot);
}
    
    
function addItemToInv(name_, type_, image_, expItem_, goldItem_, slot_){
    inventory[invCount] = 
        {
        name : name_,
        type : type_,
        imageClass : image_,
        equiped : 0,
        expItem : expItem_,
        goldItem : goldItem_,
        equiped : "X", //which hero is equipped with it; "X" for NoOne
        slot : slot_
    };
    invCount ++;
}

function refreshInv(){
    $(".invItemWrap").empty();
    $(".invItemWrap").append('<div id = "x" class="invItem pos0"></div><div id = "x" class="invItem pos1"></div><div id = "x" class="invItem pos2"></div><div id = "x" class="invItem pos3"></div><div id = "x" class="invItem pos4"></div><div id = "x" class="invItem pos5"></div><div id = "x" class="invItem pos6"></div><div id = "x" class="invItem pos7"></div><div id = "x" class="invItem pos8"></div><div id = "x" class="invItem pos9"></div><div id = "x" class="invItem pos10"></div><div id = "x" class="invItem pos11"></div><div id = "x" class="invItem pos12"></div><div id = "x" class="invItem pos13"></div><div id = "x" class="invItem pos14"></div><div id = "x" class="invItem pos15"></div><div id = "x" class="invItem pos16"></div><div id = "x" class="invItem pos17"></div><div id = "x" class="invItem pos18"></div><div id = "x" class="invItem pos19"></div><div id = "x" class="invItem pos20"></div><div id = "x" class="invItem pos21"></div><div id = "x" class="invItem pos22"></div><div id = "x" class="invItem pos23"></div><div id = "x" class="invItem pos24"></div><div id = "x" class="invItem pos25"></div><div id = "x" class="invItem pos26"></div><div id = "x" class="invItem pos27"></div><div id = "x" class="invItem pos28"></div><div id = "x" class="invItem pos29"></div><div id = "x" class="invItem pos30"></div><div id = "x" class="invItem pos31"></div><div id = "x" class="invItem pos32"></div><div id = "x" class="invItem pos33"></div><div id = "x" class="invItem pos34"></div><div id = "x" class="invItem pos35"></div>');
    }
    
function refreshEq(){
    $(".eqp").empty();
    $(".eqp").append('<center><div id = "eqidlh" class="eqlh leftH item_' + hero[selectedHero].lefthandItem + '"> lefTH </div><div id = "eqidrh" class="eqrh rightH item_' + hero[selectedHero].righthandItem + '"> rightH</div> <div id = "eqidface" class="eq face item_' + hero[selectedHero].headItem + '"> Face </div> <div id = "eqidchest" class="eq chest item_' + hero[selectedHero].chestItem + '"> Chest </div> <div id = "eqidleg" class="eq legging item_' + hero[selectedHero].legsItem + '"> Legging </div> <div id = "eqidboot" class="eq boots item_' + hero[selectedHero].bootItem + '"> Boots </div></center>');
}
    
function equip(item){
    if(inventory[item].slot == 1){
        selectHand();
    }
    switch (inventory[item].slot){
        case 0: hero[selectedHero].headItem = inventory[item].imageClass; break;
        case 1: hero[selectedHero].lefthandItem = inventory[item].imageClass; break;
        case 2: hero[selectedHero].righthandItem = inventory[item].imageClass; break;
        case 3: hero[selectedHero].chestItem = inventory[item].imageClass; break;
        case 4: hero[selectedHero].legsItem = inventory[item].imageClass; break;
        case 5: hero[selectedHero].bootItem = inventory[item].imageClass; break;
        default: console.log("unhandled equip() case"); break;
    }
    refreshEq();
    
    if(equipedItems[inventory[item].slot].equiped == "empty"){
        equipedItems[inventory[item].slot].name = inventory[item].name;
        equipedItems[inventory[item].slot].type = inventory[item].type;
        equipedItems[inventory[item].slot].imageClass = inventory[item].imageClass;
        equipedItems[inventory[item].slot].equiped = inventory[item].equiped;
        equipedItems[inventory[item].slot].expItem = inventory[item].expItem;
        equipedItems[inventory[item].slot].goldItem = inventory[item].expItem.goldItem;
        equipedItems[inventory[item].slot].equiped = "full";
        equipedItems[inventory[item].slot].slot = inventory[item].expItem.slot;
    }
    if(equipedItems[inventory[item].slot].equiped != "empty"){
        inventory[invCount].name = equipedItems[inventory[item].slot];
        inventory[invCount].type = equipedItems[inventory[item].slot];
        inventory[invCount].imageClass = equipedItems[inventory[item].slot];
        inventory[invCount].equiped = equipedItems[inventory[item].slot];
        inventory[invCount].expItem = equipedItems[inventory[item].slot];
        inventory[invCount].goldItem = equipedItems[inventory[item].slot];
        inventory[invCount].equiped = equipedItems[inventory[item].slot];
        inventory[invCount].slot = equipedItems[inventory[item].slot];
        invCount ++;
        equipedItems[inventory[item].slot].equiped = "empty";
    }
    
    equipLeft = 0;
    equipRight = 0;
    inventory.splice(selectedItem, 1);
    $(".wsEqhands").fadeOut(100);
    
    refreshInv();
    drawInvPage(page - 1);
}
    
function equipMan(x){
    if(inventory[selectedItem].slot == 1 || inventory[selectedItem].slot == 2){
                $(".wsEqov").empty();
                $(".wsEqov").append('<div class="wsEqhands" style="display: none;"><div class="wsEqL"> Equip Left Hand</div><div class="wsEqR"> Equip Right Hand</div></div>');
                $(".wsEqhands").fadeIn(100);
                $(".wsEqL").click(function(){
                    equipLeft = 1;
                    equip(selectedItem);
                    //refreshInv();
                    //drawInvPage(x);
                });
                $(".wsEqR").click(function(){
                    equipRight = 1;
                    equip(selectedItem);
                    refreshInv();
                    drawInvPage(x);
                });
            }
            else{
                $(".wsEqov").empty();
                $(".wsEqov").append('<div class="wsEq" style="display: none;">EQUIP</div>');
                $(".wsEq").fadeIn(100); 
                $(".wsEq").click(function(){
                    equip(selectedItem);
                    //refreshInv();
                    //drawInvPage(x);
                });
            }
}
    //hero sys specific
    
function addHeroWithAtt(headItem_, lefthandItem_, righthandItem_, chestItem_, legsItem_, bootItem_, name_, lvlnum_, goldABonus_, clickIBonus_, goldIBonus_, chanceIBonus_, active_){
    hero[heroCount] = 
        {
        headItem : headItem_,
        lefthandItem : lefthandItem_,
        righthandItem : righthandItem_, //noitem placeholder for the css class
        chestItem : chestItem_,
        legsItem : legsItem_,
        bootItem : bootItem_,
        active : active_,
        lvlnum : lvlnum_,
        //active
        clickABonus : 1,
        goldABonus : goldABonus_,
        chanceABonus : ((Math.random() * 100) + 1),
        //inactive
        clickIBonus : clickIBonus_,
        goldIBonus : goldIBonus_,
        chanceIBonus : chanceIBonus_,
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
    
    $('.otherherospace').append("<div class='heroline heroId" + (heroCount - 1) + "' id = '" + (heroCount - 1) + "'><span class='heroname heroId" + (heroCount - 1) + "' id = '" + (heroCount - 1) + "' > " + hero[heroCount - 1].name + "</span> <span class='herolevel'> Lvl <strong class='herolvl heroId" + (heroCount - 1) + "'>" + hero[heroCount - 1].lvlnum + "</strong></span></div>"); 
}

function selectHero(hero_){
    $(".eqp").empty;
    $(".eqp").append('<center><div id = "eqidlh" class="eqlh leftH"> lefTH </div><div id = "eqidrh" class="eqrh rightH"> rightH</div> <div id = "eqidface" class="eq face"> Face </div> <div id = "eqidchest" class="eq chest"> Chest </div> <div id = "eqidleg" class="eq legging"> Legging </div> <div id = "eqidboot" class="eq boots"> Boots </div></center>');
    $(".eq.face").toggleClass("item_" + hero[hero_].headItem); hero[hero_].headItem.equipped = hero_;
    $(".eqlh.leftH").toggleClass("item_" + hero[hero_].lefthandItem); hero[hero_].lefthandItem.equipped = hero_;
    $(".eqrh.rightH").toggleClass("item_" + hero[hero_].righthandItem); hero[hero_].righthandItem.equipped = hero_;
    $(".eq.chest").toggleClass("item_" + hero[hero_].chestItem); hero[hero_].chestItem.equipped = hero_;
    $(".eq.legging").toggleClass("item_" + hero[hero_].legsItem); hero[hero_].legsItem.equipped = hero_;
    $(".eq.boots").toggleClass("item_" + hero[hero_].bootItem); hero[hero_].bootItem.equipped = hero_;
    $(".mheroname").text(hero[hero_].name);
    $(".mherolvl").text(hero[hero_].lvlnum);
    selectedHero = hero_;
    $(".lvlnum").text(hero[hero_].lvlnum);
    $(".expperc").text(hero[hero_].exp);
    $(".nextLevel").text(hero[hero_].nextLevel);
    $(".exp").width(hero[hero_].expPer+'%');
    //set bonuses to active bonuses
}
    
        //JQUERY
    
    $(document).ready(function(){
        
            //GENERAL FUNC
        
        $("button").click(function(){
            clickCount = Math.floor(clickCount + 1 + hero[selectedHero].clickABonus);
            addHelp = Math.floor(addHelp + 1 + hero[selectedHero].clickABonus);
            $(".clickz").text(clickCount);
            
            if(hero[selectedHero].exp < hero[selectedHero].nextLevel){
                hero[selectedHero].expPer = ((hero[selectedHero].exp*100)/hero[selectedHero].nextLevel).toFixed(2);
                hero[selectedHero].exp += Math.floor(hero[selectedHero].expPerClick + hero[selectedHero].clickABonus); //TEMP!
                $(".exp").width(hero[selectedHero].expPer+'%');
                $(".expperc").text(hero[selectedHero].exp);
            }
            if(hero[selectedHero].exp >= hero[selectedHero].nextLevel){ //levelup
                hero[selectedHero].exp = 1;
                hero[selectedHero].nextLevel = Math.floor(Math.pow(hero[selectedHero].nextLevel, 2)/((30 * hero[selectedHero].nextLevel * hero[selectedHero].growthFactor) / 100)); 
                $(".nextLevel").text(hero[selectedHero].nextLevel);
                hero[selectedHero].expPer = 0;
                $(".exp").width(hero[selectedHero].expPer+'%');
                hero[selectedHero].lvlnum++;
                hero[selectedHero].clickABonus += (hero[selectedHero].clickABonus)/2;
                hero[selectedHero].points += 5; //TO DO: ADD LEVEL UP WINDOW
                $(".lvlnum").text(hero[selectedHero].lvlnum);
                $(".expperc").text(hero[selectedHero].exp);
                $(".herolvl.heroId" + selectedHero).text(hero[selectedHero].lvlnum);
                $(".mherolvl").text(hero[selectedHero].lvlnum);
            }
            //needs update
            if(addHelp >= 15){
                copperCoinCount ++ ;
                copperCoinCount += Math.floor(addHelp/15) - 1;
                addHelp = 0;
                $(".copperCoin").text(copperCoinCount); 
            }
            
            if(copperCoinCount >= 10){
                silverCoinCount ++;
                silverCoinCount += Math.floor(copperCoinCount/10) - 1;
                copperCoinCount -= Math.floor(copperCoinCount/10) * 10;
                $(".copperCoin").text(copperCoinCount);
                $(".silverCoin").text(silverCoinCount);
            }
            if(silverCoinCount >= 10){
                goldCoinCount ++;
                goldCoinCount += Math.floor(silverCoinCount/10) - 1;
                silverCoinCount -= Math.floor(silverCoinCount/10) *10;
                $(".silverCoin").text(silverCoinCount);
                $(".goldCoin").text(goldCoinCount);
            }
            
            //ITEM CHANCES
            
            chance = Math.floor((Math.random() * 100) + 1);
            
            //if(chance < hero[selectedHero].chanceABonus / 14){
            if(1){
                addRandomItemToInv(hero[selectedHero].rarity);
                unseenItems ++;
                $(".notify").addClass("visible");
                $(".notify").text(unseenItems);
                chance = 0;
            }
        });
        
        $(".shop").click(function(){
            if((getBalance(goldCoinCount, silverCoinCount, copperCoinCount) >= up1Price)){
                $("#buyu1").text("Buy");
             }else{
                $("#buyu1").text("No Funds");
            }
            if((getBalance(goldCoinCount, silverCoinCount, copperCoinCount) >= up2Price && upgrade2 == 0)){
                $("#buyu2").text("Buy");
             }else if((getBalance(goldCoinCount, silverCoinCount, copperCoinCount) >= up1Price < up2Price && upgrade2 == 0)){
                $("#buyu2").text("No Funds");
             }else if(upgrade2 == 1){
                 $("#buyu2").text("Owned");
             }
            
            //TEMP
            $(".up1PriceCopper").text(sepCopper(up1Price));
            $(".up1PriceSilver").text(sepSilver(up1Price));
            $(".up1PriceGold").text(sepGold(up1Price));
        });
        $("#buyu1").click(function(){
            if(getBalance(goldCoinCount, silverCoinCount, copperCoinCount) >= up1Price){
                balance = getBalance(goldCoinCount, silverCoinCount, copperCoinCount);
                balance -= up1Price;
                copperCoinCount = sepCopper(balance);
                silverCoinCount = sepSilver(balance);
                goldCoinCount = sepGold(balance);
                $(".silverCoin").text(silverCoinCount);
                $(".goldCoin").text(goldCoinCount);
                $(".copperCoin").text(copperCoinCount);
                upgrade1= upgrade1 + 1;
                up1PriceFactor *= 1.15;
                up1Price += Math.floor(up1PriceFactor);
                
                hero[selectedHero].expPerClick ++;
                
                var priceGold = sepGold(up1Price);
                var priceSilver = sepSilver(up1Price);
                var priceCopper = sepCopper(up1Price);
                $(".up1PriceGold").text(priceGold);
                $(".up1PriceSilver").text(priceSilver);
                $(".up1PriceCopper").text(priceCopper);
                //$(".up1MarketPrice").text(up1Price);
                $(".plusOne").text(upgrade1);
            }
            if((getBalance(goldCoinCount, silverCoinCount, copperCoinCount) >= up1Price)){
                $("#buyu1").text("Buy");
             }else{
                $("#buyu1").text("No Funds");
    }
            if((getBalance(goldCoinCount, silverCoinCount, copperCoinCount) >= up2Price && upgrade2 == 0)){
                $("#buyu2").text("Buy");
             }else if((getBalance(goldCoinCount, silverCoinCount, copperCoinCount) < up2Price && upgrade2 == 0)){
                $("#buyu2").text("No Funds");
             }else if(upgrade2 == 1){
                 $("#buyu2").text("Owned");
             }
            if(getBalance(goldCoinCount, silverCoinCount, copperCoinCount) >= up2Price && $("#buyu2").text()!=="Owned"){
                balance = getBalance(goldCoinCount, silverCoinCount, copperCoinCount);
                balance -= up2Price;
                copperCoinCount = sepCopper(balance);
                silverCoinCount = sepSilver(balance);
                goldCoinCount = sepGold(balance);
                $(".silverCoin").text(silverCoinCount);
                $(".goldCoin").text(goldCoinCount);
                $(".copperCoin").text(copperCoinCount);
                upgrade2 = 1;
                $(".autoClick").html('<i class="fa fa-check"></i>');
            }
        
        });
        
            //WINDOWS
        
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
    $(".inventory").click(function(){
        refreshInv();
        $(".invItem").click(function(){
            //$(this).addClass("inuse"); drawInvPage(page);
            selectedItem = $(this).attr("id");
            equipMan(0);
    });
        $(".equipmentov").fadeIn(100);
        $(".allpag").text( Math.floor( invCount / 36) + 1);
        $(".eiov").fadeIn(100);
        $(".equipment").toggleClass("tgld");
        $(".weaponstats").toggleClass("tgld");
        $(".invWindowOv").fadeIn(100);
        $(".invWindow").toggleClass("invtgld");
    });
        //$("#closei").click(function(){
       // $(".eiov").fadeOut(200);
       // $(".equipmentov").fadeOut(200);
       // $(".equipment").toggleClass("tgld");
       // $(".invWindowOv").fadeOut(200);
       // $(".invWindow").toggleClass("invtgld");
       // drawInvPage(0);
   // });
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
       // $(".eqToggle").click(function(){
        //$(".equipmentov").fadeIn(100);
        //$(".equipment").toggleClass("tgld");
   // });
    $(".equipmentov").click(function(){
        $(".invItemWrap").empty();
        $(".eiov").fadeOut(200);
        $(".equipmentov").fadeOut(200);
        $(".equipment").toggleClass("tgld");
        $(".weaponstats").toggleClass("tgld");
        $(".invWindowOv").fadeOut(200);
        $(".invWindow").toggleClass("invtgld");
        $(".curpag").text("1");
        page=1;
        drawInvPage(0);
            
    });
       
        
            //INVENTORY
        
    $(".inventory").click(function(){
        
        drawInvPage(0);
    });
    
    $("#invNextPage").click(function(){
        if( invCount > page * 36 ){
        refreshInv()
        ++page;
        $(".curpag").text(page);
        drawInvPage(page - 1);
        $(".invItem").click(function(){
            //$(this).addClass("inuse"); drawInvPage(page);
            selectedItem = $(this).attr("id");
            equipMan(page - 1);
            });
        }
    });
    $("#invPrevPage").click(function(){
        if(page > 1){
            refreshInv();
        --page;
        $(".curpag").text(page);
        drawInvPage(page - 1);
        $(".invItem").click(function(){
            //$(this).addClass("inuse"); drawInvPage(page);
            selectedItem = $(this).attr("id");
            equipMan(page - 1);
        });
        }
    });
        
            //HEROSYS
        
    addHeroWithAtt("axe_1", "axe_1", "axe_1", "axe_1", "axe_1", "axe_1", "XENA", 1, 1, 1, 1, 1, 1);
    
    $(".eqp").empty();
        selectHero(0);
    $(".heroline.heroId0").removeClass("selected");
    $(".heroline.heroId0").toggleClass("selected");
        
   $(".heroline").click(function() {
       $(".eqp").empty();
       selectHero($(this).attr("id"));
       $(".heroline").removeClass("selected");
       $(this).toggleClass("selected");
        });
});
})(window, window.jQuery);