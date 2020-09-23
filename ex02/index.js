// 暗号：排序
module.exports.compose = middlewares => {
    return function () {
        return dispatch(0)
        function dispatch(i) {
            const fn = middlewares[i];
            if(!fn){
                return Promise.resolve()
            }else{
                return Promise.resolve(
                    fn(function(){
                        dispatch(i+1)
                    })
                )
            }
        }
    }
}
