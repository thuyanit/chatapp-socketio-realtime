const moment = require('moment');
module.exports.generateMessage = (from, content) =>{
    return {
        from,
        content,
        createdAt: moment().format('h:mm a')
    }
}

module.exports.generateLocation = (from, lat, lng) =>{

    return {
        from,
        lat,
        lng,
        createdAt: moment().format('h:mm a')
    }
}