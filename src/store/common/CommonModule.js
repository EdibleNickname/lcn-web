
import Storage from '../../utils/storage';

const state = {
    userName : Storage.query("userName"),
};


const getters = {
    getUserName : state => state.userName
};

const mutations= {
    /**
     * 将用户名从容器中删除和保存进容器
     * @param state
     * @param type 01: 保存  02: 删除
     * @param userName 需要保存的用户
     */
    userNameOperate(state, data) {
        if(data.type == '01') {
            if(data.userName != null) {
                state.userName = data.userName;
            }
            return;
        }
        // 重置为空
        state.userName = "";
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

