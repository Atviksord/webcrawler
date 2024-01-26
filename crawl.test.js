const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')
const { getURLsFromHTML } = require('./crawl.js')


function TestingUrl(url) {
    return normalizeURL(url)
}
function TestinggetURLsFromHTML(htmlbody,baseURL){
    return getURLsFromHTML(htmlbody,baseURL)
}
////////////////////////////////////////////////////// TEST CASES FOR NORMALIZE URL
test('https://blog.boot.dev/path/', () => {
    expect(TestingUrl('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
});
test('https://blog.boot.dev/path', () => {
    expect(TestingUrl('https://blog.boot.dev/path')).toBe('blog.boot.dev/path');
});
test('http://blog.boot.dev/path/', () => {
    expect(TestingUrl('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
});
test('http://blog.boot.dev/path', () => {
    expect(TestingUrl('http://blog.boot.dev')).toBe('blog.boot.dev');
});
test('5', () => {
    expect(TestingUrl('5')).toBe(null);
});

test(5, () => {
    expect(TestingUrl(5)).toBe(null);
});
test('null testing', () => {
    expect(TestingUrl(null)).toBe(null);
});
test('testing undefined', () => {
    expect(TestingUrl(undefined)).toBe(null);
  });

//////////////////////////////////////////////////// TEST CASES FOR GETTING URLS FROM HTML
let htmlbody = 
`<html>
<body>
    <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
    <a href="https://blog.boot.dev"><span>Go to Boot.devyyy</span></a>
    <a href="http://blog.boot.dev"><span>Go to Boot.devOPS</span></a>
</body>
</html>`
let htmlbody2 = 
`<html>
<body>
    <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
    <a href="https://blog.boot.dev"><span>Go to Boot.devyyy</span></a>
    <a href="/path/store"><span>Go to Boot.devOPS</span></a>
</body>
</html>`
let baseURL = 'blog.boot.dev'
let expectedOutput = ["https://blog.boot.dev", "https://blog.boot.dev", "http://blog.boot.dev"];
let expectedOutput2 =["https://blog.boot.dev", "https://blog.boot.dev", "blog.boot.dev/path/store"]

test('Testing HTMLBODY', () => {
    expect(TestinggetURLsFromHTML(htmlbody,baseURL)).toEqual(expectedOutput);
  });
  test('Testing Partial path', () => {
    expect(TestinggetURLsFromHTML(htmlbody2,baseURL)).toEqual(expectedOutput2);
  });

