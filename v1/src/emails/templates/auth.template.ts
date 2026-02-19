

export const verificationEmail = (firstName:string, code:string) => {
return `
	<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="description" content="">
  <meta name="keywords" content="">
  <meta name="author" content="">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!-- This meta tag is importatnt for responsiveness -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" href="cid:favicon">

  <!-- Boostrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  

  <!-- CUSTOM STYLES -->
  <style>
    html {
        font-size: 100%;
        min-height: 100%;
        scroll-behavior: smooth;
    }

    body {
        font-family: "Plus Jakarta Sans", serif;
        font-size: 1.2rem;
        color: #222222;
        font-weight: normal;
        overflow-x: hidden;
        line-height: 20px;
    }

    .__bg-w{
        background: #ffffff;
    }

    .__hedimg{
        // background-repeat: no-repeat !important;
        // background-position: center center !important;
        // background-size: cover !important;
        padding: 60px 60px 0px 60px;
    }

    .__capt{
        font-size: 40px;
        color: #3e683b;
        line-height: 50px;
        font-weight: 500;
        margin-top: 20px;
        margin-bottom: 30px;  
    }
    .__capt span{
        font-weight: 700;
        font-style: italic;
    }

    .__conth{
        background: #ffffff;
        padding: 0px 60px 60px 60px;
    }

    .__nam, .__nam-sub{
        font-size: 18px;
        line-height: 27px;
        color: rgba(13, 13, 13, 1);
    }

    .__nam{
        font-weight: 700;
    }

    .__nam-sub{
        font-weight: 400;
        margin-top: 25px;
    }

    .__otph{
        display: flex;
        gap: 10px;
        justify-content: center;
        align-items: center;
    }

    .__otp{
        font-size: 38px;
        font-weight: 700;
        line-height: 38px;
        color: rgba(13, 13, 13, 1);
        background: rgba(248, 250, 252, 1);
        border-radius: 10px;
        padding: 5px 10px;
        margin: 20px 0 0;
    }

    .__ifwe{
        font-size: 18px;
        font-weight: 400;
        line-height: 27px;
        color: rgba(100, 116, 139, 1);
        margin-top: 1rem;
    }

    .__ifwe a{
        font-weight: 500;
        color: rgba(0, 85, 186, 1);
        text-decoration: none;
    }

    .__tank{
        font-size: 18px;
        font-weight: 400;
        line-height: 27px;
        color: rgba(100, 116, 139, 1);
        margin-top: 1rem;
    }

    .__tank span{
        display: block;
        font-weight: 700;
        color: rgba(46, 50, 55, 1);
    }

    .__emhr{
        margin: 2rem 0 1rem;
    }

    .__fot{
        font-size: 12px;
        font-weight: 400;
        line-height: 16.5px;
        color: rgba(100, 116, 139, 1);
        text-align: center;
    }

    .__logo {
        width: 30%;
    }

        
  </style>

  <!-- WEBFONT -->
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">

  <!-- ICON -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.4.1/css/simple-line-icons.min.css">

  <title>Landstoxx</title>
</head>
<body>
  <section>
      <div class="container">
          <div class="row">
              <div class="col-xl-3 col-lg-3"></div>
              <div class="col-xl-6 col-lg-6">
                  <div class="__bg-w">
                      <div class="__hedimg">
                          <img src="cid:logo" class="__logo" />
                          <p class="__capt">Verify Your Email</p>
                      </div>
                      <div class="__conth">
                          <p class="__nam">Hi ${firstName}</p>
                          <p class="__nam-sub">Welcome to Landstoxx! To complete your email verification, enter the OTP below:</p>

                          <div class="__otph">
                              <p class="__otp">${code.charAt(0)}</p>
                              <p class="__otp">${code.charAt(1)}</p>
                              <p class="__otp">${code.charAt(2)}</p>
                              <p class="__otp">${code.charAt(3)}</p>
                              <p class="__otp">${code.charAt(4)}</p>
                              <p class="__otp">${code.charAt(5)}</p>
                          </div>

                          <p class="__ifwe">If you weren’t expecting this mail, you can safely ignore this email and reach out to us at <span class="__nam">support@landstoxx.com.</span> </p>
                          <p class="__tank">Thank you for joining us. <span>- Team Landstoxx.</span> </p>

                          <hr class="__emhr" />
                          	<p class="__fot"><script>document.write(new Date().getFullYear());</script> &copy; Landstoxx  |  Revolutionizing property investment and management</p>
                      </div>
                  </div>
              </div>
              <div class="col-xl-3 col-lg-3"></div>
          </div>
      </div>
  </section>
</body>

<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
</html>
`
}

export const welcomeEmail = (firstName:string) => {
return `
	<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="description" content="">
  <meta name="keywords" content="">
  <meta name="author" content="">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!-- This meta tag is importatnt for responsiveness -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/png" href="cid:favicon">

  <!-- Boostrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  

  <!-- CUSTOM STYLES -->
  <style>
    html {
        font-size: 100%;
        min-height: 100%;
        scroll-behavior: smooth;
    }

    body {
        font-family: "Plus Jakarta Sans", serif;
        font-size: 1.2rem;
        color: #222222;
        font-weight: normal;
        overflow-x: hidden;
        line-height: 20px;
    }

    .__bg-w{
        background: #ffffff;
    }

    .__hedimg{
        // background-repeat: no-repeat !important;
        // background-position: center center !important;
        // background-size: cover !important;
        padding: 60px 60px 0px 60px;
    }

    .__capt{
        font-size: 40px;
        color: #3e683b;
        line-height: 50px;
        font-weight: 500;
        margin-top: 20px;
        margin-bottom: 30px;  
    }
    .__capt span{
        font-weight: 700;
        font-style: italic;
    }

    .__conth{
        background: #ffffff;
        padding: 0px 60px 60px 60px;
    }

    .__nam, .__nam-sub{
        font-size: 18px;
        line-height: 27px;
        color: rgba(13, 13, 13, 1);
    }

    .__nam{
        font-weight: 700;
    }

    .__nam-sub{
        font-weight: 400;
        margin-top: 25px;
    }

    .__otph{
        display: flex;
        gap: 10px;
        justify-content: center;
        align-items: center;
    }

    .__otp{
        font-size: 38px;
        font-weight: 700;
        line-height: 38px;
        color: rgba(13, 13, 13, 1);
        background: rgba(248, 250, 252, 1);
        border-radius: 10px;
        padding: 5px 10px;
        margin: 20px 0 0;
    }

    .__ifwe{
        font-size: 18px;
        font-weight: 400;
        line-height: 27px;
        color: rgba(100, 116, 139, 1);
        margin-top: 1rem;
    }

    .__ifwe a{
        font-weight: 500;
        color: rgba(0, 85, 186, 1);
        text-decoration: none;
    }

    .__tank{
        font-size: 18px;
        font-weight: 400;
        line-height: 27px;
        color: rgba(100, 116, 139, 1);
        margin-top: 1rem;
    }

    .__tank span{
        display: block;
        font-weight: 700;
        color: rgba(46, 50, 55, 1);
    }

    .__emhr{
        margin: 2rem 0 1rem;
    }

    .__fot{
        font-size: 12px;
        font-weight: 400;
        line-height: 16.5px;
        color: rgba(100, 116, 139, 1);
        text-align: center;
    }

    .__logo {
        width: 30%;
    }

        
  </style>

  <!-- WEBFONT -->
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">

  <!-- ICON -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.4.1/css/simple-line-icons.min.css">

  <title>Landstoxx</title>
</head>
<body>
  <section>
      <div class="container">
          <div class="row">
              <div class="col-xl-3 col-lg-3"></div>
              <div class="col-xl-6 col-lg-6">
                  <div class="__bg-w">
                      <div class="__hedimg">
                          <img src="cid:logo" class="__logo" />
                          <p class="__capt">Welcome Email</p>
                      </div>
                      <div class="__conth">
                          <p class="__nam">Hi ${firstName}</p>
                          <p class="__nam-sub">Welcome to Landstoxx!</p>

                          <p class="__ifwe">If you weren’t expecting this mail, you can safely ignore this email and reach out to us at <span class="__nam">support@landstoxx.com.</span> </p>
                          <p class="__tank">Thank you for joining us. <span>- Team Landstoxx.</span> </p>

                          <hr class="__emhr" />
                          	<p class="__fot"><script>document.write(new Date().getFullYear());</script> &copy; Landstoxx  |  Revolutionizing property investment and management</p>
                      </div>
                  </div>
              </div>
              <div class="col-xl-3 col-lg-3"></div>
          </div>
      </div>
  </section>
</body>

<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
</html>
`
}