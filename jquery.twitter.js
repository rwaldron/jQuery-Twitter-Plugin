;(function ($) {
  /*
   * Twitter Search Plugin jquery.twitter.js
   * http://code.bocoup.com/jquery-twitter-plugin/
   *
   * Copyright (c) 2010 Bocoup, LLC
   * Authors: Boaz Sender, Nick Cammarata, Rick Waldron
   * Dual licensed under the MIT and GPL licenses.
   * http://code.bocoup.com/license/
   *
   * JavaScript Linkify - v0.3 - 6/27/2009
   * http://benalman.com/projects/javascript-linkify/
   * 
   * Copyright (c) 2009 "Cowboy" Ben Alman
   * Dual licensed under the MIT and GPL licenses.
   * http://benalman.com/about/license/
   * 
   * Some regexps adapted from http://userscripts.org/scripts/review/7122
   */
  var opts = {
        limit        : 7,     // Number of tweets to get <-- not in twitter api, maps to and superseeds rpp (results per page)
        exclusions   : '',    // Strings to exclude <-- not in twitter api, done in plugin
        notFoundText : 'No results found on twitter',    // Text to display if no results are found <-- not in twitter api, done in plugin
        replies      : true,  // Include replies? <-- not in twitter api, done in plugin
        retweets     : true,  // Include replies? <-- not in twitter api, done in plugin
        ands    : '', // All of these words  
        phrase  : '', // This exact phrase 
        ors     : '', // Any of these words  
        nots    : '', // None of these words 
        tag     : '', // This hashtag  
        lang    : '', // Written in language
        from    : '', // From this person  
        to      : '', // To this person  
        ref     : '', // Referencing this person 
        near    : '', // Near this place 
        within  : '', // Within this distance
        units   : '', // Distance unit (miles or kilometers)
        since   : '', // Since this date  
        until   : '', // Until this date  
        tude    : '', // Attitude: '?' or ':)' or ':)'
        filter  : '', // Containing: 'links'
        include : '', // Include retweet?: 'retweets'
        rpp     : 5,
        q       : ''   // Results per page
      },
      linkify   = (function(){var k="[a-z\\d.-]+://",h="(?:(?:[0-9]|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}(?:[0-9]|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])",c="(?:(?:[^\\s!@#$%^&*()_=+[\\]{}\\\\|;:'\",.<>/?]+)\\.)+",n="(?:ac|ad|aero|ae|af|ag|ai|al|am|an|ao|aq|arpa|ar|asia|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|biz|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|cat|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|coop|com|co|cr|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|edu|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gov|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|info|int|in|io|iq|ir|is|it|je|jm|jobs|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mil|mk|ml|mm|mn|mobi|mo|mp|mq|mr|ms|mt|museum|mu|mv|mw|mx|my|mz|name|na|nc|net|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|org|pa|pe|pf|pg|ph|pk|pl|pm|pn|pro|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tel|tf|tg|th|tj|tk|tl|tm|tn|to|tp|travel|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|xn--0zwm56d|xn--11b5bs3a9aj6g|xn--80akhbyknj4f|xn--9t4b11yi5a|xn--deba0ad|xn--g6w251d|xn--hgbk6aj7f53bba|xn--hlcj6aya9esc7a|xn--jxalpdlp|xn--kgbechtv|xn--zckzah|ye|yt|yu|za|zm|zw)",f="(?:"+c+n+"|"+h+")",o="(?:[;/][^#?<>\\s]*)?",e="(?:\\?[^#<>\\s]*)?(?:#[^<>\\s]*)?",d="\\b"+k+"[^<>\\s]+",a="\\b"+f+o+e+"(?!\\w)",m="mailto:",j="(?:"+m+")?[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@"+f+e+"(?!\\w)",l=new RegExp("(?:"+d+"|"+a+"|"+j+")","ig"),g=new RegExp("^"+k,"i"),b={"'":"`",">":"<",")":"(","]":"[","}":"{","B;":"B+","b:":"b9"},i={callback:function(q,p){return p?'<a href="'+p+'" title="'+p+'">'+q+"</a>":q},punct_regexp:/(?:[!?.,:;'"]|(?:&|&amp;)(?:lt|gt|quot|apos|raquo|laquo|rsaquo|lsaquo);)$/};return function(u,z){z=z||{};var w,v,A,p,x="",t=[],s,E,C,y,q,D,B,r;for(v in i){if(z[v]===undefined){z[v]=i[v]}}while(w=l.exec(u)){A=w[0];E=l.lastIndex;C=E-A.length;if(/[\/:]/.test(u.charAt(C-1))){continue}do{y=A;r=A.substr(-1);B=b[r];if(B){q=A.match(new RegExp("\\"+B+"(?!$)","g"));D=A.match(new RegExp("\\"+r,"g"));if((q?q.length:0)<(D?D.length:0)){A=A.substr(0,A.length-1);E--}}if(z.punct_regexp){A=A.replace(z.punct_regexp,function(F){E-=F.length;return""})}}while(A.length&&A!==y);p=A;if(!g.test(p)){p=(p.indexOf("@")!==-1?(!p.indexOf(m)?"":m):!p.indexOf("irc.")?"irc://":!p.indexOf("ftp.")?"ftp://":"http://")+p}if(s!=C){t.push([u.slice(s,C)]);s=E}t.push([A,p])}t.push([u.substr(s)]);for(v=0;v<t.length;v++){x+=z.callback.apply(window,t[v])}return x||u}})(),
      mention   = function(str) {
        return str.replace(/[@]+[A-Za-z0-9-_]+/ig, function(username) {
          return username.link('http://twitter.com/'+ username.replace('@','') );
        });
      },
      hashtags  = function(str) {
        return str.replace(/[#]+[A-Za-z0-9-_]+/ig, function(tag) {
          return tag.link('http://search.twitter.com/search?q='+tag.replace('#','%23'));
        });
      };
      
  $.fn.twitter = function (options) {
    
    if ( !options ) {
      return this;
    }
  
  
    // Set a temporary default query object
    var query,
        exclusionsExp = new RegExp(false);
    
    // If options is a string use it as username
    if(typeof options == 'string'){
      query = $.extend({}, opts, {
        q: options
      });
    } else {
      // If a limit is set, add it to the query object
      options.rpp = options.limit ? options.limit : options.rpp;

      // If there are exlusions, turn them into a regex to use later
      exclusionsStr = options.exclusions ? options.exclusions.replace(' ', '|') : false;
      exclusionsExp = exclusionsStr ? new RegExp(exclusionsStr) : false;


      // Merge temp query it with the default options
      query = $.extend({}, opts, options);

      // If there are exclusions, multiply the results to ask for from twitter by ten
      // We need to do this so that we have some meat to work with if the exclusions are common
      query.rpp = query.exclusions || !query.replies || !query.retweets  ? (options.rpp * 10) : options.rpp;      
    }
    
    return this.each(function () {
      
      
      
      // Cache `this`
      var $this = $(this);
      
      // Call Twitter JSONP
      $.getJSON('http://search.twitter.com/search.json?'+$.param(query)+'&callback=?', function(tweets){ 

        //Create and cache a new UL
        var $tweets   = $('<ul>'), 
            limitInt  = 0;
        
        // If there are results to work with 
        if (tweets.results && tweets.results.length) {

          //  Iterate over returned tweets
          for(var i in tweets.results){

            // Cache tweet content
            var tweet         = tweets.results[i],
                // Set a variable to determine weather replies are set to false, and if so, weather the tweet starts with a reply
                allowReply    = !query.replies && tweet.to_user_id ? false : true,
                // Set a variable to determine weather retweets are set to false, and if so, weather the tweet starts with a retweet
                allowRetweet  = !query.retweets && tweet.text.slice(0,2) == 'RT' ? false : true;
            
            // Only proceed if allow reply is false
            if (!allowReply) {
              continue;
            }

            // Only proceed if allow retweet is false
            if (!allowRetweet) {
              continue;
            }

            // If exlusions set and none of the exlusions is found in the tweet then add it to the DOM
            if ( exclusionsExp && exclusionsExp.test(tweet.text) ) {
              continue;
            }  

            // Create and cache new LI
            $('<li/>', {
              className : 'tweet'
            })
            // Make the avatar, and append it to the $tweet
            .append($('<a/>', {
              href: 'http://twitter.com/' + tweet.from_user,
              html: '<img src="' + tweet.profile_image_url + '"/>'
            }))
            // Make the tweet text, and append it to the $tweet, then to the parent
            .append($('<span>', {
              className: 'content',
              html: '<a href="http://twitter.com/' + tweet.from_user + '">@' + tweet.from_user + '</a>: ' + mention(hashtags(linkify(tweet.text)))
            }))
            // Append tweet to the $tweets ul
            .appendTo($tweets);
            
            limitInt++;            
            
            if ( limitInt === options.rpp ) {
              break;
            }
          }
          
          // Append the $tweets to the DOM
          $this.html($tweets);
        
        // Else there are no results to work with  
        } else {
          // Update the DOM to reflect that no results were found
          $this.html($('<h3/>', {
            className: 'twitter-notFound',
            text: query.notFoundText
          }));
        }
      });
    });
  };
})(jQuery);