/**
 * 컨테이너 기본 구조
 * @class Container
 * @author whfkdakf75@sbs.co.kr
 */
class Container extends Base {
  constructor(parentId) {
    super();

    this.target = $(`#${parentId}`);

    this.id = {
      self: 'cnbc-admin-container-self',
      header: 'cnbc-admin-container-header',
      main: 'cnbc-admin-container-main',
      footer: 'cnbc-admin-container-footer'
    };

    this.bind = () => {
      this.target.html(`<div id="wrap">
        <div id="${this.id.self}">
            <div id="${this.id.header}"></div>
            <div id="${this.id.main}"></div>
            <div id="${this.id.footer}"></div>
        </div>
      </div>`);

      this.target.off();
    };
  }

  initialize(option) {

      super.initialize();
  }

  render() {
    this.bind();
    let httpService = new HttpService('/api/cnbc/common/common.json');
    httpService.callback.succeeded = (data) => {
        CNBC_ADMIN_GLOBAL.DATA.HTTP.COMMON = data;

        this.model.header = new Header(this.id.header);
        this.model.header.initialize();
        this.model.header.render();

        this.model.footer = new Footer(this.id.footer);
        this.model.footer.initialize();
        this.model.footer.render();

    };
    httpService.callback.failed = (error) => {
        alert(`정보를 불러오는데 실패하였습니다.(${error})`);
    };

    httpService.getData();
    super.render(this.id.main);
  }
}