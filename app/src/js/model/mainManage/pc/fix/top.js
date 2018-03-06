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
        this.view.drake = dragula([$('#left-defaults')[0], $('#right-defaults')[0]],{
            removeOnSpill: true,
            copySortSource: false,
            copy: function (el, source) {
                return source == $('#right-defaults')[0];
            },
            accepts: function (el, target) {
                return target !== $('#right-defaults')[0];
            }
        })

        this.view.drake.on('drop', function (el, target, source, sibling) {
            let title = '';
            if(!_.isUndefined(target.getElementsByClassName("gu-transit")[0])) {
                title = target.getElementsByClassName("test")[0].innerText;
                target.getElementsByClassName("gu-transit")[0].remove();
            }

            $('#left-defaults').append(`<tr>
                                            <td class="col-sm-1"><img src="http://img.sbs.co.kr/sbscnbc/upload/2018/03/05/30000185142.jpg" alt="http://img.sbs.co.kr/sbscnbc/upload/2018/03/05/30000185142.jpg" width="50" height="40"></td>
                                            <td class="col-sm-7" style="text-overflow: ellipsis; overflow: hidden;"><nobr><small class="test">${title}</small></nobr></td>
                                            <td class="col-sm-2"><span class="pie"><small>02-27 13:09</small></span></td>
                                            <td class="col-sm-2"><small>김태현</small></td>
                                            <td class="col-sm-1"><a href="#"><i class="fa fa-trash-o text-navy"></i></a></td>
                                        </tr>`)
        });


        this.view.slider = CNBC_ADMIN_GLOBAL.DATA.HTTP.MAIN.slider;
        super.initialize();
    }

    render() {
        this.bind();

        super.render();
    }
}