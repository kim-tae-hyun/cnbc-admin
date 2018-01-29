/**
 * 로그 지원 유틸리티 클래스
 * @static
 */
class AUTH_UTIL {
    static loginChk(name) {
        let prefix = name + "=";
        let cookieStartIndex = document.cookie.indexOf(prefix);

        if (cookieStartIndex == -1) {
            return false;
        }

        let cookieEndIndex = document.cookie.indexOf(";", cookieStartIndex + prefix.length);

        if (cookieEndIndex == -1) {
            cookieEndIndex = document.cookie.length;
        }

        unescape(document.cookie.substring(cookieStartIndex + prefix.length, cookieEndIndex));

        if (unescape ==null || unescape=='' || unescape=='undefined'){
            return false;
        }else{
            return true;
        }
    }
}