export default class Help{
    constructor(className,classAbout){
        this.className = className;
        this.classAbout = classAbout;
        this.arguments = [];
        this.methods = [];
    }
    m(methodName,methodAbout,methodArgs,methodDescription=""){
        this.methods.push({
            "name":methodName,
            "about":methodAbout,
            "args":methodArgs,
            "description":methodDescription
        })
    }
    g(varName,varAbout){
        this.arguments.push({
            "name":varName,
            "about":varAbout,
            "type":"Getter"
        })
    }
    s(varName,varAbout){
        this.arguments.push({
            "name":varName,
            "about":varAbout,
            "type":"Setter"
        })
    }
    gs(varName,varAbout){
        this.arguments.push({
            "name":varName,
            "about":varAbout,
            "type":"Getter/Setter"
        })
    }
    sg(varName,varAbout){
        this.arguments.push({
            "name":varName,
            "about":varAbout,
            "type":"Getter/Setter"
        })
    }
    helpShow(){
        console.log(`%c${this.className}：使用方法%c\n\n${this.classAbout}`
            ,"font-size:20px;font-weight:700;color:skyblue","");
        if(this.arguments.length>0){
            console.log(
                "%c(クラス変数)","font-size:15px"
            )
        }
        for(const c of this.arguments){
            console.log(`%c${c.name} %c: ${c.about} %c(${c.type})`,
                "font-size:13px;font-weight:700;color:skyblue","","font-size:10px;color:yellowgreen"
            );
        }
        if(this.methods.length>0){
            console.log(
                "%c(メソッド)","font-size:15px"
            )
        }
        for(const c of this.methods){
            let args = "";
            for(const a of c.args){
                args += `   ${a}`;
                args += "\n"
            }
            args = args.slice(0,-1);
            console.log(`%c[${c.about}]\n%c${c.name}%c\n${args}%c\n${c.description}`,
                "font-size:13px;font-weight:700","color:yellow","","font-size:10.5px;font-style:italic"
            );
        }
    }
    help(){
        console.log(
            "%cHelp：使用方法\n\n%chelpを表示するためのクラスです。主にモジュールクラスのメソッドに説明をつけるために使ってください。",
            "font-size:20px;font-weight:700;color:skyblue",""
        );
        console.log(
            "%c(メソッド)","font-size:15px"
        )
        console.log(
            "[メソッドのヘルプを登録]\n%cm(methodName,methodAbout,methodArgs)%c\n   methodName:メソッド名\n   methodAbout:メソッドの概要\n   methodArgs:引数配列"
            ,"color:yellow",""
        );
        console.log(
            "[Setterのヘルプを登録]\n%cs(varName,varAboue)%c\n   varName:変数名\n   varAbout:変数の概要"
            ,"color:yellow",""
        );
        console.log(
            "[Getter]\n%cg(varName,varAboue)%c\n   varName:変数名\n   varAbout:変数の概要"
            ,"color:yellow",""
        );
        console.log(
            "[Getter/Setterのヘルプを登録]\n%cgs(varName,varAboue)%c\n   varName:変数名\n   varAbout:変数の概要\n%c関数名はgsまたはsgのいずれも可能"
            ,"color:yellow","","font-size:10.5px;font-style:italic"
        );
        console.log(
            "[ヘルプを表示]\n%chelpShow()%c\n   引数なし"
            ,"color:yellow",""
        );
    }
}
