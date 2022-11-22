const domain = process.env.REACT_APP_DOMAIN;
let token = localStorage.getItem("x-access-token");

let Api = () => { };
function request(params) {
    return new Promise(async (resolve, reject) => {
        // console.log(params);
        let res = await fetch(params.url, params.config).catch(res => ({
            ...res.response,
            error: res.message
        }));
        // console.log(res);

        if (res && (res.status >= 200 && res.status < 300)) {
            return resolve(res);
        }
        else if (res && res.status === 401) {
            let refreshToken = localStorage.getItem("x-refreshToken");
            if (token && refreshToken) {
                // console.log('accessToken:', token);
                // console.log('refreshToken:',refreshToken);
                let refresh = await fetch(`${domain}/refresh`, {
                    method: "POST",
                    body: JSON.stringify({
                        accessToken: token,
                        refreshToken: refreshToken
                    }),
                    headers:{
                        'Content-Type':'application/json'
                    }
                }).catch(res => ({
                    ...res.response,
                    error: res.message
                }));
                // console.log(refresh);
                if (refresh && refresh.status === 200) {
                    const data = await refresh.json();
                    token = data.newAccessToken;
                    console.log('token: ', token);
                    localStorage.setItem("x-access-token", token);
                    params.config.headers["x-access-token"] = token;
                    // params.headers.set["x-access-token"] = token;
                    return resolve(fetch(params.url, params.config));
                } else {
                    return reject(refresh);
                }

            } else {
                return reject(res);
            }
        }else{
            return reject(res);
        } 

    })
}

Api.shop = {
    login: function (params) {
        // console.log(params);
        const requestParams = {
            url: `${domain}/login`,
            config:
            {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        }
        return request(requestParams);
    },
    signup: function (params) {
        // console.log(params);
        const requestParams = {
            url: `${domain}/signup`,
            config:
            {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        }
        return request(requestParams);
    },
}

export default Api;