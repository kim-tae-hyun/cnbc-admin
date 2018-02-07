class MainAD extends Base {
    constructor(parentId) {
        super();

        this.id = {
            self: 'cnbc-admin-main-ad-self',
            ad : parentId
        };

        this.target = {
            left: {
                middle: {},
                bottom: {
                    first: {},
                    second: {},
                    third: {}
                },
                right: {}
            }
        }

        this.target.left.middle = $(`#${parentId.bindarea.left.middle}`);
        this.target.left.bottom.first = $(`#${parentId.bindarea.left.bottom.first}`);
        this.target.left.bottom.second = $(`#${parentId.bindarea.left.bottom.second}`);
        this.target.left.bottom.third = $(`#${parentId.bindarea.left.bottom.third}`);

        this.model = {};

        this.leftMiddleBind = () => {
            this.target.left.middle.html($(`#${parentId.temp.left.middle}`).html());
        };

        this.leftBottomBind = () => {
            this.target.left.bottom.first.html($(`#${parentId.temp.left.bottom.first}`).html());
            this.target.left.bottom.second.html($(`#${parentId.temp.left.bottom.second}`).html());
            this.target.left.bottom.third.html($(`#${parentId.temp.left.bottom.third}`).html());
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