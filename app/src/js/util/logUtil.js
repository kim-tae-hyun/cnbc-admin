/**
 * 로그 지원 유틸리티 클래스
 * @static
 */
class LOG_UTIL {
    static log(message) {
        let href = location.href;

        if(href.indexOf('local') >= 0 || href.indexOf('dev') >= 0 || href.indexOf('debug') >= 0 || href.indexOf('192.168') >= 0) {
            if(_.isString(message)) {
                console.log(`[${new Date().toUTCString()}] cnbc-admin: ${JSON.stringify(message)}`);
            }
            else {
                console.log(`[${new Date().toUTCString()}] cnbc-admin: see details below ↓`);
                console.log(message);
            }
        }
    }

    static alert(message) {
        let href = location.href;

        if(href.indexOf('local') >= 0 || href.indexOf('dev') >= 0 || href.indexOf('debug') >= 0 || href.indexOf('192.168') >= 0) {
            if(_.isString(message)) {
                alert(message);
            }
            else {
                alert(JSON.stringify(message));
            }
        }
    }
}