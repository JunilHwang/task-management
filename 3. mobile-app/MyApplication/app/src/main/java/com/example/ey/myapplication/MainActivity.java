package com.example.ey.myapplication;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.WebView;
import android.view.Menu;
import android.view.MenuItem;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebViewClient;

public class MainActivity extends AppCompatActivity {
    private WebView mWebView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mWebView = (WebView) findViewById(R.id.webView);
        WebSettings webSettings = mWebView.getSettings(); // web view 세팅을 위한 클래스 생성
        webSettings.setJavaScriptEnabled(true); // javascript 사용
        webSettings.setUseWideViewPort(true); // viewport 사용
        webSettings.setBuiltInZoomControls(false); // zoom 사용
        webSettings.setJavaScriptCanOpenWindowsAutomatically(true); // window.open 사용
        webSettings.setSupportMultipleWindows(true); // multiple window 사용
        webSettings.setSaveFormData(false); // 폼의 입력값 보존X
        webSettings.setLayoutAlgorithm(WebSettings.LayoutAlgorithm.SINGLE_COLUMN);
        mWebView.setWebChromeClient(new WebChromeClient()); // chrome이 있으면 chrome 엔진 사용
        mWebView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                view.loadUrl(url);
                return true;
            }
        });
        mWebView.loadUrl("http://192.168.0.7:8080"); // 웹 서비스 주소.

    }
}
