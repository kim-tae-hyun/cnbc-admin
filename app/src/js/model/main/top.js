class MainTop extends Base {
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

                    this.view.slider.forEach((article, articleIndex, articles) => {
                        sliderText += `<li class="ctal_cont ${ articleIndex == 1 ? 'current' : ''}"><a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/read.jsp?pmArticleId=${article.articleId}" class="ctalc_link"><strong class="ctalc_title">${article.title}</strong><span class="ctalc_text">${article.summary}</span></a></li>`;
                        sliderImage += `<li class="ctabgs_cont swiper-slide"><img src="${article.imageUrl}" alt="${article.articleId} 기사 이미지" class="ctabgs_img" width="709" height="310"></li>`;
                    });

                    let slideTemplate = ` <ul class="cta_list" id="${this.id.swiper.slideText}"><!--활성화시 current 추가-->
                        ${sliderText}
                    </ul>
                    <ul class="ctl_top_article swiper-wrapper" style="z-index: auto;">
                        ${sliderImage}
                    </ul>`;

                    return slideTemplate;
                }

                let sliderContainerTemplate = `<div class="ctl_top_article swiper-container" id="${this.id.swiper.container}">
                   <input type="image" class="cnbc-admin-fix-swiper" src="http://cnbc-admin-local.sbs.co.kr/images/icon-repairs.png">
                   ${getSlide()}
                     <div class="cta_btn_w">
                        <ul class="ctabtn_indicator_w swiper-pagination" id="${this.id.swiper.page}"><!--활성화시 on 추가-->
                        </ul>
                        <div class="ctabtn_arrow">
                            <a href="#" class="ctaba_l" title="이전 기사 보기"><span class="icn"><i class="ir">이전 기사 보기</i></span></a>
                            <a href="#" class="ctaba_r" title="다음 기사 보기"><span class="icn"><i class="ir">다음 기사 보기</i></span></a>
                        </div>
                    </div>
                    <i class="cta_mask"></i>
                </div>`;

                return sliderContainerTemplate;
            };

            this.target.html(`<div id="${this.id.self}">
                    <div class="contop_left">
                        <h2 class="hide">헤드라인 톱기사</h2>
                        ${getSliderContainerTemplate()}
                     </div>
                     <div class="contop_right">
                        <h2 class="hide">현재 방송중인 프로그램</h2>
                        <div class="ctr_program_onair">
                            <a href="#" class="cpo_w">
                              <span class="cpo_text_w"><!--160503 수정-->
                                <strong class="cpo_headtitle"><span class="icn"><i class="ir">SBSCNBC ON AIR</i></span><i class="ht_topbar"></i></strong>
                                <span class="cpo_onair_wrap">
                                    <span class="cpo_onair"><i class="round_yellow_left icn"></i><span class="cpo_onair_text">ON&#45;AIR</span><i class="round_yellow_right icn"></i></span>
                                    <em class="cpo_prog_title">경제와이드 백브리핑 시시각각</em>
                                    <span class="cpo_prog_day">월-금 10:00~12:00</span>
                                </span>
                              </span><!--160503 수정-->
                                <img src="http://img.sbs.co.kr/sw16/cnbc/pc/img/main/main_onair.jpg" alt="경제와이드 백브리핑 시시각각" class="cpo_prog_img" width="280" height="310"><!--alt값에 프로그램명 넣어주세요-->
                            </a>
                        </div>
                        <!--2017-03-23 레이어팝업 추가 -->
                        <div class="contop_bn" id="${this.id.ad}">
                            <a href="#" class="cpo_w">
                                  <span class="cpo_text_w">
                                    <strong class="cpo_headtitle"><span class="icn"><i class="ir">SBSCNBC ON AIR</i></span><i class="ht_topbar"></i></strong>
                                    <span class="cpo_onair_wrap">
                                        <span class="cpo_onair"><i class="round_yellow_left icn"></i><span class="cpo_onair_text">ON-AIR</span><i class="round_yellow_right icn"></i></span>
                                        <em class="cpo_prog_title" id="cpo_prog_title">용감한 토크쇼 직설 </em>
                                        <span class="cpo_prog_day" id="prog_time">10:00~11:15</span>
                                  </span>
                                </span>
                                <img src="http://img.sbs.co.kr/sw16/cnbc/pc/img/main/main_onair.jpg" alt="" class="cpo_prog_img" width="280" height="310"><!--alt값에 프로그램명 넣어주세요-->
                            </a>
                        </div>
                    </div><!--contop_right-->
                     </div>
                </div>
              `);

            this.target.off();
            this.model.swiper = new Swiper( `#${this.id.swiper.container}`, {
                navigation: {
                    nextEl: '.ctaba_r',
                    prevEl: '.ctaba_l',
                },
                pagination: {
                    el: `#${this.id.swiper.page}`,
                    type: 'bullets',
                    bulletClass :'ctabi_cont',
                    bulletActiveClass : 'on',
                    clickable: true,
                    renderBullet: function (index, className) {
                        return `<li class="${className}"><a href="#" class="ctabi_link icn" title="${index}번째 기사 보기"><i class="ir">${index + 1}번째 기사</i></a></li>`;
                    }
                },
                slidesPerView: 2,
                loop : true,
                observer :  true,
                simulateTouch : false,
                autoplay: {
                    delay: 3000
                }
            }).on('slideChange', function () {
                bindSliderText();
            });

            this.target.on('click', `#${this.id.ad}`, (event) => {
                window.open(`${CNBC_ADMIN_GLOBAL.CONFIG.URL.PLAY}/onair/pc/index.html?channel=sbscnbc`, "_blank");
                return false;
            });

            let bindSliderText = () => {
                let totalPageCount = this.model.swiper.slides.length - 4;
                let currentPageNum = this.model.swiper.realIndex + 1;

                let index = currentPageNum;

                if(currentPageNum == 1) {
                    index = 1;
                }

                if(currentPageNum == totalPageCount) {
                    index = 0;
                }

                $(`#${this.id.swiper.slideText} li`).removeClass("current");
                $(`#${this.id.swiper.slideText} li`)[index].classList.add("current");
            }
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