package sequence.restapi;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import sequence.restapi.mapper.CommentMapper;
import sequence.restapi.mapper.ProjectMapper;

import javax.annotation.Resource;
import java.util.HashMap;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CommentTest {

	@Resource
	public CommentMapper commentMapper;

	@Test
	public void odTest() {
		int od = commentMapper.getOd(1);
		System.out.println(od);
	}

}
