import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const FormField = ({ label, onChangeText, onBlur, value, error, touched, ...props }) => {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, touched && error ? styles.inputError : null]}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        {...props}
      />
      {touched && error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    marginTop: 5,
  },
});

export default FormField;
