const { JSDOM } = require('jsdom')


function normalizeURL(url) {
  if (url !== undefined && url !== null && typeof url == 'string') {
    let myURL
    try {
      myURL = new URL(url)
    } catch (_) {
      return null
    }
    let pathname = myURL.pathname
    if (pathname.endsWith('/')) {
      pathname = pathname.slice(0, -1)
    }
    return (`${myURL.host}${pathname}`)
  }

  else {
    return null
  }
}
function getURLsFromHTML(htmlBody, baseURL) {
  const dom = new JSDOM(htmlBody)
  const allLinks = dom.window.document.querySelectorAll('a')

  let allHrefs = []
  allLinks.forEach(link => {
    let href = link.getAttribute('href')
    if (href.startsWith('/')) {
      href = `${baseURL}${href}`

    }
    allHrefs.push(href)
  })
  return allHrefs

}
async function crawlPage(baseURL,currentURL,pages) {
  let response // for the async call
  const currentUrlObj = new URL(currentURL)
  const baseUrlObj = new URL(baseURL)

if(currentUrlObj.hostname !== baseUrlObj.hostname){ // check if we are on the same domain as the baseURL, if not return page count
  return pages
  
}
const normalizedCurrentUrl = normalizeURL(currentURL) // get a normalized version of the current link

if(pages[normalizedCurrentUrl]){
  pages[normalizedCurrentUrl]++
  return pages
}

// INIT since it doesnt exist yet
if(currentURL == baseURL){
  pages[normalizedCurrentUrl] = 0
}
else{
  pages[normalizedCurrentUrl] = 1
}



  try {
      console.log(`Crawling: ${currentURL}`)
      response = await fetch(currentURL, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': `text/html; charset=utf-8`
      }

    })
  } catch (error) {
    console.error(error.message)
    return pages
  }
  if (response.status > 399) {
    console.error(`error code over 400: ${response.status}`)
    return pages
  }
  else if (!response.headers.get('content-type').includes('text/html')) {
    console.error('Content type not html/text')
    return pages
  }
  else {
    //parse the HTML as text
    const html = await response.text()
    const allUrls =  getURLsFromHTML(html,baseURL)
    
      for (const nextURL of allUrls) {
        pages = await crawlPage(baseURL,nextURL,pages)
        
      }
      
       
    
    return pages
  }
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage
}