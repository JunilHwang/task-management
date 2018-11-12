package sequence.restapi.mapper;

import java.util.HashMap;
import java.util.List;

public interface MemberMapper {
    // email과 일치하는 회원 정보의 갯수 가져오기
    int getMemberCount(String email);

    // 회원 등록하기
    void postMember(HashMap data);
}
