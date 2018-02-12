class MainCEO extends Base {
    constructor(parentId) {
        super();

        this.target = $(`#${parentId}`);

        this.id = {
            self: 'cnbc-admin-main-ceo-self'
        };

        this.model = {};

        this.bind = () => {
            let getCeoListTemplate = () => {
                let ceoListTemplate = "";
                if(!_.isUndefined(this.view.ceo.relateArticle)) {
                    this.view.ceo.relateArticle.forEach(( relateArticle , relateIndex, relateArticles ) => {
                        ceoListTemplate += `<li class="clc_relate_cont"><i class="l_list_bar icn"></i><a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/read.jsp?pmArticleId=${relateArticle.articleId}" class="clc_relate_link">${relateArticle.title}</a></li>`;
                    });
                }
                return ceoListTemplate;
            }

            this.target.html(`<div id="${this.id.self}">
                <div class="cltc_ceo_news">
                    <h2 class="clceo_tagname"><a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/read.jsp?pmArticleId=${this.view.ceo.articleId}" class="clceo_tagname_link">취재파일</a></h2>
                    <div class="clceo_top_w">
                        <a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/read.jsp?pmArticleId=${this.view.ceo.articleId}" class="clct_cont">
                            <strong class="clct_title">${this.view.ceo.title}</strong>
                            <span class="clct_text">${this.view.ceo.summary}</span>
                            <img src="${this.view.ceo.imageUrl}" alt="${this.view.ceo.title}" class="clct_img" width="286" height="162"><!--alt값에 기사 타이틀과 동일하게 적어주세요-->
                            <span class="clct_reporter"><i class="vertical_bar_blue"></i>${this.view.ceo.reporter} 기자</span>
                        </a>
                        <h3 class="hide">취재파일 관련기사</h3>
                        <ul class="clceo_relate">
                            ${getCeoListTemplate()}
                        </ul>
                        <a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/ceo_file/index_new.jsp" class="crfn_more_ceo">더보기 <i class="icn"></i></a>
                    </div>
                </div>
            </div>`);
        };
    }

    initialize() {
        this.view.ceo = CNBC_ADMIN_GLOBAL.DATA.HTTP.MAIN.ceo;
        super.initialize();
    }

    render() {
        this.bind();
        super.render();
    }
}