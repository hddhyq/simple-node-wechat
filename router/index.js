import MsgModel from '../models/message'
import UserModel from '../models/user'

export default function (app) {
  app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true); //可以带cookies
    res.header("X-Powered-By", '3.2.1')
    if (req.method == 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
  });

  app.get('/history', (req, res) => {
    MsgModel.find({}, function (err, doc) {
      if (err) {
        console.log('查询错误：' + err)
        res.send({
          code: 400,
          msg: '查询出错：'　 + err
        })
      } else if (!doc) {
        res.send({
          code: 200,
          status: '该群没有消息记录'
        })
        return
      } else {
        res.send({
          code: 200,
          status: '读取群消息成功',
          // msg: doc.sort({
          //   createTime: -1
          // })
          msg: doc
        })
        return
      }
    })
  })

  app.get('/login', (req, res) => {
    const username = req.query.username
    const useravatar = Math.ceil(Math.random()*10) + '.jpg'
    let user = new UserModel({
      name: username,
      avatar: useravatar
    })
    console.log(user)
    user.save((err, doc) => {
      if (err) {
        if (err.code === 11000) {
          res.send({
            code: 400
          })
        } else {
          res.send({
            code: 404
          })
        }
      } else {
        res.send({
          code: 200,
          user: doc
        })
      }
    })

  })

  app.listen(3001, () => {
    console.log('开启服务express于3001')
  })
}