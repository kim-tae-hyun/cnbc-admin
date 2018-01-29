class MainContainer extends Base {
    constructor(parentId) {
        super();

        this.target = $(`#${parentId}`);

        this.id = {
            self: 'cnbc-admin-main-self',
            top: 'cnbc-admin-main-top',
            ad :{
                top : 'cnbc-admin-main-ad-top',
                middle : 'cnbc-admin-main-ad-middel',
                bottom : 'cnbc-admin-main-ad-bottom'
            },
            popular : 'cnbc-admin-main-popular',
            ceo : 'cnbc-admin-main-ceo',
            program : 'cnbc-admin-main-program',
            premium : 'cnbc-admin-main-premium',
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
                                <div id="${this.id.popular}"></div>
                                <div id="${this.id.ceo}"></div>    
                            </div>
                            <div class="top_news_bn"><a href="http://www.iboos.co.kr" style="display:block;margin-top:40px;"><img src="http://img.sbs.co.kr/sbscnbc/img/sbscnbc_main_banner.jpg" width="670" height="103" alt="SBSCNBC 부스 부동산스토리"></a></div>
                            <div class="cl_bottom_cont">
                                <div id="${this.id.program}"></div>
                            </div>
                            <div class="cl_center_cont">
                                <div id="${this.id.premium}"></div>
                            </div>
                           <ul class="cl_bottom_ad">
                                <li class="clb_ad_list"><a href="" target="blank"><img src="http://img.sbs.co.kr/sw16/cnbc/pc/img/banner/mbn_ad_01.jpg" alt="광고 타이틀넣어주세요" width="216" height="180"></a></li>
                                <li class="clb_ad_list"><a href="" target="blank"><img src="http://img.sbs.co.kr/sw16/cnbc/pc/img/banner/mbn_ad_01.jpg" alt="광고 타이틀넣어주세요" width="216" height="180"></a></li>
                                <li class="clb_ad_list"><a href="" target="blank"><img src="http://img.sbs.co.kr/sw16/cnbc/pc/img/banner/mbn_ad_01.jpg" alt="광고 타이틀넣어주세요" width="216" height="180"></a></li>
                            </ul>
                        </div>
                        <div class="cont_right"></div>
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

            this.model.popular = new MainPopular(this.id.popular);
            this.model.popular.initialize();
            this.model.popular.render();

            this.model.ceo = new MainCEO(this.id.ceo);
            this.model.ceo.initialize();
            this.model.ceo.render();

            this.model.program = new MainProgram(this.id.program);
            this.model.program.initialize();
            this.model.program.render();

            this.model.premium = new MainPremium(this.id.premium);
            this.model.premium.initialize();
            this.model.premium.render();

            super.render();
        };

        httpService.callback.failed = (error) => {
            alert(`정보를 불러오는데 실패하였습니다.(${error})`);
        };
        httpService.getData();
    }
}