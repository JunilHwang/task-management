package sequence.restapi;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import sequence.restapi.mapper.MemberMapper;
import sequence.restapi.mapper.ProjectMapper;

import javax.annotation.Resource;
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

}
