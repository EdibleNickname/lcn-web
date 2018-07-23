
import Storage from '../../utils/storage';

const state = {
    userInfo : Storage.query("userInfo"),
};


const getters = {
    getUserInfo : state => state.userInfo,
};

const mutations= {
    /**
     * 将用户名从容器中删除和保存进容器
     * @param state
     * @param type 01: 保存  02: 删除
     * @param userName 需要保存的用户
     */
    userInfoOperate(state, data) {
        if(data.type == '01') {
            if(data.userInfo != null) {
                state.userInfo = data.userInfo;
            }
            return;
        }
        // 重置为空
        state.userInfo = null;
    },
    /**
     * 更新用户信息
     * @param stat
     * @param data
     */
    updateUserInfo(state, data){
        state.userInfo = { ...state.userInfo, ...data};
        //更新localStorage里面对应的用户信息
        Storage.update("userInfo", state.userInfo);
    }
};

const actions= {

};

export default {
    state,
    getters,
    actions,
    mutations
};

