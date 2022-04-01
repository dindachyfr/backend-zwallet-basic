const bcrypt = require("bcryptjs")
const saltRounds = 10;
const myPlaintextPassword = 'ritalalala';
const someOtherPlaintextPassword = 'not_bacon';

const gatau = async (password)=>{
    const passwordHashed = await bcrypt.hash(password, saltRounds)
    console.log(passwordHashed)
    const match = await bcrypt.compare(password, passwordHashed)
    console.log(match)
    }

    gatau("ritalalala")