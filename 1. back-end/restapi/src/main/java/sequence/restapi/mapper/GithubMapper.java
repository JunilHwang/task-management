package sequence.restapi.mapper;

import java.util.HashMap;
import java.util.List;

public interface GithubMapper {
    List getRepo(int pidx);
    void postRepo(HashMap params);
    void postCommit(HashMap params);
    List getCommitOnTask(HashMap params);
    void deleteCommit(int idx);
}
