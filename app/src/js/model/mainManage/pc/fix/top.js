/**
 * 메인 상단
 * @class MainTop
 * @author whfkdakf75@sbs.co.kr
 */
class MainFixTop extends Base {
    constructor(parentId) {
        super();

        this.target = $(`#${parentId}`);

        this.id = {
            self: 'cnbc-admin-main-top-self',
            swiper : {
                container : 'cnbc-admin-main-top-swiper-container',
                page : 'cnbc-admin-main-top-swiper-page',
                slideText : 'cnbc-admin-main-top-swiper-slideText'
            },
            ad : 'cnbc-admin-main-top-ad'
        };

        this.model = {};

        this.bind = () => {
            let getSliderContainerTemplate = () => {
                let getSlide = () => {
                    let sliderText = ``;
                    let sliderImage = ``;
                    let slideTemplate = ``;
                    this.view.slider.forEach((article, articleIndex, articles) => {
                        slideTemplate += `<div>
                            <ul class="cta_list" id="${this.id.swiper.slideText}"><!--활성화시 current 추가-->
                                <li class="ctal_cont current"><a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/read.jsp?pmArticleId=${article.articleId}" class="ctalc_link"><strong class="ctalc_title">${article.title}</strong><span class="ctalc_text">${article.summary}</span></a></li>
                            </ul>
                            <ul class="ctl_top_article" style="z-index: auto; width: 709px">
                                <li class="ctabgs_cont"><img src="${article.imageUrl}" alt="${article.articleId} 기사 이미지" class="ctabgs_img" width="709" height="310"></li>
                            </ul>
                        </div>`;
                    });

                    return slideTemplate;
                }

                let sliderContainerTemplate = `${getSlide()}`;

                return sliderContainerTemplate;
            };

            this.target.html(`<div id="${this.id.self}">
                <div class="contop_left">
                    <h2 class="hide">헤드라인 톱기사</h2>
                    ${getSliderContainerTemplate()}
                </div>
            </div>`);

            this.target.off();

        };
    }

    initialize() {
        this.view.slider = CNBC_ADMIN_GLOBAL.DATA.HTTP.MAIN.slider;

        super.initialize();
    }

    render() {
        this.bind();

        super.render();
    }
}