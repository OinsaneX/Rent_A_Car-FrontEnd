const functions = {}


functions.ValidateCI = (ci) =>{
     var valid = true;

     var year = ci.slice(0,2)
     var month = ci.slice(2,4)
     var day = ci.slice(4,6)


     if(month>12){
         valid = false;
     }
     else{
     if(month == "01" ||month == "03" ||month == "05" ||month == "07" ||month == "08" ||month == "10" ||month == "12"){
         if(parseInt(day)>31){
             valid = false
         }
     }
     else if(month == "04" ||month == "06" ||month == "09" ||month == "11" ){
        if(parseInt(day)>30){
            valid = false
        }
     }
     else if(month == "02"){
        if(parseInt(day)>28){
            valid = false
        }
     }
    }
    return valid
}


functions.ValidateLicenseExp = (license) => {
    var valid = true
    if(license.length<7) return false
    var month = license.slice(0,2)
    var year = license.slice(3,7)
  

  console.log(parseInt(month) , new Date().getMonth())

    if(parseInt(month) > 12 || parseInt(month) < 1 ){
        valid = false
    }
    else if(parseInt(year) < 2021){
        valid = false
    }
    else if(parseInt(year)== 2021){
        if(parseInt(month) <= new Date().getMonth()){
            valid = false
        }
    }

    return valid
}




module.exports = functions