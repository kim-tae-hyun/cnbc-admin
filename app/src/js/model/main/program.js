/**
 * 주요 프로그램
 * @class MainProgram
 * @author whfkdakf75@sbs.co.kr
 */
class MainProgram extends Base {
    constructor(parentId) {
        super();

        this.target = $(`#${parentId}`);

        this.id = {
            self: 'cnbc-admin-main-program-self',
            swiper: {
                container: 'cnbc-admin-main-program-swiper-container',
                page: 'cnbc-admin-main-program-swiper-page'
            },
            ad: 'cnbc-admin-main-program-ad'
        };

        this.model = {};

        this.bind = () => {
            let getSliderContainerTemplate = () => {
                let getRelateTemplate = (relateArticle) => {
                    let relateTemplate = ``;
                    relateArticle.forEach((article, articleIndex, articles) => {
                        if (articleIndex == 0) {
                            relateTemplate = `<a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/read.jsp?pmArticleId=${article.articleId}" class="clbi_cont">
                                <i class="round_mask cpro_bg"></i><!-- 160510 수정 -->
                                <strong class="clbi_text"><span class="clbit_align">${article.title}</span><i class="clbita_center"></i></strong>
                                <img src="${article.imageUrl}" alt="${article.title}" class="clbi_img" width="133" height="133">
                                <i class="round_mask icn"></i>
                            </a>
                            <ul class="clbi_relate">`;
                        }

                        if (articleIndex != 0) {
                            relateTemplate += `<li class="clbi_relate_cont"><i class="l_list_bar icn"></i><a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/read.jsp?pmArticleId=${article.articleId}" class="clbi_relate_link">${article.title}</a></li>`;
                        }

                        if (articleIndex == _.size(articles) - 1) {
                            relateTemplate += `</ul>`;
                        }
                    });
                    return relateTemplate;
                }

                let slideSize = 3;
                let sliderContainerTemplate = ``;

                this.view.program.forEach((program, programIndex, programs) => {
                    let n = Math.floor( programIndex  / slideSize ) + 1;

                    if (programIndex == slideSize * (n - 1)) {
                        sliderContainerTemplate += `<div class="swiper-slide">
                            <ul class="clbi_list current"><!--활성화 current -->`;
                    }

                    sliderContainerTemplate += `
                        <li class="clbi_cont_w">
                            <h3 class="hide">${programIndex +1 }번째 프로그램</h3>
                            <i class="horizon_line"></i>
                            <span class="clbi_num">${programIndex + 1}</span>
                            <em class="clbi_title"><a href="${program.linkUrl}" class="clbi_title_link">${program.title}</a></em>
                            <h4 class="hide">${programIndex + 1}번째 프로그램 관련 기사</h4>
                            ${getRelateTemplate(program.relateArticle)}
                        </li>
                    `;

                    if (programIndex == slideSize * n - 1 || programIndex == _.size(programs) - 1) {
                        sliderContainerTemplate += `</ul>
                            </div>`;
                    }
                });
                return sliderContainerTemplate;
            }

            this.target.html(`<div id="${this.id.self}">
                    <h2 class="clbc_issue_headtitle"><span class="icn"><i class="ir">주요 프로그램</i></span><i class="ht_topbar"></i></h2>
                    <div class="swiper-container" id="${this.id.swiper.container}">
                        <div class="swiper-wrapper" >
                            ${getSliderContainerTemplate()}
                        </div>
                    </div>
                    <div class="clbi_indicator_w swiper-pagination" id="${this.id.swiper.page}"><!--활성화 on -->
                    </div>
                </div>
              `);

            this.target.off();
            this.model.swiper = new Swiper(`#${this.id.swiper.container}`, {
                pagination: {
                    el: `#${this.id.swiper.page}`,
                    type: 'bullets',
                    bulletClass: 'clbi_indicator_btn',
                    bulletActiveClass: 'on',
                    clickable: true,
                    renderBullet: function (index, className) {
                        return `<a href="#" class="${className}"><span class="icn"><i class="ir">${index + 1}번째 컨텐츠</i></span></a>`;
                    }
                },
                slidesPerView: 1,
                loop: true,
                observer: true,
            }).on('slideChange', function () {
            });
        }
    }

    initialize() {
        this.view.program = CNBC_ADMIN_GLOBAL.DATA.HTTP.MAIN.program;

        super.initialize();
    }

    render() {
        this.bind();

        super.render();
    }
}