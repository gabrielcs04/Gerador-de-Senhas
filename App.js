import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import Slider from '@react-native-community/slider';
import Clipboard from 'expo-clipboard'

let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export default function App() {

  const [password, setPassword] = useState('');
  const [size, setSize] = useState(10);

  function generatePass() {
    let pass = '';
    for (let i = 0, n = charset.length; i < size; i++) {
      pass += charset.charAt(Math.floor(Math.random() * n))
    }

    setPassword(pass);
  }

  function copyPass() {
    Clipboard.setString(password);
    alert('Senha copiada com sucesso!');
  }

  return(
    <View style={styles.container}>
      <Text style={styles.title}>GERADOR DE SENHAS</Text>

      <Image 
        source={require('./src/assets/logo2.png')}
        style={styles.logo}
      />

      <Text style={styles.text}>{size} Caracteres</Text>

      <View style={styles.area}>
        <Slider 
          style={{ height: 50 }}
          minimumValue={5}
          maximumValue={15}
          step={1}
          thumbTintColor='#554E56'
          minimumTrackTintColor='#A2F4C1'
          maximumTrackTintColor='#685E68'
          value={size}
          onValueChange={ (valor) => setSize(valor) }
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={generatePass}>
        <Text style={styles.buttonText}>Gerar senha</Text>
      </TouchableOpacity>

      {password !== '' && (
        <View style={[styles.area, styles.passwordArea]} >
          <Text style={styles.password} onLongPress={copyPass}>{password}</Text>

          <TouchableOpacity style={styles.copyButton} onPress={copyPass}>
            <Image 
              source={require('./src/assets/copy-icon.png')}
              style={styles.copyIcon}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f3ff'
  },

  title:{
    fontSize: 30,
    textAlign: 'center',
    color: '#554E56',
    fontWeight: 'bold',
    marginBottom: 40
  },

  logo:{
    marginBottom: 60
  },

  text:{
    fontSize: 25,
    color: '#554E56',
    fontWeight: 'bold'
  },

  area:{
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 7
  },

  button:{
    backgroundColor: '#FE646F',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    marginBottom: 25
  },

  buttonText:{
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },

  passwordArea:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#554E56',
    borderWidth: 2,
    borderStyle: 'solid'
  },

  password:{
    color: '#554E56',
    flex: 1,
    padding: 10,
    textAlign: 'center',
    fontSize: 20
  },

  copyButton:{
    marginRight: 10
  },

  copyIcon:{
   width: 30,
   height: 30
  }
});

