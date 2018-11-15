package sequence.restapi.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class KakaoController {
    @GetMapping(value="/kakao")
    String kakaoLogin () {
        return "kakao";
    }
}
