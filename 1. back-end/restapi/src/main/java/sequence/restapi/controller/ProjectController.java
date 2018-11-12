package sequence.restapi.controller;

import org.apache.ibatis.session.SqlSessionException;
import org.springframework.web.bind.annotation.*;
import sequence.restapi.mapper.ProjectMapper;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class ProjectController {

    @Resource
    ProjectMapper projectMapper;

    /**
     * 프로젝트 등록
     * consumes = {"application/json"} 을 통하여 json string을 hashmap 혹은 list로 받아올 수 있다.
     * @Param data = {writer, title, description}
     * @return {success, err or lastId}
     */
    @PostMapping(value="/api/project", consumes = {"application/json"})
    HashMap postProject (@RequestBody HashMap data) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            projectMapper.postProject(data);
            projectMapper.postProjectAccess(data);
            obj.put("lastId", data.get("pidx"));
        } catch (SqlSessionException e) {
            success = false;
            obj.put("err", e);
        }
        obj.put("success", success);
        return obj;
    }

    /**
     * 프로젝트 목록을 가져온다.
     * @param id : 데이터베이스에 등록된 회원의 id값.
     * @return
     */
    @GetMapping(value="/api/projects/{id}")
    HashMap getProjectList (@PathVariable String id) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            List list = projectMapper.getProjectList(id);
            obj.put("list", list);
        } catch (SqlSessionException e) {
            obj.put("err", e);
        }
        obj.put("success", success);
        System.out.println(obj);
        return obj;
    }

    /**
     * 단일 프로젝트를 가져온다.
     * @param pidx : 프로젝트의 index (식별자)
     * @return
     */
    @GetMapping(value="/api/project/{pidx}")
    HashMap getProject (@PathVariable int pidx) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            HashMap data = projectMapper.getProject(pidx);
            obj.put("project", data);
        } catch (SqlSessionException e) {
            obj.put("err", e);
        }
        return obj;
    }
}
