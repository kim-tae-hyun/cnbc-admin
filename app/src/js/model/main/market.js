class MainMarket extends Base {
    constructor(parentId) {
        super();

        this.target = $(`#${parentId}`);

        this.id = {
            self: 'cnbc-admin-main-market-self',
            swiper : {
                self : 'cnbc-admin-main-market-swiper-self',
                tab : 'cnbc-admin-main-market-swiper-tab',
                korStock : {
                    container : 'cnbc-admin-main-market-swiper-korStock-container',
                    page : 'cnbc-admin-main-market-swiper-korStock-page',
                    slideText : 'cnbc-admin-main-market-swiper-korStock-slideText',
                    nextEl : 'cnbc-admin-main-market-swiper-korStock-nextEl',
                    prevEl : 'cnbc-admin-main-market-swiper-korStock-prevEl',
                },
                forStock : {
                    container : 'cnbc-admin-main-market-swiper-forStock-container',
                    page : 'cnbc-admin-main-market-swiper-forStock-page',
                    slideText : 'cnbc-admin-main-market-swiper-forStock-slideText',
                    nextEl : 'cnbc-admin-main-market-swiper-forStock-nextEl',
                    prevEl : 'cnbc-admin-main-market-swiper-forStock-prevEl',
                },
                exchange : {
                    container : 'cnbc-admin-main-market-swiper-exchange-container',
                    page : 'cnbc-admin-main-market-swiper-exchange-page',
                    slideText : 'cnbc-admin-main-market-swiper-exchange-slideText',
                    nextEl : 'cnbc-admin-main-market-swiper-exchange-nextEl',
                    prevEl : 'cnbc-admin-main-market-swiper-exchange-prevEl',
                }
            }
        };

        this.model = {};

        this.bind = () => {
            // 국내증시
            let getKorStockContainerTemplate = () => {
                let getKorStockSlide = () => {
                    let korStockSlideTemplate = ``;

                    if(!_.isUndefined(this.view.market.korStock) && !_.isEmpty(this.view.market.korStock)) {

                        this.view.market.korStock.forEach((korStock, korStockIndex, korStocks) => {
                            korStockSlideTemplate += `<li class="crmd_data_cont on swiper-slide"><!--활성화시 on -->
                                        <strong class="crmd_dc_title">${korStock.stockName} <span class="crmd_dc_day"></span></strong>
                                        <em class="crmd_dc_data">${korStock.currentPoint}
                                            <span class="${korStock.upDownFlag == 1 ? "up_bold icn" : "down_bold icn"}"><i class="ir">${korStock.upDownFlag == 1 ? "상승" : "감소"}</i></span>
                                            <span class="crmd_dc_per">${korStock.upDownRate}%</span>
                                        </em>
                                    </li>`;
                        });
                    }

                    return korStockSlideTemplate;
                }

                let sliderKorStockContainerTemplate = `
                    <div class="crmd_data_w swiper-container" id="${this.id.swiper.korStock.container}">
                        <ul class="crmd_data_list swiper-wrapper">
                            ${getKorStockSlide()}
                        </ul>
                        <div class="crmd_btn_paging">
                            <div class="swiper-pagination" id="${this.id.swiper.korStock.page}" style="bottom:0px"></div>
                            <a href="javasctip:;" class="crmd_bp_left icn" title="이전 보기" id="${this.id.swiper.korStock.prevEl}" style="z-index: 15"><i class="ir">이전</i></a>
                            <a href="javasctip:;" class="crmd_bp_right icn" title="다음 보기" id="${this.id.swiper.korStock.nextEl}" style="z-index: 15"><i class="ir">다음</i></a>
                        </div>
                    </div>
                `;

                return sliderKorStockContainerTemplate;
            };

            // 해외증시
            let getForStockContainerTemplate = () => {
                let getForStockSlide = () => {
                    let forStockSlideTemplate = ``;

                    if(!_.isUndefined(this.view.market.forStock) && !_.isEmpty(this.view.market.forStock)) {

                        this.view.market.forStock.forEach((forStock, forStockIndex, forStocks) => {
                            forStockSlideTemplate += `<li class="crmd_data_cont on swiper-slide"><!--활성화시 on -->
                                        <strong class="crmd_dc_title">${forStock.stockName} <span class="crmd_dc_day"></span></strong>
                                        <em class="crmd_dc_data">${forStock.currentPoint}
                                            <span class="${forStock.upDownFlag == 1 ? "up_bold icn" : "down_bold icn"}"><i class="ir">${forStock.upDownFlag == 1 ? "상승" : "감소"}</i></span>
                                            <span class="crmd_dc_per">${forStock.upDownRate}%</span>
                                        </em>
                                    </li>`;
                        });
                    }

                    return forStockSlideTemplate;
                }

                let sliderForStockContainerTemplate = `
                    <div class="crmd_data_w swiper-container" id="${this.id.swiper.forStock.container}">
                        <ul class="crmd_data_list swiper-wrapper">
                            ${getForStockSlide()}
                        </ul>
                        <div class="crmd_btn_paging">
                            <div class="swiper-pagination" id="${this.id.swiper.forStock.page}" style="bottom:0px"></div>
                            <a href="javascript:;" class="crmd_bp_left icn" title="이전 보기" id="${this.id.swiper.forStock.prevEl}" style="z-index: 15"><i class="ir">이전</i></a>
                            <a href="javascript:;" class="crmd_bp_right icn" title="다음 보기" id="${this.id.swiper.forStock.nextEl}" style="z-index: 15"><i class="ir">다음</i></a>
                        </div>
                    </div>
                `;

                return sliderForStockContainerTemplate;
            };

            // 환율
            let getExchangeContainerTemplate = () => {
                let getExchangeSlide = () => {
                    let exchangeSlideTemplate = ``;

                    if(!_.isUndefined(this.view.market.exchange) && !_.isEmpty(this.view.market.exchange)) {

                        this.view.market.exchange.forEach((exchange, exchangeIndex, exchanges) => {
                            exchangeSlideTemplate += `<li class="crmd_data_cont on swiper-slide"><!--활성화시 on -->
                                        <strong class="crmd_dc_title">${exchange.stockName} <span class="crmd_dc_day"></span></strong>
                                        <em class="crmd_dc_data">${exchange.currentPoint}
                                            <span class="${exchange.upDownFlag == 1 ? "up_bold icn" : "down_bold icn"}"><i class="ir">${exchange.upDownFlag == 1 ? "상승" : "감소"}</i></span>
                                            <span class="crmd_dc_per">${exchange.upDownRate}%</span>
                                        </em>
                                    </li>`;
                        });
                    }

                    return exchangeSlideTemplate;
                }

                let sliderExchangeContainerTemplate = `
                    <div class="crmd_data_w swiper-container" id="${this.id.swiper.exchange.container}">
                        <ul class="crmd_data_list swiper-wrapper">
                            ${getExchangeSlide()}
                        </ul>
                        <div class="crmd_btn_paging">
                            <div class="swiper-pagination" id="${this.id.swiper.exchange.page}" style="bottom:0px"></div>
                            <a href="javasctip:;" class="crmd_bp_left icn" title="이전 보기" id="${this.id.swiper.exchange.prevEl}" style="z-index: 15"><i class="ir">이전</i></a>
                            <a href="javasctip:;" class="crmd_bp_right icn" title="다음 보기" id="${this.id.swiper.exchange.nextEl}" style="z-index: 15"><i class="ir">다음</i></a>
                        </div>
                    </div>
                `;

                return sliderExchangeContainerTemplate;
            };


            this.target.html(`<h2 class="hide">실시간 시황 데이터</h2>
                <ul class="crmd_list" id="${this.id.swiper.self}"><!-- 활성화시 current -->
                    <li class="crmd_cont_domestic current" id="${this.id.swiper.tab}-korStock"><a href="javasctip:;" class="crmd_title" onClick="return false;">국내증시</a>
                        ${getKorStockContainerTemplate()}
                    </li>
                    <li class="crmd_cont_overseas" id="${this.id.swiper.tab}-forStock"><a href="javasctip:;" class="crmd_title" onClick="return false;">해외증시</a>
                        ${getForStockContainerTemplate()}
                    </li>
                    <li class="crmd_cont_exchange" id="${this.id.swiper.tab}-exchange"><a href="javasctip:;" class="crmd_title" onClick="return false;">환율</a>
                        ${getExchangeContainerTemplate()}
                    </li>
                </ul>`);

                this.target.off();
                this.target.on('mouseover', `li[id^='${this.id.swiper.tab}']`, (event) => {
                    $(`#${this.id.swiper.self}`).find(`li[id^='${this.id.swiper.tab}']`).removeClass("current");
                    $(event.currentTarget).addClass("current");
                })

                this.bindSlider();
        };
    }

    bindSlider()  {
        // 국내증시
        this.model.korStockSwiper = new Swiper( `#${this.id.swiper.korStock.container}`, {
            navigation: {
                nextEl: `#${this.id.swiper.korStock.nextEl}`,
                prevEl: `#${this.id.swiper.korStock.prevEl}`,
            },
            pagination: {
                el: `#${this.id.swiper.korStock.page}`,
                type: 'custom',
                renderCustom: function (swiper, current, total) {
                    return `<strong class="crmd_bp_num">${current}</strong>/<span class="crmb_bp_page">${total}</span>`;
                }
            },
            slidesPerView: 1,
            simulateTouch : false,
            loop : true,
            observer :  true,
            speed : 0
        });

        //해외증시
        this.model.forStockSwiper = new Swiper( `#${this.id.swiper.forStock.container}`, {
            navigation: {
                nextEl: `#${this.id.swiper.forStock.nextEl}`,
                prevEl: `#${this.id.swiper.forStock.prevEl}`,
            },
            pagination: {
                el: `#${this.id.swiper.forStock.page}`,
                type: 'custom',
                renderCustom: function (swiper, current, total) {
                    return `<strong class="crmd_bp_num">${current}</strong>/<span class="crmb_bp_page">${total}</span>`;
                }
            },
            slidesPerView: 1,
            simulateTouch : false,
            loop : true,
            observer :  true,
            speed : 0
        });

        //환율
        this.model.exchangeSwiper = new Swiper( `#${this.id.swiper.exchange.container}`, {
            navigation: {
                nextEl: `#${this.id.swiper.exchange.nextEl}`,
                prevEl: `#${this.id.swiper.exchange.prevEl}`,
            },
            pagination: {
                el: `#${this.id.swiper.exchange.page}`,
                type: 'custom',
                renderCustom: function (swiper, current, total) {
                    return `<strong class="crmd_bp_num">${current}</strong>/<span class="crmb_bp_page">${total}</span>`;
                }
            },
            slidesPerView: 1,
            simulateTouch : false,
            loop : true,
            observer :  true,
            speed : 0
        });
    }

    initialize() {
        this.view.market = CNBC_ADMIN_GLOBAL.DATA.HTTP.MAIN.market;
        super.initialize();
    }

    render() {
        this.bind();
        super.render();
    }
}