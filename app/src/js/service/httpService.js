class HttpService {
  constructor(resourceUrl, data) {
    this._state = {
      resourceUrl: resourceUrl,
      data: data
    };
    this._callback = {
      succeeded: {},
      failed: {}
    };
    this._triggerCallback = (callback, param) => {
      if(_.isFunction(callback)) {
        callback(param);
      }
    };
  }

  get state() {
    return this._state;
  }

  set state(state) {
    this._state = state;
  }

  get callback() {
    return this._callback;
  }

  set callback(callback) {
    this._callback = callback;
  }

  getData() {
    if(_.isObject(this._state.data)) {
      this.state.resourceUrl += '?' + DATA_UTIL.getObjectToUriParameter(this._state.data);
    }

    let _this = this;

    $.support.cors = true;

    $.ajax({
      type : 'get',
      dataType : 'json',
      url : this.state.resourceUrl,
      crossDomain: true,
      cache: true,
      contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
      timeout: 10000,
      success: (result) => {
        LOG_UTIL.log(`request get '${_this._state.resourceUrl}' succeeded.`);
        LOG_UTIL.log(result);

        _this._triggerCallback(_this._callback.succeeded, result);
      },
      error: (xhr, status, error) => {
        LOG_UTIL.log(`request get '${_this.state.resourceUrl}' failed.`);
        LOG_UTIL.log(xhr);

        _this._triggerCallback(_this._callback.failed, status);

        LOG_UTIL.log(error);
      }
    });
  }

  getDataSync() {
    if(_.isObject(this._state.data)) {
      this.state.resourceUrl += '?' + DATA_UTIL.getObjectToUriParameter(this._state.data);
    }

    let _this = this;

    $.support.cors = true;

    $.ajax({
      type : 'get',
      dataType : 'json',
      url : this.state.resourceUrl,
      crossDomain: true,
      cache: false,
      async: true,
      contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
      timeout: 10000,
      success: (result) => {
        LOG_UTIL.log(`request get '${_this._state.resourceUrl}' succeeded.`);
        LOG_UTIL.log(result);

        _this._triggerCallback(_this._callback.succeeded, result);
      },
      error: (xhr, status, error) => {
        LOG_UTIL.log(`request get '${_this.state.resourceUrl}' failed.`);
        LOG_UTIL.log(xhr);

        _this._triggerCallback(_this._callback.failed, status);

        LOG_UTIL.log(error);
      }
    });
  }
}