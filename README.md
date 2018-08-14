# 项目依赖

node版本```6.10.0``` 以上，数据库是```MongoDB```

# 运行代码

```
    // step 1
    npm install //安装依赖
    // step 2 启动数据库
    sh ./db.sh
    // 确保本地有 ~/data/db 文件,若没有，则执行如下命令
    mkdir -p ~/data/db
    // step 3
    npm start // 启动项目
    cd client && npm start // 启动前端项目
```

# 目录结构

    |── client                                // 前端代码
    |── app                                   // 后端代码
    |   └── ...
    |── index.js                              // 后端启动入口文件




