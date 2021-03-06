package sequence.restapi.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@Controller
public class TemplateController {
    @GetMapping(value="/google/calendar")
    String googleCalendar () {
        return "/google/calendar";
    }

    @GetMapping(value = "/{path:[^\\.]*}")
    public String redirect() {
        return "forward:/";
    }

    @GetMapping(value = {"/", "/project/**", "/task/**", "/naver/**", "/schedule/**"})
    public String front() {
        return "index";
    }
}

