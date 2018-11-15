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
}
