/**
 * HOT ISSUE
 * @class MainHotIssue
 * @author whfkdakf75@sbs.co.kr
 */
class MainHotIssue extends Base {
    constructor(parentId) {
        super();

        this.target = $(`#${parentId}`);

        this.id = {
            self: 'cnbc-admin-main-hotIssue-self'
        };

        this.model = {};

        this.bind = () => {
            let getHotIssueTemplate = () => {
                let hotIssueTemplate = ``;
                if(!_.isUndefined(this.view.hotIssue)) {
                    hotIssueTemplate = `
                    <h2 class="crhi_headtitle">
                        <a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/new/issue/index.jsp" class="crhih_link"><span class="icn"><i class="ir">HOT ISSUE</i></span></a>
                        <a href="${this.view.hotIssue.linkUrl}" class="crhi_title"><strong>${this.view.hotIssue.title}</strong></a>
                        <i class="ht_topbar"></i>
                    </h2><!-- 160510 수정 -->
                    <img src="${this.view.hotIssue.imageUrl}" alt="${this.view.hotIssue.title}" class="crhi_img" width="250" height="140">
                    <ul class="crhi_lbar_list">
                        ${getHotIssueRelateArticleTemplate()}
                    </ul>`;
                }
                return hotIssueTemplate;
            }

            let getHotIssueRelateArticleTemplate = () => {
                let relateArticleTemplate = '';
                if(!_.isUndefined(this.view.hotIssue) && !_.isUndefined(this.view.hotIssue.relateArticle)) {
                    this.view.hotIssue.relateArticle.forEach(( relateArticle , relateIndex, relateArticles ) => {
                        relateArticleTemplate += `<li class="crhi_lbar_cont"><i class="horizon_lbar"></i><a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/read.jsp?pmArticleId=${relateArticle.articleId}" class="crhi_lbar_link">${relateArticle.title}</a></li>`;
                    });
                }
                return relateArticleTemplate;
            }

            this.target.html(getHotIssueTemplate());
        };
    }

    initialize() {
        this.view.hotIssue = CNBC_ADMIN_GLOBAL.DATA.HTTP.MAIN.hotIssue;
        super.initialize();
    }

    render() {
        this.bind();
        super.render();
    }
}