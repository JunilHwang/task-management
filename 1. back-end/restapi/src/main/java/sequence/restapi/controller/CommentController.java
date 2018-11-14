package sequence.restapi.controller;

import java.lang.Exception;
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
        } catch (Exception e) {
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
        } catch (Exception e) {
            obj.put("err", e);
            success = false;
        }
        obj.put("success", success);
        return obj;
    }

    /**
     * 댓글을 등록한다.
     * @param tidx : task index number
     * @param params : {tidx, parent, depth, od, tag, writer, content}
     * @return
     */
    @PostMapping(value="/api/comment/{tidx}", consumes = {"application/json"})
    HashMap postComment (@PathVariable int tidx, @RequestBody HashMap params) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            params.put("tidx", tidx);
            params.put("od", commentMapper.getOd(tidx));
            commentMapper.postComment(params);
        } catch (Exception e) {
            obj.put("err", e);
            success = false;
        }
        obj.put("success", success);
        return obj;
    }

    /**
     * 댓글에 대한 답글을 작성한다.
     * @param params : {tidx, parent, depth, od, tag, writer, content}
     * @return
     */
    @PostMapping(value="/api/comment/reply", consumes = {"application/json"})
    HashMap postCommentReply (@RequestBody HashMap params) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            commentMapper.updateCommentOd(params);
            commentMapper.postComment(params);
        } catch (Exception e) {
            obj.put("err", e);
            success = false;
        }
        obj.put("success", success);
        return obj;
    }

    /**
     * 댓글을 수정한다.
     * @param params : {content, tag, cidx}
     * @return
     */
    @PutMapping(value="/api/comment", consumes = {"application/json"})
    HashMap putComment (@RequestBody HashMap params) {
        HashMap obj = new HashMap();
        Boolean success = true;
        try {
            System.out.println(params);
            commentMapper.updateComment(params);
        } catch (Exception e) {
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
        } catch (Exception e) {
            obj.put("err", e);
            success = false;
        }
        obj.put("success", success);
        return obj;
    }
}
