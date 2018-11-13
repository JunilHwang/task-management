package sequence.restapi.controller;

import org.apache.ibatis.session.SqlSessionException;
import org.springframework.web.bind.annotation.*;
import sequence.restapi.mapper.CommentMapper;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;

@RestController
public class CommentController {

    @Resource
    CommentMapper commentMapper;

    /**
     * task의 댓글 목록을 가져온다.
     * @param tidx : task index number
     * @return
     */
    @GetMapping(value="/api/comments/{tidx}")
    HashMap getCommentList (@PathVariable int tidx) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            List list = commentMapper.getCommentList(tidx);
            obj.put("list", list);
        } catch (SqlSessionException e) {
            obj.put("err", e);
            success = false;
        }
        obj.put("success", success);
        return obj;
    }

    /**
     * 단일 댓글 정보를 가져온다.
     * @param cidx : comment index number
     * @return
     */
    @GetMapping(value="/api/comment/{cidx}")
    HashMap getComment (@PathVariable int cidx) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            HashMap data = commentMapper.getComment(cidx);
            obj.put("data", data);
        } catch (SqlSessionException e) {
            obj.put("err", e);
            success = false;
        }
        obj.put("success", success);
        return obj;
    }

    /**
     * 댓글을 등록한다.
     * @param tidx : task index number
     * @return
     */
    @PostMapping(value="/api/comment/{tidx}", consumes = {"application/json"})
    HashMap postComment (@PathVariable int tidx, @RequestBody HashMap data) {
        HashMap obj = new HashMap();
        Boolean success = true;
        System.out.println("data : " + data);
        try {
            data.put("tidx", tidx);
            data.put("od", commentMapper.getOd(tidx));
            commentMapper.postComment(data);
        } catch (SqlSessionException e) {
            obj.put("err", e);
            success = false;
        }
        obj.put("success", success);
        return obj;
    }

    /**
     * 댓글을 수정한다.
     * @param cidx : comment index number
     * @return
     */
    @PutMapping(value="/api/comment/{cidx}", consumes = {"application/json"})
    HashMap putComment (@PathVariable int cidx, @RequestBody HashMap data) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            data.put("cidx", cidx);
            commentMapper.updateComment(data);
            obj.put("data", data);
        } catch (SqlSessionException e) {
            obj.put("err", e);
            success = false;
        }
        obj.put("success", success);
        return obj;
    }

    /**
     * 댓글을 삭제한다.
     * @param cidx : comment index number
     * @return
     */
    @DeleteMapping(value="/api/comment/{cidx}")
    HashMap deleteComment (@PathVariable int cidx) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            commentMapper.deleteComment(cidx);
        } catch (SqlSessionException e) {
            obj.put("err", e);
            success = false;
        }
        obj.put("success", success);
        return obj;
    }
}
