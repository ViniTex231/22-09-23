import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#7b3ff8',
        alignItems: 'center', 
        justifyContent:'center',
        width: '100%',
        flex:1
    },
    txt:{
        fontSize: 30,
        color:'#fff'
    }, 
    caixa1:{
        borderWidth:1,
        borderRadius:5,
        padding:5,
        marginVertical:10,
        width: '60%',
    }, 
    foto:{
        width:150,
        height:200,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#aaa'
    }, 
    foto1:{
        width:130,
        height:180,
        alignItems:'center',
        justifyContent:'center',
    }, 
    btn:{
        width:'30%',
        height:30,
        padding:5,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
        borderRadius:5,
        shadowColor:'#36074d',
        shadowOffset:{height:4, width:4},
        marginVertical: 10
    },
    botoes:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%'
    },
    img:{
        width: 150,
        height: 200,
        backgroundColor: '#999',
    }

})

export default styles