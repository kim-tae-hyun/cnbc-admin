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
                            <h5>{편집 메뉴 정보 이름}</h5>
                            <div class="row">
                                <div class="pull-right" id="add">
                                    <div class="input-group">
                                        <button class="btn btn-sm btn-primary" type="button" onclick="return false;"><i class="fa fa-upload"></i><span class="bold"> PUBLISH</span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="ibox-content" id="aaaa" style="height: 500px;overflow-y: scroll;">
                            <div class="row" id="${this.id.drake.left}" style="padding-bottom: 50px;"></div>
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

            this.target.self.html(bindTemplate);
            this.target.self.off();

            this.bindArticleList();
            this.bindNewsList();
            this.bindDragura();
        };

        /**
         * dragura 이벤트 정의
         */
        this.bindDragura = () => {
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
                let articleInfo = {};
                let drakeTemplate = "";

                // 오른쪽에서 drop
                if(source.id == this.id.drake.right) {
                    // 중복 검사
                    articleId = target.getElementsByClassName("gu-transit")[0].id.replace(`${this.id.newsList.id}-`,"");
                    if(!_.isUndefined(_.findWhere(this.view.articleList, {articleId: articleId}))) {
                        alert("이미 등록된 기사 입니다.");
                    }
                    else {
                        let newsInfo = _.findWhere(this.view.newsList, {articleId: articleId});
                        articleInfo = {
                            articleId: newsInfo.articleId,
                            title: newsInfo.title,
                            summary: newsInfo.summary,
                            linkUrl : `${CNBC_ADMIN_GLOBAL.CONFIG.URL.CNBC}/read.jsp?pmArticleId=${newsInfo.articleId}`,
                            imageUrl: newsInfo.imageUrl,
                            regDate : newsInfo.regDate,
                            reporter : newsInfo.reporter
                        }

                        // 뉴스 리스트 아이템을 swiper로 아이템 복사
                        this.view.articleList.push(articleInfo);
                    }
                }

                // 왼쪽에서 drop
                if(source.id == this.id.drake.left) {
                    articleId = target.getElementsByClassName("gu-transit")[0].id.replace(`${this.id.articleList.id}-`,"");
                    articleInfo = _.findWhere(this.view.articleList, {articleId: articleId});
                }

                drakeTemplate = this.getDrakeTemplate(articleInfo);
                target.getElementsByClassName("gu-transit")[0].outerHTML = drakeTemplate;
            });


            this.model.drake.on('remove', (el, container, source) => {
                let articleId ='';
                let articleInfo = {};
                if(confirm('설정하신 기사를 삭제하시겠습니까?')) {
                    articleId = el.id.replace(`${this.id.articleList.id}-`,"");
                    articleInfo = _.findWhere(this.view.articleList, {articleId: articleId});

                    if(!_.isEmpty(articleInfo)) {
                        this.view.articleList.splice(_.indexOf(this.view.articleList, articleInfo), 1);
                    }
                }
                this.bindArticleList();
            });

            this.model.drake.on('drag', (el,source) => {
                let h = $(window).height();
                $(document).mousemove((e) => {
                    if(!_.isUndefined($('#aaaa').offset())) {
                        let mousePosition = e.pageY - $(window).scrollTop();
                        let topRegion = $('#aaaa').offset().top;
                        let bottomRegion = h - $('#aaaa').offset().top + 10;
                        
                        if(e.which == 1 && (mousePosition < topRegion || mousePosition > bottomRegion)){    // e.wich = 1 => click down !
                            let distance = e.clientY - h / 2;
                            distance = distance * 0.1; // <- velocity
                            $('#aaaa').scrollTop( distance + $('#aaaa').scrollTop()) ;
                        }else{
                            $('#aaaa').unbind('mousemove');
                        }
                    }
                });
            });
        }

        /**
         * left-drake 템플릿
         * @param articleInfo
         */
        this.getDrakeTemplate = (articleInfo) => {
            let drakeTemplate = '';

            if(!_.isEmpty(articleInfo)) {
                drakeTemplate += `
                    <div class="social-feed-box" id="${this.id.articleList.id}-${articleInfo.articleId}" style="border: 1px solid #1ab394;">
                        <div class="pull-right social-action">
                            <span class="label label-primary">3</span>
                        </div>
                        <div class="social-avatar" style="padding: 5px 15px 0 5px;">
                            <a href="" class="pull-left">
                                <img alt="${articleInfo.title}" src="${articleInfo.imageUrl}" style="width: 40px;height: 40px">
                            </a>
                            <div class="media-body">
                                <input type="text" class="text-success form-control" value="${articleInfo.title}" style="height: 20px;font-size: 11px" placeholder="Write title...">
                                <input type="text" class="form-control" value="${articleInfo.linkUrl}" style="height: 20px;font-size: 11px" placeholder="Write link...">
                            </div>
                        </div>
                        <div class="social-body" style="padding: 5px;">
                            <div class="social-comment">
                                <div class="media-body">
                                    <textarea class="form-control" placeholder="Write summary..." style="font-size: 11px;height:30px">${articleInfo.summary}</textarea>
                                </div>
                            </div>
                        </div>
                    </div>`;
            }

            return drakeTemplate;
        };

        /**
         * 기사 리스트 바인드
         */
        this.bindArticleList = () => {
            let getArticleListTemplate = () => {

                let articleListTemplate = ``;
                this.view.articleList.forEach((article, articleIndex, articles) => {
                    articleListTemplate +=  this.getDrakeTemplate(article);
                });

                return articleListTemplate;
            }

            this.target.self.find(`#${this.id.drake.left}`).html(getArticleListTemplate());

            this.target.articleList = this.target.self.find(`#${this.id.drake.left}`);
            this.target.articleList.off();
        }

        /**
         * 뉴스 리스트 바인드
         */
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