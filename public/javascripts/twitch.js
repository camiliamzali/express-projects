$(document).ready(function() {

    // empty array for streamer names

    var streams = [];

    // URL for my followed channels

    var channelurl = 'https://api.twitch.tv/kraken/users/vesera/follows/channels?oauth_token=sn83ufsmn07oyaxwbiccgcd62wnk51&client_id=93eqbor77cm7cszclukq06n2qlimuy'

    // get function to pick 15 streamers from my followed channels and push streamer names into the empty streams array

    $.get(channelurl, function(data) {
        var arrayLength = data.follows.length;
        for (count = 0; count <= 15; count++) {
            var streamername = data.follows[count].channel.display_name;
            streams.push(streamername);
        }


        // loop to create url for each streamer's status and info

        var increment = 0;
        console.log(streams);
        streams.forEach(function(streamer) {
            var streamurl = 'https://api.twitch.tv/kraken/streams/' + streamer + '?oauth_token=sn83ufsmn07oyaxwbiccgcd62wnk51&client_id=93eqbor77cm7cszclukq06n2qlimuy';


            // pulling status and logo from current streaming channels

            $.get(streamurl, function(streaminfo) {
                var status = streaminfo.stream;
                var statustext = '';

                // if statment for online/offline channels

                if (status == null) {
                  console.log(streamer, increment, status)

                } else {
                    increment++;

                    if (increment % 2 == 1) {
                        //  var addDark = true;
                        var classVar = 'darker';
                    } else {
                        //  var addDark = false;
                        var classVar = 'lighter';
                    }
                    statustext = streaminfo.stream.game;
                    var logo = streaminfo.stream.channel.logo;

                    $('.container').append(`
                    <div class="icon-box ${classVar}"><img class="logo" src=" ${logo}"></div>
                    <div class="main-box ${classVar}">${streamer} is playing ${streaminfo.stream.game}.</div>
                    <div class="status-box ${classVar}" style="color:#F8FDD2">Online</div>`);

                    console.log(streamer, increment, status);


                    // if (addDark == true) {
                    //   $('.icon-box, .main-box, .status-box').addClass('darker');
                    // } else {
                    //   $('.icon-box, .main-box, .status-box').addClass('lighter');
                    // }
                }
            });
        });
        // If streamer is offline, stream reads as null and displays no info. Created new URL to redirect to URL that has logo and other info.
        streams.forEach(function(streamer) {
            var streamurl = 'https://api.twitch.tv/kraken/streams/' + streamer + '?oauth_token=sn83ufsmn07oyaxwbiccgcd62wnk51&client_id=93eqbor77cm7cszclukq06n2qlimuy';



            // pulling status and logo from current streaming channels

            $.get(streamurl, function(streaminfo) {
                var status = streaminfo.stream;
                var statustext = '';

                if (status == null) {
                    increment++;

                    if (increment % 2 == 1) {
                        //  var addDark = true;
                        var classVar = 'darker';
                    } else {
                        //  var addDark = false;
                        var classVar = 'lighter';
                    }

                    var offlineurl = 'https://api.twitch.tv/kraken/channels/' + streamer + '?oauth_token=sn83ufsmn07oyaxwbiccgcd62wnk51&client_id=93eqbor77cm7cszclukq06n2qlimuy';


                    // Get function to pull logo from channel page in case offline

                    $.get(offlineurl, function(offlineinfo) {
                        var offlinelogo = offlineinfo.logo;

                        statustext = 'Offline';

                        $('.container').append(`<div class="icon-box ${classVar}"><img class="logo" src="${offlinelogo}"></div><div class="main-box ${classVar}">${streamer} is offline.</div><div class="status-box ${classVar}" style="color: #AC7FB5">${statustext}</div>`);

                        // if (addDark == true) {
                        //   $('.icon-box, .main-box, .status-box').addClass('darker');
                        // } else {
                        //   $('.icon-box, .main-box, .status-box').addClass('lighter');
                        // }
                        console.log(streamer, status, increment);
                    });
                }
            });
        });
    });


    // functionality for tabbed box

    $('.search-bar .input-text').on('click', function() {
        $(this).parent().addClass('active-search');
    });
    $('.search-bar .input-text').focusout(function() {
        $(this).parent().removeClass('active-search');
    });
    $('button').on('click', function() {
        $('button').removeClass('active');
        $(this).addClass('active');
    });
});
