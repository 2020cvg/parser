const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");

myForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const input = csvFile.files[0];
    const reader = new FileReader();
    let result = '';

    reader.onload = function (e) {
        const text = e.target.result;
        const data = parser(text);
       
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < 5; j++) {
                result += "[" + data[i][j] + "]";
            }
            result += "\n";
        }
        console.log("TEXT: ", result); 
    };

    reader.readAsText(input);
  });

function parser(str) {
    var arr = [];
    var quote = false;  

    for (var row = 0, col = 0, c = 0; c < str.length; c++) {
        var cc = str[c], nc = str[c+1];        
        arr[row] = arr[row] || [];             
        arr[row][col] = arr[row][col] || '';   
      
        if (cc == '"' && quote && nc == '"') { arr[row][col] += cc; ++c; continue; }

        if (cc == '"') { quote = !quote; continue; }

        if (cc == ',' && !quote) { ++col; continue; }

        if (cc == '\r' && nc == '\n' && !quote) { ++row; col = 0; ++c; continue; }

        if (cc == '\n' && !quote) { ++row; col = 0; continue; }
        if (cc == '\r' && !quote) { ++row; col = 0; continue; }

        arr[row][col] += cc;
    }
    return arr;
}

