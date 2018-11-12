package sequence.restapi;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import sequence.restapi.mapper.MemberMapper;

import javax.annotation.Resource;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MemberTest {

	@Resource
	public MemberMapper memberMapper;

	@Test
	public void memberCount() {
		int cnt = memberMapper.getMemberCount("tjsdlf426@gmail.com");
		System.out.println(cnt);
	}

}
