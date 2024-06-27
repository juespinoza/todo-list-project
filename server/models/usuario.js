
const usuarioSchema = new mongoose.Schema({
    email: String,
    password: String,
})

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default {
    Usuario
}
