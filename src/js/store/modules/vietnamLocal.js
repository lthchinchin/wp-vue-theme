export const vnLocal = {
    namespaced: true,

    state: () => ({
        name: 'vietnamlocalselector',
        cities: [],
        citySelected: {
        },
        districtSelected: {},
        wardSelected: {},
        centerLocation: {
            lat: 16.0544068,
            lng: 108.2021667
        }
    }),
    getters: {
        getTestName(state) {
            return state.name
        },
        getCitiesList(state) {
            return state.cities;
        },
        getDistricts(state) {
            return state.citySelected.district;
        },
        getCitySelectedName(state) {
            return state.citySelected.name || '';
        },
        getWards(state) {
            return state.districtSelected.ward;
        },
    },
    mutations: {
        setVietNamCityProvince(state, arr) {
            state.cities = arr
        },
        setCitySelected(state, obj) {
            state.citySelected = obj
        },
        setDistrictSelected(state, district_name) {
            state.districtSelected = state.citySelected.district.filter(val => val.name == district_name)[0]
        },
        setWardSelected(state, ward_name) {
            state.wardSelected = state.districtSelected.ward.filter(val => val.name == ward_name)[0]
        },
        setCenterLoca(state, objCenter) {
            state.centerLocation = objCenter
        }
    },
    actions: {

        setFirstCitySelected({ commit }, obj) {
            commit('setCitySelected', obj);
        },
        loadCities({ commit }) {
            jQuery.ajax({
                type: "get",
                contentType: "application/json",
                dataType: "json",
                url: "/wp-content/themes/wp-biti/assets/libs/vietnam_dataset/Index.json",
                beforeSend: function () { },
                success: function (response) {
                    commit('setVietNamCityProvince', response);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(
                        "The following error occured: " + textStatus,
                        errorThrown
                    );
                },
            });
        },
        detailCity({ commit }, id) {
            if (id) {
                jQuery.ajax({
                    type: "get",
                    contentType: "application/json",
                    dataType: "json",
                    url: `/wp-content/themes/wp-biti/assets/libs/vietnam_dataset/data/${id}.json`,
                    beforeSend: function () { },
                    success: function (response) {
                        commit('setCitySelected', response);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        commit('setCitySelected', {});
                        console.log(
                            "The following error occured: " + textStatus,
                            errorThrown
                        );
                    },
                });
            }

        },
        districtSelect({ commit }, district) {
            commit('setDistrictSelected', district);
        },
        wardSelect({ commit }, ward) {
            commit('setWardSelected', ward);
        }

    }

}