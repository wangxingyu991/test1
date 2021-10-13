// 工具函数集合
//获取当前时间
export const getDate = function(){
	let time = new Date();
	let Y = time.getFullYear();
	let M = "" + (time.getMonth()+1);
	M = checkNum(M);
	let D = "" + time.getDate();
	D = checkNum(D);
	let H = "" + time.getHours();
	H = checkNum(H);
	let Mo = "" + time.getMinutes();
	Mo = checkNum(Mo);
	let s = "" + time.getSeconds();
	s = checkNum(s);
	let fullDate = Y + "-" + M + "-" + D + " " + H + ":" + Mo + ":" + s;
	return fullDate;
}
//格式化时间
export const formateDate = function(val){
        let time = new Date(val);
        let Y = time.getFullYear();
        let M = "" + (time.getMonth()+1);
				M = checkNum(M);
        let D = "" + time.getDate();
				D = checkNum(D);
        let H = "" + time.getHours();
				H = checkNum(H);
        let Mo = ""+ time.getMinutes();
				Mo = checkNum(Mo);
        let s = "" + time.getSeconds();
				s = checkNum(s);
        let fullDate = Y + "-" + M + "-" + D +" " + H +":"+ Mo+":"+s;
        return fullDate;
}

//格式化日期
export const formateDate2 = function(val){
	let time = new Date(val);
	let Y = time.getFullYear();
	let M = "" + (time.getMonth()+1);
			M = checkNum(M);
	let D = "" + time.getDate();
			D = checkNum(D);
	let fullDate = Y + "-" + M + "-" + D;
	return fullDate;
}

function checkNum(str){
		let newArr = '' ;
		if(str.length < 2){
			newArr = "0"+ str;
		}else{
			newArr = str;
		}
		return newArr ;
}
/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的交集, 两个数组的元素为数值或字符串
 */
export const getIntersection = (arr1, arr2) => {
    let len = Math.min(arr1.length, arr2.length)
    let i = -1
    let res = []
    while (++i < len) {
        const item = arr2[i]
        if (arr1.indexOf(item) > -1) res.push(item)
    }
    return res
}
/**
 * 
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export const checkRealNum = (rule, value, callback) => {
    const reg = /^-?\d*$/;
    if (value != null && value != "" && !reg.test(value)) {
        callback(new Error("请输入数字"));
    } else {
        callback();
    }
};
/**
 * 校验电话号码(valida)
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export const checkPhone = (rule, value, callback) => {
	const reg = /^1[3456789]\d{9}$/;
	const reg1 = /^0\d{2,3}-?\d{7,8}$/;
    if (value != null && value != "" && !reg.test(value) &&  !reg1.test(value)) {
        callback(new Error("电话号码格式错误"));
    } else {
        callback();
    }
};
/**
 * 校验手机号码(valida)
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export const checkTel = (rule, value, callback) => {
    const reg = /^1[3456789]\d{9}$/;
    if (value != null && value != "" && !reg.test(value)) {
        callback(new Error("手机号码格式错误"));
    } else {
        callback();
    }
};
export const checkTelPage = function(value) {
    const reg = /^1[3456789]\d{9}$/;
    if (value != null && value != "" && !reg.test(value)) {
        return false;
    } else {
        return true;
    }
};
/**
 * 校验固定号码
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export const checkMob = (rule, value, callback) => {
    const reg = /^0\d{2,3}-?\d{7,8}$/;
    if (value != null && value != "" && !reg.test(value)) {
        callback(new Error("固定号码格式错误"));
    } else {
        callback();
    }
};
/**
 * 校验邮箱
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export const checkEmail = (rule, value, callback) => {
    const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/;
    if (value != null && value != "" && !reg.test(value)) {
        callback(new Error("电子邮箱格式错误"));
    } else {
        callback();
    }
};

/**
 * arg以四舍五入的方式保留小数点后n位
 */
export const toFixed =(arg, n) =>{
	if (n == 0) {
		return Math.round(arg)
	}
	try {
		var d, carryD, i, ds = arg.toString().split('.'), len = ds[1].length, b0 = '', k = 0
		if (len > n) {
			while (k < n - 1 && ds[1].substring(k, k + 1) == '0') {
				b0 += '0';
				k++;
			}
			d = Number(ds[1].substring(0, n))
			carryD = Math.round(Number('0.' + ds[1].substring(n, len)))
			len = (d + carryD).toString().length
			if (len > n) {
				if (Number(ds[0]) < 0) {
					return Number(ds[0]) - 1
				} else {
					return Number(ds[0]) + 1
				}
			} else if (len == n) {
				return Number(ds[0] + '.' + (d + carryD))
			}
			return Number(ds[0] + '.' + b0 + (d + carryD))
		}
	} catch (e) {
	}
	return arg
}


//处理小数末尾的0，0.0处理成0
/*
 去掉double类型小数点后面多余的0
 参数：old 要处理的字符串或double
 返回值：newStr 没有多余零的小数或字符串
 例： cutZero(123.000) -> 123
 cutZero(123.0001) -> 123.0001
 cutZero(10203000.0101000) -> 10203000.0101
 cutZero(10203000) -> 10203000 
 */
export const  cutZero=(old)=> {
	old = old+"";
	//拷贝一份 返回去掉零的新串
	newstr = old;
	//循环变量 小数部分长度
	var leng = old.length - old.indexOf(".") - 1
	//判断是否有效数
	if (old.indexOf(".") > -1) {
		//循环小数部分
		for (i = leng; i > 0; i--) {
			//如果newstr末尾有0
			if (newstr.lastIndexOf("0") > -1
					&& newstr.substr(newstr.length - 1, 1) == 0) {
				var k = newstr.lastIndexOf("0");
				//如果小数点后只有一个0 去掉小数点
				if (newstr.charAt(k - 1) == ".") {
					return newstr.substring(0, k - 1);
				} else {
					//否则 去掉一个0
					newstr = newstr.substring(0, k);
				}
			} else {
				//如果末尾没有0
				return newstr;
			}
		}
	}
	return old;
}
/**
 * 小写金额转成大写
 * 
 * @param numberValue
 * @returns {String}
 */
export const  numToStrRMB=(numberValue) =>{
	var numberValue = new String(Math.round(numberValue * 100)); // 数字金额
	var chineseValue = ""; // 转换后的汉字金额
	var String1 = "零壹贰叁肆伍陆柒捌玖"; // 汉字数字
	var String2 = "万仟佰拾亿仟佰拾万仟佰拾圆角分"; // 对应单位
	var len = numberValue.length; // numberValue 的字符串长度
	var Ch1; // 数字的汉语读法
	var Ch2; // 数字位的汉字读法
	var nZero = 0; // 用来计算连续的零值的个数
	var String3; // 指定位置的数值
	if (len > 15) {
		_popup("超出计算范围 !");
		return "";
	}
	if (numberValue == 0) {
		chineseValue = "零圆整";
		return chineseValue;
	}
	String2 = String2.substr(String2.length - len, len); // 取出对应位数的STRING2的值
	for (var i = 0; i < len; i++) {
		String3 = parseInt(numberValue.substr(i, 1), 10); // 取出需转换的某一位的值
		if (i != (len - 3) && i != (len - 7) && i != (len - 11)
				&& i != (len - 15)) {
			if (String3 == 0) {
				Ch1 = "";
				Ch2 = "";
				nZero = nZero + 1;
			} else if (String3 != 0 && nZero != 0) {
				Ch1 = "零" + String1.substr(String3, 1);
				Ch2 = String2.substr(i, 1);
				nZero = 0;
			} else {
				Ch1 = String1.substr(String3, 1);
				Ch2 = String2.substr(i, 1);
				nZero = 0;
			}
		} else { // 该位是万亿，亿，万，元位等关键位
			if (String3 != 0 && nZero != 0) {
				Ch1 = "零" + String1.substr(String3, 1);
				Ch2 = String2.substr(i, 1);
				//	nZero = 0;
			} else if (String3 != 0 && nZero == 0) {
				Ch1 = String1.substr(String3, 1);
				Ch2 = String2.substr(i, 1);
			} else if (String3 == 0 && nZero >= 3) {
				Ch1 = "";
				Ch2 = "";
			} else {
				Ch1 = "";
				Ch2 = String2.substr(i, 1);
			}
			if (i == (len - 11) || i == (len - 3)) { // 如果该位是亿位或元位，则必须写上
				Ch2 = String2.substr(i, 1);
			}
			nZero = 0;
		}
		chineseValue = chineseValue + Ch1 + Ch2;
	}
	if (String3 == 0) { // 最后一位（分）为0时，加上“整”
		chineseValue = chineseValue + "整";
	}
	return chineseValue;
}

export const getMeunLeft = (navData,url)=>{
}

/**
 * 
 * 校验输入长度，一个汉字为num个字节，英文和数字为2个字节
 * **/
var num = 2;
export const  strlen = (str)=> {
	let len = 0;
	if(!str){
		return len;
	}
	for (let i = 0; i < str.length; i++) {
		var c = str.charCodeAt(i);
		//单字节加1 
		if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
			len++;
		} else {
			len += num;
		}
	}
	return len;
}

/**
 * 金额
 */
export const validateAmount= (rule, value, callback) => {
	const regexp = /^(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/;
	if (!regexp.test(value)) {
		callback(new Error("金额格式错误"));
	}else{
		callback();
	}
}
/**
 * 是否是IE浏览器
 * @returns 
 */
export const isIE=()=> { // ie?
	if (!!window.ActiveXObject || "ActiveXObject" in window)
		   { return true; }
	else
		   { return false; }
}
/**
 * 颜色样式转换功能集
 * @RGB-HSL-hex
 */
export const ColorUtil = ()=> {
	//rgb转换hsl
	function rgb2hsl({ R, G, B }) {
		var H, S, L;
		var var_R = (R / 255);
		var var_G = (G / 255);
		var var_B = (B / 255);

		var var_Min = Math.min(var_R, var_G, var_B)    //Min. value of RGB
		var var_Max = Math.max(var_R, var_G, var_B)    //Max. value of RGB
		var del_Max = var_Max - var_Min      //Delta RGB value

		var L = (var_Max + var_Min) / 2

		if (del_Max == 0)                     //This is a gray, no chroma...
		{
			H = 0
			S = 0
		}
		else                                    //Chromatic data...
		{
			if (L < 0.5) S = del_Max / (var_Max + var_Min)
			else S = del_Max / (2 - var_Max - var_Min)

			var del_R = (((var_Max - var_R) / 6) + (del_Max / 2)) / del_Max
			var del_G = (((var_Max - var_G) / 6) + (del_Max / 2)) / del_Max
			var del_B = (((var_Max - var_B) / 6) + (del_Max / 2)) / del_Max

			if (var_R == var_Max) H = del_B - del_G
			else if (var_G == var_Max) H = (1 / 3) + del_R - del_B
			else if (var_B == var_Max) H = (2 / 3) + del_G - del_R

			if (H < 0) H += 1
			if (H > 1) H -= 1
		}
		return { H, S, L };
	}
	//Hue转换rgb
	function Hue_2_RGB(v1, v2, vH) {
		if (vH < 0) vH += 1;
		if (vH > 1) vH -= 1;
		if ((6 * vH) < 1) return (v1 + (v2 - v1) * 6 * vH);
		if ((2 * vH) < 1) return (v2);
		if ((3 * vH) < 2) return (v1 + (v2 - v1) * ((2 / 3) - vH) * 6);
		return v1;
	}
	//hsl色相饱和度转换rgb模式

	function hsl2rgb({ H, S, L }) {
		var R, G, B;
		if (S == 0) {
			R = L * 255;
			G = L * 255;
			B = L * 255;
		}
		else {
			var var_2, var_1;
			if (L < 0.5) var_2 = L * (1 + S);
			else var_2 = (L + S) - (S * L);

			var_1 = 2 * L - var_2;

			R = Math.round(255 * Hue_2_RGB(var_1, var_2, H + (1 / 3)));
			G = Math.round(255 * Hue_2_RGB(var_1, var_2, H));
			B = Math.round(255 * Hue_2_RGB(var_1, var_2, H - (1 / 3)));
		}
		return { R, G, B };
	}
	//16进制转换rgb模式
	function hex2rgb(hex) {
		if (hex.indexOf('#') != -1) {
			hex = hex.substr(1, 6);
		}
		var R = parseInt(hex.substr(0, 2), 16);
		var G = parseInt(hex.substr(2, 2), 16);
		var B = parseInt(hex.substr(4, 2), 16);
		return { R, G, B };
	}
	//rgb转换16进制模式
	function rgb2hex({ R, G, B }) {
		return '#' + dec2hex(R) + dec2hex(G) + dec2hex(B);
	}
	//

	function dec2hex(dec) {
		return (dec + 0x100).toString(16).substr(1, 2).toUpperCase();
	}

	return {
		rgb2hsl,
		hsl2rgb,
		hex2rgb,
		rgb2hex
	}
}

//处理Excel导出渲染列转换key、val以便后台导出
export const formatExcelCustom=(dataKey,dataVal,arr)=>{
	let coustom = [];
	for(let k = 0; k<arr.length; k++){
	  let obj = {
		key:arr[k][dataKey],
		val:arr[k][dataVal],
	  }
	  coustom.push(obj);
	}
	return coustom;
}