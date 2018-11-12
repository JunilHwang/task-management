package sequence.sequence.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import sequence.sequence.mapper.MemberMapper;

import javax.annotation.Resource;
import java.util.List;

@RestController
public class MemberController {

    @Resource
    public MemberMapper memberMapper;

    @GetMapping("/member")
    List getMember() {
        List list = memberMapper.getMemberList();
        System.out.println(list);
        return list;
    }
}
