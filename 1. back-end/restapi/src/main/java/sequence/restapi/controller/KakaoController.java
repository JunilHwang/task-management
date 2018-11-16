package sequence.restapi.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
public class KakaoController {
    @GetMapping(value="/kakao/oauth", consumes = {"application/json"})
    String kakaoLogin (@RequestParam(required = false) String code, @RequestBody HashMap data) {
        /**
         * curl -v -X POST https://kauth.kakao.com/oauth/token \
         *  -d 'grant_type=authorization_code' \
         *  -d 'client_id=62972c20fe0428fe86b0bf5339114c75' \
         *  -d 'redirect_uri=http://localhost:8090/kakao/oauth' \
         *  -d 'code=kRSdz_NeKlgsImFhNrVDH0ZlX3Num9lSNYhkuDZNyW8uFmsKWDMWQNlMxnekeu-Fot3OTgoqAucAAAFnGygAOw
         */
        System.out.println(code);
        System.out.println(data);
        HashMap result = new HashMap();
        result.put("code", code);
        result.put("data", data);
        return code;
    }
}
