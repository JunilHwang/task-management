package sequence.restapi.mapper;

import java.util.HashMap;
import java.util.List;

public interface ProjectMapper {
    // 프로젝트 목록 가져오기
    List getProjectList(String id);

    // 단일 프로젝트 가져오기
    HashMap getProject(int pidx);

    // 엑세스 토큰에 해당하는 project id 가져오기
    int getProjectIdByToken(String access_token);

    // 이미 엑세스 권한이 등록되어있나 확인
    int getAlreadyAccess(HashMap params);

    // 프로젝트 등록하기
    void postProject(HashMap params);

    // 프로젝트 엑세스 토큰 등록하기
    void putProjectToken(HashMap params);

    // 프로젝트 엑세스 권한 등록하기
    void postProjectAccess(HashMap params);

    // 엑세스 토큰으로 프로젝트 엑세스 권한 등록하기
    void postProjectAccessByToken(HashMap params);

    // 프로젝트 정보 수정
    void putProject(HashMap params);

    // 즐겨찾기 추가
    void postStarOnMember(HashMap params);

    // 프로젝트 삭제
    void deleteProject(int pidx);

    // 즐겨찾기 삭제
    void deleteStarOnMember(HashMap params);
}
