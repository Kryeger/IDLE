var chHair = 1; chHairCount = 7;// 7 types
var chEyes = 1; chEyesCount = 10;//10 types
var chNose = 1; chNoseCount = 4;//4 types
var chMouth = 1; chMouthCount = 4;//4 types
var chBeard = 1; chBeardCount = 5;//5 types

chHairArr = [1, 2, 3, 4, 5, 6, 7];
chEyesArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
chNoseArr = [1, 2, 3, 4];
chMouthArr = [1, 2, 3, 4];
chBeardArr = [1, 2, 3, 4, 5];
 
$(document).ready(function(){
    
    //eyes menu
    
    $('.nexteye').click(function(){
       if( chEyes < 11 ){
           chEyesCode="eyes_".concat(chEyes);
           $('.cheyes').toggleClass(chEyesCode);
           chEyes++;
           chEyesCode="eyes_".concat(chEyes);
           $('.cheyes').toggleClass(chEyesCode);
       }
        if( chEyes == 11 ){
           chEyesCode="eyes_".concat(chEyes);
           $('.cheyes').toggleClass(chEyesCode);
           chEyes=1;
           chEyesCode="eyes_".concat(chEyes);
           $('.cheyes').toggleClass(chEyesCode);
       }
    });
     $('.preveye').click(function(){
        
       if( chEyes > 1 ){
           chEyesCode="eyes_".concat(chEyes);
           $('.cheyes').toggleClass(chEyesCode);
           chEyes--;
           chEyesCode="eyes_".concat(chEyes);
           $('.cheyes').toggleClass(chEyesCode);
       }
         if( chEyes == 1 ){
             chEyes = 10;
             $('.cheyes').toggleClass("eyes_1");
             chEyesCode="eyes_".concat(chEyes);
           $('.cheyes').toggleClass(chEyesCode);
         }
         
    });
    //nose menu
    
    $('.nextnose').click(function(){
       if( chNose < 5 ){
           chNoseCode="nose_".concat(chNose);
           $('.chnose').toggleClass(chNoseCode);
           chNose++;
           chNoseCode="nose_".concat(chNose);
           $('.chnose').toggleClass(chNoseCode);
       }
        if( chNose == 5 ){
           chEyesCode="nose_".concat(chNose);
           $('.chnose').toggleClass(chEyesCode);
           chNose=1;
           chNoseCode="nose_".concat(chNose);
           $('.chnose').toggleClass(chNoseCode);
       }
    });
     $('.prevnose').click(function(){
        
       if( chNose > 1 ){
           chNoseCode="nose_".concat(chNose);
           $('.chnose').toggleClass(chNoseCode);
           chNose--;
           chNoseCode="nose_".concat(chNose);
           $('.chnose').toggleClass(chNoseCode);
       }
         if( chNose == 1 ){
             chNose = 4;
             $('.chnose').toggleClass("nose_1");
             chNoseCode="nose_".concat(chNose);
           $('.chnose').toggleClass(chNoseCode);
         }
         
    });
    
    //nose menu
    
    $('.nextmouth').click(function(){
       if( chMouth < 5 ){
           chMouthCode="mouth_".concat(chMouth);
           $('.chmouth').toggleClass(chMouthCode);
           chMouth++;
           chMouthCode="mouth_".concat(chMouth);
           $('.chmouth').toggleClass(chMouthCode);
       }
        if( chMouth == 5 ){
           chMouthCode="mouth_".concat(chMouth);
           $('.chmouth').toggleClass(chMouthCode);
           chMouth=1;
           chMouthCode="mouth_".concat(chMouth);
           $('.chmouth').toggleClass(chMouthCode);
       }
    });
     $('.prevmouth').click(function(){
        
       if( chMouth > 1 ){
           chMouthCode="mouth_".concat(chMouth);
           $('.chmouth').toggleClass(chMouthCode);
           chMouth--;
           chMouthCode="mouth_".concat(chMouth);
           $('.chmouth').toggleClass(chMouthCode);
       }
         if( chMouth == 1 ){
             chMouth = 4;
             $('.chmouth').toggleClass("mouth_1");
             chMouthCode="mouth_".concat(chMouth);
           $('.chmouth').toggleClass(chMouthCode);
         }
         
    });
    //beard menu
    
    $('.nextbeard').click(function(){
       if( chBeard < 6 ){
           chBeardCode="beard_".concat(chBeard);
           $('.chbeard').toggleClass(chBeardCode);
           chBeard++;
           chBeardCode="beard_".concat(chBeard);
           $('.chbeard').toggleClass(chBeardCode);
       }
        if( chBeard == 6 ){
           chBeardCode="beard_".concat(chBeard);
           $('.chbeard').toggleClass(chBeardCode);
           chBeard=1;
           chBeardCode="beard_".concat(chBeard);
           $('.chbeard').toggleClass(chBeardCode);
       }
    });
     $('.prevbeard').click(function(){
        
       if( chBeard > 1 ){
           chBeardCode="beard_".concat(chBeard);
           $('.chbeard').toggleClass(chBeardCode);
           chBeard--;
           chBeardCode="beard_".concat(chBeard);
           $('.chbeard').toggleClass(chBeardCode);
       }
         if( chBeard == 1 ){
             chBeard = 5;
             $('.chbeard').toggleClass("beard_1");
             chBeardCode="beard_".concat(chBeard);
           $('.chbeard').toggleClass(chBeardCode);
         }
         
    });
    
    //hair menu
    
    $('.nexthair').click(function(){
       if( chHair < 8 ){
           chHairCode="hair_".concat(chHair);
           $('.chhair').toggleClass(chHairCode);
           chHair++;
           chHairCode="hair_".concat(chHair);
           $('.chhair').toggleClass(chHairCode);
       }
        if( chHair == 8 ){
           chHairCode="hair_".concat(chHair);
           $('.chhair').toggleClass(chHairCode);
           chHair=1;
           chHairCode="hair_".concat(chHair);
           $('.chhair').toggleClass(chHairCode);
       }
    });
     $('.prevhair').click(function(){
        
       if( chHair > 1 ){
           chHairCode="hair_".concat(chHair);
           $('.chhair').toggleClass(chHairCode);
           chHair--;
           chHairCode="hair_".concat(chHair);
           $('.chhair').toggleClass(chHairCode);
       }
         if( chHair == 1 ){
             chHair = 7;
             $('.chhair').toggleClass("hair_1");
             chHairCode="hair_".concat(chHair);
           $('.chhair').toggleClass(chHairCode);
         }
         
    });
});