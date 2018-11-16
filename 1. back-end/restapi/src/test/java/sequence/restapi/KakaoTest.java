package sequence.restapi;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import java.net.URL;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;

import sequence.restapi.mapper.CommentMapper;

import javax.annotation.Resource;

@RunWith(SpringRunner.class)
@SpringBootTest
public class KakaoTest {

	@Test
	public void odTest() {
		BufferedReader in = null;
		try {
			URL obj = new URL("https://kauth.kakao.com/oauth/authorize?client_id=62972c20fe0428fe86b0bf5339114c75&redirect_uri=http://localhost:8090&response_type=code "); // 호출할 url
			HttpURLConnection con = (HttpURLConnection)obj.openConnection();
			con.setRequestMethod("GET");
			in = new BufferedReader(new InputStreamReader(con.getInputStream(), "UTF-8"));
			String line;
			while((line = in.readLine()) != null) { // response를 차례대로 출력
				System.out.println(line);
			}
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
			if(in != null) try { in.close(); } catch(Exception e) { e.printStackTrace(); }
		}

	}

}
