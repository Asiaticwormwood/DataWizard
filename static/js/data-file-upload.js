$('#input-data-file').fileinput({
    language: 'en',
    uploadUrl: '#',
    dropZoneEnabled: true,
    // previewSettings:{
    //     image:{width:"100px",height:"100px"},
    // },
    textEncoding: 'UTF-8',
    previewFileType: 'text',
    remove: true,
    showCancel: true,
    showPreview: true,
    // showCaption: false,
    allowedFileExtensions: ['xlsx', 'txt', 'csv'],
    elErrorContainer: 'errorBlock',
    dropZoneTitle: 'Click to upload or drag file HERE </br> Only support csv/txt/xlsx file',
    autoDownload: false,
    disabledPreviewTypes: ['text'],
});


function parseCSV(csvContent) {
    const rows = csvContent.split('\n');
    let table = $('<table class="table table-hover text-center"><tbody></tbody></table>');
    let count = 0;

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].split(',');
        let tableRow = $('<tr></tr>');
        for (let j = 0; j < cells.length; j++) {
            tableRow.append('<td>' + cells[j] + '</td>');
        }
        table.append(tableRow);
        count++;
        if (count === 6) {
            break;
        }
    }
    return table;
}

function parseXLSX(file, callback) {
    const reader = new FileReader();

    reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, {type: 'array'});

        // 为简化示例，我们仅处理第一个工作表
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const csvContent = XLSX.utils.sheet_to_csv(sheet);
        const table = parseCSV(csvContent);

        callback(table);
    };

    reader.readAsArrayBuffer(file);
}

$(document).ready(function () {
    $('#input-data-file').on('change', function () {
        const file = this.files[0];
        if (file) {
            const fileType = file.name.split('.').pop().toLowerCase();

            if (fileType === 'csv') {
                const reader = new FileReader();

                reader.onload = function (e) {
                    const csvContent = e.target.result;
                    const table = parseCSV(csvContent);
                    // console.log(table)
                    $('#preview-container').html(table);
                };

                reader.readAsText(file);
            } else if (fileType === 'xlsx') {
                parseXLSX(file, function (table) {
                    // console.log(table);
                    $('#preview-container').html(table);
                });
            } else if (fileType === 'txt') {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const txtContent = e.target.result;
                    // console.log(csvContent)
                    let pre_text = $('<pre></pre>');
                    pre_text.append(txtContent)
                    $('#preview-container').html(pre_text);
                };
                reader.readAsText(file);
            }
        }
    });
});

document.getElementsByClassName('fileinput-remove-button')[0].addEventListener('click', function () {
    $('#preview-container').html('');
});