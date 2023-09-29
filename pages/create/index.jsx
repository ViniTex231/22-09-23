import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import styles from './styles'
import { db, storage } from '../firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'
import { ref, uploadBytesResumable } from 'firebase/storage'
import * as ImagePicker from 'expo-image-picker';
import { AntDesign, FontAwesome } from '@expo/vector-icons'


export default function Create({ navigation }) {
    const [texto, setTexto] = useState('')
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [imagem, setImagem] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [preview, setPreview] = useState(null)
    const [imageG, setImageG] = useState(null)
    const [imageC, setImageC] = useState(null)


    //############## Imagem ##################
    useEffect(() => {
        if (!imagem) {
            setPreview('')
            return
        }

        const objectUrl = URL.createObjectURL(imagem)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [imagem])
    //############# Fim Imagem ###############

    const gallery = async () => {
        const result = ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        })
    
        if (!(await result).canceled){
          setImageG((await result).assets[0].uri)
        }
    
      }
      
    const camera = async () => {
        const result = ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!(await result).canceled){
            setImageC((await result).assets[0].uri)
        }

    }

    const upload = () => {
        console.log(objectUrl)

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
            `images/${nome.replace(/ +/g, '') + '_' + imagem.name}`
        )

        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on('state_changed', snapshot => { })

        adicionar()
    }

    async function adicionar() {
        await addDoc(collection(db, 'alunos'), {
            name: nome,
            email: email,
            status: false,
            image: nome.replace(/ +/g, '') + '_' + imagem.name
        })
        setEmail('')
        setNome('')
        setPreview(require('../../assets/icon.png'))
        setTexto('Cadastrado com sucesso!')
    }


    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.txt}>Create</Text>
            </View>
            <View style={styles.foto}>
                <Image source={{uri: (imageG)}} style={styles.img} />
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


            <TextInput
                style={styles.caixa1}
                placeholder='Nome'
                value={nome}
                onChangeText={(e) => setNome(e)}
            />
            <TextInput
                style={styles.caixa1}
                placeholder='Email'
                value={email}
                onChangeText={(e) => setEmail(e)}
            />
            <TouchableOpacity
                style={styles.btn}
                onPress={upload}
            >
                <Text style={{ fontWeight: 'bold' }}>Criar</Text>
            </TouchableOpacity>
            <Text>{texto}</Text>
        </View>
    )
}
