module.exports = (req, res, next) => {
    if (req.method === 'POST' && req.path === '/login') {
        if (req.body.username === 'ay' && req.body.password === '123456') {
            return res.status(200).json({
                token: '123',
                name: 'ay',
                id: 520,
                email: '1401577609@qq.com',
                organization: '上海'
            })
        } else {
            return res.status(400).json({
                message: '用户名或密码错误'
            })
        }
    } else if (req.method === 'POST' && req.path === '/register') {
        return res.status(200).json({
            user: {
                token: '123',
                username: 'ay'
            }
        })
    } else if (req.method === 'GET' && req.path === '/project') {
        console.log(JSON.stringify(req))
    }
    next()
}