import { MeiliSearch } from "meilisearch";

const MEILISEARCH_URL = "http://localhost:7700";
const indexName = "apps";
const primaryKey = "inStoreSinceDate";

const client = new MeiliSearch({ host: MEILISEARCH_URL });

const createIndex = async () => {
  try {
    const index = client.index(indexName);

    try {
      await index.getSettings();
      console.log("Index already exists");
    } catch {
      await client.createIndex(indexName, { primaryKey });
      console.log("Index created with primary key:", primaryKey);
    }
  } catch (error) {
    console.error("Error creating index:", error);
  }
};

const addDocuments = async (documents) => {
  try {
    const index = client.index(indexName);
    const response = await index.addDocuments(documents);
    console.log("Documents added successfully:", response);
  } catch (error) {
    console.error("Error adding documents:", error);
  }
};

const search = async (query) => {
  try {
    const index = client.index(indexName);
    const response = await index.search(query);
    console.log("Search results:", response.hits);
    return response.hits;
  } catch (error) {
    console.error("Error searching documents:", error);
    return [];
  }
};

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

export { addDocuments, search, setupIndexAndAddDocuments };
