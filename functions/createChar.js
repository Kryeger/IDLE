var chHair = 1; chHairCount = 13;// 13 types
var chEyes = 1; chEyesCount = 11;//11 types
var chNose = 1; chNoseCount = 4;//4 types
var chMouth = 1; chMouthCount = 5;//5 types
var chBeard = 1; chBeardCount = 9;//9 types

var gender = "/male";
var skin = "/a";
 
function charRefresh(){
    chHair = 1;
    chEyes = 1;
    chNose = 1;
    chMouth = 1;
    chBeard = 1;
    $(".bodylayout").css("background-image", "url('../imgs/charcreate/character"+gender+skin+"/body_layout.png')");
    $(".chhair").css("background-image", "url('../imgs/charcreate/character"+gender+skin+"/hair_"+chHair+".png')");
    $(".cheyes").css("background-image", "url('../imgs/charcreate/character"+gender+skin+"/eyes_"+chEyes+".png')");
    $(".chnose").css("background-image", "url('../imgs/charcreate/character"+gender+skin+"/nose_"+chNose+".png')");
    $(".chmouth").css("background-image", "url('../imgs/charcreate/character"+gender+skin+"/mouth_"+chMouth+".png')");
    $(".chbeard").css("background-image", "url('../imgs/charcreate/character"+gender+skin+"/beard_"+chBeard+".png')");
}

$(document).ready(function(){
    //changes
    
    $(".charGender").click(function(){
       $(".charGender").removeClass("tgld");
        $(this).addClass("tgld");
        gender = $(this).attr("data-gender");
        switch (gender){
            case '/male':
                $(".beard-acc").text("Beard");
                $("#beard-acc-prv").attr("class","charPrev prevbeard");
                $("#beard-acc-nxt").attr("class","charNext nextbeard");
                break;
            case '/female':
                $(".beard-acc").text("Accessories");
                $("#beard-acc-prv").attr("class","charPrev prevaccess");
                $("#beard-acc-nxt").attr("class","charNext nextaccess");
                break;
        }
        charRefresh();
    });
    
    //eyes menu
    
    $('.nexteye').click(function(){
       if( chEyes < 12 ){
           chEyes++;
           $(".cheyes").css("background-image","url('../imgs/charcreate/character"+gender+skin+"/eyes_"+ chEyes +".png')");
       }
        if( chEyes == 12 ){
           $(".cheyes").css("background-image","url('../imgs/charcreate/character"+gender+skin+"/eyes_1.png')");
           chEyes=1;
       }
    });
     $('.preveye').click(function(){
        
       if( chEyes > 1 ){
           chEyes--;
           $(".cheyes").css("background-image","url('../imgs/charcreate/character"+gender+skin+"/eyes_"+ chEyes +".png')");
       }
         if( chEyes == 1 ){
             chEyes = 11;
             $(".cheyes").css("background-image","url('../imgs/charcreate/character"+gender+skin+"/eyes_"+ chEyes +".png')");
         }
         
    });
    //nose menu
    
    $('.nextnose').click(function(){
       if( chNose < 5 ){
           chNose++;
           $(".chnose").css("background-image","url('../imgs/charcreate/character"+gender+skin+"/nose_"+ chNose +".png')");
       }
        if( chNose == 5 ){
           $(".chnose").css("background-image","url('../imgs/charcreate/character"+gender+skin+"/nose_1.png')");
           chNose=1;
       }
    });
     $('.prevnose').click(function(){
        
       if( chNose > 1 ){
           chNose--;
           $(".chnose").css("background-image","url('../imgs/charcreate/character"+gender+skin+"/nose_"+ chNose +".png')");
       }
         if( chNose == 1 ){
             chNose = 4;
             $(".chnose").css("background-image","url('../imgs/charcreate/character"+gender+skin+"/nose_"+ chEyes +".png')");
         }
         
    });
    
    //nose menu
    
    $('.nextmouth').click(function(){
       if( chMouth < 6 ){
           chMouth++;
           $(".chmouth").css("background-image","url('../imgs/charcreate/character"+gender+skin+"/mouth_"+ chMouth +".png')");
       }
        if( chMouth == 6 ){
           $(".chmouth").css("background-image","url('../imgs/charcreate/character"+gender+skin+"/mouth_1.png')");
           chMouth=1;
       }
    });
     $('.prevmouth').click(function(){
        
       if( chMouth > 1 ){
           chMouth--;
           $(".chmouth").css("background-image","url('../imgs/charcreate/character"+gender+skin+"/mouth_"+ chMouth +".png')");
       }
         if( chMouth == 1 ){
             chMouth = 5;
             $(".chmouth").css("background-image","url('../imgs/charcreate/character"+gender+skin+"/mouth_"+ chMouth +".png')");
         }
         
    });
    //beard menu
    
    $('.nextbeard').click(function(){
       if( chBeard < 10 ){
           chBeard++;
           $(".chbeard").css("background-image","url('../imgs/charcreate/character"+gender+skin+"/beard_"+ chBeard +".png')");
       }
        if( chBeard == 10 ){
           $(".chbeard").css("background-image","url('../imgs/charcreate/character"+gender+skin+"/beard_1.png')");
           chBeard=1;
       }
    });
     $('.prevbeard').click(function(){
        
       if( chBeard > 1 ){
           chBeard--;
           $(".chbeard").css("background-image","url('../imgs/charcreate/character"+gender+skin+"/beard_"+ chBeard +".png')");
       }
         if( chBeard == 1 ){
             chBeard = 9;
             $(".chbeard").css("background-image","url('../imgs/charcreate/character"+gender+skin+"/beard_"+ chBeard +".png')");
         }
         
    });
    
    //hair menu
    
    $('.nexthair').click(function(){
       if( chHair < 14 ){
           chHair++;
           $(".chhair").css("background-image","url('../imgs/charcreate/character"+gender+skin+"/hair_"+ chHair +".png')");
       }
        if( chHair == 14 ){
           $(".chhair").css("background-image","url('../imgs/charcreate/character"+gender+skin+"/hair_1.png')");
           chHair=1;
       }
    });
     $('.prevhair').click(function(){
       if( chHair >= 2 ){
           chHair--;
           $(".chhair").css("background-image","url('../imgs/charcreate/character"+gender+skin+"/hair_"+ chHair +".png')");
       }

         if( chHair == 1 ){
             chHair = 13;
             $(".chhair").css("background-image","url('../imgs/charcreate/character"+gender+skin+"/hair_"+ chHair +".png')");

         }
         
    });
});