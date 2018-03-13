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
                top : 'cnbc-admin-main-container-fix-top',
                popular : 'cnbc-admin-main-container-fix-popular',
                ceo : 'cnbc-admin-main-container-fix-ceo',
                program : 'cnbc-admin-main-container-fix-program',
                premium : 'cnbc-admin-main-container-fix-premium',
                financial : 'cnbc-admin-main-container-fix-financial',
                hotIssue : 'cnbc-admin-main-container-fix-hotIssue'
            },
            modal : {
                fix : 'cnbc-admin-main-container-modal-fix'
            }
        };

        this.model = {};

        this.bind = () => {
            let getBaseTemplate = ()=> {
                let baseTemplate = `
                <!-- remote ajax call-->
                <button id="${this.id.fix.top}" style="display: none;"></button>
                <div class="modal modal-center fade" id="${this.id.modal.fix}" tabindex='-1'>
                    <div class="modal-dialog modal-center modal-fullsize">
                        <div class="modal-content ">
                            <!-- remote ajax call이 되는영역 -->
                        </div>
                    </div>
                </div>
                `;

                return baseTemplate;
            }

            this.target.html(`
                ${getBaseTemplate()}
            `);

            this.target.off();

            // top fix click event
            this.target.on('click', `#${this.id.fix.top}`, (event) => {
                let remoteUrl = `/view/mainManage/pc/fix/fix.html?_=${new Date().getTime()}`;
                $(`#${this.id.modal.fix}`).removeData('bs.modal');
                $(`#${this.id.modal.fix}`).modal({
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
        let httpServiceIndex = new HttpService('/api/cnbc/home/index.json');
        httpServiceIndex.callback.succeeded = (data) => {
            CNBC_ADMIN_GLOBAL.DATA.HTTP.MAIN = data;
            super.render();
        }

        httpServiceIndex.callback.failed = (error) => {
            alert(`MAIN 정보를 불러오는데 실패하였습니다.(${error})`);
        };
        httpServiceIndex.getData();

        let httpServiceNewsLIst = new HttpService('/api/cnbc/news/list/newsList.json');
        httpServiceNewsLIst.callback.succeeded = (data) => {
            CNBC_ADMIN_GLOBAL.DATA.HTTP.NEWSLIST = data;
            super.render();
        }

        httpServiceNewsLIst.callback.failed = (error) => {
            alert(`NEWS LIST 정보를 불러오는데 실패하였습니다.(${error})`);
        };
        httpServiceNewsLIst.getData();
    }
}