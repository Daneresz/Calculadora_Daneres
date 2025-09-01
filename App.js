import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';

export default function App() {
  const [numeros, setNumeros] = useState(['']);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [resultado, setResultado] = useState('');

  const adicionarCampo = () => {
    setNumeros([...numeros, '']);
    setIndiceAtual(numeros.length);
  };

  const removerCampo = (idx) => {
    if (numeros.length <= 1) return;
    const novos = numeros.filter((_, i) => i !== idx);
    setNumeros(novos);
    setIndiceAtual(Math.max(0, idx - 1));
  };

  const selecionarCampo = (idx) => {
    setIndiceAtual(idx);
  };

  const pressionarTecla = (valor) => {
    const novos = [...numeros];
    novos[indiceAtual] = (novos[indiceAtual] || '') + valor;
    setNumeros(novos);
  };

  const apagarTecla = () => {
    const novos = [...numeros];
    novos[indiceAtual] = (novos[indiceAtual] || '').slice(0, -1);
    setNumeros(novos);
  };

  const calcular = (operacao) => {
    const nums = numeros.map(n => parseFloat(n));
    if (nums.some(isNaN)) {
      setResultado('Digite todos os números válidos!');
      return;
    }
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

  const teclas = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['0', '.', '⌫'],
  ];

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.topArea}>
        <Image source={require('./assets/theater.png')} style={styles.logo} />
        <Text style={styles.titulo}>Calculadora Avançada</Text>
      </View>
      
      <View style={styles.inputsArea}>
        {numeros.map((num, idx) => (
          <View key={idx} style={styles.inputRow}>
            <TouchableOpacity
              style={[
                styles.inputFake,
                indiceAtual === idx && styles.inputFakeAtivo
              ]}
              onPress={() => selecionarCampo(idx)}
            >
              <Text style={styles.inputFakeText}>
                {num === '' ? `Número ${idx + 1}` : num}
              </Text>
            </TouchableOpacity>
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
      </View>

      <View style={styles.tecladoArea}>
        <View style={styles.tecladoContainer}>
          {teclas.map((linha, i) => (
            <View key={i} style={{ flexDirection: 'row', justifyContent: 'center' }}>
              {linha.map((tecla) => (
                <TouchableOpacity
                  key={tecla}
                  style={styles.tecla}
                  onPress={() => {
                    if (tecla === '⌫') apagarTecla();
                    else pressionarTecla(tecla);
                  }}
                >
                  <Text style={styles.teclaTexto}>{tecla}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>

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

      <Text style={styles.resultado}>Resultado: {resultado}</Text>
      <StatusBar style="light" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FEC021',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
  },
  topArea: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 6,
    alignSelf: 'center',
  },
  titulo: {
    fontSize: 28,
    color: '#E6612D',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: '#fffacd',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 8,
    letterSpacing: 1,
  },
  inputsArea: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 18,
    marginTop: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginBottom: 2,
  },
  inputFake: {
    backgroundColor: '#E6612D',
    borderRadius: 12,
    borderColor: '#f5f3ce',
    borderWidth: 2,
    marginTop: 12,
    padding: 12,
    fontSize: 18,
    color: '#f5f3ce',
    marginRight: 8,
    flex: 1,
    minHeight: 44,
    justifyContent: 'center',
  },
  inputFakeAtivo: {
    borderColor: '#fff3b0',
    backgroundColor: '#ffb366',
  },
  inputFakeText: {
    color: '#f5f3ce',
    fontSize: 18,
  },
  addButton: {
    backgroundColor: '#FEC021',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginTop: 16,
    borderWidth: 2,
    borderColor: '#E6612D',
    alignSelf: 'center',
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
    marginTop: 12,
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
  tecladoArea: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 18,
    marginTop: 6,
  },
  tecladoContainer: {
    backgroundColor: '#fff3b0',
    borderRadius: 16,
    padding: 10,
    alignItems: 'center',
    width: 260,
    alignSelf: 'center',
    marginBottom: 6,
  },
  tecla: {
    backgroundColor: '#E6612D',
    margin: 6,
    borderRadius: 12,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#f5f3ce',
  },
  teclaTexto: {
    color: '#fff3b0',
    fontSize: 26,
    fontWeight: 'bold',
  },
  botoesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 18,
    width: '100%',
    gap: 8,
  },
  botao2: {
    backgroundColor: '#E6612D',
    marginHorizontal: 6,
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
    minWidth: 56,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#21feadff',
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: '#fffacd',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6,
  },
  resultado: {
    fontSize: 22,
    color: '#E6612D',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#fff3b0',
    borderRadius: 12,
    padding: 12,
    width: '90%',
    alignSelf: 'center',
  },
});