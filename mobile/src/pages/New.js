import React, { Component } from 'react';
import * as ImagePicker from 'expo-image-picker';
import api from '../services/api';


import { KeyboardAvoidingView, StyleSheet, TouchableOpacity, Text, TextInput, Image } from 'react-native';

export default class New extends Component {
    static navigationOptions = {
        headerTitle: 'Nova publicação'
    };

    state = {
        preview: null,
        image: null,
        author: '',
        place: '',
        description: '',
        hashtags: '',
    }

    handleSelectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            title: 'Selecionar Imagem',
            base64: true,
        });

        if (!result.cancelled) {

            let prefix;
            let ext;

            if (result.fileName) {
                [prefix, ext] = result.fileName.split('.');
                ext = ext.toLowerCase() == 'heic' ? 'jpg' : ext;
            } else {
                prefix = new Date().getTime();
                ext = 'jpg';
            }

            const image = {
                uri: result.uri,
                type: result.type,
                name: `${prefix}.${ext}`
            };

            this.setState({ preview: result, image });
        }
    }

    handleSubmit = async () => {
        const data = new FormData();

        data.append('image', this.state.image);
        data.append('author', this.state.author);
        data.append('place', this.state.place);
        data.append('description', this.state.description);
        data.append('hashtags', this.state.hashtags);

        await api.post('posts', data);

        this.props.navigation.navigate('Feed');
    }

    render() {
        let { preview } = this.state;
        let imageUri = preview ? `data:image/jpeg;base64,${preview.base64}` : null;

        return (
            <KeyboardAvoidingView behavior="padding"
                enabled={Platform.OS == 'ios'} style={styles.container}>
                <TouchableOpacity style={styles.selectButton} onPress={this.handleSelectImage} >
                    <Text style={styles.selectButtonText}>Selecionar Imagem</Text>
                </TouchableOpacity>
                {preview &&
                    <Image source={{ uri: imageUri }} style={styles.preview} />}
                <TextInput
                    style={styles.input}
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="Nome do Autor"
                    placeholderTextColor='#999'
                    value={this.state.author}
                    onChangeText={author => this.setState({ author })}
                />
                <TextInput
                    style={styles.input}
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="Local da Foto"
                    placeholderTextColor='#999'
                    value={this.state.place}
                    onChangeText={place => this.setState({ place })}
                />
                <TextInput
                    style={styles.input}
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="Descrição"
                    placeholderTextColor='#999'
                    value={this.state.description}
                    onChangeText={description => this.setState({ description })}
                />
                <TextInput
                    style={styles.input}
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="Hashtags"
                    placeholderTextColor='#999'
                    value={this.state.hashtags}
                    onChangeText={hashtags => this.setState({ hashtags })}
                />

                <TouchableOpacity style={styles.shareButton} onPress={this.handleSubmit} >
                    <Text style={styles.shareButtonText}>Compartilhar</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 30,
    },

    selectButton: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#CCC',
        borderStyle: 'dashed',
        height: 42,

        justifyContent: 'center',
        alignItems: 'center',
    },

    selectButtonText: {
        fontSize: 16,
        color: '#666',
    },

    preview: {
        width: 100,
        height: 100,
        marginTop: 10,
        alignSelf: 'center',
        borderRadius: 4,
    },

    input: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 15,
        marginTop: 10,
        fontSize: 16,
    },

    shareButton: {
        backgroundColor: '#7159c1',
        borderRadius: 4,
        height: 42,
        marginTop: 15,

        justifyContent: 'center',
        alignItems: 'center',
    },

    shareButtonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#FFF',
    },
});
