class MainMarket extends Base {
    constructor(parentId) {
        super();

        this.target = $(`#${parentId}`);

        this.id = {
            self: 'cnbc-admin-main-ceo-self'
        };

        this.model = {};

        this.bind = () => {
            this.target.html(`<h2 class="hide">실시간 시황 데이터</h2>
                    <ul class="crmd_list"><!-- 활성화시 current -->
                        <li class="crmd_cont_domestic current"><a href="#" class="crmd_title">국내증시</a>
                            <div class="crmd_data_w">
                                <ul class="crmd_data_list">
                                    <li class="crmd_data_cont on"><!--활성화시 on -->
                                        <strong class="crmd_dc_title">KOSPI <span class="crmd_dc_day">01&#47;29 14:53</span></strong>
                                        <em class="crmd_dc_data">1,906.94 <span class="up_bold icn"><i class="ir">상승</i></span> <span class="crmd_dc_per">0.00%</span></em>
                                    </li>
                                    <li class="crmd_data_cont">
                                        <strong class="crmd_dc_title">KOSDAQ <span class="crmd_dc_day">02&#47;18 장마감</span></strong>
                                        <em class="crmd_dc_data">1,906.94 <span class="down_bold icn"><i class="ir">하락</i></span> <span class="crmd_dc_per">0.00%</span></em>
                                    </li>
                                </ul>
                                <div class="crmd_btn_paging">
                                    <strong class="crmd_bp_num">1</strong>&#47;<span class="crmb_bp_page">2</span>
                                    <a href="#" class="crmd_bp_left icn" title="이전 보기"><i class="ir">이전</i></a><a href="#" class="crmd_bp_right icn" title="다음 보기"><i class="ir">다음</i></a>
                                </div>
                            </div>
                        </li>
                        <li class="crmd_cont_overseas"><a href="#" class="crmd_title">해외증시</a>
                            <div class="crmd_data_w">
                                <ul class="crmd_data_list">
                                    <li class="crmd_data_cont">
                                        <strong class="crmd_dc_title">DOWJONES</strong>
                                        <em class="crmd_dc_data">1,906.94 <span class="up_bold icn"><i class="ir">상승</i></span> <span class="crmd_dc_per">0.00%</span></em>
                                    </li>
                                    <li class="crmd_data_cont">
                                        <strong class="crmd_dc_title">NASDAQ</strong>
                                        <em class="crmd_dc_data">1,906.94 <span class="down_bold icn"><i class="ir">하락</i></span> <span class="crmd_dc_per">0.00%</span></em>
                                    </li>
                                </ul>
                                <div class="crmd_btn_paging">
                                    <strong class="crmd_bp_num">1</strong>&#47;<span class="crmb_bp_page">2</span>
                                    <a href="#" class="crmd_bp_left icn" title="이전 보기"><i class="ir">이전</i></a><a href="#" class="crmd_bp_right icn" title="다음 보기"><i class="ir">다음</i></a>
                                </div>
                            </div>
                        </li>
                        <li class="crmd_cont_exchange"><a href="#" class="crmd_title">환율</a>
                            <div class="crmd_data_w">
                                <ul class="crmd_data_list">
                                    <li class="crmd_data_cont">
                                        <strong class="crmd_dc_title">미국 USD</strong>
                                        <p class="crmd_dc_text">
                                            <em class="crmd_dc_data">1,229.50 <span class="up_thin icn"></span></em>
                                            <strong class="crmd_dc_per">1.50 <span class="up_bold icn"><i class="ir">상승</i></span></strong>
                                        </p>
                                    </li>
                                    <li class="crmd_data_cont">
                                        <strong class="crmd_dc_title">유럽연합 EUR</strong>
                                        <p class="crmd_dc_text">
                                            <em class="crmd_dc_data">1,368.93 <span class="down_thin icn"></span></em>
                                            <strong class="crmd_dc_per">-0.65 <span class="down_bold icn"><i class="ir">감소</i></span></strong>
                                        </p>
                                    </li>
                                    <li class="crmd_data_cont">
                                        <strong class="crmd_dc_title">일본 JPY 100</strong>
                                        <p class="crmd_dc_text">
                                            <em class="crmd_dc_data">1,229.50 <span class="up_thin icn"></span></em>
                                            <strong class="crmd_dc_per">1.50 <span class="up_bold icn"><i class="ir">상승</i></span></strong>
                                        </p>
                                    </li>
                                    <li class="crmd_data_cont">
                                        <strong class="crmd_dc_title">중국원화 CNY</strong>
                                        <p class="crmd_dc_text">
                                            <em class="crmd_dc_data">1,229.50 <span class="up_thin icn"></span></em>
                                            <strong class="crmd_dc_per">1.50 <span class="up_bold icn"><i class="ir">상승</i></span></strong>
                                        </p>
                                    </li>
                                </ul>
                                <div class="crmd_btn_paging">
                                    <strong class="crmd_bp_num">1</strong>&#47;<span class="crmb_bp_page">4</span>
                                    <a href="#" class="crmd_bp_left icn" title="이전 보기"><i class="ir">이전</i></a><a href="#" class="crmd_bp_right icn" title="다음 보기"><i class="ir">다음</i></a>
                                </div>
                            </div>
                        </li>
                    </ul>`);
        };
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