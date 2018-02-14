class Footer extends Base {
    constructor(parentId) {
        super();

        this.target = $(`#${parentId}`);

        this.id = {
            self: 'cnbc-admin-footer-self',
            bindarea : {
                program : 'cnbc-admin-footer-bindarea-program',
                notice : 'cnbc-admin-footer-bindarea-notice'
            },
            site : {
                family : {
                    self: 'cnbc-admin-footer-site-family-self',
                    toggle : 'cnbc-admin-footer-site-family-toggle'
                },
                local : {
                    self : 'cnbc-admin-footer-site-local-self',
                    toggle : 'cnbc-admin-footer-site-local-toggle'
                }
            }
        };

        this.state = {
            login : AUTH_UTIL.loginChk("SBS_ID"),
            searchDefaultKeyword : "투자 유망종목 매일 1종목 추천"
        }

        this.bind = () => {
            let getProgramTemplate = () => {
                let programeTemplate = ``;
                if(!_.isUndefined(this.view.footer)) {
                    this.view.footer.program.forEach(( program , programIndex, programs ) => {
                        programeTemplate += `<li class="cbcp_list">
                            <strong href="#" class="cbcp_title">${program.name}</strong>
                            <ul class="cbcp_cont">
                        `;

                        program.menu.forEach((menu, menuIndex) => {
                            programeTemplate += `<li class="cbcp_text"><a href="${menu.linkUrl}" target="_blank" class="cbcp_link">${menu.title}</a></li>`;
                        });

                        programeTemplate += `</ul></li>`;

                    });
                }
                return programeTemplate;
            }

            let getNoticeTemplate = () => {
                let noticeTemplate = ``;
                if(!_.isUndefined(this.view.footer)) {
                    this.view.footer.notice.forEach(( notice , noticeIndex, notices ) => {
                        noticeTemplate += `<li class="cbcn_lbar_cont"><i class="horizon_lbar_blue"></i><a href="${notice.linkUrl}" target="_blank" class="cbcn_lbar_link">${notice.title}</a></li>`;
                    });
                }
                return noticeTemplate;
            }


            let bindTemplate = `<div id="${this.id.self}">
                <!-- 하단 공통 시작 -->
                <div class="content_bottom">
                    <div class="content_bottom_inner">
                        <div class="cb_cnbc_program">
                            <h2 class="cbcp_headtitle"><span class="icn"><i class="ir">SBSCNBC 프로그램</i></span><i class="ht_topbar"></i></h2>
                            <ul class="cbcp_w">
                                ${getProgramTemplate()}
                            </ul>
                        </div><!--cb_cnbc_program-->
                        <div class="cb_cnbc_notice">
                            <h2 class="cbcn_headtitle"><span class="icn"><i class="ir">공지사항</i></span><i class="ht_topbar"></i>
                                <a href="${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/sub/notice.jsp" class="crfn_more cbcn_noti_more">더보기 <i class="icn"></i></a><!--160513 더보기 추가 -->
                            </h2>
                            <ul class="cbcn_lbar_list">
                                ${getNoticeTemplate()}
                            </ul>
                        </div><!--cb_cnbc_notice-->
                    </div><!--content_bottom_inner-->
                </div>
                <!-- footer-->
                <div id="footer">
                    <div class="footer_inner">
                        <h2 class="hide">SBSCNBC 관련페이지</h2>
                        <ul class="fnb_list">
                            <li class="fnb_cont_odd"><a href="http://sbscnbc.sbs.co.kr/sub/channel.jsp" target="_blank" class="fnb_link">채널안내</a></li>
                            <li class="fnb_cont_even"><a href="http://sbscnbc.sbs.co.kr/sub/about.jsp" target="_blank" class="fnb_link">ABOUT SBSCNBC</a></li>
                            <li class="fnb_cont_odd"><a href="http://w3.sbs.co.kr/cs/customerRulesSbs.do" target="_blank" class="fnb_link">이용약관</a></li>
                            <li class="fnb_cont_even"><a href="http://w3.sbs.co.kr/cs/customerPrivacy.do" target="_blank" class="fnb_link">개인정보취급방침</a></li>
                            <li class="fnb_cont_odd"><a href="http://w3.sbs.co.kr/cs/customerMain.do" target="_blank" class="fnb_link">고객센터</a></li>
                        </ul>
                        <div class="fi_right">
                            <h3 class="hide">SBS콘텐츠허브와 SBS플러스 정보</h3>
                            <address class="fi_addr_hub">서울특별시 마포구 상암산로 82 SBS프리즘타워 15층 (주)SBS아이앤엠 대표이사 유종연 <a href="javascript:window.open('http://w3.sbs.co.kr/commPopup/map.html?div=pc_map','', 'width=550, height=900')" target="_blank" class="fi_addr_link">찾아오시는길</a><br>
                                SBS아이앤엠 고객센터(홈페이지 관련 문의)02-2001-6600 SBSCNBC 방송사 02-6938-1600 <a href="mailto:webmaster@sbs.co.kr" title="메일클라이언트가 실행됩니다" class="fi_addr_link">E-mail</a><br>
                                사업자 번호 598-88-00752 통신판매업 신고번호 제 2017-서울마포-1652 호 부가통신사업 신고번호 제 2-01-17-0120호</address>
                            <address class="fi_addr_plus">서울특별시 마포구 상암산로 82 SBS프리즘타워 10층 (주)에스비에스플러스 대표이사 김계홍 <a href="javascript:window.open('http://w3.sbs.co.kr/commPopup/map.html?div=pc_map','', 'width=550, height=900')" class="fi_addr_link">찾아오시는길</a><br>
                                고객센터 SBS아이앤엠 02-2001-6600 SBSCNBC 방송사 02-6938-1600 <a href="mailto:webmaster@sbs.co.kr" title="메일클라이언트가 실행됩니다" class="fi_addr_link">E-mail</a></address>
                            <p class="copyright">COPYRIGHT &copy; SBS I&M &amp; SBSPLUS. ALL RIGHTS RESERVED.</p>
                            <h3 class="hide">SBSCNBC 관련사이트</h3>
                            <div class="site_family" id="${this.id.site.family.self}">
                                <strong class="site_title"><a href="javasctipt:;" onclick="return false;" class="site_link">SBS Family<i class="site_tit_btn icn"></i></a></strong><!--활성화시 on-->
                                <div class="site_list_w" id="${this.id.site.family.toggle}"><!--활성화시 on-->
                                    <ul class="site_list">
                                        <li class="site_cont"><a href="http://www.sbsmedia.co.kr" class="site_link" target="_blank" alt="SBS 미디어홀딩스">SBS 미디어홀딩스</a></li>
                                        <li class="site_cont"><a href="http://www.sbscontentshub.co.kr" class="site_link" target="_blank" alt="SBS 콘텐츠허브">SBS 콘텐츠허브</a></li>
                                        <li class="site_cont"><a href="http://sbsplus.sbs.co.kr" class="site_link" target="_blank" alt="SBS 플러스">SBS 플러스</a></li>
                                        <li class="site_cont"><a href="http://sbssports.sbs.co.kr" class="site_link" target="_blank" alt="SBS Sports">SBS SPORTS</a></li>
                                        <li class="site_cont"><a href="http://golf.sbs.co.kr" class="site_link" target="_blank" alt="SBS 골프">SBS 골프</a></li>
                                        <li class="site_cont"><a href="http://sbscnbc.sbs.co.kr" class="site_link" target="_blank" alt="SBS CNBC">SBSCNBC</a></li>
                                        <li class="site_cont"><a href="http://sbsfune.sbs.co.kr" class="site_link" target="_blank" alt="SBS FunE">SBS funE</a></li>
                                        <li class="site_cont"><a href="http://www.mtv.co.kr" class="site_link" target="_blank" alt="SBS MTV">SBS MTV</a></li>
                                        <li class="site_cont"><a href="http://www.nick.co.kr" class="site_link" target="_blank" alt="니켈로디언코리아">니켈로디언코리아</a></li>
                                        <li class="site_cont"><a href="http://www.sbs-int.com" class="site_link" target="_blank" alt="SBS 인터내셔널">SBS 인터내셔널</a></li>
                                        <li class="site_cont"><a href="http://www.mediacreate.co.kr" class="site_link" target="_blank" alt="SBS 미디어크리에이트">미디어크리에이트</a></li>
                                        <li class="site_cont"><a href="http://foundation.sbs.co.kr/culture.cmd?act=index" class="site_link" target="_blank" alt="SBS 문화재단">SBS 문화재단</a></li>
                                        <li class="site_cont"><a href="http://foundation.sbs.co.kr/seoam.cmd?act=index" class="site_link" target="_blank" alt="서암학술장학재단">서암학술장학재단</a></li>
                                        <li class="site_cont"><a href="http://ann.sbs.co.kr" class="site_link" target="_blank" alt="SBS 아나운서">SBS 아나운서</a></li>
                                    </ul>
                                </div>
                            </div><!--// site_family -->
                            <div class="site_local" id="${this.id.site.local.self}">
                                <strong class="site_title"><a href="javascript:;" onclick="return false;" class="site_link">지역민영방송<i class="site_tit_btn icn"></i></a></strong><!--활성화시 on -->
                                <div class="site_list_w" id="${this.id.site.local.toggle}"><!--활성화시 on-->
                                    <ul class="site_list">
                                        <li class="site_cont"><a href="http://www.igtb.co.kr/" class="site_link" target="_blank">강원 민방</a></li>
                                        <li class="site_cont"><a href="http://www.ikbc.co.kr/" class="site_link" target="_blank">광주 방송</a></li>
                                        <li class="site_cont"><a href="http://www.tbc.co.kr/" class="site_link" target="_blank">대구 방송</a></li>
                                        <li class="site_cont"><a href="http://www.tjb.co.kr/" class="site_link" target="_blank">대전 방송</a></li>
                                        <li class="site_cont"><a href="http://www.knn.co.kr/" class="site_link" target="_blank">부산 방송</a></li>
                                        <li class="site_cont"><a href="http://www.ubc.co.kr/" class="site_link" target="_blank">울산 방송</a></li>
                                        <li class="site_cont"><a href="http://www.jtv.co.kr/" class="site_link" target="_blank">전주 방송</a></li>
                                        <li class="site_cont"><a href="http://www.cjb.co.kr/" class="site_link" target="_blank">청주 방송</a></li>
                                        <li class="site_cont"><a href="http://www.jibstv.co.kr/" class="site_link" target="_blank">제주 방송</a></li>
                                    </ul>
                                </div>
                            </div><!--site_local-->
                        </div><!--fi_right-->
                        <h3 class="hide">SBSCNBC SNS</h3>
                        <ul class="fi_sns">
                            <li class="fis_cont_twitter"><a href="https://twitter.com/sbscnbc" target="_blank" class="fis_link icn" title="SBSCNBC 트위터로 새창이동"><i class="ir">트위터</i></a></li>
                            <li class="fis_cont_facebook"><a href="https://www.facebook.com/SBSCNBC" target="_blank" class="fis_link icn" title="SBSCNBC 페이스북으로 새창이동"><i class="ir">페이스북</i></a></li>
                        </ul>
                        <i class="fi_logo icn"></i>
                    </div><!--// footer_inner -->
                </div>
                <!--//footer-->
            </div>`;

            this.target.html(bindTemplate);
            this.target.off();

            this.target.on('click', `#${this.id.site.family.self}`, (event) => {
                $(`#${this.id.site.family.toggle}`).toggleClass("on");
                return false;
            });

            this.target.on('click', `#${this.id.site.local.self}`, (event) => {
                $(`#${this.id.site.local.toggle}`).toggleClass("on");
                return false;
            });
        };
    }

    initialize() {
        this.view.footer = !_.isUndefined(CNBC_ADMIN_GLOBAL.DATA.HTTP.COMMON.footer) ? CNBC_ADMIN_GLOBAL.DATA.HTTP.COMMON.footer : {};
        super.initialize();
    }

    render() {
        this.bind();
        super.render();
    }
}