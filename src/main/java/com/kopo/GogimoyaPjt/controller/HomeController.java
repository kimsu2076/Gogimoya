package com.kopo.GogimoyaPjt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kopo.GogimoyaPjt.service.BeefService;

/**
 * 메인 화면 처리를 위한 컨트롤러
 */
@Controller
public class HomeController {

    @Autowired
    private BeefService beefService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String home(Model model) {
        // 소고기 부위 목록 데이터 조회
        model.addAttribute("beefList", beefService.getAllBeefCuts());
        
        // /WEB-INF/views/index.jsp 로 이동
        return "index";
    }
}
