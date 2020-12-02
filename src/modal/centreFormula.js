export const FORMULA={
    getRECTC(obj){
    return {x:obj.x+obj.width/2,y:obj.y+obj.height/2}
    },
    getELLIPSEC(obj){
        return {x:obj.x+obj.radiusX,y:obj.radiusY+obj.y}
    },
    getPOLYC(obj){
        return obj.points[0];
    }
    }