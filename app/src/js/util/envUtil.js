/**
 * 개발 환경 지원 유틸리티 생성자
 * @namespace GLOBAL
 * @constructor
 * @class ENV_UTILS
 * @author whfkdakf75@sbs.co.kr
 */
class ENV_UTIL {
	/**
     * 로컬 서버 확인
     * @public
     * @function isLocalServer
     * @returns {Boolean}
     */
    static isLocalServer() {
		if(location.href.indexOf('local') >= 0 || location.href.indexOf('file:') >= 0 || location.href.indexOf('127.0.0.') >= 0) {
			return true;
        }
		else {
			return false;
		}
    }
    
    /**
     * 테스트 서버 확인
     * @public
     * @function isTestServer
     * @returns {Boolean}
     */
    static isTestServer() {
		if(location.href.indexOf('-t') >= 0 || location.href.indexOf('127.0.0.') >= 0) {
			return true;
        }
		else {
			return false;
		}
    }

    /**
     * 리얼 서버 확인
     * @public
     * @function isRealServer
     * @returns {Boolean}
     */
    static isRealServer() {
		if(!(this.isLocalServer() || this.isTestServer())) {
			return true;
        }
		else {
			return false;
		}
    }

    /**
     * 단말기 정보 리턴
     * @public
     * @function getDeviceInfo
     * @returns {Object} result
     */
    static getDeviceInfo() {
    	let agent = navigator.userAgent;
    	let result = {
    		isApp: false,
    		platform: '',
    		version: ''
    	};

    	if(agent.indexOf('App/Android') > 0) {
    		result.isApp = true;
    		result.platform = 'android';
    		result.version = agent.match(/Android ([\.\d]+)/i)[1];
    	}
    	else if(agent.indexOf('App/iPhone') > 0) {
    		result.isApp = true;
    		result.platform = 'ios';

    		// 모바일 사파리는 정규표현식 에러 남.
    		try {
    			result.version = agent.substring(agent.indexOf('App/iPhone'), agent.length).split('/')[2];
			}
    		catch(exception) {
				LOG_UTIL.log(exception);
			}
    	}
    	else if(agent.indexOf('Android') > 0) {
    		result.platform = 'android';
    	}
    	else if(agent.indexOf('iPhone') > 0 || agent.indexOf('iPad') > 0 ) {
    		result.platform = 'ios';
    	}

    	return result;
    }

    /**
	 * 모바일 정보 리턴
     * @returns {boolean}
     */
    static isMobile() {
        return ['Android', 'iOS'].indexOf(platform.os.family) >= 0;
    }

    /**
     * 브라우저 정보 리턴
     * @public
     * @function getBrowserInfo
     * @returns {Object} result
     */
    static getBrowserInfo() {
    	let agent = navigator.userAgent.toLocaleLowerCase();
    	let match = /(webkit)[ \/](\w.]+)/.exec(agent) ||
    				/(opera)(?:.*version)?[ \/](\w.]+)/.exec(agent) ||
    				/(msie) ([\w.]+)/.exec(agent) ||
    				/(trident)(?:.*? rv:([\w.]+))?/.exec(agent) ||
    	            /(mozilla)(?:.*? rv:([\w.]+))?/.exec(agent) ||
    	            [];

    	return { name: match[1] || "", version: match[2] || '0' };
    }

    /**
     * UUID를 생성하여 반환한다.
     * @returns UUID
     */
    static getUUID() {
    	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);

            return v.toString(16);
        });
    }
};;