import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React,{useState} from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
  .min(6, 'Should be min of 6 characters')
  .max(20, 'Should be more then of 20 characters')
  .required('Lenght is required')
})

export default function App() {

  const [password, setPassword] = useState('')
  const [ispasswordGenerated, setispasswordGenerated] = useState(false)
  const [uppercase, setUppercase] = useState(false)
  const [lowercase, setLowercase] = useState(true)
  const [number, setNumber] = useState(false)
  const [symbole, setSymbole] = useState(false)

  const generatePasswordString = (passwordLength: number) => {
    let charactersLists = ''
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'
    const numberChars = '0123456789'
    const symboleChars = '!@#$%^&*(){}[]|?><'

    if(uppercase){
      charactersLists += uppercaseChars
    }
    if(lowercase){
      charactersLists += lowercaseChars
    }
    if(number){
      charactersLists += numberChars
    }
    if(symbole){
      charactersLists += symboleChars
    }

    const passwordResult = createPassword(charactersLists, passwordLength)
    setPassword(passwordResult)
    setispasswordGenerated(true)
  }

  const createPassword = (characters: string, passwordLength: number) => {
    let result = ''
    for (let i = 0; i < passwordLength; i++) {
      const charactersIndex = Math.round(Math.random() * characters.length)
      result += characters.charAt(charactersIndex)
    }
    return result
  }

  const resetPasswordState = () => {
    setPassword('')
    setispasswordGenerated(false)
    setUppercase(false)
    setLowercase(true)
    setNumber(false)
    setSymbole(false)
  }

  return (
    <ScrollView keyboardShouldPersistTaps = 'handled'>
      <SafeAreaView style = {styles.appContainer}>
        <View style = {styles.formContainer}>
          <Text  style = {styles.title}>Password Generator</Text>
          <Formik
            initialValues={{ passwordLength: ''}}
            validationSchema={passwordSchema}
            onSubmit={ values => {
              generatePasswordString(+values.passwordLength)
            }}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset
              /* and other goodies */
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputCol}>
                    <View style={styles.inputrow}>
                      <Text style={styles.inputHeading}>Password Length</Text>
                      { touched.passwordLength && errors.passwordLength && (
                        <Text style={styles.errorText}>
                          {errors.passwordLength}
                        </Text>
                      )}
                    </View>
                    <TextInput 
                      style={styles.inputstyle}
                      value={values.passwordLength}
                      onChangeText={handleChange('passwordLength')}
                      placeholder='Ex 8'
                      keyboardType='numeric'
                      autoFocus={true}
                    />
                  </View>
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.checkHeading}>Include Lowercase</Text>
                  <BouncyCheckbox 
                    useBuiltInState={false}
                    isChecked={lowercase}
                    onPress={() => setLowercase(!lowercase)}
                    fillColor='#29AB87'
                  />
                </View>
                <View style={styles.inputWrapper}>
                <Text style={styles.checkHeading}>Include uppercase</Text>
                  <BouncyCheckbox 
                    useBuiltInState={false}
                    isChecked={uppercase}
                    onPress={() => setUppercase(!uppercase)}
                    fillColor='#29AB87'
                  />
                </View>
                <View style={styles.inputWrapper}>
                <Text style={styles.checkHeading}>Include number</Text>
                  <BouncyCheckbox 
                    useBuiltInState={false}  
                    isChecked={number}
                    onPress={() => setNumber(!number)}
                    fillColor='#29AB87'
                  />
                </View>
                <View style={styles.inputWrapper}>
                <Text style={styles.checkHeading}>Include symbole</Text>
                  <BouncyCheckbox 
                    useBuiltInState={false}
                    isChecked={symbole}
                    onPress={() => setSymbole(!symbole)}
                    fillColor='#29AB87'
                  />
                </View>
                <View style={styles.groupBtn}>
                  <TouchableOpacity
                    disabled={!isValid}
                    onPress={() => {
                      console.log('Button pressed');
                      handleSubmit();
                    }}
                  >
                    <Text style={styles.btn}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      console.log('Reset pressed');
                      handleReset();
                      resetPasswordState();
                    }}
                  >
                    <Text style={styles.btn}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
          { ispasswordGenerated ? (
            <View style={styles.resultContainer}>
              <Text>Result:</Text>
              <Text>Long Press to copy</Text>
              <Text selectable={true} style={styles.genPassword}>{password}</Text>
            </View>
          ) : null }
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer: {marginVertical:20, marginHorizontal: 20},
  formContainer: {},
  title: {fontSize: 24, fontWeight: 'bold'},
  inputHeading:{},
  inputWrapper:{flex: 1, flexDirection: 'row', justifyContent:'space-between', marginTop:10, marginBottom: 10},
  inputCol: {flex: 1, flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'},
  inputstyle: { width: 100, height:40, borderColor: '#000'},
  groupBtn: {flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 30},
  btn: {fontSize: 16, color:'black', backgroundColor: '#fff', padding: 10, borderRadius:5, shadowColor: "#333",shadowOpacity: 0.5},
  errorText: {fontSize: 16, color:'red'},
  checkHeading:{},
  resultContainer:{
    width: '100%',
    backgroundColor: '#b7d4f1',
    marginTop:30,
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
    borderRadius: 10
  },
  genPassword:{
    fontSize:30,
    fontWeight:600,
    marginTop:10
  },
  inputrow: {}
})