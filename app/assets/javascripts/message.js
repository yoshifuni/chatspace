$(function(){
  function buildPost(post){
    var html = `<div class="message">
                  <div class="message__upper-info">
                    <div class="message__upper-info__talker">
                      ${post.user_name}
                    </div>
                    <div class="message__upper-info__date">
                      ${post.date}
                    </div>
                  </div>
                  <div class="message__lower-message">
                    <p class="messasge__lower-message__content">
                      ${post.content}
                    </p>
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
      var html = buildPost(post);
      $('.messages').append(html);
      $('.form__submit').prop('disabled', false);
      $('.new_message')[0].reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
      alert('エラー');
    })
  })
})