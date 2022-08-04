
//check rỗng

export let checkEmpty = (value, selectorError, name)=> {
    if (value.trim() == '' ) {
        document.querySelector(`${selectorError}`).innerHTML = `${name} không được để trống`;   
        return false;
    } else {
        document.querySelector(selectorError).innerHTML = '';
        return true
    }
}

//check dinh dang 
function removeAscent (str) {
    if (str === null || str === undefined) return str;
     str = str.toLowerCase();
     str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
     str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
     str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
     str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
     str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
     str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
     str = str.replace(/đ/g, "d");
     return str;
 }

export let checkName = (value, selectorError, name)=> {
    var regexLetter = /^[A-Z a-z]+$/;
    let valueNew = removeAscent(value);
    if (regexLetter.test(valueNew.trim())) {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    } else {
        document.querySelector(selectorError).innerHTML = name + ' tất cả phải là kí tự';
        return false;
    }
}

//check tat ca la so

export let checkNumber = (value, selectorError, name)=> {
    var regexNumber = /^[0-9]+$/;
    if (regexNumber.test(value.trim())) {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    } else {
        document.querySelector(selectorError).innerHTML = name + ' tất cả phải là số';
        return false;
    }
}

//check email 
export let checkEmail = (value, selectorError, name) =>{
    var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regexEmail.test(value.trim())) {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    } else {
        document.querySelector(selectorError).innerHTML = name + ' không đúng định dạng example: abc@gamil.com';
        return false;
    }
}

//check mat khau
export let checkPassword = (value, selectorError, name) =>{
    var regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
    if (regexPassword.test(value.trim())) {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    } else {
        document.querySelector(selectorError).innerHTML = name + ' phải có cả số và chữ, ít nhất 1 ký tự viết hoa và 1 ký tự đặt biệt';
        return false;
    }
}

//check do dai
export let checkLength = (value, selectorError, name, minLength, maxLength) =>{
    if (value.trim().length > maxLength || value.trim().length < minLength) {
        document.querySelector(selectorError).innerHTML = name + ' độ dài từ ' + minLength + ' đến ' + maxLength;
        return false;
    }
    document.querySelector(selectorError).innerHTML = '';
    return true;
}

//check date
export let checkDate = (value, selectorError, name)=>{
    // console.log(typeof (value));
    var regexDate = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
    if (regexDate.test(value)) {
        return true;
    } else {
        document.querySelector(selectorError).inner = name + 'lỗi';
        return false;
    }
}

