import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Text, TextInputProps, TouchableOpacity } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useTheme } from '../theme/useTheme';

interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export default function CustomInput({ label, error, style, secureTextEntry, ...props }: CustomInputProps) {
  const { theme } = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Determine if we should show the actual text or dots
  const isSecure = secureTextEntry && !isPasswordVisible;

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: theme.text }]}>{label}</Text>}
      <View style={[
        styles.inputContainer,
        {
          backgroundColor: theme.card,
          borderColor: error ? 'red' : theme.border,
        },
        style
      ]}>
        <TextInput
          {...props}
          secureTextEntry={isSecure}
          style={[
            styles.input,
            { color: theme.text },
          ]}
          placeholderTextColor={theme.text + '80'}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.iconContainer}
          >
         <Ionicons
          name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
          size={22}
          color="#555"
        />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.9,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  iconContainer: {
    padding: 4,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
