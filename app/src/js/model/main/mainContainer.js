class MainContainer extends Base {
    constructor(parentId) {
        super();

        this.target = $(`#${parentId}`);

        this.id = {
            self: 'cnbc-admin-main-self',
            top: 'cnbc-admin-main-top',
            content : {
                left : {
                    popular : 'cnbc-admin-main-content-left-popular',
                    ceo : 'cnbc-admin-main-content-left-ceo',
                    program : 'cnbc-admin-main-content-left-program',
                    premium : 'cnbc-admin-main-content-left-premium'
                },
                right : {
                    market : 'cnbc-admin-main-content-right-market',
                    promotion : 'cnbc-admin-main-content-right-promotion',
                    financial : 'cnbc-admin-main-content-right-financial',
                    ad : 'cnbc-admin-main-content-right-ad',
                    hot_issue : 'cnbc-admin-main-content-right-hot_issue',
                    contact : 'cnbc-admin-main-content-right-contact'
                }
            },
            ad :{
                left : {
                    middle : 'cnbc-admin-main-ad-left-middle',
                    bottom : 'cnbc-admin-main-ad-left-bottom'
                },
                right : {
                    top : 'cnbc-admin-main-ad-right-top',
                    middle : 'cnbc-admin-main-ad-right-middle',
                    bottom : 'cnbc-admin-main-ad-right-bottom'
                }
            },
        };

        this.model = {};

        this.bind = () => {
            this.target.html(`<div id="container">
                <div id="${this.id.self}">
                    <div class="cnbc_main_quick">
                        <h2 class="cmq_tit">SBS FAMILY</h2>
                        <ul class="cmq_list">
                            <li><a href="http://www.sbs.co.kr/" target="_top">SBS</a></li>
                            <li><a href="http://sbsmedianet.sbs.co.kr/plus/" target="_top">PLUS</a></li>
                            <li><a href="http://sbssports.sbs.co.kr/" target="_top">SPORTS</a></li>
                            <li><a href="http://golf.sbs.co.kr/" target="_top">GOLF</a></li>
                            <li><a href="http://sbscnbc.sbs.co.kr/" target="_top">CNBC</a></li>
                            <li><a href="http://sbsmedianet.sbs.co.kr/fune/" target="_top">funE</a></li>
                            <li><a href="http://sbsmedianet.sbs.co.kr/mtv/" target="_top">MTV</a></li>
                            <li><a href="http://sbsmedianet.sbs.co.kr/nick/" target="_top">nick</a></li>
                        </ul>
                    </div>
                    <div class="content_top">
                        <div id="${this.id.top}"></div>
                    </div>
                    <div id="content" class="main_content_w">
                        <div class="cont_left">
                            <div class="cl_top_cont">
                                <div id="${this.id.content.left.popular}"></div>
                                <div id="${this.id.content.left.ceo}"></div>    
                            </div>
                            <div class="top_news_bn">
                                <div id="${this.id.ad.left.middle}"></div>
                            </div>
                            <div class="cl_bottom_cont">
                                <div id="${this.id.content.left.program}"></div>
                            </div>
                            <div class="cl_center_cont">
                                <div id="${this.id.content.left.premium}"></div>
                            </div>
                           <ul class="cl_bottom_ad">
                                <div id="${this.id.ad.left.bottom}"></div>
                            </ul>
                        </div>
                        <div class="cont_right">
                            <div class="cr_market_data">
                                <div id="${this.id.content.right.market}"></div>
                            </div>
                            <div class="cr_promotion_bnr">
                                <div id="${this.id.ad.right.top}"></div>
                            </div>
                            <div class="cr_financial"></div>
                            <div class="cr_ad_bnr"></div>
                            <div class="cr_hot_issue"></div>
                            <div class="cr_contact_cnbc"></div>
                        </div>
                        <i class="cont_right_border"></i>
                    </div>
                </div>
            </div>`);
        };
    }

    initialize() {
        super.initialize();
    }

    render() {
        this.bind();

        let httpService = new HttpService('/api/cnbc/home/index.json');
        httpService.callback.succeeded = (data) => {
            CNBC_ADMIN_GLOBAL.DATA.HTTP.MAIN = data;

            this.model.top = new MainTop(this.id.top);
            this.model.top.initialize();
            this.model.top.render();

            this.model.popular = new MainPopular(this.id.content.left.popular);
            this.model.popular.initialize();
            this.model.popular.render();

            this.model.ceo = new MainCEO(this.id.content.left.ceo);
            this.model.ceo.initialize();
            this.model.ceo.render();

            this.model.program = new MainProgram(this.id.content.left.program);
            this.model.program.initialize();
            this.model.program.render();

            this.model.premium = new MainPremium(this.id.content.left.premium);
            this.model.premium.initialize();
            this.model.premium.render();

            this.model.ad = new MainAD(this.id.ad);
            this.model.ad.initialize();
            this.model.ad.render();

            this.model.market = new MainMarket(this.id.content.right.market);
            this.model.market.initialize();
            this.model.market.render();

            super.render();
        };

        httpService.callback.failed = (error) => {
            alert(`정보를 불러오는데 실패하였습니다.(${error})`);
        };
        httpService.getData();
    }
}