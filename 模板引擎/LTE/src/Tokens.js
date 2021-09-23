import Scanner from "./Scanner";
/**
 * 把模板转化成tokens
 */
 export default class Tokens{
    constructor(){
    }
    /**
     * 把模板字符串转化成tokens数组
     * @param {String} teStr
     * @returns
     */
    toTokens(teStr){
        let tokens = [];
        let scanner = new Scanner(teStr);
        let word;
        while(!scanner.eos()){
            word = scanner.scanUtil("{{");
            //去掉自字符串中的头尾空格和回车符
            word = word.replace(/(^\s*)|(\s*$)/g,"").replace(/[\n]/g,"");
            if(word != ''){
                tokens.push(["text",word]);
            }
            scanner.scan("{{");

            word = scanner.scanUtil("}}");
            if(word != ''){
                if(word[0] == "#"){
                    tokens.push(["#",word.substring(1)]);
                }else if(word[0] == "/"){
                    tokens.push(["/",word.substring(1)]);
                }else{
                    tokens.push(["name",word]);
                }
                scanner.scan("}}");
            }
        }

        return this.nestTokens(tokens);
    }
    /**
     * 把初始化的tokens按层次重新生成新的tokens
     * @param {Array} tokens
     * @returns
     */
    nestTokens(tokens){
        let nestedTokens = [];
        //栈
        let stack = [];

        let collector = nestedTokens;

        for (const token of tokens) {
            switch(token[0]){
                case '#':
                    collector.push(token);
                    stack.push(token);
                    collector = token[2] = [];
                    break;
                case '/':
                    stack.pop();
                    collector = stack.length > 0 ? stack[stack.length - 1][2] : nestedTokens;
                    break;
                default:
                    collector.push(token);
            }
        }
        return nestedTokens;
    }
 }