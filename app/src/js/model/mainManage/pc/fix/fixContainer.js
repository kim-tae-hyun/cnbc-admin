/**
 * 메인 기사 편성
 * @class MainFixContainer
 * @author whfkdakf75@sbs.co.kr
 */
class MainFixContainer extends Base {
    constructor(parentId) {
        super();

        this.target = {
            self : $(`#${parentId}`),
            articleLIst : {},
            newsList : {}
        }


        this.id = {
            self: 'app-cnbc-admin-mainManage-fix-container-self',
            drake : {
                left : 'app-cnbc-admin-mainManage-fix-container-drake-left',
                right : 'app-cnbc-admin-mainManage-fix-container-drake-right'
            },
            articleList : {
                id : 'app-cnbc-admin-mainManage-fix-container-articleList-id'
            },
            newsList : {
                id : 'app-cnbc-admin-mainManage-fix-container-newsList-id'
            }
        };

        this.bind = () => {
            let bindTemplate = `
                <div class="row">
                <div class="col-lg-6">
                    <div class="ibox float-e-margins">
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
                        <div class="ibox-content" id="${this.id.drake.left}" style="height: 500px">
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="ibox float-e-margins">
                        <div class="ibox-title">
                            <h5>뉴스리스트</h5>
                            <div class="row">
                                <div class="row">
                                    <div class="col-sm-7 pull-right">
                                        <div class="col-sm-4">
                                            <select class="input-sm form-control input-s-sm inline">
                                                <option value="0">제목</option>
                                                <option value="0">작성자</option>
                                            </select>
                                        </div>
                                        <div class="input-group">
                                            <input type="text" placeholder="Search" class="input-sm form-control"> <span class="input-group-btn">
                                            <button type="button" class="btn btn-sm btn-primary"> Go!</button> </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="ibox-content">
                            <div class="row">
                                <div class="table-responsive">
                                    <table class="table table-striped" style="table-layout: fixed;">
                                        <thead>
                                        <tr>
                                            <th class="col-sm-1">포토</th>
                                            <th class="col-sm-7">기사제목</th>
                                            <th class="col-sm-2">등록일시</th>
                                            <th class="col-sm-1">기자</th>
                                        </tr>
                                        </thead>
                                        <tbody id='${this.id.drake.right}'>
                                        </tbody>
                                    </table>
                                    <div class="text-center" id="page2"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;

            let getDrakeTemplate = (articleId) => {
                let drakeTemplate = '';

                if(!_.isEmpty(articleId)) {
                    // swipe 에서 해당 아이디에 대한 정보를 불러온다.
                    let articleInfo = _.findWhere(this.view.articleList, {articleId: articleId});

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

            this.target.self.html(bindTemplate);
            this.target.self.off();

            this.model.drake = dragula([$(`#${this.id.drake.left}`)[0], $(`#${this.id.drake.right}`)[0]],{
                removeOnSpill: true,
                copySortSource: false,
                copy: function (el, source) {
                    return source == this.containers[1];
                },
                accepts: function (el, target) {
                    return target !== this.containers[1];
                }
            });

            this.model.drake.on('drop', (el, target, source, sibling) => {
                let articleId = "";
                // 오른쪽에서 drop
                if(source.id == this.id.drake.right) {
                    articleId = target.getElementsByClassName("gu-transit")[0].id.replace(`${this.id.newsList.id}-`,"");
                    let articleInfo = _.findWhere(this.view.newsList, {articleId: articleId});
                    // 뉴스 리스트 아이템을 swiper로 아이템 복사
                    this.view.articleList.push({
                        articleId: articleInfo.articleId,
                        title: articleInfo.title,
                        summary: articleInfo.summary,
                        imageUrl: articleInfo.imageUrl,
                        regDate : articleInfo.regDate,
                        reporter : articleInfo.reporter
                    });
                }

                if(source.id == this.id.drake.left) {
                    articleId = target.getElementsByClassName("gu-transit")[0].id.replace(`${this.id.articleList.id}-`,"");
                }

                target.getElementsByClassName("gu-transit")[0].outerHTML = getDrakeTemplate(String(articleId));
            });

            this.bindArticleList();
            this.bindNewsList();
        };

        this.bindArticleList = () => {
            let getArticleListTemplate = () => {

                let articleListTemplate = ``;
                this.view.articleList.forEach((article, articleIndex, articles) => {
                    articleListTemplate += `<div class="row" id="${this.id.articleList.id}-${article.articleId}">
                        <div class="col-sm-1"><img src="${article.imageUrl}" alt="${article.title}" width="50" height="40"></div>
                        <div class="col-sm-6" style="text-overflow: ellipsis; overflow: hidden;"><nobr><small>${article.title}</small></nobr></div>
                        <div class="col-sm-2"><span class="pie"><small>${article.regDate}</small></span></div>
                        <div class="col-sm-2"><small>${article.reporter}</small></div>
                        <div class="col-sm-1"><a href="#"><i class="fa fa-trash-o text-navy"></i></a></div>
                    </div>`;
                });

                return articleListTemplate;
            }


            this.target.self.find(`#${this.id.drake.left}`).html(getArticleListTemplate());

            this.target.articleList = this.target.self.find(`#${this.id.drake.left}`);
            this.target.articleList.off();
        }

        this.bindNewsList = () => {
            let getNewsListTemplate = () => {
                let newsListTemplate = ``;
                this.view.newsList.forEach((news, newsIndex) => {
                    newsListTemplate += `<tr id="${this.id.newsList.id}-${news.articleId}">
                        <td class="col-sm-1"><img src="${news.imageUrl}" alt="${news.title}" width="50" height="40"></td>
                        <td class="col-sm-7" style="text-overflow: ellipsis; overflow: hidden;"><nobr><small>${news.title}</small></nobr></td>
                        <td class="col-sm-2"><span class="pie"><small>${news.regDate}</small></span></td>
                        <td class="col-sm-2"><small>${news.reporter}</small></td>
                    </tr>`;
                });

                return newsListTemplate;
            }


            this.target.self.find(`#${this.id.drake.right}`).html(getNewsListTemplate());

            this.target.articleList = this.target.self.find(`#${this.id.drake.left}`);
            this.target.articleList.off();
        }

    }

    initialize() {
        this.view.articleList  =  CNBC_ADMIN_GLOBAL.DATA.HTTP.MAIN.slider;
        this.view.newsList = CNBC_ADMIN_GLOBAL.DATA.HTTP.NEWSLIST.articles;
        this.bind();
        super.initialize();
    }

    render() {
        super.render();
    }
}