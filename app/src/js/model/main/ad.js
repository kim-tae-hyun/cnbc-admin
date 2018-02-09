class MainAD extends Base {
    constructor(parentId) {
        super();

        this.id = {
            self: 'cnbc-admin-main-ad-self',
            ad : parentId,
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
                    middle : 'cnbc-admin-main-ad-temp-right-middle',
                    bottom : 'cnbc-admin-main-ad-temp-right-bottom'
                }
            }
        };

        this.target = {}

        this.model = {};

        this.leftMiddleBind = () => {
            $(`#${parentId.bindarea.left.middle}`).html($(`#${this.id.temp.left.middle}`).html());
        };

        this.leftBottomBind = () => {
            $(`#${parentId.bindarea.left.bottom.first}`).html($(`#${this.id.temp.left.bottom.first}`).html());
            $(`#${parentId.bindarea.left.bottom.second}`).html($(`#${this.id.temp.left.bottom.second}`).html());
            $(`#${parentId.bindarea.left.bottom.third}`).html($(`#${this.id.temp.left.bottom.third}`).html());
        };
    }

    initialize() {

        super.initialize();
    }

    render() {
        this.leftMiddleBind();
        this.leftBottomBind();
        super.render();
    }
}