package com.tech.humanmachine.Controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@CrossOrigin
public class IndexController {
    @RequestMapping("/index")
    public String toIndex(){
        return "redirect:/HumanMachine/mainMenu.html";
    }

    @RequestMapping("/*")
    public String toIndex2(){
        return "redirect:/HumanMachine/mainMenu.html";
    }
}
