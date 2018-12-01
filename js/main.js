$(function(){


var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
      var matches, substringRegex;
  
      // an array that will be populated with substring matches
      matches = [];
  
      // regex used to determine if a string contains the substring `q`
      substrRegex = new RegExp(q, 'i');
  
      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array
      $.each(strs, function(i, str) {
        if (substrRegex.test(str)) {
          matches.push(str);
        }
      });
  
      cb(matches);
    };
  };

    var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
    'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
    'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
    'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ];

    $('.typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    },
    {
        name: 'states',
        source: substringMatcher(states)
    });

});


$(window).on("load", function(){
    data = {"pageTables":[{"page":2,"tables":[["DEMOGRAPHIC INDICATORS ","PDS-2007 ","PDS-2006 "],["Sex Ratio ","105 ","106 "],["Crude Birth Rate (CBR) ","25.6 ","25.9 "],["General Fertility Rate (GFR) ","108.0 ","108.8 "],["Total Fertility Rate ","3.7 ","3.7 "],["Crude Death Rate (CDR) ","6.8 ","7.0 "],["Infant Mortality Rate (IMR)  ","75.2 ","76.2 "],["Maternal Mortality Rate ","254 ","318 "],["Natural Growth Rate ","1.88 ","1.89 "],["Life Expectancy at Birth \n                           Male    (Years) \n                           Female (Years) "," \n64 \n68 "," \n64 \n67 "]],"merges":{},"merge_alias":{},"width":3,"height":10}],"numPages":2,"currentPages":2}

    data = data.pageTables[0].tables;


    keyword = "Sex Ratio";
    keyword = keyword.trim();
    chartData = [
        ['Year', keyword]
    ];

    for(i=1; i<data.length-1; i++){
        
        if(data[i][0].trim() == keyword){
            chartData.push(['2006', parseInt(data[i][1]) ]);
            chartData.push(['2007', parseInt(data[i][2])  ]);
            chartData.push(['2008',parseInt(data[i][3]) ]);
            
            break;
        }

    }

 

    var data = google.visualization.arrayToDataTable(chartData);

    var options = {
    title: keyword,
    legend: { position: 'bottom' }
    };

    chart = new google.visualization.LineChart(document.getElementById('chart_div'));

    chart.draw(data, options);

});