(function(window){
    function crmValidation_instance(){
        this.version = '1.0';
        this.isValidMobile = (mobile) => {
            var AllDigit = /^\d+$/
            var checkStartMobile = mobile.slice(0,2);
            var lengthMoblie = mobile.length
            if(AllDigit.test(mobile) && checkStartMobile == "09" && lengthMoblie == 11){
                return true;
            } else {
                return false
            }
        }
        this.phoneValidation = (executionContext,field) => {
            let formContext = executionContext.getFormContext(); // get formContext
            var fieldValue = formContext.getAttribute(field).getValue();
            if (isValidMobile(fieldValue)) {
                return;
            } else {
                alert("شماره تلفن نامعتبر است")
                formContext.getAttribute(field).setValue();
            }
        }
        this.isValidNationalCode = (NationalCode) => {
            var AllDigit = /^\d+$/
            var sum = 0;
            var lastDigit;
        
            if(NationalCode){
                var lengthNationalCode = NationalCode.length
                if(AllDigit.test(NationalCode) == false){
                    return {
                        statusText : "کد ملی باید فقط شامل عدد باشد !!",
                        statusBoolean : false // invalid NationalCode 
                    }
                } else if (lengthNationalCode != 10) {
                    return {
                        statusText : "کد ملی باید 10 رقم باشد !!",
                        statusBoolean : false // invalid NationalCode 
                    }
                } else {
                    for (var i = 0; i < 9; i++) {
                        var Character = NationalCode.charAt(i);
                        sum += parseInt(Character) * (10 - i);
                    }
                    var divideRemaining = sum % 11;
                
                    if (divideRemaining < 2) {
                        lastDigit = divideRemaining;
                    } else {
                        lastDigit = 11 - (divideRemaining);
                    }
                    if (parseInt(NationalCode.charAt(9)) == lastDigit) {
                        return {
                            statusText : "کد ملی درست هست",
                            statusBoolean : true // valid NationalCode  
                        };
                    } else {
                        return  {
                            statusText : "کد ملی نادرست هست",
                            statusBoolean : false // invalid NationalCode  
                        };
                    }
                }
            } else {
                return  {
                    statusText : "کد ملی خالی هست !!",
                    statusBoolean : false // invalid NationalCode  
                };
            }
            
        }
        this.nationalCodeValidation = (executionContext,field) => {
            let formContext = executionContext.getFormContext(); // get formContext
            var fieldValue = formContext.getAttribute(field).getValue();
            if(isValidNationalCode(fieldValue).statusBoolean){
                return;
            } else {
                alert(isValidNationalCode(fieldValue).statusText)
                formContext.getAttribute(field).setValue();
            }
        }
    }
    if(typeof crmValidation === "undefined"){
        window.crmValidation = new crmValidation_instance();
    } else {
        console.assert("crmValidation already defined")
    }
})(window)