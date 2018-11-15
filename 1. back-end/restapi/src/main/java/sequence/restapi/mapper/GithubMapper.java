package sequence.restapi.mapper;

import java.util.HashMap;
import java.util.List;

public interface GithubMapper {
    List getRepos(int pidx);
    int getRepoCount(HashMap parmas);
    void postRepo(HashMap params);
    void deleteRepo(int gridx);
    void postCommit(HashMap params);
    List getCommitOnTask(HashMap params);
    void deleteCommit(int idx);
}
