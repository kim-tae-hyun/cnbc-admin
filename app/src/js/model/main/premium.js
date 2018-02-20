class MainPremium extends Base {
    constructor(parentId) {
        super();

        this.target = $(`#${parentId}`);

        this.id = {
            self: 'cnbc-admin-main-premium-self'
        };

        this.model = {};

        this.bind = () => {
            let getTopPremiumListTemplate = () => {
                let topPremiumListTemplate = "";
                if(!_.isUndefined(this.view.premium)) {
                    this.view.premium.slice(0,5).forEach(( premiumTopArticle , premiumTopIndex, premiumTopArticles ) => {
                        if(premiumTopIndex == 0) {
                            topPremiumListTemplate += `<a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/read.jsp?pmArticleId=${premiumTopArticle.articleId}" class="clci_cont">
                                <strong class="clci_title">${premiumTopArticle.title}</strong>
                                <span class="clci_text">${premiumTopArticle.summary}</span>
                                <img src="${premiumTopArticle.imageUrl}" alt="${premiumTopArticle.title}" class="clci_img" width="252" height="140">
                            </a>
                            <h3 class="hide">관련기사</h3>
                            <ul class="clci_relate">`;
                        }
                        else {
                            topPremiumListTemplate += `<li class="clci_relate_cont"><i class="l_list_bar icn"></i><a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/read.jsp?pmArticleId=${premiumTopArticle.articleId}" class="clci_relate_link">${premiumTopArticle.title}</a></li>`;
                        }

                        if(premiumTopIndex == _.size(premiumTopArticles) - 1) {
                            topPremiumListTemplate += ` </ul>`;
                        }
                    });
                }
                return topPremiumListTemplate;
            }

            let getBottomPremiumListTemplate = () => {
                let bottomPremiumListTemplate = "";
                if(!_.isUndefined(this.view.premium)) {
                    this.view.premium.slice(5,10).forEach(( premiumBottomArticle , premiumBottomIndex, premiumBottomArticles ) => {
                        if(premiumBottomIndex == 0) {
                            bottomPremiumListTemplate += `<a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/read.jsp?pmArticleId=${premiumBottomArticle.articleId}" class="clci_cont">
                                <strong class="clci_title">${premiumBottomArticle.title}</strong>
                                <span class="clci_text">${premiumBottomArticle.summary}</span>
                                <img src="${premiumBottomArticle.imageUrl}" alt="${premiumBottomArticle.title}" class="clci_img clci_img_last" width="252" height="140"><!--class="clci_img clci_img_last" 클래스 추가 -->
                            </a>
                            <h3 class="hide">관련기사</h3>
                            <ul class="clci_relate">`;
                        }
                        else {
                            bottomPremiumListTemplate += `<li class="clci_relate_cont"><i class="l_list_bar icn"></i><a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/read.jsp?pmArticleId=${premiumBottomArticle.articleId}" class="clci_relate_link">${premiumBottomArticle.title}</a></li>`;
                        }

                        if(premiumBottomIndex == _.size(premiumBottomArticles) - 1) {
                            bottomPremiumListTemplate += ` </ul>`;
                        }
                    });
                }
                return bottomPremiumListTemplate;
            }

            this.target.html(`<div id="${this.id.self}">
                    <h2 class="clcc_invest_headtitle"><span class="icn"><i class="ir">프리미엄 투자전략</i></span><i class="ht_topbar"></i></h2>
                    <div class="clci_w">
                        <div class="clci_cont_w">
                            ${getTopPremiumListTemplate()}
                        </div>
                        <div class="clci_cont_w clci_cont_w_last"><!--clci_cont_w_last 클래스 추가 -->
                            ${getBottomPremiumListTemplate()}
                        </div>
                    </div>
                </div>`);
        };
    }

    initialize() {
        this.view.premium = CNBC_ADMIN_GLOBAL.DATA.HTTP.MAIN.premium;
        super.initialize();
    }

    render() {
        this.bind();
        super.render();
    }
}