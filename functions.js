name = "/samples/usesample01.pdf";
names = ["/samples/usesample01.pdf", "/samples/usesample02.pdf", "/samples/usesample03.pdf"];

finalData = {};

$(document).ready(function() {

    for (var i=0; i<names.length; i++) {
        parse_content(names[i], []);
    }

});

var parse_content = function(content, keywords){

    PDFJS.workerSrc = 'build/pdf.worker.js';
    PDFJS.cMapUrl = 'https://mozilla.github.io/pdf.js/web/cmaps/';
    PDFJS.cMapPacked = true;

    PDFJS.getDocument(content).then(pdf_table_extractor).then(function(result) {

        for (var i=1; i<result.pageTables[0].tables.length; i++) {
            
            if (finalData[result.pageTables[0].tables[i][0]]) {
                finalData[result.pageTables[0].tables[i][0]].push(result.pageTables[0].tables[i][1])
            } else {
                finalData[result.pageTables[0].tables[i][0]] = [result.pageTables[0].tables[i][1]]
            }

            keywords.push(result.pageTables[0].tables[i][0]);
        }

    });

};