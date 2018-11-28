package sequence.restapi.controller;

import java.lang.Exception;
import org.springframework.web.bind.annotation.*;
import sequence.restapi.mapper.TaskMapper;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;

@RestController
public class TaskController {

    @Resource
    TaskMapper taskMapper;

    /**
     * 단일 task 정보를 가져온다.
     * @param tidx : task index number
     * @return
     */
    @GetMapping("/api/task/{tidx}")
    HashMap getTask (@PathVariable int tidx) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            HashMap task = taskMapper.getTask(tidx);
            obj.put("task", task);
        } catch (Exception e) {
            obj.put("err", e);
            success = false;
        }
        obj.put("success", success);
        return obj;
    }

    /**
     * 프로젝트의 task 목록을 가져온다.
     * @param pidx : project index number
     * @return
     */
    @GetMapping(value="/api/tasks/{pidx}")
    HashMap getTaskList (@PathVariable int pidx) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            List list = taskMapper.getTaskListAll(pidx);
            obj.put("list", list);
        } catch (Exception e) {
            obj.put("err", e);
            success = false;
        }
        obj.put("success", success);
        return obj;
    }

    /**
     * 참여중인 프로젝트의 task 목록 중 최근에 업데이트된 top 10을 가져온다.
     * @param mid : member id
     * @return
     */
    @GetMapping(value="/api/task/recently/{mid}")
    HashMap getTaskRecently (@PathVariable String mid) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            List list = taskMapper.getTaskRecently(mid);
            obj.put("list", list);
        } catch (Exception e) {
            obj.put("err", e);
            success = false;
        }
        obj.put("success", success);
        return obj;
    }

    /**
     * 참여중인 프로젝트의 task 목록 중 최근에 업데이트된 top 10을 가져온다.
     * @param params : {mid, start, end}
     * @return
     */
    @GetMapping(value="/api/task-range")
    HashMap getTaskByRange (@RequestParam HashMap params) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            List list = taskMapper.getTaskByRange(params);
            obj.put("list", list);
        } catch (Exception e) {
            obj.put("err", e);
            System.out.println(e);
            success = false;
        }
        obj.put("success", success);
        return obj;
    }

    /**
     * task 정보와 google calendar를 연동한다.
     * @param midx : member index number
     * @param tidx : task index numbber
     * @return
     */
    @GetMapping(value="/api/task-on-calendar")
    HashMap getTaskOnCalendar (@RequestParam int midx, @RequestParam int tidx) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            HashMap params = new HashMap();
            params.put("midx", midx);
            params.put("tidx", tidx);
            obj.put("data", taskMapper.getTaskOnCalendar(params));
        } catch (Exception e) {
            obj.put("err", e);
            success = false;
        }
        obj.put("success", success);
        return obj;
    }

    /**
     * 테스크의 담당자를 가져온다.
     * @param tidx : task index number
     * @return
     */
    @GetMapping(value="/api/task/member")
    HashMap getTaskMember (@RequestParam int tidx) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            obj.put("list", taskMapper.getTaskMember(tidx));
        } catch (Exception e) {
            obj.put("err", e);
            success = false;
        }
        obj.put("success", success);
        return obj;
    }

    /**
     * task를 등록한다.
     * @param data: {parent, depth, title, start_date, limit_date, limit_time, description}
     * @return
     */
    @PostMapping(value="/api/task", consumes = {"application/json"})
    HashMap postTask (@RequestBody HashMap data) {
        HashMap obj = new HashMap();
        Boolean success = true;
        int parent = Integer.parseInt(data.get("parent").toString());
        int depth = 0;
        try {
            if (parent > 0) {
                HashMap parentData = taskMapper.getTask(parent);
                depth = Integer.parseInt(parentData.get("depth").toString()) + 1;
            }
            data.put("depth", depth);
            taskMapper.postTask(data);
        } catch (Exception e) {
            obj.put("err", e);
            success = false;
        }
        obj.put("success", success);
        return obj;
    }

    /**
     * 구글 캘린더의 연동 정보를 저장한다.
     * @param params = { midx, tidx, id, html_url }
     * @return
     */
    @PostMapping(value="/api/task-on-calendar", consumes = {"application/json"})
    HashMap postTaskOnCalendar (@RequestBody HashMap params) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            taskMapper.postTaskOnCalendar(params);
        } catch (Exception e) {
            obj.put("err", e);
            success = false;
        }
        obj.put("success", success);
        return obj;
    }

    /**
     * task 담당자를 등록
     * @param params : {midx, tidx}
     * @return
     */
    @PostMapping(value="/api/task/member", consumes = {"application/json"})
    HashMap postTaskMember(@RequestBody HashMap params) {
        HashMap obj = new HashMap();
        Boolean success = true;
        System.out.println(params);
        try {
            taskMapper.deleteTaskMember(params); // 비우기 후
            taskMapper.postTaskMember(params);   // 재 등록
        } catch (Exception e) {
            obj.put("err", e);
            success = false;
        }
        obj.put("success", success);
        return obj;
    }


    /**
     * task를 수정한다.
     * @param params : {tidx, title, start_date, limit_date, description}
     * @return
     */
    @PutMapping(value="/api/task", consumes = {"application/json"})
    HashMap putTask (@RequestBody HashMap params) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            taskMapper.updateTask(params);
        } catch (Exception e) {
            obj.put("err", e);
            success = false;
        }
        obj.put("success", success);
        return obj;
    }

    /**
     * task를 완료 상태로 변경
     * @param tidx : task index number
     * @return
     */
    @PutMapping(value="/api/task/complete/{tidx}")
    HashMap setComplete (@PathVariable int tidx) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            taskMapper.setComplete(tidx);
        } catch (Exception e) {
            obj.put("err", e);
            success = false;
        }
        obj.put("success", success);
        return obj;
    }

    /**
     * task를 에러 상태로 변경
     * @param tidx : task index number
     * @return
     */
    @PutMapping(value="/api/task/error/{tidx}")
    HashMap setErrror (@PathVariable int tidx) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            taskMapper.setError(tidx);
        } catch (Exception e) {
            obj.put("err", e);
            success = false;
        }
        obj.put("success", success);
        return obj;
    }

    /**
     * task를 진행중 상태로 변경
     * @param tidx : task index number
     * @return
     */
    @PutMapping(value="/api/task/process/{tidx}")
    HashMap setProcessing (@PathVariable int tidx) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            taskMapper.setProcess(tidx);
        } catch (Exception e) {
            obj.put("err", e);
            success = false;
        }
        obj.put("success", success);
        return obj;
    }

    /**
     * task를 삭제합니다.
     * @param tidx : task index number
     * @return
     */
    @DeleteMapping(value="/api/task/{tidx}")
    HashMap deleteTask (@PathVariable int tidx) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            taskMapper.deleteTask(tidx);
        } catch (Exception e) {
            obj.put("err", e);
            success = false;
        }
        obj.put("success", success);
        return obj;
    }

    /**
     * 구글 캘린더의 연동 정보를 삭제한다.
     * @param id
     * @return
     */
    @DeleteMapping(value="/api/task-on-calendar/{id}")
    HashMap deleteTaskOnCalendar (@PathVariable String id) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            taskMapper.deleteTaskOnCalendar(id);
        } catch (Exception e) {
            obj.put("err", e);
            success = false;
        }
        obj.put("success", success);
        return obj;
    }

    /**
     * 태스크 담당자를 삭제
     * @param params : {midx, tidx}
     * @return
     */
    @DeleteMapping(value="/api/task/member")
    HashMap deleteTaskMember (@RequestParam HashMap params) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            taskMapper.deleteTaskMember(params);
        } catch (Exception e) {
            obj.put("err", e);
            success = false;
        }
        obj.put("success", success);
        return obj;
    }
}
