package com.sequence.reqmana;

import com.sequence.reqmana.User;
import com.sequence.reqmana.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/api")
public class BackendController {

    private static final Logger LOG = LoggerFactory.getLogger(BackendController.class);

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(path="/users")
    public @ResponseBody Iterable<User> users(){
        LOG.info("Loading....");
        return userRepository.findAll();
    }

    @GetMapping(path="/user/{id}")
    public @ResponseBody User getUserById(@PathVariable("id") long id){
        LOG.info("유저 정보를 데이터로부터 읽어오는 중입니다.");
        return userRepository.findById(id).get();
    }

    @RequestMapping(value = "/user/{id}", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_PROBLEM_JSON_VALUE)
    public User updateUser(@PathVariable Long id, @RequestBody User data){
        User user = userRepository.findById(id).get();
        user.setFirstName(data.getFirstName());
        user.setLastName(data.getLastName());
        return userRepository.save(user);
    }
}
