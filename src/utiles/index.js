import qs from 'qs';

export const redirectToPage = function (url, parameters) {
	url = url + '?' + qs.stringify(parameters);
	window.location.href = url;
}

export const getFormData = function(form) {
	let array = form.serializeArray();
	let data = {};

	array.forEach(item => {
		data[item['name']] = item['value'];
	});

	return data;
}

export const getParameterFromUrl = function (parameterKey) {
	let parameterValue;
	let hash = window.location.href;
	let urlParts = hash.split('?');
	let parameters = [];
	if (urlParts.length > 1) {
			parameters = urlParts[1].split('&');
	}
	for (let i = 0; i < parameters.length; i++) {
		let keyValue = parameters[i].split('=');
		let key = keyValue[0];
		let value = '';
		if (keyValue.length > 1) {
				value = keyValue[1];
		}
		if (parameterKey === key) {
				parameterValue = value;
				break;
		}
	}
	return parameterValue;
}

export const isMobile = function () {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|MicroMessenger/i.test(navigator.userAgent);
}

export const moneyAmountFormat = (amount, precision = 1) => {
	if(!amount){
		return 0.0;
	}else{
		try{
			if(precision){
				return parseFloat(amount).toFixed(precision);
			}else{
				return parseFloat(amount).toFixed();
			}
			
		}catch(e){
			return 0.0;
		}
	}
}

export const isNumber = (value) => {
	let reg = /^[0-9]+.?[0-9]*$/;
	if(reg.test(value)){
		return true;
	}else {
		return false;
	}
}

export const phoneNumberVaildator = function(phoneNumber){
	if((/^1[345789]\d{9}$/.test(phoneNumber))){
		return true;
	}else{
			return false;
	}
}

export const  isNumberVailatorForFormInput = function(rule, value, callback){
  if(!value){
    callback(new Error('请输入'));
  }else if(Number.isNaN(Number(value))){
    callback(new Error('请输入数字值'));
  }else{
    callback();
  }
};

