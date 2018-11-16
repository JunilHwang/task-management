package sequence.restapi.mapper;

import java.util.HashMap;
import java.util.List;

public interface CommentMapper {

    // task에 해당하는 comment 목록 불러오기
    List getCommentList(int tidx);

    // 참여중인 project에서 최근에 업데이트된 comment 목록 불러오기
    List getCommentListRecently(String mid);

    // 단일 comment 불러오기
    HashMap getComment(int cidx);

    // 마지막 od 가져오기
    int getOd(int tidx);

    // comment 생성
    void postComment(HashMap params);

    // comment 수정
    void updateComment(HashMap params);

    // comment 수정
    void updateCommentOd(HashMap params);

    // comment 삭제
    void deleteComment(int tidx);
}
