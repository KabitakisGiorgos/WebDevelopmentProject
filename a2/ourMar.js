function ourMap(array){
    var originalArr=array;
    var currentArr=array;
    return (function mapWithCallback(fn,callback){
        if(typeof fn!=='function') return currentArr;
        currentArr=currentArr.map(fn);
        if(typeof callback==='function') callback.call(currentArr,array);
        return mapWithCallback;
    })
}