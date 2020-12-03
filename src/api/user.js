import $http from '../utils/http.js'

// 国家编码
export function getCountriesCodeList(){
	return $http.get('/countries/code/list');
}
// 刷新登录
export function getLoginRefresh(){
	return $http.get('/login/refresh');
}
// 登录状态
export function getLoginStatus(){
	return $http.get('/login/status');
}
// 退出登录
export function getLogout(){
	return $http.get('/logout');
}
// 手机登录
export function postLoginByPhone({phone, password, countrycode, md5_password}){
	return $http.post('/login/cellphone', {
		phone,
		password,
		countrycode,
		md5_password
	});
}
// 邮箱登录
export function postLoginByEmail({email, password, md5_password}){
	return $http.post('/login', {
		email,
		password,
		md5_password
	});
}
// 修改绑定手机
export function postRebindPhone({oldcaptcha, captcha, phone, ctcode}){
	return $http.post('/rebind', {
		oldcaptcha,
		captcha,
		phone,
		ctcode
	});
}
// 检测手机号是否被注册
export function postCheckPhoneExistence(phone){
	return $http.post('/cellphone/existence/check', {
		phone
	});
}
// 发送验证码
export function postSentPhoneCaptcha(phone){
	return $http.post('/captcha/sent', {
		phone
	});
}
// 验证验证码
export function postVerifyPhoneCaptcha({phone, captcha, ctcode}){
	return $http.post('/captcha/verify', {
		phone,
		captcha,
		ctcode
	});
}

/* ===================== 用户详情 ================== */
// 用户等级（需要登录）
export function getUserLevel(){
	return $http.get('/user/level');
}
// 用户-喜欢
export function getLike({id,like}){
	return $http.get('/like', {
		params:{
			id,
			like
		},
	});
}
// 用户-喜欢列表
export function getLikeList(uid){
	return $http.get('/likelist?uid='+ uid);
}
// 用户-关注列表(需要登录)
export function getUserFollows({uid, limit, offset}){
	return $http.get('/user/follows', {
		params:{
			uid,        // 用户id
			limit,      // 返回数量，默认 30
			offset      // 偏移数量，用于分页
		},
	});
}
// 用户-粉丝列表(需要登录)
export function getUserFolloweds({uid, limit, lasttime}){
	return $http.get('/user/follows', {
		params:{
			uid,        // 用户id
			limit,      // 返回数量，默认 30
			lasttime    // 返回数据的lasttime，默认 -1，传入上一次返回结果的lasttime，将返回下一页数据
		},
	});
}

// 获取动态消息 -- 对应网页版朋友界面的各种动态消息
export function getEvent({pagesize, lasttime}){
	return $http.get('/event', {
		params:{
			pagesize,    // 每页数据，默认 20
			lasttime     // 返回数据的lasttime，默认 -1，传入上一次返回结果的lasttime，将返回下一页数据
		},
	});
}

/* =========================== 用户动态 =========================== */
// 获取用户动态
/* 返回的 type 对应值
 * 18 分享单曲
 * 19 分享专辑
 * 17、28 分享电台节目
 * 22 转发
 * 39 发布视频
 * 35、13 分享歌单
 * 24 分享专栏文章
 * 41、21 分享视频
 */
export function getUserEvent({uid, limit, lasttime}){
	return $http.get('/user/event', {
		params:{
			uid,        // 用户id
			limit,      // 返回数量，默认 30
			lasttime    // 返回数据的lasttime，默认 -1，传入上一次返回结果的lasttime，将返回下一页数据
		},
	});
}
// 用户-转发用户动态(需要登录)
export function getUserEventForward({uid, evId, forwards}){
	return $http.get('/event/forward', {
		params:{
			uid,        // 用户id
			evId,       // 动态id
			forwards    // 转发的评论
		},
	});
}
// 用户-删除用户动态(需要登录)
export function postUserEventDel(evId){
	return $http.post('/event/del', {
		evId        // 动态id
	});
}
// 用户-分析歌曲、歌单、MV、电台、电台节目到动态（需要登录）
export function postUserShareResource({id, type, msg}){
	return $http.post('/share/resource', {
		id,        // 资源id（歌曲、歌单、MV、电台、电台节目对应id）
		type,      // 资源类型，默认歌曲 song，可传 song, playlist, mv, djradio, djprogram
		msg        // 内容，140字限制，支持 Emoji，@用户名（/user/follows接口获取的用户名，用户名后和内容应该有空格），图片暂不支持
	});
}
// 用户-获取动态评论
export function getEventComment(threadId){
	return $http.get('/comment/event?threadId='+ threadId);
}
// 用户-关注/取消关注用户（需要登录）
export function postUserFollow({id, t}){
	return $http.post('/follow', {
		id,        // 用户id
		t          // 1为关注，其他为取消关注
	});
}
// 用户-播放记录（需要登录）
export function getUserRecord({uid, type}){
	return $http.get('/user/record', {
		params:{
			uid,        // 用户id
			type        // type = 1时只返回weekdata, type = 0 时返回 allData
		},
	});
}

// 用户详情
export function getUserDetail(uid){
	return $http.get('/user/detail?uid='+ uid);
}
// 用户信息（歌单、收藏、MV、DJ数量）（需要登录）
export function getUserSubCount(){
	return $http.get('/user/subcount');
}
// 用户账号信息（需要登录）
export function getUserAccount(){
	return $http.get('/user/account');
}
// 用户账号信息（需要登录）
export function getUserBinding(uid){
	return $http.get('/user/binding?uid='+ uid);
}
// 用户-更换绑定手机（需要登录）
export function postUserReplacePhone({phone, oldcaptcha, captcha, countrycode}){
	return $http.post('/user/replacephone', {
		phone,
		oldcaptcha,
		captcha,
		countrycode
	});
}
// 用户-更换用户信息（需要登录）
export function postUserUpdate({gender, birthday, nickname, province, city, signature}){
	return $http.post('/user/update', {
		gender,
		birthday,
		nickname,
		province,
		city,
		signature
	});
}
// 用户-更换用户信息（需要登录）
// https://github.com/Binaryify/NeteaseCloudMusicApi/blob/master/public/avatar_update.html
export function postUserAvatar({imgSize, imgX, imgY}){
	return $http.post('/avatar/upload', {
		imgSize,
		imgX,      // 水平裁剪偏移，方形图片可不传，默认为 0 
		imgY       // 水平裁剪偏移，方形图片可不传，默认为 0 
	});
}

// 心动模式/智能播放（需要登录）
export function getPlaymodeIntelligenceList({pid, sid}){
	return $http.get('/playmode/intelligence/list', {
		params:{
			pid,        // 歌曲id
			sid         // 要开始播放的歌曲id
		},
	});
}

/* ============================ 用户歌单 ============================ */
// 用户-获取用户歌单
export function getUserPlaylist({uid, limit, offset}){
	return $http.get('/user/playlist', {
		params:{
			uid,
			limit,
			offset
		},
	});
}
// 用户-更新用户歌单（需要登录）
export function postUserPlaylistUpdate({id, name, desc, tags}){
	return $http.post('/playlist/update', {
		id,        // 歌单id
		name,      // 歌单的名字
		desc,      // 歌单描述
		tags       // 歌单tag，多个用';'隔开，只能用官方标签
	});
}
// 用户-更新歌单名称（需要登录）
export function postUserPlaylistNameUpdate({id, name}){
	return $http.post('/playlist/name/update', {
		id,        // 歌单id
		name       // 歌单的名字
	});
}
// 用户-更新歌单描述（需要登录）
export function postUserPlaylistDescUpdate({id, desc}){
	return $http.post('/playlist/desc/update', {
		id,        // 歌单id
		desc       // 歌单描述
	});
}
// 用户-更新歌单标签（需要登录）
export function postUserPlaylistTagsUpdate({id, tags}){
	return $http.post('/playlist/tags/update', {
		id,        // 歌单id
		tags       // 歌单tag，多个用';'隔开，只能用官方标签
	});
}
// 用户-上传歌单封面（需要登录）
export function postUserPlaylistCoverUpdate({id, imgSize, imgX, imgY}){
	return $http.post('/playlist/cover/update', {
		id,        // 歌单id
		imgSize,   // 图片尺寸，默认 300
		imgX,      // 水平裁剪偏移，方形图片可不传，默认为 0 
		imgY       // 水平裁剪偏移，方形图片可不传，默认为 0 
	});
}
// 用户-调整歌单顺序（需要登录）
export function postUserPlaylistOrderUpdate(ids){
	return $http.post('/playlist/order/update?ids='+ ids);
}
// 用户-调整歌曲顺序（需要登录）
export function postUserPlaylistSongOrderUpdate({pid, ids}){
	return $http.post('/song/order/update', {
		pid,        // 歌单id
		ids         // 歌曲id列表
	});
}

/* =================== 电台相关 =========================== */
// 用户-创建的电台
export function getUserAudio(uid){
	return $http.get('/user/audio?uid='+uid)
}
// 用户-获取用户电台
export function getUserDJ(uid){
	return $http.get('/user/dj?uid='+uid)
}

/* =================== 云盘相关 =========================== */
// 用户-云盘
export function getUserCloud({limit,offset}){
	return $http.get('/user/cloud', {
		params:{
			limit,
			offset
		},
	});
}
// 用户-云盘详情
export function getUserCloudDetail(id){
	return $http.get('/user/cloud/detail?id='+ id);
}
// 用户-云盘删除
export function getUserCloudDel(id){
	return $http.get('/user/cloud/del?id='+ id);
}