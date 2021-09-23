/**
 * 把tokens转化DOM
 */
 export default class RenderDOM {
    /** 初始化DOM字符串 */
    constructor(){
        this.resStr = '';
    }

    toDom(tokens,data){
        for (const i in tokens) {
            let token = tokens[i];

            if(token[0] == 'text'){
                this.resStr += token[1];
            }else if(token[0] == 'name'){
                this.resStr += this.lookUp(data,token[1]);
            }else if(token[0] == '#'){
                let arr = this.lookUp(data,token[1]);
                for (const j in arr) {
                    this.toDom(token[2],arr[j]);
                }
            }
        }

        return this.resStr;
    }

    /*
        可以寻找data里深层次的数据
    */
    lookUp(dataObj,keyName){
        let value = '';
        if(keyName != '.'){
            let tempData = dataObj;
            let keyArr = keyName.split(".");
            value = keyArr.reduce((lastValue,nVal) => lastValue[nVal],tempData);
        }else {
            value = dataObj;
        }

        return value;
    }
}