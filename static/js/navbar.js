// 监听下拉菜单选项的点击事件
$('#createProject').on('click', function() {
  $('#createProjectModal').modal('show');
});

$('#openProject').on('click', function() {
  $('#openProjectModal').modal('show');
});

// 提交表单并关闭模态框
$('#createProjectSubmit').on('click', function() {
  // 在此处处理表单提交逻辑
  console.log('创建项目');
  $('#createProjectForm').submit();
  $('#createProjectModal').modal('hide');
});

$('#openProjectSubmit').on('click', function() {
  // 在此处处理表单提交逻辑
  console.log('打开项目');
  $('#openProjectForm').submit();
  $('#openProjectModal').modal('hide');
});

$(document).ready(function() {
  // 当文本框被点击时，触发隐藏的文件输入元素的点击事件
  $('#create-proj-text').on('click', function() {
    $('#create-proj-file').click();
  });

  // 当文件被选择时，更新只读文本输入框的值
  $('#create-proj-file').on('change', function() {
    if (this.files.length > 0) {
      const firstFile = this.files[0];
      const folderName = firstFile.webkitRelativePath.split('/')[0];
      $('#create-proj-text').val(folderName);
    } else {
      $('#create-proj-text').val('');
    }
  });

  // 当文本框被点击时，触发隐藏的文件输入元素的点击事件
  $('#open-proj-text').on('click', function() {
    $('#open-proj-file').click();
  });

  // 当文件被选择时，更新只读文本输入框的值
  $('#open-proj-file').on('change', function() {
    if (this.files.length > 0) {
      const firstFile = this.files[0];
      const folderName = firstFile.webkitRelativePath.split('/')[0];
      $('#open-proj-text').val(folderName);
    } else {
      $('#open-proj-text').val('');
    }
  });
});