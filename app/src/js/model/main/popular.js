class MainPopular extends Base {
    constructor(parentId) {
        super();

        this.target = $(`#${parentId}`);

        this.id = {
            self: 'cnbc-admin-main-popular-self'
        };

        this.model = {};

        this.bind = () => {
            let getPopularListTemplate = () => {
                let listSize = 5;
                let popularListTemplate = '';
                this.view.popular.forEach((article, articleIndex, articles ) => {
                    let n = Math.floor( articleIndex  / listSize ) + 1;
                    if( articleIndex == 5 * ( n - 1 )) {
                        popularListTemplate += `<ul class="clmn_list">`;
                    }
                    popularListTemplate += `<li class="clmn_cont"><a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/read.jsp?pmArticleId=${article.articleId}" class="clmn_link">${article.title}</a></li>`;

                    if( articleIndex == 5 * n - 1 ) {
                        popularListTemplate += `</ul>`;
                    }
                });

                return popularListTemplate;
            }

            this.target.html(`<div id="${this.id.self}">
                <div class="cltc_main_news">
                    <h2 class="hide">주요뉴스</h2>
                    ${getPopularListTemplate()}
                </div>
            </div>`);
        };
    }

    initialize() {
        this.view.popular = CNBC_ADMIN_GLOBAL.DATA.HTTP.MAIN.popular;
        super.initialize();
    }

    render() {
        this.bind();
        super.render();
    }
}