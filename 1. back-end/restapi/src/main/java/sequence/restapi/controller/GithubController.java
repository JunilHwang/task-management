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

    @GetMapping(value="/api/github/repo/{pidx}")
    HashMap getRepo (@PathVariable int pidx) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            List repos = githubMapper.getRepo(pidx);
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
            githubMapper.postRepo(params);
        } catch (Exception e) {
            obj.put("err", e);
            success = false;
        }
        obj.put("success", success);
        return obj;
    }
}
