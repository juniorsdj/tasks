import React from 'react'
import { Text, 
    StyleSheet, 
    View, 
    ImageBackground,
    FlatList,
    TouchableOpacity,
    Platform,
    AsyncStorage,
 } from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'
import Icon from 'react-native-vector-icons/FontAwesome'
import ActionButton from 'react-native-action-button'

import todayImage from './../../assets/imgs/today.jpg'
import commonStyles from './../commonStyles'
import Task from './../components/task'
import AddTask from './addTasks'

export default class Agenda extends React.Component {
    state ={
        tasks:[
            // {
            //     id: Math.random(),
            //     description: 'Comprar curso React',
            //     estimateAt: new Date(),
            //     doneAt: new Date()
            // },
            // {
            //     id: Math.random(),
            //     description: 'Concluir',
            //     estimateAt: new Date(),
            //     doneAt: null
            // },
            // {
            //     id: Math.random(),
            //     description: 'Comprar curso React',
            //     estimateAt: new Date(),
            //     doneAt: new Date()
            // },
            // {
            //     id: Math.random(),
            //     description: 'Concluir',
            //     estimateAt: new Date(),
            //     doneAt: null
            // },
            // {
            //     id: Math.random(),
            //     description: 'Comprar curso React',
            //     estimateAt: new Date(),
            //     doneAt: new Date()
            // },
            // {
            //     id: Math.random(),
            //     description: 'Concluir',
            //     estimateAt: new Date(),
            //     doneAt: null
            // },
            // {
            //     id: Math.random(),
            //     description: 'Comprar curso React',
            //     estimateAt: new Date(),
            //     doneAt: new Date()
            // },
            // {
            //     id: Math.random(),
            //     description: 'Concluir',
            //     estimateAt: new Date(),
            //     doneAt: null
            // },
            // {
            //     id: Math.random(),
            //     description: 'Comprar curso React',
            //     estimateAt: new Date(),
            //     doneAt: new Date()
            // },
            // {
            //     id: Math.random(),
            //     description: 'Concluir',
            //     estimateAt: new Date(),
            //     doneAt: null
            // },
            // {
            //     id: Math.random(),
            //     description: 'Comprar curso React',
            //     estimateAt: new Date(),
            //     doneAt: new Date()
            // },
            // {
            //     id: Math.random(),
            //     description: 'Concluir',
            //     estimateAt: new Date(),
            //     doneAt: null
            // }
        ],
        visibleTasks: [],
        showDoneTasks: true,
        showAddTask: false,
    }

    toggleFilter = () =>{
        this.setState({showDoneTasks: !this.state.showDoneTasks}, this.filterTasks)
    }

    deleteTask = id =>{
        const tasks = this.state.tasks.filter(task => task.id != id)
        this.setState({tasks}, this.filterTasks)
    }

    addTask = task =>{
        const tasks = [...this.state.tasks]
        tasks.push({
            id: Math.random(),
            description: task.description,
            estimateAt: task.date,
            doneAt: null
        })
        this.setState({tasks,  showAddTask: false},
            this.filterTasks
        )
    }


    componentDidMount = async () =>{
        const data = await AsyncStorage.getItem('tasks')
        const tasks = JSON.parse(data) || []
        this.setState({tasks}, this.filterTasks) 
   }
    filterTasks =() =>{
        let visibleTasks = null
        console.log('filter tasks')
        if(this.state.showDoneTasks){
            visibleTasks = [...this.state.tasks]
        }else{
            const pending = task => task.doneAt === null
            visibleTasks= this.state.tasks.filter(pending)
        }
        this.setState({visibleTasks})
        AsyncStorage.setItem('tasks', JSON.stringify(this.state.tasks))
    }

    toggleTask = id =>{
        const tasks = this.state.tasks.map(task =>{
            if(task.id === id){
                task = {...task}
                task.doneAt = task.doneAt ? null : new Date() 
            }
            return task
        })
        this.setState({tasks}, this.filterTasks)
    }

    render() {
        return (
            <View style={styles.container}>
                <AddTask isVisible={this.state.showAddTask}
                    onSave={this.addTask}
                    onCancel={() => this.setState({showAddTask: false})}
                />
                <ImageBackground source={todayImage}
                    style={styles.background}>
                    <View style={styles.iconBar}>
                    <TouchableOpacity onPress={
                        this.toggleFilter
                    }>
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                                size={20} color={commonStyles.colors.secondary} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>
                            {moment().locale('pt-br').format('ddd, D [de] MMMM')}
                        </Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskContainer}>
                    <FlatList data={this.state.visibleTasks}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({item}) => 
                            <Task {...item} 
                                onToggleTask={this.toggleTask}
                                onDelete={this.deleteTask}
                            />}        
                    />
                </View>
                <ActionButton buttonColor={commonStyles.colors.today}
                    onPress={() => this.setState({showAddTask:true})}
                />
            </View >
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: `white`
    },
    background: {
        flex: 3
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 10
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30
    },
    taskContainer: {
        flex: 7,
    },
    iconBar:{
        marginTop: Platform.OS === 'ios' ? 50: 20,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
})