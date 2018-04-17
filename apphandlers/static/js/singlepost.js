$(document).ready(function() {
  const delete_callback = function () {
    var post_id = $(this).attr('target');
    $.post('/posts', {
      id: post_id,
      action: 'delete'
    });
    $('.container').empty().append('<h2>This post has been deleted</h2>')
    setTimeout(function () {
      location.href='/posts';
    }, 2500);
  };
  const edit_callback = function() {
    var post_id = $(this).attr('target');
    var title_elem = $('#post_' + post_id + '_title');
    var content_elem = $('#post_' + post_id + '_content');

    $('.title-editor').attr('type', 'text');
    $('.content-editor').attr('type', 'text');

    $('.delete-post')
    .attr('class', 'cancel-action')
    .text('Cancel')
    .off('click')
    .click(function() {
      $('.title-editor').val(title_elem.text()).attr('type', 'hidden');
      $('.content-editor').val(content_elem.text()).attr('type', 'hidden');
      $('.save-post')
      .attr('class', 'edit-post')
      .text('Edit')
      .on('click')
      .click(edit_callback);

      $(this)
      .attr('class', 'delete-post')
      .text('Delete')
      .on('click')
      .click(delete_callback)
    })

    $(this)
    .attr('class', 'save-post')
    .text('Save')
    .off('click')
    .click(function() {
      var new_title = $('.title-editor').val();
      var new_content = $('.content-editor').val();
      $.post('/posts', {
        action: 'save',
        id: post_id,
        title: new_title,
        content: new_content
      });

      title_elem.text(new_title);
      content_elem.text(new_content);

      $('.title-editor').attr('type', 'hidden');
      $('.content-editor').attr('type', 'hidden');

      $(this)
      .attr('class', 'edit-post')
      .text('Edit')
      .on('click')
      .click(edit_callback);

      $('.cancel-action')
      .attr('class', 'delete-post')
      .text('Delete')
      .on('click')
      .click(delete_callback);
    });
  }

  $('.edit-post').on('click', edit_callback);
  $('.delete-post').on('click', delete_callback);
})
