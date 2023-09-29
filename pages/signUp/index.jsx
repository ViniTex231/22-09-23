import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import styles from './styles'
import { app, db } from '../firebaseConfig'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { addDoc, collection } from 'firebase/firestore'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker';
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { ref, uploadBytesResumable } from 'firebase/storage'


export default function Login({ navigation }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const auth = getAuth(app);
    const [nome, setNome] = useState('')
    const [cep, setCep] = useState('')
    const [num, setNum] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [localidade, setLocalidade] = useState('')
    const [bairro, setBairro] = useState('')
    const [uf, setUf] = useState('')
    const [texto, setTexto] = useState('')
    const [imagem, setImagem] = useState('')
    const [preview, setPreview] = useState('')

    useEffect(() => {
        if (!imagem) {
            setPreview('')
            return
        }

        const objectUrl = URL.createObjectURL(imagem)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [imagem])

    async function adicionar() {
        await addDoc(collection(db, 'users'), {
            nome: nome,
            email: email,
            cep: cep,
            num: num,
            logradouro: logradouro,
            localidade: localidade,
            bairro: bairro,
            uf: uf,
            foto: email + '_' + imagem.name

        })

        navigation.navigate('Home')
    }

    const pesquisar = () => {
        axios.get('https://viacep.com.br/ws/' + cep + '/json/')
            .then((res) => {
                setLogradouro(res.data.logradouro)
                setLocalidade(res.data.localidade)
                setBairro(res.data.bairro)
                setUf(res.data.uf)
            })
    }

    const logar = () => {
        // ###############
        const file = imagem

        if (!file) {
            console.log('Faltou imagem...')
            return
        }

        if (!nome) {
            console.log('Faltou nome...')
            return
        }

        if (!email) {
            console.log('Faltou email...')
            return
        }

        if (imagem == null) return

        const storageRef = ref(
            storage,
            `images/${email + '_' + imagem.name}`
        )

        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on('state_changed', snapshot => { })
        // ################



        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                adicionar()
                navigation.navigate('Home')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }


    // ######## Início Imagem ##########

    const gallery = async () => {
        const result = ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!(await result).canceled) {
            setImagem((await result).assets[0].uri)
        }

    }

    const camera = async () => {
        const result = ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!(await result).canceled) {
            setPreview((await result).assets[0].uri)
        }

    }

    // ######## Fim Imagem #########



    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Cadastrar</Text>
            </View>
            <TextInput
                placeholder='nome'
                onChangeText={setNome}
                value={nome}
                style={styles.caixa}
            />
            <View style={{ flexDirection: 'row' }}>
                <TextInput
                    placeholder='cep'
                    onChangeText={(e) => setCep(e)}
                    value={cep}
                    style={styles.caixaCEP}
                />

                <TouchableOpacity
                    style={styles.btnBuscar}
                    onPress={pesquisar}
                >
                    <Text style={{ fontSize: 25 }}>Buscar</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.caixaCidade} >{logradouro}</Text>
                <TextInput
                    placeholder='nº'
                    onChangeText={setNum}
                    value={num}
                    style={styles.caixaNum}
                />
            </View>

            <Text style={styles.caixaX} >{bairro}</Text>

            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.caixaCidade} >{localidade}</Text>
                <Text style={styles.caixaUf} >{uf}</Text>
            </View>

            <TextInput
                placeholder='email'
                onChangeText={setEmail}
                value={email}
                style={styles.caixa}
            />
            <TextInput
                placeholder='password'
                onChangeText={setPassword}
                value={password}
                style={styles.caixa}
                secureTextEntry={true}
            />

            <View style={styles.foto}>
                <Image source={{ uri: (imagem) }} style={styles.img} />
            </View>
            <View style={styles.botoes}>
                <TouchableOpacity
                    onPress={gallery}
                >
                    <FontAwesome
                        name='image'
                        size={40}
                        color={'#000'}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={camera}
                >
                    <AntDesign
                        name='camera'
                        size={40}
                        color={'#000'}
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.btnOk}
                onPress={logar}
            >
                <Text style={{ fontSize: 25 }}>Ok</Text>
            </TouchableOpacity>
            <Text>{texto}</Text>

        </View>
    )
}