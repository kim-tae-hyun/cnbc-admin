class MainFinancial extends Base {
    constructor(parentId) {
        super();

        this.target = $(`#${parentId}`);

        this.id = {
            self: 'cnbc-admin-main-substance-self'
        };

        this.model = {};

        this.bind = () => {
            let getFinancialTemplate = () => {
                let financialTemplate = ``;
                if(!_.isUndefined(this.view.financial)) {
                    financialTemplate = `
                    <h2 class="crfg_headtitle sc_file_title"><span class="icn"><i class="ir">SBSCNBC짭짤영상</i></span><i class="ht_topbar"></i></h2><!-- 2017-03-03 h2태그에 sc_file_title 클래스 추가 -->
                    <a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/read.jsp?pmArticleId=${this.view.financial.articleId}" class="crfn_cont">
                        <strong class="crfn_title">${this.view.financial.title}</strong>
                        <span class="crfn_text">${this.view.financial.summary}</span>
                        <img src="${this.view.financial.imageUrl}" alt="${this.view.financial.title}" class="crfn_img" width="100" height="100">
                    </a>
                    <a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/new/corner/corner_list.jsp?pmCornerId=10000011860" class="crfn_more">더보기 <i class="icn"></i></a>
                `;
                }
                return financialTemplate;
            }

            this.target.html(getFinancialTemplate());
        };
    }

    initialize() {
        this.view.financial = CNBC_ADMIN_GLOBAL.DATA.HTTP.MAIN.financial;
        super.initialize();
    }

    render() {
        this.bind();
        super.render();
    }
}