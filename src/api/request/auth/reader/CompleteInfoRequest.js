import { $get, $post, $put} from '@/api/api.js';
import {$upload} from "../../../api";

const CompleteInfoRequest = {
    updateUserInfo(userName, birthday, introduce, sex, isUploadImg) {
        let url = "/info/uploadBaseData";
        let data = {
            userName,
            birthday,
            introduce,
            sex,
            isModify: isUploadImg ? 1 : 0,
        };

        let resp = $put(url, data);
        return resp;
    },

    uploadFile(blob, fileName, redisKey) {

        let url = "/info/uploadHeaderPortrait";

        let fd = new FormData();
        fd.append("file", blob, fileName);
        fd.append("redisKey", redisKey);

        let resp = $upload(url, fd);
        return resp;
    }
};

export default CompleteInfoRequest;

