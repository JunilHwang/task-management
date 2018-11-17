package sequence.restapi.mapper;

import java.util.HashMap;
import java.util.List;

public interface TaskMapper {
    // 프로젝트에 해당하는 task list 불러오기
    List getTaskListAll(int pidx);

    // parent 값을 통하여 task list 불러오기
    List getTaskListByParent(HashMap params);

    // 참여중인 프로젝트에서 최근에 없데이트된 task top 10 가져오기
    List getTaskRecently(String mid);

    // 단일 task 불러오기
    HashMap getTask(int tidx);

    // 연동 중인 google calendar 가져오기
    HashMap getTaskOnCalendar(HashMap params);

    // task 생성하기
    void postTask(HashMap params);

    // task와 google calendar 연동
    void postTaskOnCalendar(HashMap params);

    // task 수정하기
    void updateTask(HashMap params);

    // task의 branch(부모) 수정
    void updateTaskBranch(HashMap params);

    // task를 진행중 상태로 변경
    void setProcess(int tidx);

    // task를 완료 상태로 변경
    void setComplete(int tidx);

    // task를 에러 상태로 변경
    void setError(int tidx);

    // task 삭제하기
    void deleteTask(int tidx);

    // task에 연동된 calendar 삭제하기
    void deleteTaskOnCalendar(String id);
}
