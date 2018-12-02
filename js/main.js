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


    states = [];

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


    keyword = "Sex Ratio";
    keyword = keyword.trim();
    chartData = [
        ['Year', keyword]
    ];

    console.log(data);

    // for(i=1; i<data.keys().length-1; i++){
      for (key in data) {

        console.log(key);
        
        if(key.trim() == keyword){

            chartData.push(['2006', parseInt(data[key.trim()][1]) ]);
            chartData.push(['2007', parseInt(data[key.trim()][2]) ]);
            chartData.push(['2008', parseInt(data[key.trim()][3]) ]);
            
            console.log(data[key]);

            break;
        }

    }

 

});


function stuff(keyword) {
// keyword = "Sex Ratio";


      ax = 0;
      axx = 0;


    // if(typeof(myData[keyword])!=undefined){
      if (keyword in myData) {
  
      keyword = keyword.trim();

      chartData = [
          ['Year', keyword]
      ];

      console.log(myData);

      // for(i=1; i<data.keys().length-1; i++){
        for (key in myData) {

          console.log(key);
          
          if(key.trim() == keyword){

              // chartData.push(['2006', parseInt(myData[key][0].trim()) ]);
              // chartData.push(['2007', parseInt(myData[key][1].trim()) ]);
              // chartData.push(['2008', parseInt(myData[key][2].trim()) ]);

              for (var x = 0; x < myData[key].length; x ++) {
                chartData.push([""+(2005+x), parseInt(myData[key][x].trim()) ]);
                ax += parseInt(myData[key][x].trim());
                axx += (parseInt(myData[key][x].trim()) * parseInt(myData[key][x].trim()));
              }

              var average = ax / myData[key].length;
              var variance = (axx/myData[key].length) / average*average;


              
              console.log(myData[key]);

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

      $(".xi").html("<strong>Average: </strong> <span>" + average.toFixed(2) + "</span> <strong>Standard Deviation: </strong> <span>" + Math.sqrt(variance).toFixed(2) + "</span>");


    }

}


$("#q").on("keydown", function(e){

  if( e.key === 'Enter'){
    stuff( $(this).val() );
  }

});


$("#q").on("focus", function(){

  $("body").addClass("show-results");

});