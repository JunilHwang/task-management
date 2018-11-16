package sequence.restapi.mapper;

import java.util.HashMap;
import java.util.List;

public interface MemberMapper {

    // email과 일치하는 회원 정보의 갯수 가져오기
    int getMemberCount(String email);

    // id와 동일한 회원 정보 가져오기
    HashMap getMember(String id);

    // project에 참여중인 member 가져오기
    List getMemberOnProject(int pidx);

    // 회원 등록하기
    void postMember(HashMap data);
}
