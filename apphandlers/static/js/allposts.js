$(document).ready(function() {
  const cancel_action_callback = function() {
    $('.post-field').val('').attr('type', 'hidden');
    $(this)
    .attr('id', 'write_new_post')
    .text('New Post')
    .off('click')
    .click(new_post_callback);
  };

  const new_post_callback = function () {
    $('.post-field').attr('type', 'text');

    $(this)
    .attr('id', 'cancel_action')
    .text('Cancel')
    .off('click')
    .click(cancel_action_callback)
  };

  $('#write_new_post').click(new_post_callback);
  $('.post-field').on('keyup', function() {
    if (($('#new_post_title').val().length) && ($('#new_post_content').val().length)) {
        $('#cancel_action')
        .attr('id', 'save_new_post')
        .text('Save')
        .off('click')
        .click(function() {
          var title = $('#new_post_title').val();
          var content = $('#new_post_content').val();
          var _createdID;
          $.ajax({
            url: '/posts',
            type: 'POST',
            async: false,
            data: {
              title: title,
              content: content,
              action: 'create'
            },
            success: function(data){
              _createdID = data.id;
            }
          });

          $('.post-field').val('').attr('type', 'hidden');
          $('.container').append(
            "<div class='post-container'>"+
              "<div class='post-container-header'>"+
                "<div class='post-container-header-title'>"+
                  "<a class='tiny-link' href='/posts?id="+ _createdID +"'>"+ title +"</a>"
                +"</div>"
              +"</div>"+

            "<div class='post-container-body'>"+
              content +
            "</div>"+
          "</div>"
        )

          $(this)
          .attr('id', 'write_new_post')
          .text('New Post')
          .off('click')
          .click(new_post_callback);

        })
    }
    if ($(this).val() == '') {
      $('#save_new_post')
      .attr('id', 'cancel_action')
      .text('Cancel')
      .off('click')
      .click(cancel_action_callback);
    }
  })
})
