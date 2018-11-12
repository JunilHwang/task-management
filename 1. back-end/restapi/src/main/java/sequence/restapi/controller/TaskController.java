package sequence.restapi.controller;

import org.apache.ibatis.session.SqlSessionException;
import org.springframework.web.bind.annotation.*;
import sequence.restapi.mapper.ProjectMapper;
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
    @GetMapping(value="/api/task/{tidx}")
    HashMap getTask (@PathVariable int tidx) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            HashMap data = taskMapper.getTask(tidx);
            obj.put("data", data);
        } catch (SqlSessionException e) {
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
        } catch (SqlSessionException e) {
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
        } catch (SqlSessionException e) {
            obj.put("err", e);
            success = false;
        }
        obj.put("success", success);
        return obj;
    }

    /**
     * task를 수정한다.
     * @param tidx : task index number
     * @param data : {title, start_date, limit_date, limit_time, description}
     * @return
     */
    @PutMapping(value="/api/task/{tidx}", consumes = {"application/json"})
    HashMap putTask (@PathVariable int tidx, @RequestBody HashMap data) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            data.put("tidx", tidx);
            taskMapper.updateTask(data);
        } catch (SqlSessionException e) {
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
    @PutMapping(value="/api/task/complete/{tidx}", consumes = {"application/json"})
    HashMap setComplete (@PathVariable int tidx) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            taskMapper.setComplete(tidx);
        } catch (SqlSessionException e) {
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
    @PutMapping(value="/api/task/error/{tidx}", consumes = {"application/json"})
    HashMap setErrror (@PathVariable int tidx) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            taskMapper.setError(tidx);
        } catch (SqlSessionException e) {
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
    @DeleteMapping(value="/api/task/{tidx}", consumes = {"application/json"})
    HashMap deleteTask (@PathVariable int tidx) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            taskMapper.deleteTask(tidx);
        } catch (SqlSessionException e) {
            obj.put("err", e);
            success = false;
        }
        obj.put("success", success);
        return obj;
    }
}
