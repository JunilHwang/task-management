package sequence.restapi.mapper;

import java.util.HashMap;
import java.util.List;

public interface GithubMapper {
    List getRepos(int pidx);
    int getRepoCount(HashMap parmas);
    int getCommitCount(String sha);
    int getCommitOnTaskCount(HashMap params);
    HashMap getCommitOnTask(int tidx);

    void postRepo(HashMap params);
    void postCommit(HashMap params);
    void postCommitOnTask(HashMap params);

    void deleteRepo(int gridx);
    void deleteCommitOnTask(int idx);
}
