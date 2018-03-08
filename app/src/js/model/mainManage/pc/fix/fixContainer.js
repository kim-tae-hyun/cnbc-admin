/**
 * 메인 기사 편성
 * @class MainFixContainer
 * @author whfkdakf75@sbs.co.kr
 */
class MainFixContainer extends Base {
    constructor(parentId) {
        super();

        this.target = $(`#${parentId}`);

        this.id = {
            self: 'app-cnbc-admin-mainManage-pc-fix-top',
            article : {
                id : 'app-cnbc-admin-mainManage-pc-fix-top-article-id-'
            }
        };

        this.model = {};

        this.bind = () => {
            let getArticleListTemplate = () => {
                let getBodyTemplate = () => {
                    let bodyTemplate = ``;
                    this.view.slider.forEach((article, articleIndex, articles) => {
                        bodyTemplate += `<div class="row" id="${this.id.article.id}">
                                    <div class="col-sm-1"><img src="${article.imageUrl}" alt="${article.title}" width="50" height="40"></div>
                                    <div class="col-sm-6" style="text-overflow: ellipsis; overflow: hidden;"><nobr><small class="test">${article.title}</small></nobr></div>
                                    <div class="col-sm-2"><span class="pie"><small>${article.regDate}</small></span></div>
                                    <div class="col-sm-2"><small>${article.reporter}</small></div>
                                    <div class="col-sm-1"><a href="#"><i class="fa fa-trash-o text-navy"></i></a></div>
                                </div>`;
                    });

                    return bodyTemplate;
                }

                let articleListTemplate = `<div class="ibox float-e-margins">
                        <div class="ibox-title">
                            <h5>스와이프</h5>
                            <div class="row">
                                <div class="pull-right" id="add">
                                    <div class="input-group">
                                        <button class="btn btn-xs btn-primary" type="button" onclick="return false;"><i class="fa fa-upload"></i><span class="bold"> ADD NEWS</span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="ibox-content" id="left-defaults" style="height: 500px">
                            ${getBodyTemplate()}
                        </div>
                    </div>`;

                return articleListTemplate;
            }

            this.target.html(getArticleListTemplate());
            this.target.off();

            this.view.drake = dragula([$('#left-defaults')[0], $('#right-defaults')[0]],{
                removeOnSpill: true,
                copySortSource: false,
                copy: function (el, source) {
                    return source == $('#right-defaults')[0];
                },
                accepts: function (el, target) {
                    return target !== $('#right-defaults')[0];
                }
            })

            this.view.drake.on('drop', function (el, target) {
                let title = '';
                if(!_.isUndefined(target.getElementsByClassName("gu-transit")[0])) {
                    title = target.getElementsByClassName("gu-transit")[0].getElementsByClassName("test")[0].innerText;
                    target.getElementsByClassName("gu-transit")[0].outerHTML = `<div class="row">
                                    <div class="col-sm-1"><img src="http://img.sbs.co.kr/sbscnbc/upload/2018/03/05/30000185142.jpg" alt="http://img.sbs.co.kr/sbscnbc/upload/2018/03/05/30000185142.jpg" width="50" height="40"></div>
                                    <div class="col-sm-6" style="text-overflow: ellipsis; overflow: hidden;"><nobr><small class="test">${title}</small></nobr></div>
                                    <div class="col-sm-2"><span class="pie"><small>02-27 13:09</small></span></div>
                                    <div class="col-sm-2"><small>김태현</small></div>
                                    <div class="col-sm-1"><a href="#"><i class="fa fa-trash-o text-navy"></i></a></div>
                                </div>
                                `
                }
            });
        };
    }

    initialize() {
        this.view.slider = CNBC_ADMIN_GLOBAL.DATA.HTTP.MAIN.slider;
        super.initialize();
    }

    render() {
        this.bind();
        super.render();
    }
}