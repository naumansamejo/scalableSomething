name = "/samples/usesample01.pdf";
names = ["/samples/usesample01.pdf", "/samples/usesample02.pdf", "/samples/usesample03.pdf", "/samples/usesample04.pdf", "/samples/usesample05.pdf"];

myData = {};

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
            
            if (myData[result.pageTables[0].tables[i][0].trim()]) {
                myData[result.pageTables[0].tables[i][0].trim()].push(result.pageTables[0].tables[i][1].trim());
            } else {
                myData[result.pageTables[0].tables[i][0].trim()] = [result.pageTables[0].tables[i][1].trim()];
            }

            if (!(states.includes(result.pageTables[0].tables[i][0].trim()))) {
                states.push(result.pageTables[0].tables[i][0].trim());   
            }
        }

    });

};