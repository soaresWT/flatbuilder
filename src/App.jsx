import { useEffect, useRef, useState } from "react";
import autoAnimate from "@formkit/auto-animate";
import {
  Theme,
  Box,
  Flex,
  Text,
  Strong,
  Button,
} from "@radix-ui/themes/dist/cjs/index.js";
import NavBar from "./components/NavBar";
import Search from "./components/Search";
import AppCard from "./components/Card";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import "./App.css";
import { ReloadIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { search, setupIndexAndAddDocuments } from "./config/melisearch";

function App() {
  const [apps, setApps] = useState([]);
  const [randomApps, setRandomApps] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const itemsPerPage = 20;
  const listRef = useRef(null);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const cachedData = localStorage.getItem("apps");
        if (cachedData) {
          const data = JSON.parse(cachedData);
          setApps(data);
          setRandomApps(data.sort(() => 0.4 - Math.random()).slice(0, 4));
          await setupIndexAndAddDocuments(data);
        } else {
          const response = await fetch("/api/api/v1/apps");
          const data = await response.json();
          localStorage.setItem("apps", JSON.stringify(data));
          setApps(data);
          setRandomApps(data.sort(() => 0.4 - Math.random()).slice(0, 4));
          await setupIndexAndAddDocuments(data);
        }
      } catch (error) {
        console.error("Error fetching apps:", error);
      }
    };

    fetchApps();
  }, []);

  useEffect(() => {
    if (listRef.current) {
      autoAnimate(listRef.current, {
        duration: 200,
        easing: "ease-in-out",
      });
    }
  }, [searchResults]); // Atualiza a animação sempre que searchResults mudar

  const updateRandomApps = (apps) => {
    const shuffledApps = apps.sort(() => 0.4 - Math.random());
    setRandomApps(shuffledApps.slice(0, 4));
  };

  const reloadRandomApps = () => {
    if (apps.length > 0) {
      updateRandomApps(apps);
    }
  };

  const loadMoreApps = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        loadMoreApps();
      }
      setShowScrollToTop(window.scrollY > window.innerHeight / 2);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = async (query) => {
    setIsSearching(true);
    try {
      if (query.trim()) {
        const results = await search(query);
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching apps:", error);
    } finally {
      // Oculte a seção "Estou com sorte" apenas se a caixa de pesquisa estiver vazia
      if (!query.trim()) {
        setIsSearching(false);
      }
    }
  };

  const exportLocalStorageToJSON = (filename = "localStorageData.json") => {
    const localStorageData = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      localStorageData[key] = localStorage.getItem(key);
    }
    const json = JSON.stringify(localStorageData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const currentApps =
    searchResults.length > 0
      ? searchResults
      : apps.slice(0, currentPage * itemsPerPage);

  return (
    <Theme accentColor="iris" panelBackground="translucent" appearance="dark">
      <NavBar />
      <Box style={{ marginTop: "8%" }}>
        <Flex justify="center" align="center" p="4">
          <Text
            weight="medium"
            size="9"
            style={{ textAlign: "center", maxWidth: "90%" }}
          >
            Construa pacotes de aplicativos Flatpak com facilidade.
          </Text>
        </Flex>
      </Box>
      <Search onSearch={handleSearch} />
      {!isSearching && (
        <Box style={{ marginTop: "2%" }}>
          <Flex justify="center" align="center" mb="5">
            <Flex justify="between" align="center" width="86%">
              <Text weight="medium" size="8" style={{ textAlign: "center" }}>
                Estou com sorte <AutoAwesomeIcon />
              </Text>
              <Button variant="ghost" onClick={reloadRandomApps}>
                Recarregue
                <ReloadIcon />
              </Button>
            </Flex>
          </Flex>
          <Flex justify="center" wrap="wrap" gap="16px" ref={listRef}>
            {randomApps.map((app) => (
              <AppCard key={app.flatpakAppId} app={app} />
            ))}
          </Flex>
        </Box>
      )}
      <Box style={{ marginTop: "1%" }}>
        <Flex justify="center" align="center" mb="5">
          <Flex justify="between" align="center" width="86%">
            <Text
              weight="medium"
              size="8"
              align="center"
              style={{ marginBottom: "10px" }}
              mb="8"
            >
              <Strong>Todos os aplicativos </Strong>
            </Text>
          </Flex>
        </Flex>
        <Flex justify="center" wrap="wrap" gap="16px" ref={listRef}>
          {currentApps.map((app) => (
            <AppCard key={app.flatpakAppId} app={app} />
          ))}
        </Flex>
      </Box>
      {showScrollToTop && (
        <Button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "70px",
            right: "70px",
            borderRadius: "20%",
            backgroundColor: "#333",
            color: "#fff",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
          }}
          variant="ghost"
        >
          <ArrowUpIcon />
        </Button>
      )}
      {/* Botão para exportar localStorage */}
      <Button
        onClick={() => exportLocalStorageToJSON()}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          borderRadius: "20%",
          backgroundColor: "#007bff",
          color: "#fff",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
          zIndex: 1000,
        }}
        variant="ghost"
      >
        Exportar dados
      </Button>
    </Theme>
  );
}

export default App;
