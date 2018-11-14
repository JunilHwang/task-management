package sequence.restapi.mapper;

import java.util.HashMap;
import java.util.List;

public interface ProjectMapper {
    // 프로젝트 목록 가져오기
    List getProjectList(String id);

    // 단일 프로젝트 가져오기
    HashMap getProject(int pidx);

    // 프로젝트 등록하기
    void postProject(HashMap params);

    // 프로젝트 엑세스 토큰 등록하기
    void putProjectToken(HashMap params);

    // 프로젝트 엑세스 권한 등록하기
    void postProjectAccess(HashMap params);

    // 프로젝트 정보 수정
    void putProject(HashMap params);

    // 프로젝트 삭제
    void deleteProject(int pidx);
}
