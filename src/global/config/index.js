var ip = require('ip');

 let getIp = ip.address() // my ip address
//let getIp = '172.17.150.188' // my ip address
const ACCESS_POINT =  `http://${getIp}:9002`;
const ACCESS_POINT_PROD =  `http://${getIp}:9002`;

const Config = {
    // 0 => Devlopment env, 1 => Production env
    APP_MODE: 1,
    DEVELOPMENT: {        
        ACCESS_POINT:ACCESS_POINT
    },
    PRODUCTION: {
        
        ACCESS_POINT:ACCESS_POINT_PROD
    },
};

export default function getBaseUrl() {
    let config = {
        ACCESS_POINT:'',
    };

    if (Config.APP_MODE === 0) {
        config = {
            ...config,

            ACCESS_POINT:Config.DEVELOPMENT.ACCESS_POINT
        };
    } else {
        config = {
            ...config,
            ACCESS_POINT:Config.DEVELOPMENT.ACCESS_POINT
        };
    }

    return config;
}
