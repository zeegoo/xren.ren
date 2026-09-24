// Cloudflare Worker - 反向代理 GitHub Pages
// 把 xren.ren 的请求代理到 zeegoo.github.io/xren.ren/

const UPSTREAM = 'zeegoo.github.io'
const BASE_PATH = '/xren.ren'

export default {
  async fetch(request) {
    const url = new URL(request.url)
    const upstreamUrl = `https://${UPSTREAM}${BASE_PATH}${url.pathname}${url.search}`

    const headers = new Headers(request.headers)
    headers.set('Host', UPSTREAM)

    const response = await fetch(upstreamUrl, {
      method: request.method,
      headers,
      body: request.method === 'GET' || request.method === 'HEAD' ? undefined : request.body,
      redirect: 'manual'
    })

    // 重写 Location 头，去掉 GitHub Pages 子路径
    const respHeaders = new Headers(response.headers)
    const location = respHeaders.get('Location')
    if (location) {
      const newLocation = location.replace(`https://${UPSTREAM}${BASE_PATH}`, '')
        .replace(`http://${UPSTREAM}${BASE_PATH}`, '')
      respHeaders.set('Location', newLocation)
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: respHeaders
    })
  }
}
