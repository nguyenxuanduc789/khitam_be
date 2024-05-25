const nodemailer = require('nodemailer');

const sendConfirmationEmail = async (email,code) => {
    try {
        // Tạo một transporter với các thông tin cấu hình
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: 'ducprokb1234@gmail.com',
                pass: 'jjju ntup gxed ohkz'
            }
        });

        // Tùy chọn cho email
        const mailOptions = {
            from: 'ducprokb1234@gmail.com',
            to: email,
            subject: 'Xác nhận tài khoản',
            text: ` <h1>Code: ${code}</h1>`
           
            
        };

        // Gửi email
        await transporter.sendMail(mailOptions);
        console.log('Email xác nhận đã được gửi thành công.');
    } catch (error) {
        console.error('Lỗi khi gửi email xác nhận:', error);
        throw new Error('Không thể gửi email xác nhận');
    }
};

module.exports = { sendConfirmationEmail };
