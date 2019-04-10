/*
1.0.0
2014/02/20
author:milkmidi
milkmidi.Validate.isEmail( sEmail:String ):Boolean 是否為有效的 email 格式
milkmidi.Validate.isIdentityInTaiwan( sID:String ):Boolean 是否為有效的身份證字號
milkmidi.Validate.isPhoneNumber( sPhoneNumber:String ):Boolean 是否為有效電話格式
*/

var anteater = {};



var Validate = (function() {
    var MOBILE_PATTERN = /^\d{10}$/;
    var PHONE_PATTERN = /^[0-9]{6,10}$/;
    var IDENTITY_CARDS_PATTERN = /[A-Za-z]{1}[0-9]{9}/;
    var LETTER_ARRAY = ["a", "b", "c", "d", "e", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "u", "v", "x", "y", "w", "z", "i", "o"];
    var NUMBER_ARRAY = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35];
    var EMAIL_PATTERN = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    function _getNumber(pString /*String*/ ) {
        pString = pString.substr(0, 1).toLowerCase();
        for (var i = 0; i < LETTER_ARRAY.length; i++) {
            if (pString == LETTER_ARRAY[i]) {
                return String(NUMBER_ARRAY[i]);
            }
        }
        return "";
    }
    var Validate = {
        isMobileNumber: function(sMobileNumber /*String*/ ) /*Boolean*/ {
            return MOBILE_PATTERN.test(sMobileNumber);
        },
        /**
         * 是否為有效的電話號碼
         * @param {String} sPhoneNumber
         * @return {Boolean}
         */
        isPhoneNumber: function(sPhoneNumber /*String*/ ) /*Boolean*/ {
            return PHONE_PATTERN.test(sPhoneNumber);
        },
        /**
         * 是否為有效的 email
         * @param {String} sEmail
         * @return {Boolean}
         */
        isEmail: function(sEmail /*String*/ ) /*Boolean*/ {
            return EMAIL_PATTERN.test(sEmail);
        },
        /**
         * 是否為有效的台灣身份證驗証
         * @param {String} sID
         * @return {Boolean}
         */
        isIdentityInTaiwan: function(sID /*String*/ ) /*Boolean*/ {
            if (sID.length != 10) {
                return false;
            }
            if (IDENTITY_CARDS_PATTERN.test(sID) == false)
                return false;
            var m = sID.split('');
            for (var i = 1; i < m.length; i++) {
                m[i] = parseInt(m[i]);
            }
            var first_str = _getNumber(sID);
            var x1 = parseInt(first_str.substr(0, 1));
            var x2 = parseInt(first_str.substr(1, 1));
            var sum = x1 + (9 * x2) + (8 * m[1]) + (7 * m[2]) + (6 * m[3]) + (5 * m[4]) + (4 * m[5]) + (3 * m[6]) + (2 * m[7]) + m[8] + m[9];
            if (sum % 10 == 0)
                return true;
            return false;
        }
    }
    return Validate;
})();
window.anteater.Validate = Validate;


// module.exports = anteater;