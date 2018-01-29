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

    this.model.header = new Header(this.id.header);
    this.model.header.initialize();
    this.model.header.render();

    super.render(this.id.main);
  }
}