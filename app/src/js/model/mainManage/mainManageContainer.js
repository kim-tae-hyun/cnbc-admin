/**
 * 메인 관리자 컨테이너 구조 정의
 * @class MainManageContainer
 * @author whfkdakf75@sbs.co.kr
 */
class MainManageContainer extends Base {
    constructor(parentId) {
        super();

        this.target = $(`#${parentId}`);

        this.id = {
            self: 'cnbc-admin-main-container-self',
            fix : {
                top : {
                    button : 'cnbc-admin-main-container-fix-top-button',
                    modal : 'cnbc-admin-main-container-fix-top-modal'
                },
                popular : 'cnbc-admin-main-container-fix-popular',
                ceo : 'cnbc-admin-main-container-fix-ceo',
                program : 'cnbc-admin-main-container-fix-program',
                premium : 'cnbc-admin-main-container-fix-premium',
                financial : 'cnbc-admin-main-container-fix-financial',
                hotIssue : 'cnbc-admin-main-container-fix-hotIssue'
            }
        };

        this.model = {};

        this.bind = () => {
            let getBaseTemplate = ()=> {
                let baseTemplate = `
                <!-- remote ajax call-->
                <button id="${this.id.fix.top.button}" style="display: none;"></button>
                <div class="modal modal-center fade" id="${this.id.fix.top.modal}" tabindex='-1'>
                    <div class="modal-dialog modal-center modal-fullsize">
                        <div class="modal-content ">
                            <!-- remote ajax call이 되는영역 -->
                        </div>
                    </div>
                </div>
                <div class="row">
                    <iframe src="/view/mainManage/pc/index.html" frameborder="0" marginwidth="0" marginheight="0" style="width:100%;height:800px"></iframe>
                </div>`;

                return baseTemplate;
            }

            this.target.html(`
                ${getBaseTemplate()}
            `);

            this.target.off();

            // top fix click event
            this.target.on('click', `#${this.id.fix.top.button}`, (event) => {
                let remoteUrl = `/view/mainManage/fix/top.html?_=${new Date().getTime()}`;
                $(`#${this.id.fix.top.modal}`).removeData('bs.modal');
                $(`#${this.id.fix.top.modal}`).modal({
                    remote : remoteUrl,
                    backdrop: false
                });
            });
            // popular fix click event
            this.target.on('click', `#${this.id.fix.popular}`, (event) => {
                alert('popular');
            });
            // ceo fix click event
            this.target.on('click', `#${this.id.fix.ceo}`, (event) => {
                alert('ceo');
            });
            // program fix click event
            this.target.on('click', `#${this.id.fix.program}`, (event) => {
                alert('program');
            });
            // premium fix click event
            this.target.on('click', `#${this.id.fix.premium}`, (event) => {
                alert('premium');
            });
            // financial fix click event
            this.target.on('click', `#${this.id.fix.financial}`, (event) => {
                alert('financial');
            });
            // hotIssue fix click event
            this.target.on('click', `#${this.id.fix.hotIssue}`, (event) => {
                alert('hotIssue');
            });
        };
    }

    initialize() {
        this.bind();
        super.initialize();
    }

    render() {
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

            this.model.financial = new MainFinancial(this.id.content.right.financial);
            this.model.financial.initialize();
            this.model.financial.render();

            this.model.hotIssue = new MainHotIssue(this.id.content.right.hotIssue);
            this.model.hotIssue.initialize();
            this.model.hotIssue.render();

            super.render();
        };

        httpService.callback.failed = (error) => {
            alert(`정보를 불러오는데 실패하였습니다.(${error})`);
        };
        httpService.getData();
    }
}