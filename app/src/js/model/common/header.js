class Header extends Base {
    constructor(parentId) {
        super();

        this.target = $(`#${parentId}`);

        this.id = {
            self: 'cnbc-admin-header-self',
            menu : 'cnbc-admin-header-menu',
            search : {
                button : 'cnbc-admin-header-search-button',
                keyword : 'cnbc-admin-header-search-keyword'
            },
            onair : 'cnbc-admin-header-onair'
        };

        this.bind = () => {
            let loginUrl = CNBC_ADMIN_GLOBAL.CONFIG.URL.AUTH.LOGOUT.link;
            let loginText = CNBC_ADMIN_GLOBAL.CONFIG.URL.AUTH.LOGOUT.text;

            if(this.state.login === false) {
                loginUrl = CNBC_ADMIN_GLOBAL.CONFIG.URL.AUTH.LOGIN.link + '?returnUrl=' + encodeURIComponent(CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC);
                loginText = CNBC_ADMIN_GLOBAL.CONFIG.URL.AUTH.LOGIN.text;
            }

            let bindTemplate = `<div id="${this.id.self}">
                <!-- header-->
                <div id="header" class=""><!-- scroll_on -->
                    <div class="header_inner">
                        <h1 class="sbscnbc_logo"><a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}" class="scl_link icn"><i class="ir">SBSCNBC 의견 있는 경제채널</i></a></h1>
                        <h2 class="hide">SBSCNBC 메인메뉴</h2>
                        <ul>
                            <li class="snb_cont" id="${this.id.menu}-news">
                                <a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/new/news/news_list.jsp?pmCategory=04" class="snb_link_news"><span class="icn"><i class="ir">뉴스</i></span></a><!--해당 페이지일 경우 on 추가-->
                                <div class="snbc_list_w"><!--활성화시 current 추가 -->
                                    <ul class="snbcl_news">
                                        <li class="snbc_cont"><a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/new/news/news_list.jsp?pmCategory=04" class="snbc_link">경제</a></li>
                                        <li class="snbc_cont"><a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/new/news/news_list.jsp?pmCategory=03" class="snbc_link">금융</a></li>
                                        <li class="snbc_cont"><a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/new/news/news_list.jsp?pmCategory=01" class="snbc_link">증권</a></li><!--활성화시 select 추가-->
                                        <li class="snbc_cont"><a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/new/news/news_list.jsp?pmCategory=02" class="snbc_link">글로벌</a></li>
                                        <li class="snbc_cont"><a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/new/news/news_list.jsp?pmCategory=05" class="snbc_link">산업</a></li>
                                        <li class="snbc_cont"><a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/new/news/news_list.jsp?pmCategory=07" class="snbc_link">부동산</a></li>
                                        <li class="snbc_cont"><a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/new/news/news_list.jsp?pmCategory=08" class="snbc_link">시사</a></li>
                                        <li class="snbc_cont"><a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/new/news/news_list.jsp?pmCategory=14" class="snbc_link">속보</a></li>
                                    </ul>
                                </div>
                            </li>
                            <li class="snb_cont" id="${this.id.menu}-biz">
                                <a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/new/investment/index.jsp?pmMenumType=stock" class="snb_link_biz"><span class="icn"><i class="ir">재테크</i></span></a>
                                <div class="snbc_list_w">
                                    <ul class="snbcl_biz">
                                        <li class="snbc_cont"><a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/new/investment/index.jsp?pmMenumType=stock" class="snbc_link">증권정보</a></li>
                                        <li class="snbc_cont"><a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/new/investment/index.jsp?pmMenumType=finance" class="snbc_link">재무</a></li>
                                        <li class="snbc_cont"><a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/new/investment/index.jsp?pmMenumType=property" class="snbc_link">부동산정보</a></li>
                                    </ul>
                                </div>
                            </li>
                            <li class="snb_cont" id="${this.id.menu}-ceo">
                                <a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/ceo_file/index_new.jsp" class="snb_link_ceo"><span class="icn"><i class="ir">CEO</i></span></a>
                                <div class="snbc_list_w">
                                    <ul class="snbcl_ceo">
                                        <li class="snbc_cont"><a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/ceo_file/index_new.jsp" class="snbc_link">취재파일</a></li>
                                        <li class="snbc_cont"><a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/new/corner/corner_list.jsp?pmCornerId=10000003261" class="snbc_link">CEO&amp;Leaders</a></li>
                                        <li class="snbc_cont"><a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/new/corner/corner_list.jsp?pmCornerId=10000009260" class="snbc_link">블루베리</a></li>
                                    </ul>
                                </div>
                            </li>
                            <li class="snb_cont" id="${this.id.menu}-program">
                                <a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/new/prog/index.jsp" class="snb_link_program"><span class="icn"><i class="ir">프로그램</i></span></a>
                                <div class="snbc_list_w">
                                    <ul class="snbcl_program">
                                        <li class="snbc_cont"><a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/new/prog/index.jsp" class="snbc_link">전체</a></li>
                                        <li class="snbc_cont"><a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/new/prog/index.jsp?pmCategoryId=01" class="snbc_link">뉴스</a></li>
                                        <li class="snbc_cont"><a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/new/prog/index.jsp?pmCategoryId=02" class="snbc_link">재테크</a></li>
                                        <li class="snbc_cont"><a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/new/prog/index.jsp?pmCategoryId=04" class="snbc_link">CEO</a></li>
                                        <li class="snbc_cont"><a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/new/prog/index.jsp?pmCategoryId=03" class="snbc_link">교양</a></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                        <div class="hi_right">
                            <h2 class="hide">SBSCNBC 공통메뉴</h2>
                            <ul class="gnb">
                                <li class="gnb_cont"><a href="${loginUrl}" class="gnb_link">${loginText}</a></li>
                                <li class="gnb_cont_onair"><i class="round_blue_left icn"></i><a href="javascript:;" class="gnb_link" onclick="return false;" id="${this.id.onair}">ON AIR</a><i class="round_blue_right icn"></i></li>
                                <li class="gnb_cont"><a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/sub/channel.jsp" class="gnb_link">채널번호</a></li>
                                <li class="gnb_cont"><a href="http://w3.sbs.co.kr/schedule/scheduleSub.do?depth02=d2_2&depth03=CNBC&channel=CNBC" target="_blank" class="gnb_link">편성표</a></li>
                                <li class="gnb_cont"><a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/sub/qna_new.jsp" class="gnb_link">시청자게시판</a></li>
                                <li class="gnb_cont"><a href="https://news.sbs.co.kr/news/newsMain.do" target="_blank" class="gnb_link">SBS뉴스</a></li>
                            </ul>
                            <h2 class="hide">검색엔진</h2>
                            <form>
                                <fieldset>
                                    <legend>통합검색</legend>
                                    <div class="search_form">
                                        <label for="search" class="search_label">검색어 입력</label>
                                        <input type="text" id="${this.id.search.keyword}" value="${this.state.searchDefaultKeyword}" class="search_txt show"><!--사용자가 텍스트 입력 시 value값 초기화 및 클래스 on 추가 , scroll시 없어졌던 input박스 show 추가시  나타나기 -->
                                        <button type="button" id="${this.id.search.button}" class="search_btn" onclick="return false;"><span class="icn"><i class="ir">검색</i></span></button><!-- scroll시 input박스 없어지고 클릭하면 input박스 나타남 이후 검색기능 -->
                                    </div><!--//cnbc_search-->
                                </fieldset>
                            </form>
                        </div><!--//hi_right-->
                    </div><!--//header_inner-->
                </div>
                <!--//header-->
            </div>`;

            this.target.html(bindTemplate);
            this.target.off();

            // 메뉴 선택
            this.target.on('mouseenter', `li[id^="${this.id.menu}-"]`, (event) => {
                LOG_UTIL.log(event);
                $(event.currentTarget).addClass("on");
                $(event.currentTarget).find(".snbc_list_w").addClass("current");
            });

            this.target.on('mouseleave', `li[id^="${this.id.menu}-"]`, (event) => {
                LOG_UTIL.log(event);
                $(event.currentTarget).removeClass("on");
                $(event.currentTarget).find(".snbc_list_w").removeClass("current");
            });

            // 검색 버튼 클릭
            this.target.on('click', `#${this.id.search.button}`, (event) => {
                LOG_UTIL.log(event);

                if(_.isEmpty($(`#${this.id.search.keyword}`).val())) {
                    alert("검색 내용이 없습니다. 검색어를 입력해 주세요.");
                    $(`#${this.id.search.keyword}`).focus();
                    return false;
                }

                if( $(`#${this.id.search.keyword}`).val() == `${this.state.searchDefaultKeyword}`) {
                    location.href="http://5star.sbscnbc.sbs.co.kr";
                    return false;
                }

                var openNewWindow = window.open("about:blank");
                openNewWindow.location.href = encodeURI('http://w3.sbs.co.kr/search/main.do?query=' + $('#' + this.id.search.keyword).val() + '&collection=nnews&searchTermStartDate=&searchTermEndDate=&searchOption=1&ex=cn');
                return false;
            });

            // 텍스트 영역 클릭
            this.target.on('focusin', `#${this.id.search.keyword}`, (event) => {
                if( $(`#${this.id.search.keyword}`).val() == `${this.state.searchDefaultKeyword}`) {
                    $(event.currentTarget).val("");
                }
            });

            this.target.on('focusout', `#${this.id.search.keyword}`, (event) => {
                if(_.isEmpty($(event.currentTarget).val())) {
                    $(event.currentTarget).val(this.state.searchDefaultKeyword);
                }
            });

            // 검색
            this.target.on('keydown', `#${this.id.search.keyword}`, (event) => {
                if(event.keyCode==13) {
                    $(`#${this.id.search.button}`).trigger('click');
                    return false;
                }
            });

            // 온에어 클릭시
            this.target.on('click', `#${this.id.onair}`, (event) => {
                let popWidth = 910;
                let onairWin = window.open('http://vod.sbs.co.kr/onair/onair_index.jsp?Channel=CNBC','SBS_OnAir','directories=no,location=no,menubar=no,status=no,toolbar=no,scrollbars=no,resizable=no,width='+popWidth+',height=490');
                onairWin.focus();
            });

        };
    }

    initialize() {
        this.state.login = AUTH_UTIL.loginChk("SBS_ID");
        this.state.searchDefaultKeyword = "투자 유망종목 매일 1종목 추천";
        super.initialize();
    }

    render() {
        this.bind();
        super.render();
    }
}