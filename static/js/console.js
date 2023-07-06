// 为按钮添加点击事件
document.getElementById('submitButton').addEventListener('click', function () {
    const userInput = document.getElementById('userInput').value;
    // 在此处处理将文本传递给后端的逻辑
    console.log('提交文本：', userInput);
});

document.getElementById('clearButton').addEventListener('click', function () {
    document.getElementById('codeEditor').value = '';
    document.getElementById('displayBox').innerHTML = '';
});