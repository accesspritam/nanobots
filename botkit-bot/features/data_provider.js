var current_field = null;
module.exports = function(){ 
    getcurrent_field = function (){
        return current_field;
    } 
    setcurrent_field = function (val){
        current_field = val;
    } 
};
