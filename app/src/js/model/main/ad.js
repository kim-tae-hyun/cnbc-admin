class MainAD extends Base {
    constructor(parentId) {
        super();

        this.id = {
            self: 'cnbc-admin-main-ceo-self',
            ad : parentId
        };

        this.target = {
            left : {},
            right : {}
        }

        this.target.left.middle = $(`#${this.id.ad.left.middle}`);
        this.target.left.bottom = $(`#${parentId.left.bottom}`);
        this.target.right.middle = $(`#${parentId.right.middle}`);
        this.target.right.bottom = $(`#${parentId.right.bottom}`);

        this.model = {};

        this.leftMiddleBind = () => {
            let getCeoListTemplate = () => {
                // let ceoListTemplate = "";
                // if(!_.isUndefined(this.view.ceo.relateArticle)) {
                //     this.view.ceo.relateArticle.forEach(( relateArticle , relateIndex, relateArticles ) => {
                //         ceoListTemplate += `<li class="clc_relate_cont"><i class="l_list_bar icn"></i><a href="http://sbscnbc.sbs.co.kr/read.jsp?pmArticleId=${relateArticle.articleId}" class="clc_relate_link">${relateArticle.title}</a></li>`;
                //     });
                // }
                // return ceoListTemplate;
            }

            this.target.left.middle.html(`<a href="http://www.iboos.co.kr" style="display:block;margin-top:40px;"><img src="http://img.sbs.co.kr/sbscnbc/img/sbscnbc_main_banner.jpg" width="670" height="103" alt="SBSCNBC 부스 부동산스토리"></a>`);
        };
    }

    initialize() {
        this.view.ad = CNBC_ADMIN_GLOBAL.DATA.HTTP.MAIN.ad;
        super.initialize();
    }

    render() {
        this.leftMiddleBind();
        super.render();
    }
}