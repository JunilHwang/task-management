package sequence.restapi;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import sequence.restapi.mapper.ProjectMapper;

import javax.annotation.Resource;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.HashMap;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ProjectTest {

	@Resource
	public ProjectMapper projectMapper;

	@Test
	public void projectPost() {
		HashMap data = new HashMap();
		data.put("writer", "writer test");
		data.put("title", "title test");
		data.put("description", "description test");
		projectMapper.postProject(data);
		System.out.println(data);
	}

	@Test
	public void createToken () {
        String jwtString = Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setHeaderParam("issueDate", System.currentTimeMillis())
                .setSubject("내용")
                .signWith(SignatureAlgorithm.HS512, "aaaa")
                .compact();
        System.out.println(jwtString);
	}

}
