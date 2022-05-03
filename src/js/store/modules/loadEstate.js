export const loadEstate = {
    namespaced: true,

    state: () => ({
        isLoadingEstate: false,
        estateItems: [],
        estateItemsSaved: [],
        paginationObj: {},
        dataPara: {
            orderby: "newest",
            post_type: "bds-ban",
            limit: 10,
            city: "Đà Nẵng",
        },
        estateType: {},
        saleCategories: [],
        rentCategories: [],
        estateCatNameTitle: '',
        estateCurrentPostType: '',
        centerName: 'Đà Nẵng',
        isShowPaginate: true,
        zoomLevel: 12,
        hvMarkerObj: {},
    }),
    getters: {
        getIsShowPaginate(state) {
            return state.isShowPaginate
        },
        getEstateCurrentPostType(state) {
            return state.estateCurrentPostType || ''
        },
        getEstateCatNameTitle(state) {
            return state.estateCatNameTitle || ''
        },
        getEstateSaleCate(state) {
            return state.saleCategories
        },
        getEstateSaleRent(state) {
            return state.rentCategories
        },
        getEstateType(state) {
            return state.estateType
        },
        getEstateItems(state) {
            return state.estateItems
        },
        getEstateMarker(state) {
            let rObjArr = []
            if (state.estateItems[0] != 'Results Not Found') {
                state.estateItems.forEach(obj => {
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
            for (let i = 0; i < state.estateItems.length - 1; i++) {
                for (let j = i + 1; j < state.estateItems.length; j++) {
                    if (parseInt(state.estateItems[i][key]) > parseInt(state.estateItems[j][key])) {
                        let tmp = state.estateItems[i]
                        state.estateItems.splice(i, 1, state.estateItems[j])
                        state.estateItems.splice(j, 1, tmp)
                    }
                }
            }
        },
        descAfterDraw(state, key) {
            for (let i = 0; i < state.estateItems.length - 1; i++) {
                for (let j = i + 1; j < state.estateItems.length; j++) {
                    if (parseInt(state.estateItems[i][key]) < parseInt(state.estateItems[j][key])) {
                        let tmp = state.estateItems[i]
                        state.estateItems.splice(i, 1, state.estateItems[j])
                        state.estateItems.splice(j, 1, tmp)
                    }
                }
            }
        },
        newestAfterDraw(state) {
            for (let i = 0; i < state.estateItems.length - 1; i++) {
                for (let j = i + 1; j < state.estateItems.length; j++) {
                    let myDate1 = state.estateItems[i].post_date;
                    let myDate2 = state.estateItems[j].post_date;
                    let DateParts1 = myDate1.split("/");
                    let DateParts2 = myDate2.split("/");
                    let timestamp1 = new Date(+DateParts1[2], DateParts1[1] - 1, +DateParts1[0]).setUTCHours(0, 0, 0, 0)
                    let timestamp2 = new Date(+DateParts2[2], DateParts2[1] - 1, +DateParts2[0]).setUTCHours(0, 0, 0, 0)
                    if (timestamp1 < timestamp2) {
                        let tmp = state.estateItems[i]
                        state.estateItems.splice(i, 1, state.estateItems[j])
                        state.estateItems.splice(j, 1, tmp)
                    }
                }
            }
        },
        setIsShowPaginate(state, bool) {
            // let result
            if (state.paginationObj.total_pages < 2) {
                state.isShowPaginate = false
            } else {
                state.isShowPaginate = bool
            }
            // return state.isShowPaginate = bool
        },
        setEstateDrawArea(state, arr) {
            let tmp = []
            state.estateItems.forEach(e1 => {
                arr.forEach(e2 => {
                    e1.id == e2[0] ? tmp.push(e1) : ''
                }
                )
            });
            state.estateItemsSaved = state.estateItems
            state.estateItems = tmp
            console.log('estate inside draw', state.estateItems);
        },
        resetEstateDelDraw(state) {
            state.estateItemsSaved.length != 0 ? state.estateItems = state.estateItemsSaved : ''
        },
        resetDistrictWard(state) {
            delete state.dataPara.district;
            delete state.dataPara.wards;
            state.dataPara.district = '';
            state.dataPara.wards = '';
        },
        setCenterName(state, name) {
            return state.centerName = name
        },
        setEstateCurrentPostType(state, str) {
            return state.estateCurrentPostType = str
        },
        setEstateCatNameTitle(state, str) {
            state.estateCatNameTitle = str
        },
        setEstateSaleCate(state, arr) {
            state.saleCategories = arr
        },
        setEstateRentCate(state, arr) {
            state.rentCategories = arr
        },
        setEstateItems(state, arr) {
            state.estateItems = arr
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
        setIsLoading(state, bool) {
            state.isLoadingEstate = bool
        },
        setDataPara_sort(state, obj) {
            state.dataPara_sort = obj
        },
        setDataPara_filter(state, obj) {
            state.dataPara_filter = obj
        },
        setEstateType(state, slug) {
            // delete state.dataPara.cat_id;
            delete state.dataPara.price_from;
            delete state.dataPara.price_to;
            switch (slug) {
                case 'bds-ban':
                    state.estateType = {
                        slug: slug,
                        name: 'bán',
                        colorClass: 'co-sale'
                    }
                    break;
                case 'bds-cho-thue':
                    state.estateType = {
                        slug: slug,
                        name: 'cho thuê',
                        colorClass: 'co-rent'
                    }
                    break;
                case 'bds-daban':
                    state.estateType = {
                        slug: slug,
                        name: 'đã bán',
                        colorClass: 'co-sold'
                    }
                    break;
                case 'du-an':
                    state.estateType = {
                        slug: slug,
                        name: 'dự án',
                        colorClass: 'co-pj'
                    }
                    break;
                default:
                    state.estateType = {
                        slug: slug,
                        name: 'bán',
                        colorClass: 'co-sale'
                    }
            }
        },
        resetSelectedBg(state, closestEle) {
            jQuery(closestEle)
                .find("li")
                .each(function () {
                    // console.log('reset:', jQuery(this));
                    if (jQuery(this).hasClass("ddl-selected")) {
                        jQuery(this).removeClass("ddl-selected");
                    }
                });
        },
        setZoomLevel(state, newZoomLevel) {
            state.zoomLevel = newZoomLevel
        },
        setHvMarkerObj(state, obj) {
            state.hvMarkerObj = obj
        }
    },
    actions: {
        fristLoadEstate({ commit, state }, slugEstateObj) {
            state.estateItemsSaved = state.estateItems
            state.dataPara.currentId = slugEstateObj.currentId
            // console.log('setestate Object input:', slugEstateObj);
            commit('setEstateType', slugEstateObj.currentPostType);
            if (slugEstateObj.currentPostType == 'bds-cho-thue') {
                state.dataPara.post_type = slugEstateObj.currentPostType
            } else {
                if (slugEstateObj.currentPostType && slugEstateObj.estateCatId) {
                    state.dataPara.post_type = slugEstateObj.currentPostType
                    state.dataPara.cat_id = parseInt(slugEstateObj.estateCatId)
                    commit('setEstateCatNameTitle', slugEstateObj.estateCatName);
                }
            }
            commit('setEstateCurrentPostType', slugEstateObj.currentPostType);
            commit('setEstateCatNameTitle', slugEstateObj.estateCatName);
            commit('setIsLoading', true);
            console.log('api data', state.dataPara);
            let stateTmp = state
            jQuery.ajax({
                type: "get",
                contentType: "application/json",
                dataType: "json",
                url: "/wp-json/landvn/v1/get-items",
                data: stateTmp.dataPara,
                beforeSend: function () { },
                success: function (response) {
                    commit('setEstateItems', response.data);
                    commit('setEstatePaginaObj', response);
                    commit('setIsLoading', false);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("The following error occured: " + textStatus, errorThrown);
                },
            });
        },
        fristLoadSaleCate({ commit }) {
            jQuery.ajax({
                type: "get",
                contentType: "application/json",
                dataType: "json",
                url: "/wp-json/landvn/v1/get-categories",
                data: { post_type: 'bds-ban' },
                beforeSend: function () { },
                success: function (response) {
                    commit('setEstateSaleCate', response);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("The following error occured: " + textStatus, errorThrown);
                },
            });
        },
        fristLoadRentCate({ commit }) {
            jQuery.ajax({
                type: "get",
                contentType: "application/json",
                dataType: "json",
                url: "/wp-json/landvn/v1/get-categories",
                data: { post_type: 'bds-cho-thue' },
                beforeSend: function () { },
                success: function (response) {
                    commit('setEstateRentCate', response);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("The following error occured: " + textStatus, errorThrown);
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
                url: "/wp-json/landvn/v1/get-items",
                data: stateTmp.dataPara,
                beforeSend: function () { },
                success: function (response) {
                    commit('setEstateItems', response.data);
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
            console.log('orderby', orderBy);
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
                state.estateItemsSaved = state.estateItems
                state.dataPara.orderby = orderBy;
                state.dataPara.page = 1;
                let stateTmp = state
                commit('setIsLoading', true);
                jQuery.ajax({
                    type: "get",
                    contentType: "application/json",
                    dataType: "json",
                    url: "/wp-json/landvn/v1/get-items",
                    data: stateTmp.dataPara,
                    beforeSend: function () { },
                    success: function (response) {
                        commit('setEstateItems', response.data);
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
                url: "/wp-json/landvn/v1/get-items",
                data: stateTmp.dataPara,
                beforeSend: function () { },
                success: function (response) {
                    commit('setEstateItems', response.data);
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
            let selectedDistrict = state.dataPara.district || '';
            let selectedWard = state.dataPara.wards || '';
            let strSearch = `${selectedWard} ${selectedDistrict} ${selectedCity}`.trim()
            console.log('setCenterName: ', strSearch);
            commit('setCenterName', strSearch);

        },
        setCateSelectName({ commit, state }, str) {
            commit('setEstateCatNameTitle', str);
        },
        resetSelectedDdl({ commit }, closestEle) {
            commit('resetSelectedBg', closestEle);
        },
        showEstateInsideDraw({ commit }, arr) {
            commit('setIsShowPaginate', false);
            commit('setEstateDrawArea', arr);
        },
        deleteDraw({ commit }) {
            commit('setIsShowPaginate', true);
            commit('resetEstateDelDraw');
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