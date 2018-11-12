package sequence.restapi.mapper;

import java.util.HashMap;
import java.util.List;

public interface TaskMapper {
    // 프로젝트에 해당하는 task list 불러오기
    List getTaskListAll(int pidx);

    // parent 값을 통하여 task list 불러오기
    List getTaskListByParent(HashMap params);

    // 단일 task 불러오기
    HashMap getTask(int tidx);

    // task 생성하기
    void postTask(HashMap params);

    // task 수정하기
    void updateTask(HashMap params);

    // task의 branch(부모) 수정
    void updateTaskBranch(HashMap params);

    // task를 완료 상태로 변경
    void setComplete(int tidx);

    // task를 에러 상태로 변경
    void setError(int tidx);

    // task 삭제하기
    void deleteTask(int tidx);
}
