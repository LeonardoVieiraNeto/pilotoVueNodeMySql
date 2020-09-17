const nodemailer = require('nodemailer');
let email
let user
let host = 'https://sistema.smartmaps.com.br'
let hostViability = 'https://viabilidade.smartmaps.com.br'

/*const user = 'smartmaps@smartmaps.com.br'
const email = nodemailer.createTransport({
	host: 'smtp.smartmaps.com.br',
	port: 465,		
	secure: true,
	debug:true,
	requireTLS: false,
    auth: {
        user: user, 
        pass: 'Qrqfq8Plv#BS' 
    }
});*/

// let user = 'noreply@geocode.com.br'
// let email = nodemailer.createTransport({
// 	host: 'smtp.zoho.com',
// 	port: 465,
// 	secure: true,
// 	debug: true,
// 	auth: {
// 		user: 'noreply@geocode.com.br',
// 		pass: 'geocode@2015'
// 	}
// });

const organizeToEmails = (emails) => {

	if (emails instanceof Array) {
		let emailsString = ""
		for (let i = 0; i < emails.length; i++) {
			emailsString += emails[i]

			if ((i + 1) < emails.length) {
				emailsString += ','
			}
		}
		return emailsString;

	} else {
		return emails;
	}
}

const makeHtml = (subject, content) => {
	// return "<table style=\"width:100%; border: 1px solid #f1f1f1;\">" + "<tr style=\"text-align:center; width: 100%; background-color: #FAFAFA\">" +
	// 	"<th style=\"border-bottom:1px solid #d65501;\">" + "<div>" +
	// 	'<img src="https://sistema.smartmaps.com.br/images/logo/logo_2.png" height="27" width="220" alt="SmartISPMaps">' +
	// 	"</div>" + "<div>" + "<h3 style=\"color: #8E9092\">" +
	// 	subject + "</h3>" + "</div>" + "</th>" + "</tr>" + "<tr style=\"width: 100%\">" + "<td style=\"padding: 15px\">" + content + "</td>" + "</tr>" +
	// 	"<tr style=\"text-align: center; font:14px; width: 100%; background-color: #FAFAFA\">" + "<td style=\"border-top:1px solid #d65501;\">" + "<div>" +
	// 	"<p style=\"color: #FE2E2E\"> Este e-mail é gerado de forma automática favor não responder</p>" + "</div>" + "<div>" +
	// 	"<p>Versão: 1.0.1 - serviço de e-mail do <a style=\"color: #ff9d00; text-decoration: none; font-size: 17px;\" href=\"http://www.smartmaps.com.br\">SMARTISPMaps</a></p>" +
	// 	"</div>" + "</td>" + "</tr>" + "</table>"	


	return '<style type="text/css">' +
		'    body,' +
		'    html,' +
		'    .body {' +
		'        background: rgb(246, 246, 246) !important;' +
		'    }' +
		'</style>' +
		'<table style="width:100%;">' +
		'    <tr style="text-align:center; width: 100%;' +
		'        background-color: #FAFAFA;">' +
		'        <th style="border-bottom:1px solid #e4e4e4;">' +
		'            <div style="padding-top: 20px;padding-bottom: 20px;margin-top: -11px;">' +
		'                <img src="https://sistema.smartmaps.com.br/images/logo/logo_2.png" border="0">' +
		'            </div>' +
		'        </th>' +
		'    </tr>' +
		'' +
		'    <tr style="width: 100%;background: #fff;">' +
		'        <td style="padding: 10px;">' +
		'            <h3 style="color: #f2a636;text-align: center;">' + subject + '</h3>'
		+ content +
		'            <hr/>' +
		'            Link do mapa: <a href=\"' + host + '\"> ' + host + ' </a> <br/>' +
		'            Link da viabilidade: <a href=\"' + hostViability + '\"> ' + hostViability + ' </a> <br/>' +		
		'        </td>' +
		'    </tr>' +
		'' +
		'    <tr style="text-align: center; font-size:14px; width: 100%;">' +
		'        <td style="border-top:1px solid #e4e4e4;">' +
		'            <div>' +
		'                <p style="color: red;font-size: 13px;margin-top: 20px;"> *Este e-mail é gerado de forma automática favor não responder.</p>' +
		'            </div>' +
		'            <div>' +
		'                <p>Versão: 1.0.1 - serviço de e-mail do ' +
		'                    <a style="color: #ff9d00; text-decoration: none; font-size:17px;"' +
		'                        href="http://www.smartmaps.com.br" target="_blank">SMARTISPMaps</a> ' +
		'                </p>' +
		'            </div>' +
		'        </td>' +
		'    </tr>' +
		'    ' +
		'</table>' +
		'' +
		'' +
		'<table align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse">' +
		'    <tbody>' +
		'        <tr>' +
		'            <td align="center" valign="top">' +
		'                <table align="left" border="0" cellpadding="0" cellspacing="0"' +
		'                    style="display:inline;border-collapse:collapse">' +
		'                    <tbody>' +
		'                        <tr>' +
		'                            <td valign="top" style="padding-right:10px;padding-bottom:9px"' +
		'                                class="m_6481445998704980137mcnFollowContentItemContainer">' +
		'                                <table border="0" cellpadding="0" cellspacing="0" width="100%"' +
		'                                    class="m_6481445998704980137mcnFollowContentItem"' +
		'                                    style="border-collapse:collapse">' +
		'                                    <tbody>' +
		'                                        <tr>' +
		'                                            <td align="left" valign="middle"' +
		'                                                style="padding-top:5px;padding-right:10px;padding-bottom:5px;padding-left:9px">' +
		'                                                <table align="left" border="0" cellpadding="0"' +
		'                                                    cellspacing="0" width=""' +
		'                                                    style="border-collapse:collapse">' +
		'                                                    <tbody>' +
		'                                                        <tr>' +
		'                                                            <td align="center" valign="middle" width="24"' +
		'                                                                class="m_6481445998704980137mcnFollowIconContent">' +
		'                                                                <a href="https://www.instagram.com/matrixdobrasil"' +
		'                                                                    target="_blank"><img' +
		'                                                                        src="https://sistema.smartmaps.com.br/images/logo/ico1.png"' +
		'                                                                        style="display:block;border:0;height:auto;outline:none;text-decoration:none"' +
		'                                                                        height="24" width="24"' +
		'                                                                        class="CToWUd"></a>' +
		'                                                            </td>' +
		'                                                        </tr>' +
		'                                                    </tbody>' +
		'                                                </table>' +
		'                                            </td>' +
		'                                        </tr>' +
		'                                    </tbody>' +
		'                                </table>' +
		'                            </td>' +
		'                        </tr>' +
		'                    </tbody>' +
		'                </table>' +
		'' +
		'                <table align="left" border="0" cellpadding="0" cellspacing="0"' +
		'                    style="display:inline;border-collapse:collapse">' +
		'                    <tbody>' +
		'                        <tr>' +
		'                            <td valign="top" style="padding-right:10px;padding-bottom:9px"' +
		'                                class="m_6481445998704980137mcnFollowContentItemContainer">' +
		'                                <table border="0" cellpadding="0" cellspacing="0" width="100%"' +
		'                                    class="m_6481445998704980137mcnFollowContentItem"' +
		'                                    style="border-collapse:collapse">' +
		'                                    <tbody>' +
		'                                        <tr>' +
		'                                            <td align="left" valign="middle"' +
		'                                                style="padding-top:5px;padding-right:10px;padding-bottom:5px;padding-left:9px">' +
		'                                                <table align="left" border="0" cellpadding="0"' +
		'                                                    cellspacing="0" width=""' +
		'                                                    style="border-collapse:collapse">' +
		'                                                    <tbody>' +
		'                                                        <tr>' +
		'                                                            <td align="center" valign="middle" width="24"' +
		'                                                                class="m_6481445998704980137mcnFollowIconContent">' +
		'                                                                <a href="https://www.facebook.com/MatrixdoBrasil/"' +
		'                                                                    target="_blank"><img' +
		'                                                                        src="https://sistema.smartmaps.com.br/images/logo/ico2.png"' +
		'                                                                        style="display:block;border:0;height:auto;outline:none;text-decoration:none"' +
		'                                                                        height="24" width="24"' +
		'                                                                        class="CToWUd"></a>' +
		'                                                            </td>' +
		'                                                        </tr>' +
		'                                                    </tbody>' +
		'                                                </table>' +
		'                                            </td>' +
		'                                        </tr>' +
		'                                    </tbody>' +
		'                                </table>' +
		'                            </td>' +
		'                        </tr>' +
		'                    </tbody>' +
		'                </table>' +
		'' +
		'                <table align="left" border="0" cellpadding="0" cellspacing="0"' +
		'                    style="display:inline;border-collapse:collapse">' +
		'                    <tbody>' +
		'                        <tr>' +
		'                            <td valign="top" style="padding-right:0;padding-bottom:9px"' +
		'                                class="m_6481445998704980137mcnFollowContentItemContainer">' +
		'                                <table border="0" cellpadding="0" cellspacing="0" width="100%"' +
		'                                    class="m_6481445998704980137mcnFollowContentItem"' +
		'                                    style="border-collapse:collapse">' +
		'                                    <tbody>' +
		'                                        <tr>' +
		'                                            <td align="left" valign="middle"' +
		'                                                style="padding-top:5px;padding-right:10px;padding-bottom:5px;padding-left:9px">' +
		'                                                <table align="left" border="0" cellpadding="0"' +
		'                                                    cellspacing="0" width=""' +
		'                                                    style="border-collapse:collapse">' +
		'                                                    <tbody>' +
		'                                                        <tr>' +
		'                                                            <td align="center" valign="middle" width="24"' +
		'                                                                class="m_6481445998704980137mcnFollowIconContent">' +
		'                                                                <a href="https://www.youtube.com/channel/UCLwDfQ7xfZvQdiqhHVEjY6w"' +
		'                                                                    target="_blank"><img' +
		'                                                                        src="https://sistema.smartmaps.com.br/images/logo/ico3.png"' +
		'                                                                        style="display:block;border:0;height:auto;outline:none;text-decoration:none"' +
		'                                                                        height="24" width="24"' +
		'                                                                        class="CToWUd"></a>' +
		'                                                            </td>' +
		'                                                        </tr>' +
		'                                                    </tbody>' +
		'                                                </table>' +
		'                                            </td>' +
		'                                        </tr>' +
		'                                    </tbody>' +
		'                                </table>' +
		'                            </td>' +
		'                        </tr>' +
		'                    </tbody>' +
		'                </table>' +
		'            </td>' +
		'        </tr>' +
		'    </tbody>' +
		'</table>';
}

module.exports = {
	init: (config) => {
		console.log('----- EMAIL INIT -----')
		user = config.auth.user
		email = nodemailer.createTransport(config)

		if (config.hostMap)
			host = config.hostMap

		if (config.hostViability)
			hostViability = config.hostViability
	},
	send: (to, subject, content, filename) => {
		to = organizeToEmails(to);

		let mailOptions = {
			from: user,
			to: to,
			subject: subject,
			html: makeHtml(subject, content)
		}

		if (filename) {
			mailOptions.attachments = [{
				path: __dirname + '/' + filename
			},]
		}

		email.sendMail(mailOptions, (error, info) => {
			console.log('-----')
			console.log('----- EMAIL')
			console.log('-----')
			console.log('Email to ', mailOptions.to);
			console.log('subject ', mailOptions.subject);

			if (error) {
				console.log('-----')
				console.log('----- email error -----')
				console.log('-----')
				console.log(error.message)
				return;
			}

			console.log('Server responded with "%s"', info.response);
			console.log('-----')
		});
	}
}