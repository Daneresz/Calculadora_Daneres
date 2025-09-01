import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function App() {
  const [numeros, setNumeros] = useState(['', '']);
  const [resultado, setResultado] = useState('');

  const handleNumeroChange = (text, idx) => {
    const novos = [...numeros];
    novos[idx] = text;
    setNumeros(novos);
  };

  const adicionarCampo = () => {
    setNumeros([...numeros, '']);
  };

  const removerCampo = (idx) => {
    if (numeros.length <= 1) return;
    const novos = numeros.filter((_, i) => i !== idx);
    setNumeros(novos);
  };

  const calcular = (operacao) => {
    const nums = numeros.map(n => parseFloat(n));
    if (nums.some(isNaN)) {
      setResultado('Digite todos os números válidos!');
      return;
    }

    // Verificação para operações que precisam de pelo menos dois números
    if (
      ['soma', 'subtracao', 'multiplicacao', 'divisao'].includes(operacao) &&
      nums.length < 2
    ) {
      setResultado('Adicione pelo menos dois números!');
      return;
    }

    let res = '';
    switch (operacao) {
      case 'soma':
        res = nums.reduce((acc, n) => acc + n, 0);
        break;
      case 'multiplicacao':
        res = nums.reduce((acc, n) => acc * n, 1);
        break;
      case 'subtracao':
        res = nums.slice(1).reduce((acc, n) => acc - n, nums[0]);
        break;
      case 'divisao':
        res = nums.slice(1).reduce((acc, n) => n !== 0 ? acc / n : 'Divisão por zero!', nums[0]);
        break;
      case 'raiz':
        if (nums.length !== 1) {
          setResultado('Digite apenas um número para a raiz!');
          return;
        }
        res = nums[0] >= 0 ? Math.sqrt(nums[0]) : 'Número negativo!';
        break;
      case 'potencia':
        if (nums.length !== 2) {
          setResultado('Digite base e expoente!');
          return;
        }
        res = Math.pow(nums[0], nums[1]);
        break;
      default:
        res = '';
    }
    setResultado(res.toString());
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('./assets/theater.png')} style={styles.logo} />
      <Text style={styles.texto}>Calculadora Avançada</Text>
      {numeros.map((num, idx) => (
        <View key={idx} style={styles.inputRow}>
          <TextInput
            placeholder={`Número ${idx + 1}`}
            keyboardType='numeric'
            style={[styles.input, { flex: 1 }]}
            value={num}
            onChangeText={text => handleNumeroChange(text, idx)}
            placeholderTextColor="#f5f3ce99"
          />
          {numeros.length > 1 && (
            <TouchableOpacity style={styles.removeButton} onPress={() => removerCampo(idx)}>
              <Text style={styles.removeButtonText}>-</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={adicionarCampo}>
        <Text style={styles.addButtonText}>Adicionar Número</Text>
      </TouchableOpacity>

      <View style={styles.botoesContainer}>
        <TouchableOpacity style={styles.botao2} onPress={() => calcular('soma')}>
          <Text style={styles.botaoTexto}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao2} onPress={() => calcular('subtracao')}>
          <Text style={styles.botaoTexto}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao2} onPress={() => calcular('multiplicacao')}>
          <Text style={styles.botaoTexto}>×</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao2} onPress={() => calcular('divisao')}>
          <Text style={styles.botaoTexto}>÷</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao2} onPress={() => calcular('raiz')}>
          <Text style={styles.botaoTexto}>√</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao2} onPress={() => calcular('potencia')}>
          <Text style={styles.botaoTexto}>xʸ</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.texto, { marginTop: 30 }]}>Resultado: {resultado}</Text>
      <StatusBar style="light" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FEC021',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  texto: {
    fontSize: 26,
    color: '#E6612D',
    fontWeight: 'bold',
    textShadowColor: '#fffacd',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 8,
    letterSpacing: 1,
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 18,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '75%',
  },
  input: {
    backgroundColor: '#E6612D',
    borderRadius: 12,
    borderColor: '#f5f3ce',
    borderWidth: 2,
    marginTop: 18,
    padding: 12,
    fontSize: 18,
    color: '#f5f3ce',
    marginRight: 8,
  },
  botao2: {
    backgroundColor: '#E6612D',
    marginHorizontal: 8,
    marginVertical: 6,
    padding: 16,
    borderWidth: 2,
    borderColor: '#f5f3ce',
    borderRadius: 50,
    shadowColor: '#3d1f00',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
  },
  botaoTexto: {
    color: '#FEC021',
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: '#fffacd',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6,
  },
  addButton: {
    backgroundColor: '#FEC021',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#E6612D',
  },
  addButtonText: {
    color: '#E6612D',
    fontWeight: 'bold',
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: '#E6612D',
    borderRadius: 20,
    padding: 8,
    borderWidth: 2,
    borderColor: '#fff3b0',
    marginTop: 18,
    marginLeft: 4,
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    width: 44,
  },
  removeButtonText: {
    color: '#fff3b0',
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
  },
  botoesContainer: {
    flexDirection: 'row',
    marginTop: 20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});