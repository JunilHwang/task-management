package sequence.restapi.controller;

import org.springframework.web.bind.annotation.*;
import sequence.restapi.mapper.MemberMapper;

import javax.annotation.Resource;
import java.util.*;

@RestController
public class MemberController {

    @Resource
    public MemberMapper memberMapper;

    @GetMapping(value="/api/memberOnProject/{pidx}")
    HashMap getMemberOnProject (@PathVariable int pidx) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            List member = memberMapper.getMemberOnProject(pidx);
            obj.put("member", member);
        } catch (Exception e) {
            success = false;
            obj.put("err", e);
        }
        obj.put("success", success);
        return obj;
    }

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
        HashMap member = null;
        try {
            int cnt = memberMapper.getMemberCount(data.get("email").toString());
            if (cnt == 0) {
                memberMapper.postMember(data);
                result = "member inserted";
            }
            member = memberMapper.getMember(data.get("id").toString());
            obj.put("member", member);
            obj.put("result", result);
        } catch (Exception e) {
            success = false;
            obj.put("err", e);
        }
        obj.put("success", success);
        return obj;
    }

    @PutMapping(value="/api/member/google-token", consumes = {"application/json"})
    HashMap putMemberGoogleToken (@RequestBody HashMap params) {
        HashMap obj = new HashMap();
        Boolean success = true;
        HashMap member = null;
        try {
            memberMapper.putMemberGoogleToken(params);
        } catch (Exception e) {
            success = false;
            obj.put("err", e);
        }
        obj.put("success", success);
        return obj;
    }
}
