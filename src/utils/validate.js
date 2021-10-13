/**
 * Created by ymw on 2019/8/26.
 */
const regInteger = /^[0-9]*[1-9][0-9]*$/;
const regLegalStr = /^[0-9a-zA-Z_]{1,}$/;
const regNumber = /^[0-9]+.?[0-9]*$/;
const regQuoteIn = /\"|\'|\“|\”|\‘|\’|\%|\$|\￥|\……|\·|\—|\-|\——|\!|\！|\#|\@|\~|\^|\*|\,|\.|\，|\。|\?|\？|\;|\；|\:|\：|\{|\}|\\|\/|\[|\]|\(|\)|\+|\-|\、|\||\<|\>/;
const regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
const regCnEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/; //名称允许汉字、字母、数字，域名只允许英文域名
const regCharNum = /^[0-9a-zA-Z]{1,}$/;
const regCardNo = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/;
const regIp = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
const regChinaPostCode = /\d{6}/;
const regFixedTelephone = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
const regMobileTelephone = /^1[3456789]\d{9}$/;
const regIpisDkh=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])){0,1}$/;
export default {
  //正整数
  isInteger(rule, value, callback) {
    if (value == null || value == '' || value == undefined) {
      callback();
    } else {
      setTimeout(() => {
        if (!Number(value)) {
          callback(new Error('请输入正整数'));
        } else {
          let rsCheck = regInteger.test(value);
          if (!rsCheck) {
            callback(new Error('请输入正整数'));
          } else {
            callback();
          }
        }
      }, 100);
    }
  },
  //字母数字下划线
  isLegalStr(rule, value, callback) {
    setTimeout(() => {
      let rsCheck = regLegalStr.test(value);
      if (!rsCheck) {
        callback(new Error('请输入字母、数字或下划线'));
      } else {
        callback();
      }
    }, 100);
  },
  //是否数字
  isNumber(rule, value, callback) {
    setTimeout(() => {
      let rsCheck = regNumber.test(value);
      if (!rsCheck) {
        callback(new Error('请输入数字'));
      } else {
        callback();
      }
    }, 100);
  },
  //特殊字符
  isQuoteIn(rule, value, callback) {
    if (regQuoteIn.test(value)) {
      callback(new Error("存在特殊字符,请修改"));
    } else {
      callback();
    }
  },
  //电子邮箱，若干个字母、数字、下划线和中划线组成
  isEmail(rule, value, callback) {
    if (value == null || value == '' || value == undefined) {
      callback();
    } else {
      if (!regEmail.test(value)) {
        callback(new Error("邮箱格式不正确，请重新输入"));
      } else {
        callback();
      }
    }
  },
  //字母数字
  isCharNum(rule, value, callback) {
    setTimeout(() => {
      let rsCheck = regCharNum.test(value);
      if (!rsCheck) {
        callback(new Error('请输入字母或数字'));
      } else {
        callback();
      }
    }, 100);
  },
  //身份证验证
  isCardNo(rule, value, callback) {
    if (value == null || value == '' || value == undefined) {
      callback();
    } else {
      let rsCheck = regCardNo.test(value);
      if (!rsCheck) {
        callback(new Error('请输入正确的身份证号码'));
      } else {
        callback();
      }
    }
  },
  //检验IP地址的合法性 例如:10.162.11.104是正确的IP地址
  isIp(rule, value, callback) {
    if (!regIp.test(value)) {
      callback(new Error('请输入正确的IP地址'));
    }
    let ips = value.split(".");
    if ((ips[0].indexOf("0") == 0) || (ips[1].indexOf("0") == 0) || (ips[2].indexOf("0") == 0) || (ips[3].indexOf("0") == 0)) {
      callback(new Error('请输入正确的IP地址,每段第一位不能为0'));
    }
    if (ips[0] > 255 || ips[1] > 255 || ips[2] > 255 || ips[3] > 255) {
      callback(new Error('请输入正确的IP地址，IP最大不能超过255'));
    }
    callback();
  },
  //检验中国邮编 只能是6位数字
  isChinaPostCode(rule, value, callback) {
    if (value == null || value == '' || value == undefined) {
      callback();
    } else {
      if (!regChinaPostCode.test(value)) {
        callback(new Error('请输入正确的邮编'));
      } else {
        callback();
      }
    }
  },
  //判断字符串是否是固定电话号码字符串，若是则返回true，否则返回false
  isFixedTelephone(rule, value, callback) {
    if (value == null || value == '' || value == undefined) {
      callback();
    } else {
      if (!regFixedTelephone.test(value)) {
        callback(new Error('请输入正确的固定电话号码'));
      } else {
        callback();
      }
    }
  },
  //判断字符串是否是手机电话号码字符串，若是则返回true，否则返回false
  isMobileTelephone(rule, value, callback) {
    if (value == null || value == '' || value == undefined) {
      callback();
    } else {
      if (!regMobileTelephone.test(value)) {
        callback(new Error('请输入正确的手机电话号码'));
      } else {
        callback();
      }
    }
  },
  //判断字符串是否是电话号码字符串，若是则返回true，否则返回false
  isTelephone(rule, value, callback) {
    if (value == null || value == '' || value == undefined) {
      callback();
    } else {
      if (regFixedTelephone.test(value) || regMobileTelephone.test(value)) {
        callback();
      } else {
        callback(new Error('请输入正确的电话号码'));
      }
    }
  },
  checkPwd(rule, value, callback) {
    if(value != ""){
      var res = /^(?![a-zA-Z]+$)(?![a-zA-Z0-9]+$)(?![A-Z0-9]+$)(?![A-Z~!@#\$%\^&\*.\?_]+$)(?![a-z0-9]+$)(?![a-z~!@#\$%\^&\*.\?_]+$)(?![0-9~!@#\$%\^&\*.\?_]+$)[a-zA-Z0-9~!@#\$%\^&\*.\?_]{8,20}$/;
      if (!res.test(value)) {
        callback(new Error('密码为必须包含特殊字符的8位到20位的数字大小写字母特殊字符3种组合'));
      } else {
        var res1 = /(\w)*(\w)\2{2}(\w)*/g;
        var flag = true;
        if(res1.test(value)){
          callback(new Error('密码不能包含连续三个或者三个以上的字符'));
        }else{
          callback();
        }
      }
    }else{
      callback();
    }
  },

  /**
   * 校验不能页面不能输入的特殊单词
   * 输入:value  字符串
   * 返回:true 或 flase; true表示包含
   */
  checkForbiddenWord(rule, value, callback) {
    if (value == null || value == '' || value == undefined) {
      callback();
      return;
    }
    var items = new Array("and", "union", "where", "limit", "group", "by", "hex", "substr", "select", "delete", "update", "insert", "create", "drop", "alert", "truncate", "merge", "comment", "declare", "union");
    //var items = new Array("/");
    value = value.toLowerCase();
    for (var i = 0; i < items.length; i++) {
      if (value.indexOf(items[i]) >= 0) {
        // callback(new Error('您输入的内容包含系统不允许的特殊单词'));
        callback(new Error('不允许输入特殊单词'));
      }
    }
    callback();
  },

  /**
   * 检查输入的字符是否具有特殊字符
   * 输入:value  字符串
   * 返回:true 或 flase; true表示包含特殊字符
   * 半角和全角的括弧不认为是特殊符号
   */
  checkForbiddenCharacter(rule, value, callback) {
    var items = new Array("~", "`", "\"", "!", "@", "#", "$", "%", "^", "&", "*", "{", "}", "[", "]");
    items.push(":", ";", "'", "|", "\\\\", "<", ">", "?", "/", "<<", ">>", "||", "//");
    items.push("｛", "｝", "【", "】", "￥", "！", "；", "：", "”", "，", "。", "？", "、", "《", "》", "·");
    value = value.toLowerCase();
    for (var i = 0; i < items.length; i++) {
      if (value.indexOf(items[i]) >= 0) {
        // callback(new Error('您输入的内容包含系统不允许的特殊符号'));
        callback(new Error('不允许输入特殊符号'));
      }
    }
    callback();
  },

  /**
   * 校验不能页面不能输入的特殊单词
   * 输入:value  字符串
   * 返回:true 或 flase; true表示包含
   */
   checkForbiddenWordForm(value) {
    if (value == null || value == '' || value == undefined) {
      return false;
    }
    var items = new Array("and", "union", "where", "limit", "group", "by", "hex", "substr", "select", "delete", "update", "insert", "create", "drop", "alert", "truncate", "merge", "comment", "declare", "union");
    //var items = new Array("/");
    value = value.toLowerCase();
    for (var i = 0; i < items.length; i++) {
      if (value.indexOf(items[i]) >= 0) {
        return true;
      }
    }
    return false;
  },
//校验IP+端口号
  checkIpAnddkh(rule, value, callback) {
    if (value != null && value != "" && !regIpisDkh.test(value)) {
      callback(new Error("请输入正确的IP地址和端口号"));
    } else {
        callback();
    }
  },
   /**
   * 校验不能页面不能输入的特殊单词、可以设置忽略关键字
   * 输入:value  字符串，忽略关键字 例如：['group','by']
   * 返回:true 或 flase; true表示包含
   */
  checkForbiddenWordFormIgnore(value,arr) {
      if (value == null || value == '' || value == undefined) {
        return false;
      }
      var items = new Array("and", "union", "where", "limit", "group", "by", "hex", "substr", "select", "delete", "update", "insert", "create", "drop", "alert", "truncate", "merge", "comment", "declare", "union");
      //var items = new Array("/");
      for(let k = 0;k<arr.length;k++){
        var index = items.indexOf(arr[k]);
        if (index > -1) {
          items.splice(index, 1);
        }
      }
      value = value.toLowerCase();
      for (var i = 0; i < items.length; i++) {
        if (value.indexOf(items[i]) >= 0) {
          return true;
        }
      }
      return false;
    },
  
}
