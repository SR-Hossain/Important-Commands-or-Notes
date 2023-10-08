var datas = '| Reg | Name | Mobile | Gender | Session | Present Address | Permanent Address | BirthDate | Father | Mother |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n';
var promises = [];
var resArr = [];
for (var session = 17; session <= 22; session++) {
    for (var reg = 1001; reg < 1130; reg++) {
        var promise = $.ajax({
            url: "/department/get/20" + session + "73" + reg,
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
    resArr.forEach(element => {
        datas += '| ' + element['studentInfo'].studentRegNO + ' | ';
        datas += element['studentInfo'].studentName + ' | ';
        datas += "+880 ";
        if(element['studentInfo'].mobile !== null)
        datas+=element['studentInfo'].mobile.replace('880', '');
        datas += ' | ';
        datas += element['studentInfo'].gender + ' | ';
        datas += element['studentInfo'].session + ' | ';
        if(element['studentInfo'].presentAddress !== null)
        datas += element['studentInfo'].presentAddress.replace(/\n/g, '');
        datas += ' | '; // Use the modified presentAddress
        if(element['studentInfo'].permanentAddress !== null)
        datas += element['studentInfo'].permanentAddress.replace(/\n/g, '');
        datas += ' | ';
        datas += element['studentInfo'].dateOfBirth + ' | ';
        datas += element['studentInfo'].fathersName + ' | ';
        datas += element['studentInfo'].mothersName + ' |\n';
    });
    console.log(datas);
});
