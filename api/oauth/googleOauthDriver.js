const {OAuth2Client} = require('google-auth-library');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Driver = require("../models/driver");

const client = new OAuth2Client('417067613788-aocg4qm670p0i6lfu4nutfs8r8mov7he.apps.googleusercontent.com');

exports.googleCheck = async function verify(token) {

  const ticket = await client.verifyIdToken({
      //idToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjI2ZmM0Y2QyM2QzODdjYmM0OTBmNjBkYjU0YTk0YTZkZDE2NTM5OTgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI4OTg3NjQ0Mzc0MjQtYnVudThzdGxxdTVsajRhNGY5cTczaGZtZmx2ZnAza2ouYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI4OTg3NjQ0Mzc0MjQtanM4am9jaXZ1YjBkZmMwdGpqNmxzcGY4OXNkYjRnMWIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDQ3MjA0MDI0NDE1MTU1MjY2ODIiLCJlbWFpbCI6ImFua29zdG92QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiQXRhbmFzIEtvc3RvdiIsInBpY3R1cmUiOiJodHRwczovL2xoNC5nb29nbGV1c2VyY29udGVudC5jb20vLWVYZlkyUVQxdzlRL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FDSGkzcmYxZ0VRNDdlaGQ0THZKeVF2WkgyYWtDMFBfNXcvczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6IkF0YW5hcyIsImZhbWlseV9uYW1lIjoiS29zdG92IiwibG9jYWxlIjoiYmciLCJpYXQiOjE1NTYxOTA4MTMsImV4cCI6MTU1NjE5NDQxM30.p21jwT_UBtlBLdCn3sPYeGKuGuDkWEgDvlQ6iR5mB2hrWRzb_JUjhh2g6sM42OcNm91bHLQbBi3Re7xjQvlOYJkBtM3B6hsZwNFIvaUvKJMWaA5OX42pZmSSXHA1zGXb3MCi559FCH1avUzadHFsZeDIFh_2EubS69CGFiOzszW-wv51Z6U27yN0oRdm2wtD8tt3u7NQbgzbka8H-qFAAmvd5zryTvIjkiNi0-gisNS58SFOi2IeAZyJxUlM27dBSWdl95xNxJrM_BFFBPqefZjsaXjtYxaLnBsHZ2UIIEXU77VVkR8du_SERjRA1zuyTb75UYvQ8HuiSdYk_dkGYg"',
      
     idToken : token,
     audience: '417067613788-aocg4qm670p0i6lfu4nutfs8r8mov7he.apps.googleusercontent.com',  
     
  });
  const payload = ticket.getPayload();
  const name = payload['name'];
  const picture = payload['picture'];
  Driver.update ({googleToken: token}, { 
  name: name,
  urlImage: picture

 } )
  .exec()
  console.log(payload)
 // callback ( "sdfsdfsd")

  //const domain = payload['hd'];
  
  //verify().catch(console.error);
 return userid
}
