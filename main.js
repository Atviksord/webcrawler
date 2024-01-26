const { crawlPage, normalizeURL, getURLsFromHTML } = require('./crawl.js');
const { printReport } = require('./report.js');
async function main(){
const cliArguments = process.argv.slice(2)
if (cliArguments.length > 1 || cliArguments.length < 1){
    console.log('Invalid argument length')
    return
} 
else if(cliArguments.length == 1){
    console.log(`This is the baseURL starting opteration on: ${cliArguments[0]}`)
    const pages = {}
    let d = await crawlPage(cliArguments[0],cliArguments[0],pages)
    let f = printReport(d)
    console.log(f)
}
}

main()