package sequence.restapi.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import sequence.restapi.mapper.MemberMapper;

import javax.annotation.Resource;
import java.util.*;

@RestController
public class MemberController {

    @Resource
    public MemberMapper memberMapper;

    /**
     * 최초 로그인 시 회원 등록
     * consumes = {"application/json"} 을 통하여 json string을 hashmap 혹은 list로 받아올 수 있다.
     * @param data : {id, email, name}
     * @return {result}
     */
    @PostMapping(value="/api/member", consumes = {"application/json"})
    HashMap postMember (@RequestBody HashMap data) {
        HashMap obj = new HashMap();
        String result = "already inserted";
        Boolean success = true;
        try {
            int cnt = memberMapper.getMemberCount(data.get("email").toString());
            if (cnt == 0) {
                memberMapper.postMember(data);
                result = "member inserted";
            }
            obj.put("result", result);
        } catch (Exception e) {
            success = false;
            obj.put("err", e);
        }
        obj.put("success", success);
        return obj;
    }
}
