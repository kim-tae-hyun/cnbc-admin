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
            self: 'app-cnbc-admin-mainManage-fix-container-self',
            drake : {
                left : 'app-cnbc-admin-mainManage-fix-container-drake-left',
                right : 'app-cnbc-admin-mainManage-fix-container-drake-right'
            },
            bindarea : {
                articleList : '',
                newsList : ''
            },
            articleList : {
                id : 'app-cnbc-admin-mainManage-fix-container-article-id'
            },


        };

        this.bind = () => {
            let getArticleListTemplate = () => {
                let getBodyTemplate = () => {
                    let bodyTemplate = ``;
                    this.model.article.forEach((article, articleIndex, articles) => {
                        bodyTemplate += `<div class="row" id="${this.id.articleList.id}-${article.articleId}">
                                    <div class="col-sm-1"><img src="${article.imageUrl}" alt="${article.title}" width="50" height="40"></div>
                                    <div class="col-sm-6" style="text-overflow: ellipsis; overflow: hidden;"><nobr><small>${article.title}</small></nobr></div>
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
                                <div class="pull-right">
                                    <div class="input-group">
                                        <button class="btn btn-xs btn-primary" type="button" onclick="return false;"><i class="fa fa-upload"></i><span class="bold"> ADD NEWS</span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="ibox-content" id="${this.id.drake.left}" style="height: 500px">
                            ${getBodyTemplate()}
                        </div>
                    </div>`;

                return articleListTemplate;
            }

            let getDrakeTemplate = (articleId) => {
                let drakeTemplate = '';

                if(!_.isEmpty(articleId)) {
                    // swipe 에서 해당 아이디에 대한 정보를 불러온다.
                    let articleInfo = _.findWhere(this.model.article, {articleId: articleId});

                    if(!_.isUndefined(articleInfo)) {
                        drakeTemplate += `<div class="row" id="${this.id.articleList.id}-${articleInfo.articleId}">
                                    <div class="col-sm-1"><img src="${articleInfo.imageUrl}" alt="${articleInfo.title}" width="50" height="40"></div>
                                    <div class="col-sm-6" style="text-overflow: ellipsis; overflow: hidden;"><nobr><small>${articleInfo.title}</small></nobr></div>
                                    <div class="col-sm-2"><span class="pie"><small>${articleInfo.regDate}</small></span></div>
                                    <div class="col-sm-2"><small>${articleInfo.reporter}</small></div>
                                    <div class="col-sm-1"><a href="#"><i class="fa fa-trash-o text-navy"></i></a></div>
                                </div>`;
                    }
                }

                return drakeTemplate;
            };

            this.target.html(getArticleListTemplate());
            this.target.off();

            this.view.drake = dragula([$(`#${this.id.drake.left}`)[0], $(`#${this.id.drake.right}`)[0]],{
                removeOnSpill: true,
                copySortSource: false,
                copy: function (el, source) {
                    return source == this.containers[1];
                },
                accepts: function (el, target) {
                    return target !== this.containers[1];
                }
            })

            this.view.drake.on('drop', (el, target, source, sibling) => {
                let articleId = "";
                // 오른쪽에서 drop
                if(source.id == this.id.drake.right) {
                    // 임시 데이터
                    // 뉴스 리스트 아이템을 swiper로 아이템 복사
                    this.model.article.push({
                        articleId: "10000894350",
                        title: "EU, 美 제품에 보복관세 부과…“규모는 약 4조 원”",
                        summary: "유럽연합이 결국 미국을 대상으로 보복관세를 부과하기로 결정했습니다. 외신팀 이승희 기자 연결합니다. 미국과 유럽간의 무역전쟁이 고조되고 있군요? 미국과 유럽연합 간의 무역전쟁의 암운이 짙어지고 있습니다.유럽연합은 도널드 트럼프 미국 대통령이 외국산 철강과 알루미늄 제품에 대한 고율관세 부과를 강행할 경 우, 미국의 땅콩버터, 오렌지 주스, 위스키, 오토바이, 청바지 등에 대해 보복관세를 부과하기로 결정했습니다.CNBC는 이번 유럽연합의 미국산 수입 제품에 대한 새로운 관세 규모가 28억 3000만유로, 우리돈 3조 7천억 원에 달할 전망이라고 보도했습니다.유럽연합은 또 미국 정부의 이번 조치에 대한 부당성을 세계무역기구(WTO)에 제소하고,유럽 내 철강과 알루미늄 업계를 보호하기 위한 세이프가드까지 발동하는 방안도 추진할 계획입니다.그러면서 유럽연합은 무역전쟁에서 승자는 없기 때문에 트럼프 대통령이 재고를 할 것을 촉구했는데요.유럽연합을 포함해 우리나라와 중국, 일본 등 18개 세계",
                        imageUrl: "http://img.sbs.co.kr/sbscnbc/upload/2018/03/08/30000185303.jpg",
                        regDate : "02-28 12:09",
                        reporter : "김태현"
                    });
                    articleId = 10000894350;
                }

                if(source.id == this.id.drake.left) {
                    articleId = target.getElementsByClassName("gu-transit")[0].id.replace(`${this.id.articleList.id}-`,"");
                }

                target.getElementsByClassName("gu-transit")[0].outerHTML = getDrakeTemplate(String(articleId));
            });
        };


        /**
         *
         */
    }

    initialize() {
        this.model.article  =  CNBC_ADMIN_GLOBAL.DATA.HTTP.MAIN.slider;
        super.initialize();
    }

    render() {
        this.bind();
        super.render();
    }
}