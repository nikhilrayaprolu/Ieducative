  var isVideo=1;
  var serverAddress='http://localhost:8095';  // Please  change 61.152.239.56 to signaling server's address.
  var p2p=new Woogeen.PeerClient({
    iceServers : [ {
      urls : "stun:61.152.239.60"
    }, {
      urls : ["turn:61.152.239.60:4478?transport=udp","turn:61.152.239.60:443?transport=udp","turn:61.152.239.60:4478?transport=tcp","turn:61.152.239.60:443?transport=tcp"],
      credential : "master",
      username : "woogeen"
    } ]
  });  // Initialize a Peer object
  var localStream;
  var localScreen;
  var getTargetId=function(){
    return $('#target-uid').val();
  };

  $(document).ready(function(){
    $('#target-connect').click(function(){
      p2p.invite(getTargetId(), function(){
        console.log('Invite success.');
      }, function(err){
        console.log('Invite failed with message: ' + err.message);
      });
    });

    $('#target-screen').click(function(){
      Woogeen.LocalStream.create({
        video:{
          device:"screen"
        }
      }, function(err, stream){
        if (err) {
          return L.Logger.error('create LocalStream failed:', err);
        }
        localScreen = stream;
        p2p.publish(localScreen,$('#target-uid').val());  // Publish local stream to remote client
      });
    });

    $('#target-video-unpublish').click(function(){
      $('#target-video-publish').prop('disabled',false);
      $('#target-video-unpublish').prop('disabled',true);
      p2p.unpublish(localStream,$('#target-uid').val());  // Publish local stream to remote client
      localStream.close();
      localStream = undefined;
    });

    $('#target-video-publish').click(function(){
      $('#target-video-unpublish').prop('disabled',false);
      $('#target-video-publish').prop('disabled',true);
      if(localStream){
          p2p.publish(localStream,$('#target-uid').val());  // Publish local stream to remote client
      }else{
        Woogeen.LocalStream.create({
          video:{
            device:"camera",
            resolution:"sif"
          },
        audio: true
        }, function(err, stream){
          if (err) {
            return L.Logger.error('create LocalStream failed:', err);
          }
          localStream = stream;
          if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {  // If IE
            attachMediaStream($('#local').children('canvas').get(0),localStream.mediaStream)  // Show local stream
          }else{
            attachMediaStream($('#local').children('video').get(0),localStream.mediaStream)  // Show local stream
          }
          p2p.publish(localStream,$('#target-uid').val());  // Publish local stream to remote client
        });
      }
    });

    $('#target-disconnect').click(function(){
      p2p.stop($('#target-uid').val());  // Stop chat
    });

    $('#login').click(function(){
      p2p.connect({host:serverAddress, token:$('#uid').val()});  // Connect to peer server
      $('#uid').prop('disabled',true);
    });

    $('#logoff').click(function(){
      p2p.disconnect();  // Disconnected from peer server.
      $('#uid').prop('disabled',false);
    });

    $('#data-send').click(function(){
      p2p.send($('#dataSent').val(),$('#target-uid').val());  // Send data to peer.
    });
  });

  p2p.on('chat-invited',function(e){  // Receive invitation from remote client.
    $('#target-uid').val(e.senderId);
    p2p.accept(getTargetId());
    //p2p.deny(e.senderId);
  });

  p2p.on('chat-accepted', function(e){
  });

  p2p.on('chat-denied',function(e){
    console.log('Invitation to '+e.senderId+' has been denied.');
  });

  p2p.on('chat-started',function(e){ // Chat started
    console.log('chat started.');
    $('#target-screen').prop('disabled',false);
    $('#data-send').prop('disabled',false);
    $('#target-video-publish').prop('disabled',false);
  });

  p2p.on('stream-added',function(e){  // A remote stream is available.
    var div = document.createElement("div");
    div.id = e.stream.id();
    var video = document.createElement("video");
    video.setAttribute("width", "320px");
    video.setAttribute("height", "240px");
    video.setAttribute("autoplay", "autoplay");
    //video.id = e.stream.id();

    var canvas = document.createElement("canvas");
    canvas.setAttribute("width", "320px");
    canvas.setAttribute("height", "240px");
    canvas.setAttribute("autoplay", "autoplay::autoplay");
    //canvas.id = e.stream.id();
    if(e.stream.isScreen()){
      if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {  // If IE
        $('#screen canvas').show();
        attachRemoteMediaStream($('#screen canvas').get(0), e.stream.mediaStream, e.stream.mediaStream.attachedPCID);  // Show remote screen stream.
      }else{
        $('#screen video').show();
        attachMediaStream($('#screen video').get(0), e.stream.mediaStream);  // Show remote screen stream.
      }
    } else if(e.stream.hasVideo()) {
      if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {  // If IE
        $('#remote canvas').show();
        attachRemoteMediaStream($('#remote canvas').get(0), e.stream.mediaStream, e.stream.mediaStream.attachedPCID);  // Show remote video stream.
      }else{
        $('#remote video').show();
        attachMediaStream($('#remote video').get(0), e.stream.mediaStream);  // Show remote video stream.
      }
    }
    isVideo++;
  });

  p2p.on('stream-removed',function(e){  // A remote stream is available.
    var stream = e.stream;
    if(stream && stream.isScreen()){
      $("#screen canvas").hide();
      $("#screen video").hide();
    } else {
      $("#remote canvas").hide();
      $("#remote video").hide();
    }
    console.log('Stream removed. Stream ID: '+e.stream.mediaStream.id);
  });

  p2p.on('chat-stopped',function(e){  // Chat stopped.
    console.log('chat stopped.');
    $('#data-send').prop('disabled',true);
    $('#target-video-publish').prop('disabled',true);
    $('#target-video-unpublish').prop('disabled',true);
    $('#target-screen').prop('disabled',true);
    if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) { // If IE
      $('#remote canvas').hide();
    } else {
      $('#remote video').hide();
    }
    if(localStream){
      localStream.close();
      localStream=undefined;
    }
    if(localScreen){
      localScreen.close();
      localScreen=undefined;
    }
    console.log('Chat stopped. Sender ID: '+e.senderId+', peer ID: '+e.peerId);
  });

  p2p.on('data-received',function(e){  // Received data from datachannel.
    $('#dataReceived').val(e.senderId+': '+e.data);
  });

  window.onbeforeunload = function(){
    if(localStream){
      p2p.unpublish(localStream,$('#target-uid').val());
      localStream.close();
    }
    p2p.stop($('#target-uid').val());
  }