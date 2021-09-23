import Tokens from "./Tokens";
import RenderDOM from "./RenderDOM";
/**
 * 入口文件
 */
window.LTE = {
    render(teStr,data){
        let tokens = new Tokens().toTokens(teStr);
        return new RenderDOM().toDom(tokens,data);
    }
}