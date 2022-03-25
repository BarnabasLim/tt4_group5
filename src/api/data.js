
/**
 * 
 * @param {} query 
 * @param {Function} onSuccess 
 * @param {Function} onError 
 * @returns 
 */
export const db_algolia_async_fetch=async(query,onSuccess,onError)=>{
    try {
        const response = await fetch(`http://hn.algolia.com/api/v1/search?query=${query}`)
        const result = await response.json()
        console.log(result)
        return onSuccess(result)
      } catch (err) {
        //console.error("ERR",err)
        return onError(err)
      }
};


export const db_algolia_promise_fetch=(query,onSuccess,onError)=>{
    fetch(`http://hn.algolia.com/api/v1/search?query=${query}`)
    .then((response)=>{return response.json()})
    .then((result)=>onSuccess(result))
    .catch((err)=>{
        console.error("ERR",err)
        onError(err)
    })
};

// export const db_createAccount = (credentials, onSuccess, onError) => {
//     try {
//         db.collection("users").doc(credentials.uid).set(credentials);
//         return onSuccess();
//     } catch (error) {
//         return onError(error);
//     }
// }