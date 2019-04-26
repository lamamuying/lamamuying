import http from './interface'

export const getArticle = (data) => {
	return http.request({
		url: 'article/testArticle',
		method:'POST',
		data
	});
}

// 轮播图
export const banner = (data) => {
    return http.request({
        url: '/banner/getBanner',
        method: 'GET', 
        data,
		// handle:true
    })
}

export default {
	getArticle,
    banner
}