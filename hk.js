let puppeteer=require("puppeteer");
const {answer}=require("./codes")
let browserStartPromises=puppeteer.launch({
    headless:false,
    //slow mo:1000
    defaultViewport:null,
    args:["--start-maximised","--disable-notifications"]

});
let page,browser,rTab;
browserStartPromises.then(function(browserObj){
    console.log("Browser opened");
    browser=browserObj;
  let browsernewTabOpen=  browserObj.newPage();
  return browsernewTabOpen;
}).then(function(newTab){
    page=newTab
    console.log("new tab opened");
    let gPageOpenPromise=newTab.goto("https://www.hackerrank.com/auth/login");
    return gPageOpenPromise;
}).then(function(){
    let typingEmail=page.type('input[aria-label="Your username or email"]',"nagel81800@enpaypal.com");
    return typingEmail;
}).then(function(){
    let typingPassword=page.type('input[type="password"]',"abc1234");
    return typingPassword;
}).then(function(){
    let loginClick=page.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    return loginClick;
}).then(function(){
    let algorithmsclick=waitAndClick(".track-card a[data-attr2='algorithms']",page);
    return algorithmsclick
}).then(function(){
    let warmupclick=waitAndClick("input[value='warmup']",page);
    return warmupclick;
}).then(function(){
    let waitFor3seconds=page.waitFor(3000);
    return waitFor3seconds;
}).then(function(){
    let challengePromise=page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",{delay:10});
    return challengePromise;
}).then(function(questionArr){
    console.log("no. of questions",questionArr.length);
    let qwillBeSolved=questionSolver(page,questionArr[0],answer[0]);
    return qwillBeSolved;
    
})
function waitAndClick(selector,cPage){
    return new Promise(function (resolve,reject){
        let waitForModalPromise=cPage.waitForSelector(selector,{visible:true});
        waitForModalPromise.then(function(){
            let clickModal=cPage.click(selector,{delay:100});
            return clickModal;
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject(err);
        })
    })
}  
function questionSolver(page,question,answer){
    return new Promise(function(resolve,reject){
        let qwillBeClickedPromise=question.click();
        qwillBeClickedPromise
        //code read
        //hk editor-> ctrl+A + ctrl+x
        //code type
        .then(function(){
            let focusOnMonaco=waitAndClick(".monaco-editor.no-user-select.vs",page);
            return focusOnMonaco;
        }).then(function(){
            return waitAndClick(".checkbox-input",page);
        }).then(function(){
            return page.waitForSelector(".input.text-area.custominput.auto-width",{visible:true});
        }).then(function(){
            return page.type(".input.text-area.custominput.auto-width",answer,{delay:100});
        }).then(function(){
            let ctrlIsPressed=page.keyboard.down("Control");
            return ctrlIsPressed;
        }).then(function(){
            let AIsPressed=page.keyboard.press("A",{delay:100});
            return AIsPressed;
        }).then(function(){
            return page.keyboard.press("X",{delay:100});
        }).then(function(){
            let upCtrlpress=page.keyboard.up("Control",{delay:50});
            return upCtrlpress;
        })
        .then(function(){
            let waitForEditorToBeInFocus=waitAndClick(".monaco-editor.no-user-select.vs",page);
            return waitForEditorToBeInFocus;
        }).then(function(){
            let ctrlIsPressed=page.keyboard.down("Control",{delay:50});
            return ctrlIsPressed;
        }).then(function(){
            let AIsPressed=page.keyboard.press("A",{delay:100});
            return AIsPressed;
        }).then(function(){
            return page.keyboard.press("V",{delay:100});
        }).then(function(){
            let upCtrlpress=page.keyboard.up("Control",{delay:50});
            return upCtrlpress;
        }).then(function(){
         return page.click(".ui-btn.ui-btn-normal.ui-btn-secondary.pull-right.msR.hr-monaco-compile.hr-monaco__run-code.ui-btn-styled",{delay:50})
        }).then(function(){
            resolve();
        }).catch(function(err){
           console.log(err);
           reject(err);
        })
    })
}