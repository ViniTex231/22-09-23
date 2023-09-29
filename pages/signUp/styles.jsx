import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#cccccc',
        alignItems:'center',
        justifyContent:'center',
        flex:1,
    },
    caixa:{
        width:'80%',
        borderWidth:1,
        borderRadius: 5,
        padding:8,
        fontSize:15,
        marginTop:10,
    },
    caixaX:{
        width:'80%',
        borderWidth:1,
        borderRadius: 5,
        padding:8,
        fontSize:15,
        marginTop:10,
        backgroundColor:'#aaa',
    },
    caixaCidade:{
        width:'62%',
        borderWidth:1,
        borderRadius: 5,
        padding:8,
        fontSize:15,
        marginTop:10,
        backgroundColor:'#aaa',
    },
    caixaUf:{
        width:'15%',
        borderWidth:1,
        borderRadius: 5,
        padding:8,
        fontSize:15,
        marginTop:10,
        backgroundColor:'#aaa',
        marginLeft:15,
    },
    caixaNum:{
        width:'15%',
        borderWidth:1,
        borderRadius: 5,
        padding:8,
        fontSize:15,
        marginTop:10,
        marginLeft:15,
        alignItems: 'center',
    },
    caixaCEP:{
        width:'50%',
        borderWidth:1,
        borderRadius: 5,
        padding:8,
        fontSize:15,
        marginTop:10,
    },
    title:{
        fontSize: 40,
        fontWeight:'bold'
    },
    caixas:{
        alignItems:'center',
        justifyContent:'center',
        padding:20,
    },
    btnOk:{
        marginTop:20,
        borderWidth:1,
        borderRadius:10,
        width:'50%',
        height:50,
        backgroundColor:'#f8f8f8',
        alignItems:'center',
        justifyContent:'center',
    },
    btnBuscar:{
        width:'27%',
        borderWidth:1,
        borderRadius: 5,
        padding:8,
        fontSize:25,
        marginTop:10,
        marginLeft:10,
        backgroundColor:'#f8f8f8',
        alignItems: 'center',
    },
    caixa1:{
        borderWidth:1,
        borderRadius:5,
        padding:5,
        marginVertical:10,
        width: '60%',
    }, 
    foto:{
        marginTop: 10,
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
    img:{
        width: 150,
        height: 200,
        backgroundColor: '#999',
    },
    botoes:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%'
    },
})

export default styles