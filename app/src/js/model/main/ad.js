class MainAD extends Base {
    constructor(parentId) {
        super();

        this.id = {
            self: 'cnbc-admin-main-ceo-self',
            ad : parentId
        };

        this.target = {
            left : {},
            right : {}
        }

        this.target.left.middle = $(`#${parentId.left.middle}`);
        this.target.left.bottom = $(`#${parentId.left.bottom}`);
        this.target.right.middle = $(`#${parentId.right.middle}`);
        this.target.right.bottom = $(`#${parentId.right.bottom}`);

        this.model = {};

        this.leftMiddleBind = () => {
            let adSize = 1;
            let leftMiddle = _.shuffle(_.filter(this.view.ad.left.middle, function(item){return item.service == "Y"})).slice( 0, adSize );
            let leftMiddleTemplate = "";
            leftMiddle.forEach((ad, adIndex) => {
                if(adIndex == adSize) {
                    return false;
                };

                leftMiddleTemplate += `<a href="${ad.linkUrl}" style="display:block;margin-top:40px;" target="${ad.target}"><img src="${ad.imageUrl}" width="670" height="103" alt="${ad.title}"></a>`;
            });
            this.target.left.middle.html(leftMiddleTemplate);
        };

        this.leftBottomBind = () => {
            let adSize = 3;
            let leftBottom = _.shuffle(_.filter(this.view.ad.left.bottom, function(item){return item.service == "Y"})).slice( 0, adSize );
            let leftBottomTemplate = `<ul>`

            leftBottom.forEach((ad, adIndex) => {
                if(adIndex == adSize) {
                    return false;
                };

                leftBottomTemplate += `<li class="clb_ad_list"><a href="${ad.linkUrl}" target="${ad.target}"><img src="${ad.imageUrl}" alt="${ad.title}" width="216" height="180"></a></li>`;
            });

            leftBottomTemplate += `</ul>`;
            this.target.left.bottom.html(leftBottomTemplate);
        };


    }

    initialize() {
        this.view.ad = CNBC_ADMIN_GLOBAL.DATA.HTTP.MAIN.ad;
        super.initialize();
    }

    render() {
        this.leftMiddleBind();
        this.leftBottomBind();
        super.render();
    }
}