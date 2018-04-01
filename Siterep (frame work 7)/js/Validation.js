var ValidationSucessVal=true;

function ValidateLogin(strData) {
    var Data = JSON.parse(strData);
    
    if (!IsValidEmailAddress(Data.email))
    {
        return "Error email address";
    }

    if (!IsValidString(Data.password))
    {
        return "Error password";
    }

    return ValidationSucessVal;
}

function ValidateSignup(strData) {
    var Data = JSON.parse(strData);

    if (!IsValidString(Data.firstname))
    {
        return "Error Enter Valid firstname";
    }

    if (!IsValidString(Data.lastname))
    {
        return "Error Enter Valid Lastname";
    }

    if (!IsValidEmailAddress(Data.email))
    {
        return "Error Enter Valid Email";
    }
    
    if (!IsValidString(Data.password) || (Data.password.length < 6) || (Data.password.length > 30))
    {
        return "Error Enter Valid Password";
    }

    if (!IsValidPhoneNumber(Data.phonenumber) || Data.phonenumber.length > 14 || Data.phonenumber.length < 8)
    {
        return "Wrong Phone Number";
    }

    return ValidationSucessVal;
}

function IsValidString(stringValue) {
    if (stringValue == undefined || stringValue == null || stringValue.trim() == "")
    {
        return false;
    }
    return true;
}

//validate number
function IsValidNumber(intValue) {
    if (intValue == undefined || isNaN(intValue))
    {
        return false;
    }
    return true;
}

function IsValidID(idValue) {
    if (!IsValidNumber(idValue) || idValue < 0)
    {
        return false;
    }
    return true;
}

function IsValidPhoneNumber(phoneNumber) {
    return ((/^\d{8,14}$/.test(phoneNumber)) && phoneNumber.indexOf("00") !== 0);
}

function IsValidEmailAddress(emailAddres) {
    return true;
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(emailAddres);
}


