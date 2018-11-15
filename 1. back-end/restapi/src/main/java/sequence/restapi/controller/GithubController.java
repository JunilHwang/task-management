package sequence.restapi.controller;

import org.springframework.web.bind.annotation.*;
import sequence.restapi.mapper.GithubMapper;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;

@RestController
public class GithubController {

    @Resource
    GithubMapper githubMapper;

    /**
     * project에 해당하는 github 정보 가져오기
     * @param pidx : project idx number
     * @return
     */
    @GetMapping(value="/api/github/repos/{pidx}")
    HashMap getRepo (@PathVariable int pidx) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            List repos = githubMapper.getRepos(pidx);
            obj.put("repos", repos);
        } catch (Exception e) {
            obj.put("err", e);
            success = false;
        }
        obj.put("success", success);
        return obj;
    }

    /**
     * task와 매칭된 commit 목록을 가져온다.
     * @param tidx : task index number
     * @return
     */
    @GetMapping(value="/api/github/commit/{tidx}")
    HashMap getCommits (@PathVariable int tidx) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            List commits = githubMapper.getCommitOnTask(tidx);
            obj.put("commits", commits);
        } catch (Exception e) {
            obj.put("err", e);
            success = false;
        }
        obj.put("success", success);
        return obj;
    }

    /**
     * project에 github repository 연동
     * @param params { pidx, access_url, access_token, full_name, description }
     * @return
     */
    @PostMapping(value="/api/github/repo", consumes = {"application/json"})
    HashMap postRepo (@RequestBody HashMap params) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            int cnt = githubMapper.getRepoCount(params);
            if (cnt == 0) {
                githubMapper.postRepo(params);
            } else {
                obj.put("msg", "이미 등록된 Repository 입니다.");
            }
        } catch (Exception e) {
            obj.put("err", e);
            success = false;
        }
        obj.put("success", success);
        return obj;
    }

    /**
     * task와 commit을 매칭한다.
     * @param params { sha, tidx, name, image, message, register_date, html_url }
     * @return
     */
    @PostMapping(value="/api/github/match", consumes = {"application/json"})
    HashMap postTaskCommit (@RequestBody HashMap params) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            int cnt = githubMapper.getCommitCount(params.get("sha").toString());
            if (cnt == 0) {
                githubMapper.postCommit(params);
            }
            cnt = githubMapper.getCommitOnTaskCount(params);
            if (cnt == 0) {
                githubMapper.postCommitOnTask(params);
            } else {
                obj.put("msg", "이미 매칭된 task와 commit 입니다.");
            }
        } catch (Exception e) {
            obj.put("err", e);
            success = false;
        }
        obj.put("success", success);
        return obj;
    }

    /**
     * 연동중인 github repository 삭제
     * @param gridx : github repository index number
     * @return
     */
    @DeleteMapping(value="/api/github/repo/{gridx}")
    HashMap deleteRepo (@PathVariable int gridx) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            githubMapper.deleteRepo(gridx);
        } catch (Exception e) {
            obj.put("err", e);
            success = false;
        }
        obj.put("success", success);
        return obj;
    }

    @DeleteMapping(value="/api/github/match/{tidx}/{sha}")
    HashMap deleteCommitOnTask (@PathVariable int tidx, @PathVariable String sha) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            HashMap params = new HashMap();
            params.put("tidx", tidx);
            params.put("sha", sha);
            githubMapper.deleteCommitOnTask(params);
        } catch (Exception e) {
            obj.put("err", e);
            success = false;
        }
        obj.put("success", success);
        return obj;
    }
}
