function printReport(pages){
    console.log('The report is starting')
    const sortedpages = sortPages(pages)

    for (const page of sortedpages) {
        console.log(`Found ${page[1]} internal links to ${page[0]}`)
        console.log('-----------------------------------------')
        
    }
}
function sortPages(pages) {

    let pagesArray = Object.entries(pages);
    pagesArray.sort((a, b) => b[1] - a[1]);
    
    return pagesArray;
}

module.exports = {
    printReport,
    sortPages
  }