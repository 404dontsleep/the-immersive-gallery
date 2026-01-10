function addLanguage(code, country, value) {
  fetch('http://localhost:5173/api/languages', {
    headers: {
      accept: 'application/json, text/plain, */*',
      'accept-language': 'en-US,en;q=0.6',
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5odDI1MDIyMDAzMUBnbWFpbC5jb20iLCJpYXQiOjE3Njc5NzQ3ODMsImV4cCI6MTc2ODA2MTE4M30.pWC9TBjiJJYmK13aKw0RBJ5hJgWJrj3ES__TLF83sw8',
      'content-type': 'application/json',
      'sec-ch-ua': '"Brave";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'sec-gpc': '1',
    },
    referrer: 'http://localhost:5173/app/admin/language',
    body: `{"code":"${code}","country":"${country}","value":"${value}"}`,
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
  });
}

function addCode(code) {
  fetch('http://localhost:5173/api/language-codes', {
    headers: {
      accept: 'application/json, text/plain, */*',
      'accept-language': 'en-US,en;q=0.6',
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5odDI1MDIyMDAzMUBnbWFpbC5jb20iLCJpYXQiOjE3Njc5NzQ3ODMsImV4cCI6MTc2ODA2MTE4M30.pWC9TBjiJJYmK13aKw0RBJ5hJgWJrj3ES__TLF83sw8',
      'content-type': 'application/json',
      'sec-ch-ua': '"Brave";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'sec-gpc': '1',
    },
    referrer: 'http://localhost:5173/app/admin/language',
    body: `{"code":"${code}","description":"${code}"}`,
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
  });
}
