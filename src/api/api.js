/*
 * @Author: Isteyft 14056025+isteyft@user.noreply.gitee.com
 * @Date: 2024-09-24 11:06:59
 * @LastEditors: Isteyft 14056025+isteyft@user.noreply.gitee.com
 * @LastEditTime: 2024-10-01 17:54:45
 * @FilePath: \Isteyft-Boke\src\api\api.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import http from "@/utils/request"
//登录
export const loginAPI = ({username, password}) => {
  return http({
    url: '/v1/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
}
//获取置顶博客
export const GetTopAPI = () => {
  return http({
    url: '/v1/boke/zd',
    method: 'GET'
  })
}
//获取博客
export const GetBokeAPI = (params) => {
  return http({
    url: '/v1/boke/bokes',
    method: 'GET',
    params
  })
}
//获取博客tag
export const GetBokeByTagAPI = (params) => {
  return http({
    url: '/v1/boke/bokestag',
    method: 'GET',
    params
  })
}
//根据id获取
export const GetBokeIdAPI = (id) => {
  return http({
    url: '/v1/boke/id',
    method: 'GET',
    params: {
      id: id
    }
  })
}
//上传博客
export const UploadBokeAPI = (params) => {
  return http({
    url: '/v2/boke/upload',
    method: 'POST',
    data: params
  })
}
//更新博客
export const UpdateBokeAPI = (formData) => {
  return http({
    url: '/v2/boke/update',
    method: 'PUT',
    data: formData
  })
}
//删除博客
export const DelBokeAPI = (delId) => {
  return http({
    url: '/v2/boke/sc',
    method: 'DELETE',
    params: {
      bokeId: delId
    }
  })
}
//获取评论
export const GetBokePlAPI = (bokeId) => {
  return http({
    url: '/v1/boke/pl',
    method: 'GET',
    params: {
      bokeId: bokeId
    }
  })
}
//获取所有评论
export const GetPlAPI = (params) => {
  return http({
    url: '/v2/boke/pls',
    method: 'GET',
    params
  })
}
//上传评论
export const UploadPlAPI = (formData) => {
  return http({
    url: '/v1/boke/uploadpl',
    method: 'POST',
    data: formData
  })
}
//更新评论
export const UpdatePlAPI = (formData) => {
  return http({
    url: '/v2/boke/updatepl',
    method: 'PUT',
    data: formData
  })
}
//删除评论
export const DelPlAPI = (delId) => {
  return http({
    url: '/v2/boke/scpl',
    method: 'DELETE',
    params: {
      plid: delId
    }
  })
}
//获取图片
export const GetImageAPI = (params) => {
  return http({
    url: '/v1/wp/wallpapers',
    method: 'GET',
    params
  })
}
//上传图片
export const UploadImageAPI = (formData) => {
  return http({
    url: '/v2/wp/upload',
    method: 'POST',
    params: formData
  })
}
//更新图片
export const UpdateImageAPI = (formData) => {
  return http({
    url: '/v2/wp/update',
    method: 'PUT',
    params: formData
  })
}
//删除图片
export const DelImageAPI = (delId) => {
  return http({
    url: '/v2/wp/sc',
    method: 'DELETE',
    params: {
      wallpaperId: delId
    }
  })
}