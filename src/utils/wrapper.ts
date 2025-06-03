function response(ctx:string, context:any, result:any) {
    const {set} = context;
    const data = result.data || '';
    const code = result.code || 200;
    const status = code == 200 ? true : false;
    const messageRes = result.response;
    if (code) set.status = code 
    return {
        status,
        code,
        message: messageRes,
        data
    }
};
export default { response };