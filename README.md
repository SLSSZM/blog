## 博客源码介绍
点击网页的github头像可以跳转到源码地址
以下是各个文件夹的内容
### server
服务端（node，express，redis，mongodb）
运行项目步骤
``` js
1. yarn
2. yarn dev 或 yarn dev:w (需要安装nodemon)
```
默认跑在3005端口
服务端做了分账号功能，首次启动后访问
``` js
http://localhost:3005/api/admin/init
```
该接口会检测数据库中是否有账号，如果没有则会创建一个root权限的用户
默认账号 admin
默认密码 123456
如果已经有admin账号，则返回链接成功

------------------------------------

### admin
博客后台管理（vite，vue3，ts，elementui-plus，用户管理博客页面的文章，图片，留言等
运行项目步骤
``` js
yarn
运行
yarn dev
打包
yarn build
```
::: tip
  1. 同一个账号只允许登录一个网页，如果登录另一个设备将会被挤出
  2. 只有admin端才能修改密码和删除用户
	
:::
------------------------------------
### web 
这里存放的是博客项目（vite ssr，vue3，ts）
由于服务端分账号，所以需要获取账号id来获取不同的数据
运行前需要从后台管理的页面设置里面获取id，然后在web目录下创建.env
``` js
VITE_USER_ID=从后台管理获取到的id
VITE_API=http://localhost:3005/api/web
```
运行项目步骤
``` js
yarn
运行
yarn dev
打包
yarn build
打包预览
yarn serve
```
### miniapp
留言管理小程序（uniapp）
主要是快速查看留言和管理留言
暂定
