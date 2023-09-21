## 微信小程序接入PIGX 5.2 

最终效果：完成小程序端一键登录

- 1. 未绑定用户点击登录，重定向至绑定页面
- 2. 输入 sys_user 表中关联的手机号进行绑定
- 3. 绑定成功后重定向至登录页一键登录

## 本项目测试使用

### 1. 数据库插入小程序信息

```sql
INSERT INTO `pigxx`.`sys_social_details`(`id`, `type`, `remark`, `app_id`, `app_secret`, `redirect_url`, `ext`, `create_by`, `update_by`, `create_time`, `update_time`, `del_flag`, `tenant_id`) VALUES (1600713275467575297, 'MINI', '小程序', 'wx6832be859d0e1cf5', '6a93a55bbc56ae7f5808b0863aab820c', NULL, NULL, 'admin', ' ', '2022-12-08 12:45:59', '2022-12-08 04:45:59', '0', 1);
```

### 2. 运行本项目

- 使用 git clone 下载项目

```
git clone https://github.com/pig-mesh/pigx-mini-login.git
```

- 安装相关依赖

```
npm install
```

- 导入项目至微信开发者工具，并配置开发者工具

![1695306403](https://minio.pigx.top/oss/202309/1695306403.png)