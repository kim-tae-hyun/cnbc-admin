class MainAD extends Base {
    constructor(parentId) {
        super();

        this.id = {
            self: 'cnbc-admin-main-ad-self',
            ad : {
                right : {
                    top : {
                        swiper: {
                            container: 'cnbc-admin-main-ad-right-top-swiper-container',
                            page: 'cnbc-admin-main-ad-right-top-swiper-page'
                        }
                    }
                }
            },
            temp : {
                left : {
                    middle : 'cnbc-admin-main-ad-temp-left-middle',
                    bottom : {
                        first : 'cnbc-admin-main-ad-temp-left-bottom-first',
                        second : 'cnbc-admin-main-ad-temp-left-bottom-second',
                        third : 'cnbc-admin-main-ad-temp-left-bottom-third'
                    }
                },
                right : {
                    top : {
                        first : 'cnbc-admin-main-ad-temp-right-top-first',
                        second : 'cnbc-admin-main-ad-temp-right-top-second',
                        third : 'cnbc-admin-main-ad-temp-right-top-third',
                        fourth : 'cnbc-admin-main-ad-temp-right-top-fourth'
                    },
                    middle : {
                        first : 'cnbc-admin-main-ad-temp-right-middle-first',
                        second : 'cnbc-admin-main-ad-temp-right-middle-second'
                    },
                    bottom : {
                        first : 'cnbc-admin-main-ad-temp-right-bottom-first',
                        second : 'cnbc-admin-main-ad-temp-right-bottom-second'
                    }
                }
            }
        };

        this.target = {}

        this.model = {
            right : {}
        };

        /**
         * leftMiddleBind
         */
        this.leftMiddleBind = () => {
            $(`#${parentId.left.middle}`).html($(`#${this.id.temp.left.middle}`).html());
        };

        /**
         * leftBottomBind
         */
        this.leftBottomBind = () => {
            let getLeftBottomTemplate = () => {
                let leftBottomTemplate = `
                    <li class="clb_ad_list">${$(`#${this.id.temp.left.bottom.first}`).html()}</li>
                    <li class="clb_ad_list">${$(`#${this.id.temp.left.bottom.second}`).html()}</li>
                    <li class="clb_ad_list">${$(`#${this.id.temp.left.bottom.third}`).html()}</li>
                `;

                return leftBottomTemplate;
            }

            $(`#${parentId.left.bottom}`).html(getLeftBottomTemplate());
        };

        /**
         * rightTopBind
         */
        this.rightTopBind = () => {
            let getRightTopTemplate = () => {
                let rightTopTemplate = `<div class="swiper-container" id="${this.id.ad.right.top.swiper.container}">
                    <h2 class="hide">프로모션 배너</h2>
                    <div class="swiper-wrapper" >
                        <ul class="crpb_list current swiper-slide"><!-- 활성화 current -->
                            <li class="crpb_cont">${$(`#${this.id.temp.right.top.first}`).html()}</li>
                            <li class="crpb_cont">${$(`#${this.id.temp.right.top.second}`).html()}</li>
                        </ul>
                        <ul class="crpb_list current swiper-slide">
                            <li class="crpb_cont">${$(`#${this.id.temp.right.top.third}`).html()}</li>
                            <li class="crpb_cont">${$(`#${this.id.temp.right.top.fourth}`).html()}</li>
                        </ul>
                    </div>
                </div>
                <div class="crpb_indicator_w swiper-pagination" id="${this.id.ad.right.top.swiper.page}"></div>`;

                return rightTopTemplate;
            }

            $(`#${parentId.right.top}`).html(getRightTopTemplate());
            $(`#${parentId.right.top}`).off();

            this.model.right.swiper = new Swiper(`#${this.id.ad.right.top.swiper.container}`, {
                pagination: {
                    el: `#${this.id.ad.right.top.swiper.page}`,
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
        };

        /**
         * leftBottomBind
         */
        this.rightMiddleBind = () => {
            $(`#${parentId.right.middle.top}`).html($(`#${this.id.temp.right.middle.first}`).html());
            $(`#${parentId.right.middle.bottom}`).html($(`#${this.id.temp.right.middle.second}`).html());
        };

        /**
         * rightBottomBind
         */
        this.rightBottomBind = () => {
            let getRightBottomTemplate = () => {
                let rightTopTemplate = `  <div class="cr_ad_bnr">
                    ${$(`#${this.id.temp.right.bottom.first}`).html()}
                </div>
                <div class="cr_ad_bnr">
                    ${$(`#${this.id.temp.right.bottom.second}`).html()}
                </div>`;

                return rightTopTemplate;
            }
            $(`#${parentId.right.bottom}`).html(getRightBottomTemplate());
        };
    }

    initialize() {
        super.initialize();
    }

    render() {
        this.leftMiddleBind();
        this.leftBottomBind();
        this.rightTopBind();
        this.rightMiddleBind();
        this.rightBottomBind();

        super.render();
    }
}