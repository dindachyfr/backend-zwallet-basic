// npm i joi   => validation package
const nodemailer = require("nodemailer");

const handleNotFound = (req, res, next) => {
  res.status(404);
  res.json({
    message: "url not found"
  });
};

const reponse = (res, result, statusCode, message, pagination) => {
  res.json({
    status: "Success",
    code: statusCode,
    data: result,
    message: message,
    pagination: pagination
  });
};

const sendEmail = async (token, email) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "24kgoaldie@gmail.com",
      pass: "12september1997"
    }
  });

  const info = await transporter.sendMail({
    from: "24kgoaldie@gmail.com", // sender address
    to: "jungjaewon290394@gmail.com", // list of receivers
    subject: "ZWallet Account Verification", // Subject line
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,600;1,400;1,800&display=swap');
    
            *{
                font-family: Nunito Sans;
                font-style: normal;
                margin: 0;
                color: white;
            }
    
            .container{
                background-color: rgb(234, 238, 240);
                height: 55vh;
                width: 70vw;
                position: absolute;
                top: 0;
                left: 0;
            }
    
            .inner-con{
                background-color:#6379F4;
                height: 55vh;
                width: 70vw;
                position: absolute;
                top: 0;
            }
    
            .titletext{
                position: absolute;
                right: 2rem;
                top: 1rem;
                font-size: 2rem;
            }
    
            .wrapper{
                margin: 4rem 1rem;
            }
    
            .p1{
                margin-top: 1.5rem;
            }
    
            .h2{
                font-size: 1rem;
            }
    
            .confirm{
                background-color: white;
                color: #6379F4;
                padding: 1rem 3rem;
                border-radius: .5rem;
                text-decoration: none;        
            }
    
            .wrapper-confirm{
                margin-top: 4rem
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="inner-con">
              <div class="titletext">
                <h2 >Zwallet</h2>
              </div>
                <div class="wrapper">
                    <h2 class="h2">Confirm your email address</h2>
                    <p class="p1">There's one quick step you need to complete in order to confirm your email address.</p>
                    <p class="p1">Please kindly click link below to start accessing banking needs with all devices and all platforms with 30.000+ users</p>
                    <div class="wrapper-confirm">
                        <a href="https://zwallet-dinda.herokuapp.com/users/account-verification/${token}" target="_blank" class="confirm">
                            Confirm</a>
                        </div>
                </div>
            </div>
        </div>
    </body>
    </html>
            `
    // html body, nanti linknya ganti pake zwallet kalo dah integrasi frontend y
  });
  console.log(info);
};

module.exports = { handleNotFound, reponse, sendEmail };
