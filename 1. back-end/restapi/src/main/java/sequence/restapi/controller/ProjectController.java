package sequence.restapi.controller;

import java.lang.Exception;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.*;
import sequence.restapi.mapper.ProjectMapper;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;

@ComponentScan
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
            String  title = data.get("title").toString(),
                    writer = data.get("writer").toString(),
                    pidx = data.get("pidx").toString();
            String access_token = Jwts.builder()
                    .setHeaderParam("typ", "JWT")
                    .setHeaderParam("issueDate", System.currentTimeMillis())
                    .setSubject(title)
                    .signWith(SignatureAlgorithm.HS512, writer + pidx)
                    .compact();
            data.put("access_token", access_token);
            projectMapper.putProjectToken(data);
        } catch (Exception e) {
            success = false;
            obj.put("err", e);
        }
        obj.put("success", success);
        return obj;
    }


    /**
     * 프로젝트 엑세스 등록
     * consumes = {"application/json"} 을 통하여 json string을 hashmap 혹은 list로 받아올 수 있다.
     * @Param params = {mid, access_token}
     * @return {success, err}
     */
    @PostMapping(value="/api/project/access", consumes = {"application/json"})
    HashMap postProjectAaccess (@RequestBody HashMap params) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            int cnt = projectMapper.getAlreadyAccess(params);
            if (cnt == 0) {
                projectMapper.postProjectAccessByToken(params);
            } else {
                obj.put("msg", "이미 등록된 프로젝트입니다.");
            }
        } catch (Exception e) {
            success = false;
            obj.put("err", e);
        }
        obj.put("success", success);
        return obj;
    }

    /**
     * 단일 프로젝트를 가져온다.
     * @param pidx : 프로젝트의 index (식별자)
     * @return
     */
    @GetMapping(value="/api/project/{pidx}")
    HashMap getProject (@PathVariable int pidx) {
        System.out.println(pidx);
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            HashMap data = projectMapper.getProject(pidx);
            obj.put("project", data);
        } catch (Exception e) {
            success = false;
            obj.put("err", e);
        }
        obj.put("success", success);
        return obj;
    }

    /**
     * 프로젝트 목록을 가져온다.
     * @param mid : 데이터베이스에 등록된 회원의 id값.
     * @return
     */
    @GetMapping(value="/api/projects/{mid}")
    HashMap getProjectList (@PathVariable String mid) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            List list = projectMapper.getProjectList(mid);
            obj.put("list", list);
        } catch (Exception e) {
            success = false;
            obj.put("err", e);
        }
        obj.put("success", success);
        return obj;
    }

    /**
     * 프로젝트 수정
     * consumes = {"application/json"} 을 통하여 json string을 hashmap 혹은 list로 받아올 수 있다.
     * @Param data = {title, description}
     * @return {success, err or lastId}
     */
    @PutMapping(value="/api/project", consumes = {"application/json"})
    HashMap putProject (@RequestBody HashMap data) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            projectMapper.putProject(data);
        } catch (Exception e) {
            success = false;
            obj.put("err", e);
        }
        obj.put("success", success);
        return obj;
    }

    /**
     * project 즐겨찾기 토글
     * @param params {pidx, midx, star}
     * @return
     */
    @PutMapping(value="/api/project/star", consumes = {"application/json"})
    HashMap putProjectStar (@RequestBody HashMap params) {
        System.out.println(params);
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            System.out.println(params);
            if (Integer.parseInt(params.get("star").toString()) == 1) {
                projectMapper.postStarOnMember(params);
            } else {
                projectMapper.deleteStarOnMember(params);
            }
        } catch (Exception e) {
            success = false;
            obj.put("err", e);
        }
        obj.put("success", success);
        return obj;
    }

    /**
     * 프로젝트 삭제
     * @param pidx : project index number
     * @return
     */
    @DeleteMapping(value="/api/project/{pidx}")
    HashMap deleteProject (@PathVariable int pidx) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            projectMapper.deleteProject(pidx);
        } catch (Exception e) {
            success = false;
            obj.put("err", e);
        }
        obj.put("success", success);
        return obj;
    }
}
