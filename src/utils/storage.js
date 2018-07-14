
const Storage = {

    /**
     * 将数据保存在localStorage
     *
     * @param key
     * @param value
     */
    save(key, value) {

        // 不支持localStorage
        if(!localStorage) {
            return false;
        }

        if(key == null) {
            return ;
        }
        localStorage.setItem(key, JSON.stringify(value));
    },

    /**
     * 将数据保存在localStorage, 同时设置一个过期时间
     * @param key
     * @param value
     * @param expiration  过期时间， 单位秒, 默认60s
     */
    saveWithExpirationTime(key, value, expiration) {
        // 不支持localStorage
        if(!localStorage) {
            return false;
        }

        if(key == null) {
            return false;
        }

        if(!expiration || isNaN(expiration)) {
            expiration = 60;
        }

        // 过期时间
        let expireDate = (new Date()-1) + expiration * 1000;
        let val = { val : value, exp : expireDate };
        //存入缓存值
        localStorage.setItem(key, JSON.stringify(val));
    },

    /**
     * 从localStorage中查询出对应的值
     *
     * @param key
     */
    query(key) {

        // 不支持localStorage
        if (!localStorage) {
            return null;
        }

        if(key == null) {
            return null ;
        }
        let val = localStorage.getItem(key);
        let data = JSON.parse(val);

        // 没有存值
        if(data == null ) {
            return null;
        }

        // 没有过期时间
        if(data.exp == null) {
            return data;
        }

        let now = new Date() -1;

        // 当前时间大于过期时间
        if(now > data.exp) {
            localStorage.removeItem(key);
            return null;
        }
        return data.val;
    },

    /**
     * 删除某一项
     * @param key
     */
    remove(key) {
        if(!localStorage) {
            return false;
        }

        if(key == null) {
            return false;
        }

        localStorage.removeItem(key);
    },

    /**
     * 清空所有的存储
     */
    clear() {
        if(!localStorage) {
            return false;
        }
        localStorage.clear();
    }
};

export default Storage;