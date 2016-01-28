var chHair = 1; chHairCount = 11;// 11 types
var chEyes = 1; chEyesCount = 11;//11 types
var chNose = 1; chNoseCount = 4;//4 types
var chMouth = 1; chMouthCount = 5;//5 types
var chBeard = 1; chBeardCount = 7;//7 types

chHairArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
chEyesArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
chNoseArr = [1, 2, 3, 4];
chMouthArr = [1, 2, 3, 4, 5];
chBeardArr = [1, 2, 3, 4, 5, 6, 7];
 
$(document).ready(function(){
    
    //eyes menu
    
    $('.nexteye').click(function(){
       if( chEyes < 12 ){
           chEyesCode="eyes_".concat(chEyes);
           $('.cheyes').toggleClass(chEyesCode);
           chEyes++;
           chEyesCode="eyes_".concat(chEyes);
           $('.cheyes').toggleClass(chEyesCode);
       }
        if( chEyes == 12 ){
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
             chEyes = 11;
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
       if( chMouth < 6 ){
           chMouthCode="mouth_".concat(chMouth);
           $('.chmouth').toggleClass(chMouthCode);
           chMouth++;
           chMouthCode="mouth_".concat(chMouth);
           $('.chmouth').toggleClass(chMouthCode);
       }
        if( chMouth == 6 ){
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
             chMouth = 5;
             $('.chmouth').toggleClass("mouth_1");
             chMouthCode="mouth_".concat(chMouth);
           $('.chmouth').toggleClass(chMouthCode);
         }
         
    });
    //beard menu
    
    $('.nextbeard').click(function(){
       if( chBeard < 8 ){
           chBeardCode="beard_".concat(chBeard);
           $('.chbeard').toggleClass(chBeardCode);
           chBeard++;
           chBeardCode="beard_".concat(chBeard);
           $('.chbeard').toggleClass(chBeardCode);
       }
        if( chBeard == 8 ){
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
             chBeard = 7;
             $('.chbeard').toggleClass("beard_1");
             chBeardCode="beard_".concat(chBeard);
           $('.chbeard').toggleClass(chBeardCode);
         }
         
    });
    
    //hair menu
    
    $('.nexthair').click(function(){
       if( chHair < 12 ){
           chHairCode="hair_".concat(chHair);
           $('.chhair').toggleClass(chHairCode);
           chHair++;
           chHairCode="hair_".concat(chHair);
           $('.chhair').toggleClass(chHairCode);
       }
        if( chHair == 12 ){
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
             chHair = 11;
             $('.chhair').toggleClass("hair_1");
             chHairCode="hair_".concat(chHair);
           $('.chhair').toggleClass(chHairCode);
         }
         
    });
});