import { players } from "video.js";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // gId: -1,
        gHand: 0,
        gCheckLeft: false,
        gCheckRight: false,
        gCheckQS: false,
        userType: 1,

        cBegin: false,
        cFinish: false,
        cLoading: false,
        cFailed: false,

        mJOAScore: -1,

        //先去localStorage中获取数据
        gId: JSON.parse(localStorage.getItem("gId")) || {},
    },
    mutations: {
        setHand(state, v) {
            state.gHand = v;
        },
        setgId(state, v) {
            //将传递的数据先保存到localStorage中
            localStorage.setItem("gId", JSON.stringify(v));
            // 之后才是修改state中的状态
            state.gId = v;
        },
        setUserType(state, payload) {
            state.userType = payload;
        },
        setTrue(state, payload) {
            if (payload == 0) {
                state.gCheckLeft = true;
            } else if (payload == 1) {
                state.gCheckRight = true;
            } else if (payload == 2) {
                state.gCheckQS = true;
            }
        },
        setFalse(state, payload) {
            if (payload == 0) {
                state.gCheckLeft = false;
            } else if (payload == 1) {
                state.gCheckRight = false;
            } else if (payload == 2) {
                state.gCheckQS = false;
            }
        },
        setDefault(state) {
            state.gCheckLeft = false;
            state.gCheckRight = false;
            state.gCheckQS = false;
            state.userType = 1;

            state.cBegin = false;
            state.cFinish = false;
            state.cLoading = false;
            state.cFailed = false;

            state.mJOAScore = -1;
        },
    },
    actions: {},
    modules: {},
});
