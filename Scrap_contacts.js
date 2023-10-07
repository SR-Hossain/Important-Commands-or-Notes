var datas = '| Reg | Name | Mobile | Gender | Session | Present Address | Permanent Address | BirthDate | Father | Mother |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n';
var promises = [];
var resArr = [];
for (var session = 19; session <= 22; session++) {
    for (var reg = 1001; reg < 1130; reg++) {
        var promise = $.ajax({
            url: "/department/get/20" + session + "33" + reg,
            type: "GET"
        }).then(function (response) {
            if (response['status'] === '200' && response['studentInfo'].status == '200') {
                resArr.push(response);
            }
        });
        
        promises.push(promise);
    }
}

// Use Promise.all to wait for all promises to resolve
Promise.all(promises).then(function () {
    console.log(datas);
    resArr.forEach(element => {
        datas += '| ' + element['studentInfo'].studentRegNO + ' | ';
        datas += element['studentInfo'].studentName + ' | ';
        datas += "+880 "+element['studentInfo'].mobile.replace(/\n/g, '').replace('880', '') + ' | ';
        datas += element['studentInfo'].gender + ' | ';
        datas += element['studentInfo'].session + ' | ';
        datas += element['studentInfo'].presentAddress.replace(/\n/g, '') + ' | '; // Use the modified presentAddress
        datas += element['studentInfo'].permanentAddress.replace(/\n/g, '') + ' | ';
        datas += element['studentInfo'].dateOfBirth + ' | ';
        datas += element['studentInfo'].fathersName + ' | ';
        datas += element['studentInfo'].mothersName + ' |\n';
    });
    console.log(datas);
});
