import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { imagensProdutos } from "../../assets/images/produtos/index";

type ProdutoProps = {
  produto: any;
  onVoltar: () => void;
};

export default function Produtos({ produto, onVoltar }: ProdutoProps) {
  const [preco, setPreco] = useState(String(produto.price));
  const [local, setLocal] = useState(produto.store);
  const [data, setData] = useState(produto.dataSystem);
  const [post, setPost] = useState(produto.post);

  return (
    <View style={styles.screen}>
      <Text style={styles.title_grid}>LOJAS PARCEIRAS</Text>
      {/* WRAPPER LADO A LADO */}
      <View style={styles.wrapper}>
        {/* CONTAINER PRINCIPAL */}
        <View style={styles.container}>
          <TouchableOpacity onPress={onVoltar}>
            <Text style={styles.voltar}>⬅ Voltar</Text>
          </TouchableOpacity>

          <Text style={styles.title}>EDITAR PRODUTO</Text>

          <Text style={styles.label}>📦 Produto</Text>
          <Text style={styles.value}>{produto.product}</Text>

          <Text style={styles.label}>🏷 Código</Text>
          <Text style={styles.value}>{produto.code}</Text>

          <Text style={styles.label}>🏪 Loja</Text>
          <Text style={styles.value}>{produto.store}</Text>

          <Text style={styles.label}>💰 Preço / R$</Text>
          <TextInput
            value={preco}
            onChangeText={setPreco}
            style={styles.input}
            keyboardType="numeric"
          />

          <Text style={styles.label}>📅 Data/Hora</Text>
          <TextInput value={data} onChangeText={setData} style={styles.input} />

          <Text style={styles.label}>👤 Post</Text>
          <TextInput value={post} onChangeText={setPost} style={styles.input} />

          <TouchableOpacity style={styles.salvar}>
            <Text style={styles.salvarText}>Salvar Alterações</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.excluir}>
            <Text style={styles.excluirText}>Excluir Produto</Text>
          </TouchableOpacity>
        </View>

        {/* GRID LATERAL COM SCROLL */}
        <ScrollView
          style={styles.sideScroll}
          showsVerticalScrollIndicator={true}
        >
          <View style={styles.sideGrid}>
            {imagensProdutos.map((img, i) => (
              <TouchableOpacity key={i} style={styles.square}>
                <Image source={img} style={styles.image} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5eded",
    marginTop: -30,
    marginStart: 50,
  },

  wrapper: {
    flex: 1, // garante altura total
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 20,
  },

  container: {
    backgroundColor: "#9f9fcc",
    borderRadius: 20,
    padding: 20,
    width: 600, // largura fixa
    height: 765, // altura fixa
    marginRight: 20, // espaço entre container e grid lateral
  },

  voltar: {
    color: "#141488",
    marginBottom: 20,
    fontSize: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  title_grid: {
    color: "#0f0f85",
    fontSize: 40,
    fontWeight: "bold",
    marginStart: 995,
    marginBottom: 10,
    marginTop: 60,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },

  value: {
    fontSize: 16,
    marginBottom: 10,
    color: "#444",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
  },

  salvar: {
    marginTop: 20,
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  salvarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  excluir: {
    marginTop: 15,
    backgroundColor: "#E53935",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  excluirText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  sideScroll: {
    flex: 1, // ocupa o espaço restante
    maxHeight: 765, // limita a altura para alinhar com container
  },

  sideGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 10,
    paddingBottom: 20,
    marginTop: 15,
  },

  square: {
    width: "30%", // 3 quadrados por linha
    aspectRatio: 1,
    backgroundColor: "#230de6",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  image: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
});
