$(function(){
  function buildHTML(post){
    var image = post.image.url == null ? '':`<img src = '${post.image.url}' class"message__lower-message__image">`
    var html = `<div class="message" data-id=${post.id}}> 
                  <div class="message__upper-info">
                    <div class="message__upper-info__talker">
                      ${post.user_name}
                    </div>
                    <div class="message__upper-info__date">
                      ${post.created_at}
                    </div>
                  </div>
                  <div class="message__lower-message">
                    <p class="messasge__lower-message__content">
                      ${post.content}
                    </p>
                     ${ image }
                  </div>
                </div>`
    
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(post){
      var html = buildHTML(post);
      $('.messages').append(html);
      $('.form__submit').prop('disabled', false);
      $('.new_message')[0].reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
      alert('エラー');
    })
  })
  $(function() {
  var reloadMessages = function() {
    var last_message_id = $('.message').last().data("id");
    var group_id = $('.chat-main').data("id");
    $.ajax({
      url: `/groups/${group_id}/api/messages`,
      type: 'get',
      dataType: 'json',
      data: {last_id: last_message_id},
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message){
        insertHTML = buildHTML(message);
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight},'fast');
      });      
    })
    .fail(function() {
      alert('エラー');
    });
  };
  if (window.location.href.match(/\/groups\/\d+\/messages/)){
     setInterval(reloadMessages, 5000);
    }
  });
});

