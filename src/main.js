const $siteList = $('.globalMain')
const $lastList = $siteList.find('.addButton')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    {url: 'https://developer.mozilla.org/zh-CN/'},
    {url: "https://www.w3.org/Style/CSS/specs.en.html"},
    {url: "https://jquery.com/"},
    {url: "https://datatracker.ietf.org/doc/html/rfc7540"},
]
const simpleUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
}

const building = () => {
    $siteList.find('div').remove()
    hashMap.forEach((node, index) => {
        const $div = $(`<div>
                <div class="site">
                <div class="logo">${simpleUrl(node.url)[0].toUpperCase()}</div>
                <div class="link">${simpleUrl(node.url)}</div>
                <div class="close">
                <svg class="icon3" aria-hidden="true">
                    <use xlink:href="#icon-chahao"></use>
               </svg>
               </div>
                </div>
        </div>`).insertBefore($lastList)
        $div.on('click', () => {
            window.open(node.url)
        })
        $div.on('click', '.close', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            building()
        })
    })
}


building()

$('.addButton')
    .on('click', () => {
        let url = window.prompt('请输入您想要添加的网址')
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        hashMap.push({
            logo: simpleUrl(url)[0].toUpperCase(),
            url: url
        });
        building()
    });

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}
