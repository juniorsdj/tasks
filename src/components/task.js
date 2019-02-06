import React from 'react'
import {View, 
    StyleSheet, 
    Text,
    TouchableWithoutFeedback} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'
import commonStyles from './../commonStyles'


export default props =>{
    let check = null

    if (props.doneAt !== null){
        check = (
            <View style={styles.done}>
                <Icon name='check' size={20} color={commonStyles.colors.secondary}/>
            </View>
        )
    }else{
        check = (
            <View style={styles.pendding}/>
        )
    }


    const descStyle= props.doneAt !== null ? {textDecorationLine: 'line-through'} : {}

    return(
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={ () => props.toggleTask(props.id)}>
                <View style={styles.checkContainer}>
                    {check}
                </View>
            </TouchableWithoutFeedback>
            <View>
                <Text style={[styles.description, descStyle]}>
                    {props.description}
                </Text>
                <Text style={styles.date}>
                   {moment(props.estimateAt).locale('pt-br').format('ddd, D [de] MMMM')}
                </Text>
            </View>        
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        paddingVertical: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#aaa'
    },
    checkContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        width: '20%',

    },
    pendding:{
        borderWidth: 1,
        width: 25,
        height: 25,
        borderRadius: 15,
        borderColor: '#555'
    },
    done:{
        width: 25,
        height: 25,
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: '#4d7031',
        alignItems: 'center',
        justifyContent: 'center'
    },
    description: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 30,
        textDecorationLine: 'line-through'
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 12,
        color: commonStyles.colors.subText
    }
})