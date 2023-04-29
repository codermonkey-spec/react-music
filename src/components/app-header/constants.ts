export const loginWayUrl = {
  WECHAT:
    "https://open.weixin.qq.com/connect/qrconnect?appid=wxe280063f5fb2528a&response_type=code&redirect_uri=https://music.163.com/back/weichat&X-loginMethod=WeChat&forcelogin=true&scope=snsapi_login&state=jOrrNDQHIQ&checkToken=9ca17ae2e6ffcda170e2e6eeacd03fb89c98d2e243b1eb8ba2d84f979b8bb0c56fb69d8aa5d639818dbeb5c72af0feaec3b92ab095acd1e63a9291aa96cd4b968b9fa3c85aa68e85d8c64a8899c0add161a88cee9e&lang=zh_CN#wechat_redirect",
  QQ: "https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=100495085&response_type=code&redirect_uri=https://music.163.com/back/qq&X-loginMethod=QQ&forcelogin=true&state=YqzaYjkLLy&checkToken=9ca17ae2e6ffcda170e2e6eeacd03fb89c98d2e243b1eb8ba2d84f979b8bb0c56fb69d8aa5d639818dbeb5c72af0feaec3b92a8299c0a6cd528cab87a7dc5f969b9ea7c14f948eaf96d25e85868fd2c973edb8ee9e",
  WEIBO:
    "https://api.weibo.com/oauth2/authorize?client_id=301575942&response_type=code&redirect_uri=http://music.163.com/back/weibo&X-loginMethod=Weibo&forcelogin=true&scope=friendships_groups_read,statuses_to_me_read,follow_app_official_microblog&state=NnCGgvgWkT&checkToken=9ca17ae2e6ffcda170e2e6eeacd03fb89c98d2e243b1eb8ba2d84f979b8bb0c56fb69d8aa5d639818dbeb5c72af0feaec3b92ab88b9785f73d91b4e1dad95e969e9bb7c55e8d9f8193d24b918683ade76bf1e9ee9e###",
};

export const qrCodeImg =
  "https://p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/9656441793/9f07/c197/3af2/f07b8d6ef20964be159ce812841fc9d2.png";

export enum LOGINWAY {
  default = 0, // 默认登录方式
  other = 1, // 其他登录方式
  email = 2, // 邮箱登录
}
