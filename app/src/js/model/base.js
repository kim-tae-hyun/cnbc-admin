/**
 * 베이스 뷰-모델 클래스
 * @class Base
 * @constructor
 */
class Base {
  constructor(parentId) {
    this._id = {};
    this._target = {};
    this._view = {};
    this._state = {};
    this._model = {};
    this._callback = {
      initialized: (callback, param) => {
        this._triggerCallback(callback, param);

        LOG_UTIL.log(`'${this.id.self}' has been initialized.`);
      },
      rendered: (callback, param) => {
        this._triggerCallback(callback, param);

        LOG_UTIL.log(`'${this.id.self}' has been rendered.`);
      }
    };
    this._triggerCallback = (callback, param) => {
      if(_.isFunction(callback)) {
        callback(param);
      }
    };

    this._bind = () => {};

    $(window).resize((event) => {
      LOG_UTIL.log(event);

      this.resize({
        windowInnerWidth: window.innerWidth
      });
    });
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get target() {
    return this._target;
  }

  set target(target) {
    this._target = target;
  }

  get view() {
    return this._view;
  }

  set view(view) {
    this._view = view;
  }

  get state() {
    return this._state;
  }

  set state(state) {
    this._state = state;
  }

  get model() {
    return this._model;
  }

  set model(model) {
    this._model = model;
  }

  get callback() {
    return this._callback;
  }

  set callback(callback) {
    this._callback = callback;
  }

  get triggerCallback() {
    return this._triggerCallback;
  }

  get bind() {
    return this._bind;
  }

  set bind(handler) {
    this._bind = handler;
  }

  initialize(event) {
    this._callback.initialized(event);
  }

  render(event) {
    this._callback.rendered(event);
  }

  resize(event) {
    LOG_UTIL.log(event);
  }
}