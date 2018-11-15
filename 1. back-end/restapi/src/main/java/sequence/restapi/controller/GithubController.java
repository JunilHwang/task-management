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
}
