package sequence.restapi.mapper;

import java.util.HashMap;
import java.util.List;

public interface MemberMapper {
    // email과 일치하는 회원 정보의 갯수 가져오기
    int getMemberCount(String email);

    // id와 동일한 회원 정보 가져오기
    HashMap getMember(String id);

    // 회원 등록하기
    void postMember(HashMap data);
}
