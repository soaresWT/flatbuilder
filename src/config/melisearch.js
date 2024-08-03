import { MeiliSearch } from "meilisearch";

const MEILISEARCH_URL = "http://localhost:7700"; // Substitua pela URL do seu MeiliSearch
const indexName = "apps"; // Nome do índice
const primaryKey = "inStoreSinceDate"; // Chave primária

const client = new MeiliSearch({ host: MEILISEARCH_URL });

// Função para criar o índice com a chave primária
const createIndex = async () => {
  try {
    const index = client.index(indexName);

    // Verifica se o índice já existe
    try {
      await index.getSettings();
      console.log("Index already exists");
    } catch {
      // Se o índice não existe, cria-o
      await client.createIndex(indexName, { primaryKey });
      console.log("Index created with primary key:", primaryKey);
    }
  } catch (error) {
    console.error("Error creating index:", error);
  }
};

// Função para adicionar documentos ao índice
const addDocuments = async (documents) => {
  try {
    const index = client.index(indexName);
    const response = await index.addDocuments(documents);
    console.log("Documents added successfully:", response);
  } catch (error) {
    console.error("Error adding documents:", error);
  }
};

// Função para buscar documentos no índice
const search = async (query) => {
  try {
    const index = client.index(indexName);
    const response = await index.search(query);
    console.log("Search results:", response.hits);
    return response.hits; // Retorna os resultados da busca
  } catch (error) {
    console.error("Error searching documents:", error);
    return [];
  }
};

// Função principal para configurar o índice e adicionar documentos
const setupIndexAndAddDocuments = async (documents) => {
  console.log(documents);
  await createIndex();
  await addDocuments(documents);
};

const exampleData = [
  {
    flatpakAppId: "app.ywallet.Ywallet",
    name: "Ywallet",
    summary: "Light Wallet for Ycash and Zcash",
    iconDesktopUrl:
      "https://dl.flathub.org/media/app/ywallet/Ywallet/bd31f04f1f9214f89faa1c1034389941/icons/128x128/app.ywallet.Ywallet.png",
    iconMobileUrl:
      "https://dl.flathub.org/media/app/ywallet/Ywallet/bd31f04f1f9214f89faa1c1034389941/icons/128x128/app.ywallet.Ywallet.png",
    currentReleaseVersion: null,
    currentReleaseDate: null,
    inStoreSinceDate: "1665962962",
  },
];

const getTaskStatus = async (taskUid) => {
  try {
    const task = await client.getTask(taskUid);
    return task;
  } catch (error) {
    console.error("Error fetching task status:", error);
  }
};

console.log(await getTaskStatus(1));

// setupIndexAndAddDocuments(exampleData);

export { addDocuments, search, setupIndexAndAddDocuments };
