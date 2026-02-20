import { FontAwesome5 } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Dashboard from "./Dashboard";
import { auth } from "./firebase";

// Chave de acesso fixa
const ADMIN_KEY = "654321";

export default function App() {
  const [user, setUser] = useState<{ email: string; uid: string } | null>(null);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [chave, setChave] = useState("");
  const [erro, setErro] = useState("");

  const [emailHidden, setEmailHidden] = useState(true);
  const [senhaHidden, setSenhaHidden] = useState(true);
  const [keyHidden, setKeyHidden] = useState(true);

  const [loading, setLoading] = useState(false); // 👈 progressão

  // LOGIN
  const handleLogin = async () => {
    if (chave !== ADMIN_KEY) {
      setErro("Chave de acesso inválida.");
      return;
    }

    try {
      setLoading(true); // 👈 inicia loader

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        senha,
      );

      setUser({
        email: userCredential.user.email ?? "",
        uid: userCredential.user.uid,
      });

      setErro("");
    } catch (e) {
      setErro("Email ou senha incorretos.");
    } finally {
      setLoading(false); // 👈 encerra loader
    }
  };

  // LOGOUT
  const handleLogout = async () => {
    console.log("Logout chamado");
    await auth.signOut();

    setUser(null);
    setEmail("");
    setSenha("");
    setChave("");
  };

  // USUÁRIO LOGADO
  if (user) {
    return (
      <Dashboard usuario={{ email: user.email }} onLogout={handleLogout} />
    );
  }

  // LOGIN
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.title}>Login Administrador</Text>

      {/* EMAIL COM MÁSCARA */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.inputEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          secureTextEntry={emailHidden}
        />

        <TouchableOpacity
          style={styles.eye}
          onPress={() => setEmailHidden(!emailHidden)}
        >
          <FontAwesome5
            name={emailHidden ? "eye-slash" : "eye"}
            size={16}
            color="#555"
          />
        </TouchableOpacity>
      </View>

      {/* SENHA COM OLHO */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Password"
          value={senha}
          onChangeText={setSenha}
          style={styles.inputEmail}
          secureTextEntry={senhaHidden}
        />

        <TouchableOpacity
          style={styles.eye}
          onPress={() => setSenhaHidden(!senhaHidden)}
        >
          <FontAwesome5
            name={senhaHidden ? "eye-slash" : "eye"}
            size={16}
            color="#555"
          />
        </TouchableOpacity>
      </View>

      {/* CHAVE */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Security Password"
          value={chave}
          onChangeText={setChave}
          style={styles.inputEmail}
          secureTextEntry={keyHidden}
        />
        <TouchableOpacity
          style={styles.eye}
          onPress={() => setKeyHidden(!keyHidden)}
        >
          <FontAwesome5
            name={keyHidden ? "eye-slash" : "eye"}
            size={16}
            color="#555"
          />
        </TouchableOpacity>
      </View>

      {/* BOTÃO / LOADER */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" size="large" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      {erro ? <Text style={styles.error}>{erro}</Text> : null}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  inputContainer: {
    position: "relative",
    width: 400,
    marginBottom: 10,
  },

  inputEmail: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    paddingRight: 40,
    fontSize: 16,
  },

  eye: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: [{ translateY: -8 }],
  },

  button: {
    width: 400,
    backgroundColor: "#4FC3F7",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    opacity: 1,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  error: {
    color: "red",
    marginTop: 10,
  },
});
