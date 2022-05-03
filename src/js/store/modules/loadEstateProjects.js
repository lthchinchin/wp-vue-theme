export const loadProject = {
    namespaced: true,
    state: () => ({
        name: 'estate projects',
        isLoadingEstate: false,
        paginationObj: {},
        projects: [],
        dataPara: {
            limit: 10,
            page: 1,
            city: "Đà Nẵng",
        },
        projectCategories: [],
        investors: [],
        projectsSaved: [],
        centerName: 'Đà Nẵng',
        isShowPaginate: true,
        zoomLevel: 12,
        hvMarkerObj: {},
    }),
    getters: {
        getIsShowPaginate(state) {
            return state.isShowPaginate
        },
        getProjectItems(state) {
            return state.projects
        },
        getLoadingStatus(state) {
            return state.isLoadingEstate
        },
        getPaginaObj(state) {
            return state.paginationObj
        },
        getNumResults(state) {
            return state.paginationObj.total_items
        },
        getProjectCategories(state) {
            return state.projectCategories
        },
        getInvestors(state) {
            return state.investors
        },
        getCenterName(state) {
            return state.centerName
        },
        getEstateProjectMarker(state) {
            let rObjArr = []
            if (state.projects[0] != 'Results Not Found') {
                state.projects.forEach(obj => {
                    if (obj.latitude != '') {
                        rObjArr.push([obj.id, obj.latitude, obj.longitude, obj.title, obj.price, obj.area, obj.thumbnail, obj.permalink, obj.isVip])
                    }
                })
            }
            return rObjArr
        },
        getLoadingStatus(state) {
            return state.isLoadingEstate
        },
        getPaginaObj(state) {
            return state.paginationObj
        },
        getNumResults(state) {
            return state.paginationObj.total_items
        },
        getCenterName(state) {
            return state.centerName
        },
        getZoomLevel(state) {
            return state.zoomLevel
        },
        getHvMarkerObj(state) {
            return state.hvMarkerObj
        },
    },
    mutations: {
        ascAfterDraw(state, key) {
            for (let i = 0; i < state.projects.length - 1; i++) {
                for (let j = i + 1; j < state.projects.length; j++) {
                    if (parseInt(state.projects[i][key]) > parseInt(state.projects[j][key])) {
                        let tmp = state.projects[i]
                        state.projects.splice(i, 1, state.projects[j])
                        state.projects.splice(j, 1, tmp)

                    }
                }
            }
        },
        descAfterDraw(state, key) {
            for (let i = 0; i < state.projects.length - 1; i++) {
                for (let j = i + 1; j < state.projects.length; j++) {
                    if (parseInt(state.projects[i][key]) < parseInt(state.projects[j][key])) {
                        let tmp = state.projects[i]
                        state.projects.splice(i, 1, state.projects[j])
                        state.projects.splice(j, 1, tmp)
                    }
                }
            }
        },
        newestAfterDraw(state) {
            for (let i = 0; i < state.projects.length - 1; i++) {
                for (let j = i + 1; j < state.projects.length; j++) {
                    let myDate1 = state.projects[i].post_date;
                    let myDate2 = state.projects[j].post_date;
                    let DateParts1 = myDate1.split("/");
                    let DateParts2 = myDate2.split("/");
                    let timestamp1 = new Date(+DateParts1[2], DateParts1[1] - 1, +DateParts1[0]).setUTCHours(0, 0, 0, 0)
                    let timestamp2 = new Date(+DateParts2[2], DateParts2[1] - 1, +DateParts2[0]).setUTCHours(0, 0, 0, 0)
                    if (timestamp1 < timestamp2) {
                        let tmp = state.projects[i]
                        state.projects.splice(i, 1, state.projects[j])
                        state.projects.splice(j, 1, tmp)
                    }
                }
            }
        },
        setIsShowPaginate(state, bool) {
            return state.isShowPaginate = bool
        },
        setCenterName(state, name) {
            return state.centerName = name
        },
        setEstateDrawArea(state, arr) {
            let tmp = []
            state.projects.forEach(e1 => {
                arr.forEach(e2 => {
                    e1.id == e2[0] ? tmp.push(e1) : ''
                }
                )
            });
            state.projectsSaved = state.projects
            state.projects = tmp
            console.log('project inside draw', state.projects);
        },
        resetEstateDelDraw(state) {
            state.projectsSaved.length != 0 ? state.projects = state.projectsSaved : ''
            console.log('del project');
        },
        setProjectItems(state, arr) {
            state.projects = arr
        },
        setIsLoading(state, bool) {
            state.isLoadingEstate = bool
        },
        setEstatePaginaObj(state, res) {
            if (res.total_pages < 2) {
                state.isShowPaginate = false
            } else {
                state.isShowPaginate = true
            }
            state.paginationObj = {
                limit: res.limit,
                current_page: res.current_page,
                total_items: res.total_items,
                total_pages: res.total_pages,
            };
        },
        setProjectEstateCate(state, arr) {
            state.projectCategories = arr
        },
        setInvestors(state, arr) {
            state.investors = arr
        },
        setZoomLevel(state, newZoomLevel) {
            state.zoomLevel = newZoomLevel
        },
        setHvMarkerObj(state, obj) {
            state.hvMarkerObj = obj
        }
    },
    actions: {
        loadProjects({ commit, state }, para) {
            state.dataPara.currentId = para.currentId
            para.estateCatId ? state.dataPara.cat_id = para.estateCatId : ""
            console.log('pj api test', state.dataPara);
            commit('setIsLoading', true)
            let tmpState = state
            jQuery.ajax({
                type: "get",
                contentType: "application/json",
                dataType: "json",
                url: "/wp-json/landvn/v1/get-projects",
                data: tmpState.dataPara,
                beforeSend: function () { },
                success: function (response) {
                    commit('setProjectItems', response.data);
                    commit('setEstatePaginaObj', response);
                    commit('setIsLoading', false)
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(
                        "The following error occured: " + textStatus,
                        errorThrown
                    );
                },
            });
        },
        loadInvestors({ commit, state }) {
            let tmpState = state
            jQuery.ajax({
                type: "get",
                contentType: "application/json",
                dataType: "json",
                url: "/wp-json/landvn/v1/get-investors",
                beforeSend: function () { },
                success: function (response) {
                    commit('setInvestors', response);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(
                        "The following error occured: " + textStatus,
                        errorThrown
                    );
                },
            });
        },
        changePagePagi({ commit, state }, pageNum) {
            commit('setIsLoading', true);
            state.dataPara.page = pageNum
            let stateTmp = state
            jQuery.ajax({
                type: "get",
                contentType: "application/json",
                dataType: "json",
                url: "/wp-json/landvn/v1/get-projects",
                data: stateTmp.dataPara,
                beforeSend: function () { },
                success: function (response) {
                    commit('setProjectItems', response.data);
                    commit('setEstatePaginaObj', response);
                    commit('setIsLoading', false);

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(
                        "The following error occured: " + textStatus,
                        errorThrown
                    );
                },
            });
        },
        sortByOption({ commit, state }, orderBy) {
            if (!state.isShowPaginate) {
                switch (orderBy) {
                    case 'newest':
                        commit('newestAfterDraw');
                        break;
                    case 'price-asc':
                        commit('ascAfterDraw', 'price_num');
                        break;
                    case 'price-desc':
                        commit('descAfterDraw', 'price_num');
                        break;
                    case 'area-asc':
                        commit('ascAfterDraw', 'area');
                        break;
                    case 'area-desc':
                        commit('descAfterDraw', 'area');
                        break;
                }

            } else {
                state.dataPara.orderby = orderBy;
                state.dataPara.page = 1;
                let stateTmp = state
                commit('setIsLoading', true);
                jQuery.ajax({
                    type: "get",
                    contentType: "application/json",
                    dataType: "json",
                    url: "/wp-json/landvn/v1/get-projects",
                    data: stateTmp.dataPara,
                    beforeSend: function () { },
                    success: function (response) {
                        commit('setProjectItems', response.data);
                        commit('setEstatePaginaObj', response);
                        commit('setIsLoading', false);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        console.log(
                            "The following error occured: " + textStatus,
                            errorThrown
                        );
                    },
                });

            }
        },
        sortByFilter({ commit, state }, para) {
            state.dataPara.page = 1
            commit('setIsLoading', true);
            let stateTmp = state

            let objKeyName = Object.keys(para)[0]
            let attrSave = parseInt(para[objKeyName])
            switch (objKeyName) {
                case 'price':
                    state.dataPara.price_from = para.price[0]
                    if (para.price[1]) {
                        state.dataPara.price_to = para.price[1]
                    } else {
                        delete state.dataPara["price_to"];
                    }
                    break;
                case 'area':
                    state.dataPara.area_from = para.area[0]
                    state.dataPara.area_to = para.area[1]
                    if (para.area[1]) {
                        state.dataPara.area_to = para.area[1]
                    } else {
                        delete state.dataPara["area_to"];
                    }
                    break;
                case 'post_type':
                    commit('setEstateType', para[objKeyName]);
                    state.dataPara[objKeyName] = para[objKeyName]

                    break;
                // case '':
                //     //khi gtri cua option tat ca la '' , xoa attr object search para  
                //     const { [objKeyName]: propValue, ...rest } = state.dataPara;
                //     state.dataPara = rest;
                //     break;
                case 'facade':
                    state.dataPara[objKeyName] = para[objKeyName]
                    break;
                default:
                    if (attrSave) {
                        state.dataPara[objKeyName] = attrSave
                    } else {
                        state.dataPara[objKeyName] = para[objKeyName]
                    }
            }

            console.log('data-api:', state.dataPara);
            jQuery.ajax({
                type: "get",
                contentType: "application/json",
                dataType: "json",
                url: "/wp-json/landvn/v1/get-projects",
                data: stateTmp.dataPara,
                beforeSend: function () { },
                success: function (response) {
                    commit('setProjectItems', response.data);
                    commit('setEstatePaginaObj', response);
                    commit('setIsLoading', false);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(
                        "The following error occured: " + textStatus,
                        errorThrown
                    );
                },
            });

            let selectedCity = state.dataPara.city || '';
            console.log('setCenterNameProject: ', selectedCity);
            commit('setCenterName', selectedCity);
        },
        fristLoadProjectCate({ commit }) {
            jQuery.ajax({
                type: "get",
                contentType: "application/json",
                dataType: "json",
                url: "/wp-json/landvn/v1/get-categories",
                data: { post_type: 'du-an' },
                beforeSend: function () { },
                success: function (response) {
                    commit('setProjectEstateCate', response);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("The following error occured: " + textStatus, errorThrown);
                },
            });
        },
        deleteDraw({ commit }) {
            commit('setIsShowPaginate', true);
            commit('resetEstateDelDraw');
        },
        showEstateInsideDraw({ commit }, arr) {
            commit('setIsShowPaginate', false);
            commit('setEstateDrawArea', arr);
        },
        resetDistrictWardChoosed({ commit }) {
            commit('resetDistrictWard');
        },
        changeMapZoomLevel({ commit }, zoomLevel) {
            commit('setZoomLevel', zoomLevel);
        },
        saveHvMarkerId({ commit }, id) {
            commit('setHvMarkerId', id);
        },
        saveHvMarkerObj({ commit }, obj) {
            commit('setHvMarkerObj', obj);
        },
    }
}