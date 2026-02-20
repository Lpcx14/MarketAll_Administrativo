import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase";

import { FontAwesome5 } from "@expo/vector-icons";

export default function Dashboard() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [view, setView] = useState<"produtos" | "usuarios">("produtos");
  const [search, setSearch] = useState("");
  const [usuarioLogado, setUsuarioLogado] = useState({ email: "" });
  const [focused, setFocused] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState("");

  // Lista lateral fixa
  const listaProdutos = [
    "Açúcar",
    "Adoçante",
    "Água Mineral",
    "Alface",
    "Alho",
    "Amido de Milho",
    "Arroz",
    "Atum",
    "Azeite",
    "Azeitona",
    "Bacon",
    "Batata",
    "Batata Palha",
    "Bebida Láctea",
    "Biscoito",
    "Bolo",
    "Brócolis",
    "Manteiga",
    "Café",
    "Caldo de Carne",
    "Caldo de Galinha",
    "Carne Bovina",
    "Carne Suína",
    "Cebola",
    "Cenoura",
    "Cereal Matinal",
    "Chocolate",
    "Creme de Leite",
    "Catchup",
    "Ervilha",
    "Extrato de Tomate",
    "Farinha de Mandioca",
    "Farinha de Rosca",
    "Farinha de Trigo",
    "Feijão",
    "Fermento",
    "Fubá",
    "Gelatina",
    "Goiabada",
    "Grão-de-Bico",
    "Iogurte",
    "Leite",
    "Leite Condensado",
    "Lentilha",
    "Legumes Congelados",
    "Limão",
    "Macarrão",
    "Maionese",
    "Margarina",
    "Milho Verde",
    "Molho de Tomate",
    "Óleo de Cozinha",
    "Ovos",
    "Pão",
    "Pão de Forma",
    "Peito de Frango",
    "Pepino",
    "Pimenta",
    "Presunto",
    "Queijo",
    "Refrigerante",
    "Requeijão",
    "Sabão em Pó",
    "Sal",
    "Salsicha",
    "Sardinha",
    "Suco",
    "Tomate",
    "Vinagre",
  ];

  // Usuário logado
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user?.email) setUsuarioLogado({ email: user.email });
    });
    return unsub;
  }, []);

  // Carregar Firestore
  useEffect(() => {
    const loadData = async () => {
      const prodSnap = await getDocs(collection(db, "product"));
      setProdutos(prodSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

      const userSnap = await getDocs(collection(db, "user"));
      setUsuarios(userSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    loadData();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  // Filtrar produtos pelo search e pelo item lateral selecionado
  const produtosLaterais = listaProdutos.filter((p) =>
    p.toLowerCase().includes(search.toLowerCase()),
  );

  const filteredProdutos = produtos.filter(
    (p) =>
      (!produtoSelecionado || p.product.includes(produtoSelecionado)) &&
      p.product?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleProdutoClick = (produto: string) => {
    setProdutoSelecionado(produto === produtoSelecionado ? "" : produto);
    setSearch(produto);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Administrador</Text>
          <Text style={styles.email}>{usuarioLogado.email}</Text>
        </View>

        <TouchableOpacity onPress={logout} style={styles.logout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* Menu */}
      <View style={styles.menu}>
        <TouchableOpacity
          style={view === "produtos" ? styles.menuActive : styles.menuItem}
          onPress={() => setView("produtos")}
        >
          <FontAwesome5 name="box" size={22} />
          <Text style={styles.menuText}>Produtos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={view === "usuarios" ? styles.menuActive : styles.menuItem}
          onPress={() => setView("usuarios")}
        >
          <FontAwesome5 name="user" size={22} />
          <Text style={styles.menuText}>Usuários</Text>
        </TouchableOpacity>
      </View>

      {/* Barra de pesquisa */}
      <View style={styles.centerSearch}>
        <View style={styles.searchWrapper}>
          {focused && <Text style={styles.prompt}>Pesquisar</Text>}
          <View style={styles.searchContainer}>
            <FontAwesome5 name="search" size={30} color="#9c9494" />
            <TextInput
              placeholder={!focused ? "  Pesquisar..." : ""}
              value={search}
              onChangeText={setSearch}
              style={styles.searchInput}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(search.length === 0 ? false : true)}
            />
          </View>
        </View>
      </View>

      {/* Produtos */}
      {view === "produtos" && (
        <View style={{ flexDirection: "row" }}>
          {/* Lista lateral */}
          <SafeAreaView>
            <ScrollView
              style={styles.listaLateral}
              showsVerticalScrollIndicator={false}
            >
              {produtosLaterais.map((p, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => handleProdutoClick(p)}
                  style={[
                    styles.itemLateral,
                    p === produtoSelecionado && styles.itemLateralSelecionado,
                  ]}
                >
                  <Text
                    style={
                      p === produtoSelecionado
                        ? styles.itemLateralTextSel
                        : styles.itemLateralText
                    }
                  >
                    {p}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </SafeAreaView>

          {/* Grid de produtos */}
          <FlatList
            data={filteredProdutos}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item: p }) => {
              const base64Image = p.image ? p.image.replace(/\s/g, "") : null;
              return (
                <View style={styles.cardProduto}>
                  {base64Image && (
                    <Image
                      source={{ uri: `data:image/png;base64,${base64Image}` }}
                      style={styles.imgProduto}
                    />
                  )}
                  <Text style={styles.cardText}>
                    {""}
                    <FontAwesome5 name="code" size={30} color="#9c9494" />
                    Code: {p.code}
                  </Text>
                  <Text style={styles.cardText}>📦 Produto: {p.product}</Text>
                  <Text style={styles.cardText}>💰 Preço: R$ {p.price}</Text>
                  <Text style={styles.cardText}>
                    {" "}
                    📝 Descrição: {p.description}
                  </Text>
                  <Text style={styles.cardText}>🏪 Loja: {p.store}</Text>
                  <Text style={styles.cardText}>👤 Postado por: {p.post}</Text>
                  <Text style={styles.cardText}>📅 Data: {p.dataSystem}</Text>
                </View>
              );
            }}
          />
        </View>
      )}

      {/* Usuários */}
      {view === "usuarios" && (
        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cardUsuario}>
              <Text style={styles.cardText}>👤 {item.nome}</Text>
              <Text style={styles.cardText}>👤 {item.id}</Text>
            </View>
          )}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  header: {
    backgroundColor: "#4FC3F7",
    padding: 20,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  email: { color: "#fff", fontSize: 16 },

  menu: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    width: 300,
  },
  menuItem: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#eee",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  menuActive: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#4FC3F7",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  menuText: {
    fontWeight: "bold",
    color: "#172a2b",
    marginLeft: 8,
    fontSize: 16,
  },

  logout: {
    backgroundColor: "#4FC3F7",
    padding: 14,
    width: 100,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: { color: "#fff8f8", fontWeight: "bold", fontSize: 16 },

  // Barra de pesquisa
  centerSearch: {
    width: "60%", // controla a largura (pode ser % ou número)
    alignSelf: "center", // garante centralização horizontal
    justifyContent: "center",
    borderColor: "#7a6565",
    borderWidth: 1, // ESPESSURA da borda
    borderRadius: 16, // cantos arredondados
    backgroundColor: "#445c68",
    marginBottom: 20,
  },
  searchWrapper: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fdfdff",
    borderRadius: 16,
    paddingHorizontal: 12,
    marginBottom: 10,
    height: 50,
    width: "100%",
    borderColor: "#eee8e8",
    borderWidth: 1,
  },
  prompt: {
    fontSize: 16,
    color: "#fefeff",
    marginBottom: 10,
    marginLeft: 5,
    marginTop: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    height: "100%",
    color: "#0f0303",
    borderRadius: 10,
    margin: 5,
    borderColor: "#dbd0d0",
    borderWidth: 1,
  },

  // Lista lateral
  listaLateral: {
    maxWidth: 200,
    marginRight: 10,
    maxHeight: 640,
    borderRadius: 1,
  },
  itemLateral: { padding: 8, marginBottom: 3, borderRadius: 5 },
  itemLateralSelecionado: { backgroundColor: "#4FC3F7" },
  itemLateralText: { color: "#3b3131", fontSize: 18, fontFamily: "Arial" },
  itemLateralTextSel: { color: "#fff" },

  // Card produtos
  cardProduto: {
    backgroundColor: "#e8e8f1",
    borderRadius: 12,
    flex: 1,
    margin: 8,
    padding: 12,
    height: 550,
    minWidth: 260,
    maxWidth: 330,
  },
  imgProduto: { width: 300, height: 359, borderRadius: 8, marginBottom: 8 },

  // Card usuários
  cardUsuario: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    width: 380,
    marginVertical: 6,
  },

  //configura texto de card
  cardText: {
    fontSize: 18, // tamanho da letra
    fontFamily: "Arial", // ou "Roboto", "Courier New", etc
    color: "#333", // cor do texto
  },
});
