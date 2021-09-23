/**
 * 根据特定符号扫描模板
 */
 export default class Scanner{
    constructor(templateStr){
        this.templateStr = templateStr;
        this.tail = templateStr;
        this.pos = 0;
    }
    /**
     * 扫描特定符号，移动指针
     * @param {String} tag
     */
    scan(tag){
        if(this.tail.indexOf(tag) == 0){
            this.pos += tag.length;
            this.tail = this.templateStr.substr(this.pos);
        }
    }
    /**
     * 扫描特定符号外的字符串，移动指针
     * @param {String} tag
     * @returns
     */
    scanUtil(tag){
        const pos_backup = this.pos;
        while(this.tail.indexOf(tag) != 0 && !this.eos()){
            this.pos++;
            this.tail = this.templateStr.substr(this.pos);
        }
        let res = this.templateStr.substring(pos_backup,this.pos);
        return res;
    }
    /**
     * 判断指针是否超出模板字符串长度
     * @returns boolean
     */
    eos(){
        return this.pos >= this.templateStr.length;
    }
}