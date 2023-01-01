const nodemailer = require('nodemailer');

let tempOTP;

const emailEnviado = async (emailUtilizador) => {
  
  const randomOTP = Math.round(Math.random() * 10000).toString(10).padEnd(6, '0'); // Gera número aleatório no intervalo de 0 a 10000
  tempOTP = randomOTP; //Armazena o valor aleatório na variável temporária.

  // Cria um novo transporter usando o SMTP do Gmail.
  const transporter = nodemailer.createTransport({
    host: 'mail.cursar.pt',
    port: 465,
    secure: true,
    auth: {
      user: 'geral@cursar.pt',
      pass: 'Cur$@r2022'
    }
  });
  
  // Define os detalhes do email.
  const mailOptions = {
    from: '"Cursar" <geral@cursar.pt>',
    to: emailUtilizador,
    subject: 'Código de autenticação',
    text: `Olá, o seu código de autenticação é: ${tempOTP} \nEste código tem duração de 1 minuto, após o limite de tempo expirar, o código tornar-se-à inválido, o que vai implicar a reintrodução do endereço de e-mail.\n\nCursar`
  };
  
  await transporter.sendMail(mailOptions); // Enviar e-mail.

  // Depois de 1 minuto, elimina o valor da variável temporária.
  setTimeout(() => {
    tempOTP = null;
  }, 60000);

  return tempOTP;
}

// Compara o número o número gerado com o código enviado pelo utilizador e retorna um booleano.
const compareCodigo = (codigoConfirmacao) => {
  if(parseInt(tempOTP) === parseInt(codigoConfirmacao)) return true;
  return false;
}
  
module.exports = {emailEnviado, compareCodigo};