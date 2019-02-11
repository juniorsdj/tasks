import {
    Alert,
    Platform
} from 'react-native'

const server = Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.0.2:3000'

function showError(err){
    Alert.alert('Ops, ocorreu um problema!', `Mensagem: ${err}`)
}

export {server, showError}